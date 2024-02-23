module.exports = [
    { text: 'Home', link: '/' },
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
            text:'git 操作流程',
            link:'/views/projectSpecification/gitRelated/gitProcess'
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
        ],
    },
]