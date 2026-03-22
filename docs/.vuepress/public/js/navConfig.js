module.exports = [
    { text: 'Home', link: '/' },
          // Ai 学习
    {
        text: 'AI学习',
        items: [
            {
                text: "CaluedCode 学习",
                  items: [
                    {
                        text: "安装claude code",
                        link: "/views/aiStudyPage/claudeCode/claudeCodeInstall",
                    },
                ]
            },
            {
                text: "Ollama 使用指南",
                link: "/views/aiStudyPage/ollama/ollamaDoc",
            },
            {
                text: "LM Studio 使用指南",
                link: "/views/aiStudyPage/lmstudio/lmstudioDoc",
            },
        ],
    },
    // 工具
    {
        text: 'Util',
        items: [
            {
                text: "JavaScript 工具封装",
                link: "/views/utilsPage/jsUtils",
            },
            {
                text: "CSS 样式重置",
                link: "/views/utilsPage/cssStyleReset",
            },
            {
                text: "资源记录",
                link: "/views/utilsPage/resource",
            },
        ],
    },
    // 开发规范
    {
        text: '开发规范',
        items: [
            {
                text: 'git 操作流程',
                link: '/views/projectSpecification/gitRelated/gitProcess'
            },
            {
                text: "编码规范",
                items: [
                    {
                        text: "JavaScript 规范",
                        link: "/views/projectSpecification/codeSpecification/javaScriptCode",
                    },
                    {
                        text: "CSS 规范",
                        link: "/views/projectSpecification/codeSpecification/cssCode",
                    },
                    {
                        text: "HTML 规范",
                        link: "/views/projectSpecification/codeSpecification/htmlCode",
                    },
                ],
            },
        ],
    },
    // 学习
    {
        text: '学习',
        items: [
            {
                text: "Markdown 基础语法",
                link: "/views/studyPage/markdownStudy",
            },
            {
                text: "JavaScript 正则基本语法",
                link: "/views/studyPage/regularExpression",
            },
            {
                text: "Vue2 学习笔记",
                link: "/views/studyPage/vueV2Study",
            },
            {
                text: "Vue3 学习笔记",
                link: "/views/studyPage/vueV3Study",
            },
            {
                text: "App 开发",
                items: [
                    {
                        text: "Dart 语言基础",
                        link: "/views/studyPage/appDev/dartStudy",
                    },
                    {
                        text: "Flutter 开发入门",
                        link: "/views/studyPage/appDev/flutterStudy",
                    },
                ]
            },
            {
                text: "Express学习文档",
                items: [
                    {
                        text: "简单的express服务",
                        link: "/views/studyPage/express/expressDemo",
                    },
                    {
                        text: "express 中间件",
                        link: "/views/studyPage/express/expressMiddleware",
                    },
                    {
                        text: "express 路由中间件",
                        link: "/views/studyPage/express/expressRoute",
                    },
                ]
            },
        ],
    },
    // 问题记录
    {
        text: '问题记录',
        items: [
            {
                text: "JavaScript 相关",
                link: "/views/ProblemRecord/JavaScriptAbout",
            },
            {
                text: "Vue 相关",
                link: "/views/ProblemRecord/VueAbout",
            },
            {
                text: "CSS 相关",
                link: "/views/ProblemRecord/CssAbout",
            },
            {
                text: "HTML 相关",
                link: "/views/ProblemRecord/HtmlAbout",
            },
        ],
    },

]