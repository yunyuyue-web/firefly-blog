<script lang="ts">
import { onMount, tick } from "svelte";
import ClientPagination from "@/components/common/ClientPagination.svelte";
import { formatTimezoneOffset } from "@/utils/date-utils";
import { fetchMemos } from "@/utils/memos-adapter";
import { registerDynamicGallery } from "./dynamic-gallery";
import { registerDynamicInlineComments } from "./dynamic-inline-comments";

type DynamicImage = {
	alt: string;
	src: string;
	title?: string;
};

type DynamicData = {
	id: string;
	published: number;
	html: string;
	images: DynamicImage[];
	searchText: string;
	pinned?: boolean;
	location?: string;
};

interface MemosConfig {
	enable: boolean;
	apiUrl: string;
	parent?: string;
}

interface Props {
	source: string;
	itemsPerPage: number;
	showComments: boolean;
	emptyText: string;
	noResultsText: string;
	loadingText: string;
	allYearsText: string;
	timezone: string;
	memos?: MemosConfig;
}

const {
	source,
	itemsPerPage,
	showComments,
	emptyText,
	noResultsText,
	loadingText,
	allYearsText,
	timezone,
	memos,
}: Props = $props();

let entries = $state<DynamicData[]>([]);
let filtered = $state<DynamicData[]>([]);
let currentPage = $state(1);
let loading = $state(true);
let failed = $state(false);
let templateReady = $state(false);
let list: HTMLElement;
let template: HTMLTemplateElement | null = null;
let searchInput: HTMLInputElement | null = null;
let yearTrigger: HTMLButtonElement | null = null;
let yearMenu: HTMLElement | null = null;
let yearCurrent: HTMLElement | null = null;
let selectedYear = $state("all");
let restoreAnchorAfterRender = false;

const pageEntries = $derived(
	filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
);

function pageFromUrl() {
	return Math.max(
		1,
		Number(new URL(window.location.href).searchParams.get("page")) || 1,
	);
}

function updateUrl(clearHash = false) {
	const current = new URL(window.location.href);
	if (currentPage > 1) current.searchParams.set("page", String(currentPage));
	else current.searchParams.delete("page");
	if (clearHash) current.hash = "";
	history.replaceState(history.state, "", current);
}

function applyFilters(resetPage = true) {
	const query = searchInput?.value.toLocaleLowerCase().trim() || "";
	const year = selectedYear || "all";
	filtered = entries.filter(
		(entry) =>
			(year === "all" ||
				String(new Date(entry.published).getUTCFullYear()) === year) &&
			(!query || entry.searchText.includes(query)),
	);
	if (resetPage) currentPage = 1;
	const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
	currentPage = Math.min(currentPage, totalPages);
	updateUrl(resetPage);
}

function createYearOption(value: string, label: string) {
	const option = document.createElement("button");
	option.type = "button";
	option.className = "year-select-option";
	option.setAttribute("role", "option");
	option.dataset.yearOption = "";
	option.dataset.value = value;
	option.textContent = label;
	return option;
}

function populateYears() {
	if (!yearMenu) return;
	yearMenu.replaceChildren();
	yearMenu.append(createYearOption("all", allYearsText));
	const years = [
		...new Set(
			entries.map((entry) => new Date(entry.published).getUTCFullYear()),
		),
	];
	for (const year of years) {
		yearMenu.append(createYearOption(String(year), String(year)));
	}
	updateYearSelection();
}

function updateYearSelection() {
	if (!yearMenu) return;
	yearMenu
		.querySelectorAll<HTMLElement>("[data-year-option]")
		.forEach((option) => {
			const isSelected = option.dataset.value === selectedYear;
			option.classList.toggle("is-selected", isSelected);
			option.setAttribute("aria-selected", String(isSelected));
		});
	if (yearCurrent) {
		const label =
			yearMenu.querySelector<HTMLElement>(
				`[data-year-option][data-value="${selectedYear}"]`,
			)?.textContent;
		if (label) yearCurrent.textContent = label;
	}
}

function openYearMenu() {
	if (!yearMenu) return;
	yearMenu.hidden = false;
	yearTrigger?.setAttribute("aria-expanded", "true");
	yearTrigger
		?.closest(".dynamic-year-select")
		?.setAttribute("data-open", "true");
}

function closeYearMenu() {
	if (!yearMenu) return;
	yearMenu.hidden = true;
	yearTrigger?.setAttribute("aria-expanded", "false");
	yearTrigger
		?.closest(".dynamic-year-select")
		?.setAttribute("data-open", "false");
}

function toggleYearMenu() {
	yearMenu?.hidden ? openYearMenu() : closeYearMenu();
}

function selectYear(value: string) {
	selectedYear = value;
	updateYearSelection();
	closeYearMenu();
	applyFilters();
}

