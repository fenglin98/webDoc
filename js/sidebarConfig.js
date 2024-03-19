module.exports = {
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

            ],
        }
    ],
    // 问题记录
    '/views/ProblemRecord':[
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
            ],
        }
    ],
}
