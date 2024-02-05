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
        ],
    },
    ],
    // 开发规范 
    '/views/projectSpecification':[
    {
        title: "git规范",
        collapsable: true,
        children:[
        {   title: "git 操作流程",
            path: "/views/projectSpecification/gitRelated/gitProcess",
        }
        ]
    }
]
}