function focusCurrentYearOption() {
	const options = Array.from(
		yearMenu?.querySelectorAll<HTMLElement>("[data-year-option]") ?? [],
	);
	if (options.length === 0) return;
	(options.find((o) => o.dataset.value === selectedYear) || options[0]).focus();
}

function createItem(entry: DynamicData) {
	if (!template) return null;
	const fragment = template.content.cloneNode(true) as DocumentFragment;
	const root = fragment.querySelector<HTMLElement>("[data-dynamic-entry]");
	if (!root) return null;
	const anchorId = `dynamic-${entry.id.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
	const permalinkUrl = new URL(window.location.href);
	permalinkUrl.hash = anchorId;
	const permalink = `${permalinkUrl.pathname}${permalinkUrl.search}${permalinkUrl.hash}`;
	root.id = anchorId;
	root.dataset.year = String(new Date(entry.published).getUTCFullYear());

	const author = root.querySelector<HTMLElement>("[data-dynamic-author]");
	if (author) {
		author.id = `${anchorId}-author`;
		root.querySelector("article")?.setAttribute("aria-labelledby", author.id);
	}
	root
		.querySelectorAll<HTMLAnchorElement>("[data-dynamic-permalink]")
		.forEach((link) => {
			link.href = permalink;
			link.dataset.noSwup = "";
			link.addEventListener("click", (event) => {
				if (
					event.button !== 0 ||
					event.metaKey ||
					event.ctrlKey ||
					event.shiftKey ||
					event.altKey
				)
					return;
				event.preventDefault();
				event.stopPropagation();
				history.replaceState(history.state, "", permalink);
			});
		});
	const time = root.querySelector<HTMLTimeElement>("[data-dynamic-time]");
	if (time) {
		const date = new Date(entry.published);
		time.dateTime = date.toISOString();
		// 第三方 API 和 Memos 使用浏览器本地时区，不做额外时区转换
		if (source.startsWith("http") || memos?.enable) {
			time.textContent = date.toLocaleDateString("zh-CN", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
			});
		} else {
			time.textContent = new Intl.DateTimeFormat(
				document.documentElement.lang || undefined,
				{
					timeZone: "UTC",
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
				},
			).format(date);
			time.textContent += ` ${formatTimezoneOffset(timezone, date)}`;
		}
	}
	const location = root.querySelector<HTMLElement>("[data-dynamic-location]");
	if (location) {
		const locationText = entry.location?.trim();
		if (locationText) {
			const text = location.querySelector<HTMLElement>(
				"[data-dynamic-location-text]",
			);
			if (text) text.textContent = locationText;
			location.title = locationText;
			location.removeAttribute("hidden");
		} else {
			location.setAttribute("hidden", "");
		}
	}

	const content = root.querySelector<HTMLElement>("[data-dynamic-content]");
	if (content) {
		content.id = `${anchorId}-content`;
		content.innerHTML = entry.html;
		for (const image of entry.images) {
			const element = document.createElement("img");
			element.src = image.src;
			element.alt = image.alt;
			element.loading = "lazy";
			if (image.title) element.title = image.title;
			content.append(element);
		}
		const gallery = root.querySelector<HTMLElement>("dynamic-gallery");
		if (gallery) gallery.dataset.sourceId = content.id;
	}

	// 置顶标识
	const pinned = root.querySelector<HTMLElement>("[data-dynamic-pinned]");
	if (pinned) {
		if (entry.pinned) {
			pinned.removeAttribute("hidden");
		} else {
			pinned.setAttribute("hidden", "");
		}
	}

	const comments = root.querySelector<HTMLElement>("dynamic-inline-comments");
	if (comments) {
		if (showComments) {
			comments.dataset.src = `/dynamic/comments/?path=${encodeURIComponent(
				`/dynamic/${entry.id}/`,
			)}`;
		} else {
			comments.remove();
		}
	}
	return fragment;
}

async function renderItems(items: DynamicData[]) {
	await tick();
	if (!list || !template) return;
	list.replaceChildren();
	for (const entry of items) {
		const item = createItem(entry);
		if (item) list.append(item);
	}
	if (restoreAnchorAfterRender) {
		restoreAnchorAfterRender = false;
		const target = document.getElementById(
			decodeURIComponent(window.location.hash.slice(1)),
		);
		target?.scrollIntoView({ behavior: "auto", block: "start" });
	}
}

function goToPage(page: number) {
	currentPage = page;
	updateUrl(true);
	document
		.querySelector(".dynamic-page")
		?.scrollIntoView({ behavior: "smooth", block: "start" });
}

$effect(() => {
	if (!templateReady) return;
	renderItems(pageEntries);
});

onMount(() => {
	registerDynamicGallery();
	registerDynamicInlineComments();
	const page = list.closest(".dynamic-page");
	template =
		page?.querySelector<HTMLTemplateElement>("[data-dynamic-item-template]") ??
		null;
	templateReady = template !== null;
	searchInput =
		page?.querySelector<HTMLInputElement>("[data-dynamic-search]") ?? null;
	yearTrigger =
		page?.querySelector<HTMLButtonElement>("[data-year-trigger]") ?? null;
	yearMenu = page?.querySelector<HTMLElement>("[data-year-menu]") ?? null;
	yearCurrent =
		page?.querySelector<HTMLElement>("[data-year-current]") ?? null;
	const filter = () => applyFilters();
	searchInput?.addEventListener("input", filter);

	const onTriggerClick = (event: MouseEvent) => {
		event.stopPropagation();
		toggleYearMenu();
	};
	const onMenuClick = (event: MouseEvent) => {
		const target = (event.target as HTMLElement).closest<HTMLElement>(
			"[data-year-option]",
		);
		if (!target) return;
		selectYear(target.dataset.value || "all");
	};
	const onDocClick = (event: MouseEvent) => {
		if (yearMenu && !yearMenu.hidden && !yearMenu.contains(event.target as Node)) {
			closeYearMenu();
		}
	};
	const onTriggerKeydown = (event: KeyboardEvent) => {
		if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(event.key)) {
			event.preventDefault();
			openYearMenu();
			focusCurrentYearOption();
		}
	};
	const onMenuKeydown = (event: KeyboardEvent) => {
		const options = Array.from(
			yearMenu?.querySelectorAll<HTMLElement>("[data-year-option]") ?? [],
		);
		if (options.length === 0) return;
		const index = options.indexOf(document.activeElement as HTMLElement);
		if (event.key === "ArrowDown") {
			event.preventDefault();
			options[(index + 1) % options.length]?.focus();
		} else if (event.key === "ArrowUp") {
			event.preventDefault();
			options[(index - 1 + options.length) % options.length]?.focus();
		} else if (event.key === "Escape") {
			event.preventDefault();
			closeYearMenu();
			yearTrigger?.focus();
		} else if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			const active = document.activeElement as HTMLElement | null;
			if (active?.hasAttribute("data-year-option")) {
				selectYear(active.dataset.value || "all");
			}
		}
	};

	yearTrigger?.addEventListener("click", onTriggerClick);
	yearMenu?.addEventListener("click", onMenuClick);
	yearTrigger?.addEventListener("keydown", onTriggerKeydown);
	yearMenu?.addEventListener("keydown", onMenuKeydown);
	document.addEventListener("click", onDocClick);

	const load = async () => {
		try {
			if (memos?.enable) {
				entries = await fetchMemos(memos.apiUrl, { parent: memos.parent });
			} else {
				const response = await fetch(source);
				if (!response.ok) throw new Error(`HTTP ${response.status}`);
				entries = (await response.json()) as DynamicData[];
			}
			// 更新页面计数
			const countEl = document.querySelector("[data-dynamic-page-count]");
			if (countEl) countEl.textContent = String(entries.length);
			populateYears();
			currentPage = pageFromUrl();
			applyFilters(false);
			const anchorId = decodeURIComponent(window.location.hash.slice(1));
			if (anchorId) {
				const anchorIndex = filtered.findIndex(
					(entry) =>
						`dynamic-${entry.id.replace(/[^a-zA-Z0-9_-]/g, "-")}` === anchorId,
				);
				if (anchorIndex >= 0) {
					currentPage = Math.floor(anchorIndex / itemsPerPage) + 1;
					updateUrl();
					restoreAnchorAfterRender = true;
				}
			}
		} catch (error) {
			console.error("Failed to load dynamics", error);
			failed = true;
		} finally {
			loading = false;
		}
	};
	void load();

	return () => {
		searchInput?.removeEventListener("input", filter);
		yearTrigger?.removeEventListener("click", onTriggerClick);
		yearMenu?.removeEventListener("click", onMenuClick);
		yearTrigger?.removeEventListener("keydown", onTriggerKeydown);
		yearMenu?.removeEventListener("keydown", onMenuKeydown);
		document.removeEventListener("click", onDocClick);
	};
});
</script>

{#if loading}
	<div class="dynamic-loading card-base" role="status">
		<span class="dynamic-loading-spinner" aria-hidden="true"></span>
		<p>{loadingText}</p>
	</div>
{:else if failed || entries.length === 0}
	<div class="dynamic-empty card-base">
		<p>{emptyText}</p>
	</div>
{:else if filtered.length === 0}
	<div class="dynamic-no-results card-base">
		<p>{noResultsText}</p>
	</div>
{/if}

<div class="dynamic-feed" bind:this={list}></div>

{#if !loading && !failed}
	<ClientPagination
		totalItems={filtered.length}
		{itemsPerPage}
		{currentPage}
		onPageChange={goToPage}
	/>
{/if}
