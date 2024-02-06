module.exports = [
    { text: 'Home', link: '/' },
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
        ],
    },
    {
        text: '开发规范',
        items: [
           {
            text:'git 操作流程',
            link:'/views/projectSpecification/gitRelated/gitProcess'
           }
        ],
    },
    {
        text: '学习',
        items: [
            {
                text: "Markdown 基础语法",
                link: "/views/studyPage/markdownStudy",
            },
        ],
    },
]