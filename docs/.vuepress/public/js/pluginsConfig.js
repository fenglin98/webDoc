module.exports = [
    [
        "vuepress-plugin-zooming",
        {
            selector: ".theme-vdoing-content img:not(.no-zoom)", // 排除class是no-zoom的图片
            options: {
                bgColor: "rgba(0,0,0,0.6)",
            },
        },
    ],
    [
        "@vuepress-reco/vuepress-plugin-kan-ban-niang",
        {
            theme: ['blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'wanko', 'miku', 'z16'],
            clean: false,
        }
    ],
    [
        "one-click-copy",
        {
            // 代码块复制按钮
            copySelector: [
                'div[class*="language-"] pre',
                'div[class*="aside-code"] aside',
            ],
            copyMessage: "复制成功",
            duration: 1000,
            showInMobile: false,
        },
    ],
]