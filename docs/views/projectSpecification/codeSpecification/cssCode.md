---
title: CSS 编写规范
date: 2026-03-15
author: Maple
tags:
  - CSS
categories:
  - CSS
---

## 1 命名规范

### 1.1 长名称或词组使用中横线连接

```css
.list-item { }
.list-item-left { }
.list-item-right { }
.header-nav { }
.content-wrapper { }
```

### 1.2 不使用下划线命名

下划线容易与 CSS 伪类混淆，且大多数 CSS 规范都采用中横线。

### 1.3 使用完整有意义的单词

- 采用完整单词，避免缩写
- 禁止使用中文拼音或拼音缩写

正确示例：

```css
.page-container { }
.sidebar-wrapper { }
.user-avatar { }
```

错误示例：

```css
.page-cc { }    /* 缩写不明确 */
.zt { }         /* 中文拼音 */
.ren-name { }   /* 拼音缩写 */
```

### 1.4 命名格式

- 一律采用小写英文字母或数字
- 不以数字开头
- 使用中横线 `-` 连接

## 2 CSS 属性书写顺序

按以下顺序书写 CSS 属性：

1. **位置属性**：`position`, `top`, `right`, `bottom`, `left`, `z-index`
2. **显示属性**：`display`, `float`, `clear`, `overflow`
3. **盒子模型**：`width`, `height`, `padding`, `margin`, `border`
4. **文字属性**：`font`, `line-height`, `letter-spacing`, `color`, `text-align`
5. **背景装饰**：`background`, `border-radius`, `box-shadow`
6. **变换动画**：`transform`, `transition`, `animation`
7. **其他属性**：`opacity`, `cursor`, `pointer-events`

> 原则：触发重排（reflow）的属性写在触发重绘（repaint）的属性前面。

正确示例：

```css
.modal {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1000;

    display: none;
    width: 400px;
    height: 300px;
    padding: 20px;
    margin: -150px 0 0 -200px;
    border: 1px solid #ddd;
    border-radius: 8px;

    font-size: 14px;
    line-height: 1.5;
    color: #333;
    text-align: center;

    background: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

    transition: opacity 0.3s ease;
}
```

## 3 选择器规范

### 3.1 不随意使用 id

- id 在 CSS 中是唯一的，不能重复使用
- id 的优先级高于 class，滥用会增加调试难度
- 使用 class 类选择器更灵活、可复用

### 3.2 禁止在 ID 选择器前嵌套或添加附加选择器

正确示例：

```css
#header { }
#header .nav { }
```

错误示例：

```css
div#header { }      /* 不必要的嵌套 */
.header-logo#logo { }  /* 不必要的限定 */
```

### 3.3 控制选择器权重

- 避免使用 `!important`
- 通过合理的层级规划解决样式冲突
- 优先使用后代选择器而非子选择器

### 3.4 选择器嵌套层级

- 嵌套层级不超过 4 层
- 优先使用 BEM 命名规范减少嵌套

BEM 命名示例：

```css
.article { }
.article__title { }
.article__content { }
.article__item--highlight { }
```

## 4 CSS 书写原则

### 4.1 z-index 分层规划

在使用 z-index 前先进行分层规划：

| 层级 | 用途 | 范围 |
|------|------|------|
| 基础层 | 普通文档流 | 0 |
| 内容层 | 页面主要内容 | 1-100 |
| 悬浮层 | 下拉菜单、工具提示 | 101-200 |
| 弹窗层 | 模态框、弹窗 | 201-300 |
| 遮罩层 | 背景遮罩 | 301-400 |
| 最高层 | 提示消息、加载动画 | 401+ |

### 4.2 利用 CSS 继承

将相同样式提取到父元素，让子元素继承：

```css
.article {
    font-family: 'Helvetica Neue', sans-serif;
    color: #333;
}
.article__title {
    font-size: 18px;  /* 独有样式 */
    font-weight: bold;
}
```

### 4.3 避免使用 * 通配符

通配符会增加 CSS 匹配计算开销：

正确示例：

```css
body, h1, h2, h3, p {
    margin: 0;
    padding: 0;
}
```

错误示例：

```css
* {
    margin: 0;
    padding: 0;
}
```

## 5 Flexbox 布局规范

### 5.1 flex 容器属性

```css
.container {
    display: flex;
    flex-direction: row | column;      /* 主轴方向 */
    justify-content: flex-start | center | space-between; /* 主轴对齐 */
    align-items: stretch | center | flex-start;         /* 交叉轴对齐 */
    flex-wrap: nowrap | wrap;          /* 换行 */
    gap: 10px;                         /* 间距 */
}
```

### 5.2 flex 子元素属性

```css
.item {
    flex-grow: 0;    /* 放大比例 */
    flex-shrink: 1;  /* 缩小比例 */
    flex-basis: auto; /* 初始大小 */
    flex: 1;        /* 简写 */

    align-self: center; /* 单独对齐 */
}
```

## 6 Grid 布局规范

### 6.1 网格容器

```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);  /* 三列等宽 */
    grid-template-rows: auto 1fr auto;      /* 行高设置 */
    gap: 20px;                               /* 网格间距 */

    /* 命名网格线 */
    grid-template-areas:
        "header header header"
        "sidebar main main"
        "footer footer footer";
}
```

### 6.2 网格子元素

```css
.header {
    grid-area: header;
}
.sidebar {
    grid-area: sidebar;
}
.main {
    grid-area: main;
}
```

