module.exports = {
        '/views/aiStudyPage': [
        // Ai 学习
        {
            title: 'AI学习',
            collapsable: true,
            children: [
                {
                    title: "CaluedCode 学习",
                    children: [
                        {
                            title: "安装claude code",
                            path: "/views/aiStudyPage/claudeCode/claudeCodeInstall",
                        },
                    ]
                },
                {
                    title: "Ollama 使用指南",
                    path: "/views/aiStudyPage/ollama/ollamaDoc",
                },
                {
                    title: "LM Studio 使用指南",
                    path: "/views/aiStudyPage/lmstudio/lmstudioDoc",
                },
            ],
        },
    ],
    // Utils 工具
    '/views/utilsPage': [{
        title: 'Util',
        collapsable: true,
        children: [
            {
                title: "JavaScript 工具封装",
                path: "/views/utilsPage/jsUtils",
            },
            {
                title: "CSS 样式重置",
                path: "/views/utilsPage/cssStyleReset",
            },
            {
                title: "资源记录",
                path: "/views/utilsPage/resource",
            },
        ],
    },
    ],
    // 开发规范 
    '/views/projectSpecification': [
        {
            title: "git规范",
            collapsable: true,
            children: [
                {
                    title: "git 操作流程",
                    path: "/views/projectSpecification/gitRelated/gitProcess",
                }
            ]
        },
        {
            title: "代码规范",
            collapsable: true,
            children: [
                {
                    title: "JavaScript 规范",
                    path: "/views/projectSpecification/codeSpecification/javaScriptCode",
                },
                {
                    title: "CSS 规范",
                    path: "/views/projectSpecification/codeSpecification/cssCode",
                },
                {
                    title: "HTML 规范",
                    path: "/views/projectSpecification/codeSpecification/htmlCode",
                }
            ]
        },
    ],
    // 学习
    '/views/studyPage': [
        {
            title: '学习',
            collapsable: true,
            children: [
                {
                    title: "Markdown 基础语法",
                    path: "/views/studyPage/markdownStudy",
                },
                {
                    title: "JavaScript 正则基本语法",
                    path: "/views/studyPage/regularExpression",
                },
                {
                    title: "Vue2 学习笔记",
                    path: "/views/studyPage/vueV2Study",
                },
                {
                    title: "Vue3 学习笔记",
                    path: "/views/studyPage/vueV3Study",
                },
                {
                    title: "GitHub Pages 博客搭建",
                    path: "/views/studyPage/githubPages",
                },
                {
                    title: "App 开发",
                    collapsable: true,
                    children: [
                        {
                            title: "Dart 语言基础",
                            path: "/views/studyPage/appDev/dartStudy",
                        },
                        {
                            title: "Flutter 开发入门",
                            path: "/views/studyPage/appDev/flutterStudy",
                        },
                    ],
                },
                {
                    title: "express学习文档",
                    collapsable: true,
                    children: [
                        {
                            title: "简单的express服务",
                            path: "/views/studyPage/express/expressDemo",
                        },
                        {
                            title: "express 中间件",
                            path: "/views/studyPage/express/expressMiddleware",
                        },
                        {
                            title: "express 路由中间件",
                            path: "/views/studyPage/express/expressRoute",
                        },
                    ],
                },
            ],
        }
    ],
    // 问题记录
    '/views/ProblemRecord': [
        {
            title: '问题记录',
            collapsable: true,
            children: [
                {
                    title: "JavaScript 相关",
                    path: "/views/ProblemRecord/JavaScriptAbout",
                },
                {
                    title: "Vue 相关",
                    path: "/views/ProblemRecord/VueAbout",
                },
                {
                    title: "CSS 相关",
                    path: "/views/ProblemRecord/CssAbout",
                },
                {
                    title: "HTML 相关",
                    path: "/views/ProblemRecord/HtmlAbout",
                },
            ],
        }
    ],

}
