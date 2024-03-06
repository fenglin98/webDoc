const nav = require('./public/js/navConfig')
const sidebar = require('./public/js/sidebarConfig')
const plugins =require('./public/js/pluginsConfig')
const head = require('./public/js/headConfig')
module.exports ={
    title:'Maple',
    base:'/webDoc/',
    theme:'reco',
    themeConfig: {
        head,
        nav,
        sidebar,
        subSidebar:'auto', //在所有页面中启用自动生成子侧边栏
        logo: "/img/Maple_icon.png",
        authorAvatar: "/img/Maple_icon.png",
      },
      plugins,
}