## 7 响应式设计

### 7.1 媒体查询断点

```css
/* 移动端优先 */
/* 小屏幕 */
@media (min-width: 576px) { }

/* 中等屏幕 */
@media (min-width: 768px) { }

/* 大屏幕 */
@media (min-width: 992px) { }

/* 超大屏幕 */
@media (min-width: 1200px) { }
```

### 7.2 移动端优先 vs 桌面端优先

移动端优先（推荐）：

```css
.column {
    display: flex;
    flex-direction: column;
}

@media (min-width: 768px) {
    .column {
        flex-direction: row;
    }
}
```

### 7.3 使用 rem 而非 px

```css
html {
    font-size: 16px;  /* 基准值 */
}

@media (max-width: 768px) {
    html {
        font-size: 14px;  /* 移动端适当缩小 */
    }
}

.element {
    width: 2rem;  /* 32px */
    padding: 0.5rem;  /* 8px */
}
```

## 8 CSS 变量

### 8.1 定义与使用

```css
:root {
    /* 颜色 */
    --color-primary: #1890ff;
    --color-success: #52c41a;
    --color-danger: #ff4d4f;

    /* 字体 */
    --font-size-base: 14px;
    --font-size-lg: 16px;

    /* 间距 */
    --spacing-base: 8px;
    --spacing-lg: 16px;

    /* 圆角 */
    --border-radius: 4px;
}

.button {
    background: var(--color-primary);
    padding: var(--spacing-base) var(--spacing-lg);
    border-radius: var(--border-radius);
}
```

### 8.2 主题切换

```css
[data-theme="dark"] {
    --color-bg: #1a1a1a;
    --color-text: #fff;
}

[data-theme="light"] {
    --color-bg: #fff;
    --color-text: #333;
}
```

## 9 常用样式技巧

### 9.1 三角形

```css
.triangle-up {
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 40px solid red;
}
.triangle-down {
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 40px solid red;
}
.triangle-left {
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-right: 40px solid red;
    border-bottom: 20px solid transparent;
}
.triangle-right {
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-left: 40px solid red;
    border-bottom: 20px solid transparent;
}
```

### 9.2 阴影效果

```css
/* 四周阴影 */
.shadow-all {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* 右下阴影 */
.shadow-rightBottom {
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}

/* 内阴影 */
.shadow-inset {
    box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.1);
}

/* 底部阴影 */
.shadow-bottom {
    box-shadow: 0 15px 10px -15px rgba(0, 0, 0, 0.1);
}

/* 顶部内阴影 */
.shadow-insetTop {
    box-shadow: inset 0 -15px 10px -15px rgba(0, 0, 0, 0.1);
}
```

### 9.3 渐变

```css
/* 线性渐变 - 上下 */
.gradient-vertical {
    background: linear-gradient(blue, pink);
}

/* 线性渐变 - 左右 */
.gradient-horizontal {
    background: linear-gradient(to right, blue, pink);
}

/* 对角线渐变 */
.gradient-diagonal {
    background: linear-gradient(to bottom right, blue, pink);
}

/* 角度渐变 */
.gradient-angle {
    background: linear-gradient(70deg, blue, pink);
}

/* 多色渐变 */
.gradient-multi {
    background: linear-gradient(red, yellow, blue, orange);
}

/* 径向渐变 */
.gradient-radial {
    background: radial-gradient(circle, blue, pink);
}
```

### 9.4 文字溢出省略

```css
/* 单行省略 */
.text-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* 多行省略 */
.text-ellipsis-2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
}
```

### 9.5 清除浮动

```css
.clearfix::after {
    content: '';
    display: block;
    clear: both;
}

/* 现代方式 - 使用 flex 或 grid 代替 */
.container {
    display: flex;  /* 不需要清除浮动 */
}
```

### 9.6 居中布局

```css
/* 水平居中 */
.center-h {
    margin-left: auto;
    margin-right: auto;
}

/* 绝对定位居中 */
.center-abs {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

/* Flex 居中 */
.center-flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Grid 居中 */
.center-grid {
    display: grid;
    place-items: center;
}
```

## 10 性能优化

### 10.1 减少重排与重绘

- 批量修改 DOM 样式
- 使用 CSS 变量替代动态计算
- 使用 transform 和 opacity 做动画（不触发重排重绘）

正确示例：

```css
/* 推荐：使用 transform */
.animates-element {
    transition: transform 0.3s ease;
}
.animates-element:hover {
    transform: translateY(-5px);
}

/* 不推荐：会触发重排 */
.animates-element:hover {
    margin-top: -5px;
}
```

### 10.2 使用 will-change

```css
.animated-element {
    will-change: transform;
    transition: transform 0.3s ease;
}
```

### 10.3 避免使用 @import

正确示例：

```html
<link rel="stylesheet" href="base.css">
<link rel="stylesheet" href="components.css">
```

错误示例：

```css
/* base.css 中 */
@import url("components.css");  /* 阻塞加载 */
```

## 11 代码检测

### 11.1 stylelint 配置

```json
{
    "extends": "stylelint-config-standard",
    "rules": {
        "selector-class-pattern": "^[a-z][a-z0-9]*(-[a-z0-9]+)*$",
        "property-no-unknown": true,
        "no-descending-specificity": null,
        "selector-pseudo-class-no-unknown": [
            true,
            {
                "ignorePseudoClasses": ["global"]
            }
        ]
    }
}
```
