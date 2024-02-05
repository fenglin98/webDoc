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
]