import type { BooknavGroup, BooknavPageConfig } from "../types/booknavConfig";

// 书签导航页面配置
export const booknavPageConfig: BooknavPageConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "",

	// favicon 自动获取配置
	favicon: {
		// 书签未填写 icon 时，是否自动获取目标站点的 favicon 图标
		enabled: true,

		// favicon 接口地址，{domain} 为占位符，会被替换成目标站点域名
		// 更换接口只需保证地址里含有 {domain}，例如：
		//   https://a.favicon.im/{domain}
		//   https://favicon.im/{domain}
		api: "https://a.favicon.im/{domain}",
	},
};

// 书签导航配置
// 每个数组项是一个分类组，分类组内的 items 是该分类下的书签
// 内容根据浏览器收藏夹「文档」模块生成
export const booknavConfig: BooknavGroup[] = [
	{
		id: "general",
		name: "综合文档",
		icon: "material-symbols:menu-book-outline-rounded",
		desc: "各类编程文档、手册与教程聚合",
		weight: 100,
		items: [
			{
				title: "MDN Web Docs",
				url: "https://developer.mozilla.org/zh-CN/",
				desc: "最权威的 Web 技术文档（MDN 中文版）",
				weight: 25,
			},

			{
				title: "菜鸟教程 - 学的不仅是技术，更是梦想！",
				url: "https://www.runoob.com/",
				desc: "菜鸟教程：简单易学的编程入门教程",
				weight: 22,
			},
			{
				title: "Java 全栈知识体系",
				url: "https://www.pdai.tech/",
				desc: "Java 全栈知识体系",
				weight: 21,
			},
			{
				title: "在线API中文手册",
				url: "https://www.matools.com/api",
				desc: "在线 API 中文手册集合",
				weight: 20,
			},
			{
				title: "W3Cschool词典库",
				url: "https://www.w3cschool.cn/dict/",
				desc: "W3Cschool 词典库",
				weight: 17,
			},
			{
				title:
					"印记中文 - 深入挖掘国外前端新领域，为国内 Web 前端开发人员提供优质文档！",
				url: "https://docschina.org/",
				desc: "印记中文：前端优质文档翻译聚合",
				weight: 16,
			},
			{
				title: "Quick Reference & Quick Reference",
				url: "http://ref.laoleng.vip/",
				desc: "Quick Reference 速查手册",
				weight: 11,
			},
			{
				title: "编程语言转换学习平台 | 从已知语言快速掌握新语言",
				url: "https://langshift.dev/zh-cn",
				desc: "从已知语言快速掌握新语言",
				weight: 4,
			},
			{
				title: "AtomGit | GitCode - 全球开发者的开源社区,开源代码托管平台",
				url: "https://gitcode.com/?spm=5176.28103460.0.0.212875515njW00",
				desc: "GitCode：开发者代码托管平台",
				weight: 3,
			}
		],
	},
	{
		id: "html",
		name: "HTML文档",
		icon: "material-symbols:html",
		desc: "HTML 标签参考与模板资源",
		weight: 99,
		items: [
			{
				title: "HTML 标签列表(字母排序)",
				url: "https://www.runoob.com/tags/html-reference.html",
				desc: "菜鸟教程：简单易学的编程入门教程",
				weight: 2,
			},
			{
				title: "HTML5 UP! Responsive HTML5 and CSS3 Site Templates",
				url: "https://html5up.net/",
				desc: "免费响应式 HTML5 网站模板",
				weight: 1,
			},
			{
				title: "模板王 - 10000+网页模板,网站模板下载大全",
				url: "https://www.mobanwang.com/",
				desc: "模板王：网页模板下载",
				weight: 2,
			},
		],
	},
	{
		id: "css",
		name: "CSS文档",
		icon: "material-symbols:css",
		desc: "CSS 布局、参考手册与框架文档",
		weight: 98,
		items: [
			{
				title: "Bootstrap中文网",
				url: "https://www.bootcss.com/",
				desc: "Bootstrap 中文网",
				weight: 7,
			},
			{
				title: "Animate.css 一款强大的预设css3动画库",
				url: "https://www.jq22.com/jquery-info819",
				desc: "Animate.css 动画库",
				weight: 6,
			},
			{
				title: "CSS Grid 网格布局教程",
				url: "https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html",
				desc: "CSS Grid 网格布局教程",
				weight: 5,
			},
			{
				title: "CSS 参考手册",
				url: "https://www.runoob.com/cssref/css-reference.html",
				desc: "菜鸟教程：简单易学的编程入门教程",
				weight: 3,
			},
			{
				title: "Tailwind UI - Official Tailwind CSS Components & Templates",
				url: "https://tailwindui.com/",
				desc: "Tailwind UI 官方组件库",
				weight: 2,
			},
			{
				title:
					"Tailwind CSS - 只需书写 HTML 代码，无需书写 CSS，即可快速构建美观的网站。 | TailwindCSS中文文档 | TailwindCSS中文网",
				url: "https://tailwindcss.com/",
				desc: "Tailwind CSS",
				weight: 1,
			},
		],
	},
	{
		id: "javascript",
		name: "JavaScript（ES6）文档",
		icon: "material-symbols:javascript",
		desc: "JavaScript 与 ES6 学习文档",
		weight: 97,
		items: [
			{
				title: "JavaScript 和 HTML DOM 参考手册",
				url: "https://www.runoob.com/jsref/jsref-tutorial.html",
				desc: "菜鸟教程：简单易学的编程入门教程",
				weight: 9,
			},
			{
				title:
					"《阮一峰 ECMAScript 6 (ES6) 标准入门教程 第三版》",
				url: "https://www.bookstack.cn/books/es6-3rd",
				desc: "阮一峰 ES6 标准入门教程",
				weight: 8,
			},
			{
				title: "ES6 教程",
				url: "https://www.runoob.com/w3cnote/es6-tutorial.html",
				desc: "菜鸟教程：简单易学的编程入门教程",
				weight: 5,
			},
			{
				title: "现代 JavaScript 教程",
				url: "https://zh.javascript.info/",
				desc: "现代 JavaScript 教程",
				weight: 4,
			},
			{
				title: "TypeScript 入门教程",
				url: "https://www.runoob.com/typescript/ts-tutorial.html",
				desc: "TypeScript 入门教程",
				weight: 2,
			},
			{
				title: "Node.js API 文档",
				url: "http://nodejs.cn/api/documentation.html",
				desc: "Node.js API 文档",
				weight: 3,
			},
		],
	},
	{
		id: "libs",
		name: "工具库",
		icon: "material-symbols:library-books-outline-rounded",
		desc: "常用的工具库",
		weight: 96,
		items: [
			{
				title: "BootCDN - Bootstrap 中文网开源项目免费 CDN 加速服务",
				url: "https://www.bootcdn.cn/",
				desc: "BootCDN 开源项目免费 CDN",
				weight: 12,
			},
			{
				title: "Lodash 简介 | Lodash 中文文档 | Lodash 中文网",
				url: "https://www.lodashjs.com/",
				desc: "Lodash 中文文档",
				weight: 9,
			},
			{
				title: "Mock.js",
				url: "http://mockjs.com/",
				desc: "Mock.js：生成模拟数据",
				weight: 8,
			},

			{
				title:
					"Electron | 使用 JavaScript，HTML 和 CSS 构建跨平台的桌面应用程序。",
				url: "https://www.electronjs.org/",
				desc: "Electron：跨平台桌面应用框架",
				weight: 6,
			},
			{
				title: "Moment.js 中文网",
				url: "http://momentjs.cn/",
				desc: "Moment.js 中文网",
				weight: 5,
			},
			{
				title: "Day.js中文网",
				url: "https://dayjs.fenxianglu.cn/",
				desc: "Day.js 中文网：轻量日期库",
				weight: 4,
			},
			{
				title: "Hexo",
				url: "https://hexo.io/zh-cn/",
				desc: "Hexo：快速简洁的博客框架",
				weight: 1,
			},
			{
				title: "无界 | 极致的微前端框架",
				url: "https://wujie-micro.github.io/doc/",
				desc: "无界微前端框架文档",
				weight: 5,
			},
			{
				title: "Firefly Docs",
				url: "https://docs-firefly.cuteleaf.cn/zh/",
				desc: "Firefly 主题模板文档",
				weight: 1,
			},
			{
				title:
					"Express - 基于 Node.js 平台的 web 应用开发框架 - Express 中文文档 | Express 中文网",
				url: "https://www.expressjs.com.cn/",
				desc: "Express 中文文档",
				weight: 2,
			},
			{
				title: "egg - 为企业级框架和应用而生 - Egg",
				url: "https://www.eggjs.org/zh-CN",
				desc: "Egg：企业级 Node.js 框架",
				weight: 1,
			},
			{
				title: "dumi - 为组件研发而生的静态站点框架",
				url: "https://d.umijs.org/",
				desc: "dumi：组件研发静态站点框架",
				weight: 4,
			},
			{
				title: "Easy Mock",
				url: "https://mock.presstime.cn/",
				desc: "Easy Mock 在线 Mock 平台",
				weight: 17,
			},
		],
	},
	{
		id: "vue",
		name: "Vue文档",
		icon: "mdi:vuejs",
		desc: "Vue 及其生态文档",
		weight: 94,
		items: [
			{
				title: "Vue.js",
				url: "https://cn.vuejs.org/",
				desc: "Vue.js 官方中文文档",
				weight: 6,
			},
			{
				title: "VeeValidate",
				url: "https://vee-validate.logaretm.com/v2/",
				desc: "VeeValidate 表单校验",
				weight: 4,
			},
			{
				title: "vue-element-admin",
				url: "https://panjiachen.github.io/vue-element-admin-site/zh/",
				desc: "vue-element-admin 中文文档",
				weight: 3,
			},
			{
				title: "Nuxt.js - Vue.js 通用应用框架",
				url: "https://nuxt.com/",
				desc: "Nuxt.js 文档",
				weight: 1,
			},
			{
				title: "Vue.js示例",
				url: "https://vuejsexamples.com/",
				desc: "Vue.js 官方示例集合",
				weight: 7,
			},
			{
				title: "VuePress",
				url: "https://vuepress.vuejs.org/zh/",
				desc: "VuePress 文档",
				weight: 30,
			},
		],
	},
	{
		id: "react",
		name: "React文档",
		icon: "mdi:react",
		desc: "React 及其生态文档",
		weight: 93,
		items: [
			{
				title: "React 官方中文文档 – 用于构建用户界面的 JavaScript 库",
				url: "https://zh-hans.react.dev/",
				desc: "React 官方中文文档",
				weight: 11,
			},
			{
				title: "Redux中文文档",
				url: "https://redux.nodejs.cn/",
				desc: "Redux 中文文档",
				weight: 10,
			},
			{
				title: "React Router",
				url: "https://reactrouter.com/",
				desc: "React Router 官方文档",
				weight: 9,
			},
			{
				title: "DvaJS",
				url: "https://dvajs.xiniushu.com/",
				desc: "DvaJS：React 数据流方案",
				weight: 8,
			},
			{
				title: "Next.js",
				url: "https://nextjs.org/",
				desc: "Next.js ：用于构建用户界面的 JavaScript 库",
				weight: 7,
			},
			{
				title: "UmiJS - 插件化的企业级前端应用框架",
				url: "https://v3.umijs.org/zh-CN",
				desc: "UmiJS：企业级前端应用框架",
				weight: 5,
			},
			{
				title: "React.js Examples",
				url: "https://reactjsexample.com/",
				desc: "React.js 官方示例集合",
				weight: 6,
			},
						{
				title: "React Virtuoso",
				url: "https://virtuoso.dev/",
				desc: "React Virtuoso 虚拟列表",
				weight: 19,
			},
			{
				title: "react-virtualized",
				url: "https://bvaughn.github.io/react-virtualized/#/components/Collection",
				desc: "react-virtualized 虚拟列表",
				weight: 18,
			},
		],
	},
	{
		id: "components",
		name: "组件库",
		icon: "material-symbols:widgets-outline-rounded",
		desc: "UI 组件库与可视化/编辑器类库",
		weight: 92,
		items: [
			{
				title: "Element - 网站快速成型工具",
				url: "https://element.eleme.cn/#/zh-CN",
				desc: "Element：Vue 组件库",
				weight: 33,
			},
			{
				title: "Swiper中文网-轮播图幻灯片js插件,H5页面前端开发",
				url: "https://www.swiper.com.cn/",
				desc: "Swiper 中文网：轮播插件",
				weight: 32,
			},
			{
				title: "Ant Design of Vue - Ant Design Vue",
				url: "https://www.antdv.com/docs/vue/introduce-cn/",
				desc: "Ant Design Vue 组件库",
				weight: 31,
			},
			{
				title: "Apache ECharts",
				url: "https://echarts.apache.org/zh/index.html",
				desc: "Apache ECharts 可视化图表库",
				weight: 29,
			},
			{
				title:
					"介绍 | uView 2.0 - 全面兼容nvue的uni-app生态框架 - uni-app UI框架",
				url: "https://www.uviewui.com/components/intro.html",
				desc: "uView：uni-app 组件库",
				weight: 28,
			},
			{
				title: "uni-simple-router",
				url: "https://hhyang.cn/v2/",
				desc: "uni-simple-router 文档",
				weight: 27,
			},
			{
				title: "Mint UI",
				url: "http://mint-ui.github.io/#!/zh-cn",
				desc: "Mint UI：移动端组件库",
				weight: 26,
			},
			{
				title: "Vant 3 - 轻量、可靠的移动端组件库",
				url: "https://youzan.github.io/vant/#/zh-CN",
				desc: "Vant：轻量移动端组件库",
				weight: 25,
			},
			{
				title: "NutUI - 移动端 Vue2、Vue3、小程序 组件库",
				url: "https://nutui.jd.com/#/",
				desc: "NutUI：京东移动端组件库",
				weight: 24,
			},
			{
				title: "Muse-UI",
				url: "https://muse-ui.org/#/zh-CN",
				desc: "Muse-UI：Vue 2 组件库",
				weight: 23,
			},
			{
				title: "MUI",
				url: "https://dev.dcloud.net.cn/mui/getting-started/",
				desc: "MUI：最接近原生 App 的前端框架",
				weight: 21,
			},
			{
				title: "Ant Design - 一套企业级 UI 设计语言和 React 组件库",
				url: "https://ant.design/index-cn",
				desc: "Ant Design：企业级 UI 设计语言",
				weight: 20,
			},
			{
				title: "BetterScroll 2.0",
				url: "https://better-scroll.github.io/docs/zh-CN/guide/#%E8%B5%B7%E6%AD%A5",
				desc: "BetterScroll 2.0 滚动库",
				weight: 17,
			},
			{
				title: "TDesign - 开源的企业级设计体系",
				url: "https://tdesign.tencent.com/",
				desc: "TDesign：腾讯企业级设计体系",
				weight: 16,
			},
			{
				title: "react vant - 轻量、可靠的移动端 React 组件库",
				url: "https://react-vant.3lang.dev/",
				desc: "react-vant 移动端组件库",
				weight: 15,
			},
			{
				title: "NutUI - 移动端组件库",
				url: "https://nutui.jd.com/next/#/",
				desc: "NutUI 3.x 移动端组件库",
				weight: 14,
			},
			{
				title: "Zarm Design - 众安科技移动端组件库",
				url: "https://zarm.design/#/",
				desc: "Zarm Design 移动端组件库",
				weight: 13,
			},
			{
				title: "Element-React",
				url: "https://elemefe.github.io/element-react/index#/zh-CN/quick-start",
				desc: "Element-React 组件库",
				weight: 12,
			},
			{
				title: "Driver.js中文网",
				url: "https://driver.employleague.cn/guide/#%E5%AE%89%E8%A3%85",
				desc: "Driver.js 中文文档：页面引导",
				weight: 11,
			},
			{
				title: "form-create-designer",
				url: "https://designer.form-create.com/",
				desc: "form-create-designer 表单设计器",
				weight: 10,
			},
			{
				title:
					"LottieFiles: Download Free lightweight animations for website & apps.",
				url: "https://lottiefiles.com/",
				desc: "LottieFiles：免费动效素材",
				weight: 8,
			},
			{
				title: "Variant Form低代码可视化表单 | Variant Form低代码可视化表单",
				url: "http://vform666.cn/?frm=ccflow",
				desc: "Variant Form 低代码表单",
				weight: 7,
			},
			{
				title: "wangEditor",
				url: "https://www.wangeditor.com/",
				desc: "wangEditor 富文本编辑器",
				weight: 6,
			},
			{
				title: "Storybook: Frontend workshop for UI development",
				url: "https://storybook.js.org/",
				desc: "Storybook：UI 组件开发环境",
				weight: 3,
			},
			{
				title: "Tiptap Docs",
				url: "https://tiptap.dev/docs",
				desc: "Tiptap 富文本编辑器文档",
				weight: 2,
			},
			{
				title: "文档 | Hexo",
				url: "https://hexo.io/zh-cn/docs/index.html",
				desc: "Hexo：快速简洁的博客框架",
				weight: 1,
			},
		],
	},
	{
		id: "tools",
		name: "工具",
		icon: "material-symbols:build-outline-rounded",
		desc: "在线工具与开发辅助平台",
		weight: 91,
		items: [
			{
				title: "在线工具库_W3Cschool极客导航",
				url: "https://123.w3cschool.cn/webtools",
				desc: "W3Cschool 在线工具导航",
				weight: 25,
			},
			{
				title: "Fundebug：一行代码搞定BUG监控",
				url: "https://www.fundebug.com/",
				desc: "Fundebug：前端错误监控",
				weight: 20,
			},
			{
				title: "码工具 - 代码在线工具箱",
				url: "https://www.matools.com/#",
				desc: "码工具：代码在线工具箱",
				weight: 19,
			},
			{
				title: "极简插件_Chrome扩展插件商店_优质crx应用下载",
				url: "https://chrome.zzzmh.cn/#/index",
				desc: "极简插件：Chrome 扩展商店",
				weight: 13,
			},
			{
				title: "UU在线工具",
				url: "https://uutool.cn/excel-link/",
				desc: "常用的一些工具",
				weight: 12,
			},
			{
				title: "npmmirror 镜像站",
				url: "https://npmmirror.com/",
				desc: "npmmirror 镜像站",
				weight: 7,
			},
			{
				title: "接码平台 | 虚拟手机号接收短信验证码 – HeroSMS",
				url: "https://hero-sms.com/cn",
				desc: "接码平台：虚拟手机号",
				weight: 4,
			},
			{
				title: "Doc2X",
				url: "https://doc2x.noedgeai.com/parse",
				desc: "Doc2X：文档解析平台",
				weight: 3,
			},
		],
	},
	{
		id: "ai",
		name: "AI 工具",
		icon: "material-symbols:smart-toy-outline-rounded",
		desc: "AI 平台与智能工具文档",
		weight: 83,
		items: [
			{
				title: "AI 工具集",
				url: "https://ai-bot.cn/",
				desc: "AI 工具集",
				weight: 1,
			},
			{
				title: "扣子空间，你的 AI 办公空间",
				url: "https://www.coze.cn",
				desc: "扣子：AI 办公与开发平台",
				weight: 8,
			},
			{
				title: "Dify: 生产级 Agentic 工作流开发平台",
				url: "https://dify.ai/zh",
				desc: "Dify：AI 工作流开发平台",
				weight: 7,
			},
			{
				title: "MinerU | 面向 Agent 和 RAG 的智能文档解析平台",
				url: "https://mineru.net/",
				desc: "MinerU：文档解析平台",
				weight: 6,
			},
			{
				title: "硅基流动 SiliconFlow - 致力于成为全球领先的 AI 能力提供商",
				url: "https://www.siliconflow.cn/",
				desc: "硅基流动：AI 算力平台",
				weight: 5,
			},
			{
				title: "ima - 腾讯AI知识管家",
				url: "https://ima.qq.com",
				desc: "腾讯 ima：AI 知识管家",
				weight: 4,
			},
			{
				title: "Ollama",
				url: "https://ollama.com/",
				desc: "Ollama：本地大模型运行",
				weight: 1,
			},
		],
	},
];
