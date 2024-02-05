const nav = require('./public/js/navConfig')
const sidebar = require('./public/js/sidebarConfig')
module.exports ={
    title:'Maple',
    base:'/webDoc/',
    theme:'reco',
    themeConfig: {
        nav,
        sidebar,
        subSidebar:'auto'//在所有页面中启用自动生成子侧边栏
      }
}