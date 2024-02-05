---
title: CSS 样式重置 
date: 2024-02-04
author: Maple 
---

:::tip 重置样式目的
不同的浏览器默认的标签样式存在着差异,CSS重置样式主要就是为了让各个浏览器之间的CSS拥有一个统一的标准。 通过样式重置的方式将浏览器默认的样式进行去除的操作。然后设置一个统一的样式,使得每个浏览器的显示效果相同 
:::

``` css
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {margin: 0;padding: 0;border: 0;font-size: 100%;font: inherit;vertical-align: baseline;}
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {display: block;}
body {line-height: 1;}
ol, ul {list-style: none;}
blockquote, q {quotes: none;}
blockquote:before, blockquote:after,
q:before, q:after {content: '';content: none;}
input,textarea,button,select,a{outline:0 none;border: none;}
button::-moz-focus-inner,input::-moz-focus-inner{padding:0;border:0}
```