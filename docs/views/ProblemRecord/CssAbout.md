---
title: CSS 问题记录
description: 记录所遇到的CSS相关问题
date: 2026-03-15
author: Maple
---

## 垂直居中问题

### Flexbox 居中（推荐）

```css
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

### Grid 居中

```css
.container {
    display: grid;
    place-items: center;
}
```

### 绝对定位居中

```css
.container {
    position: relative;
}
.box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

---

## 浮动问题

### 清除浮动

```css
/* 方法1: 使用 clear */
.clearfix::after {
    content: '';
    display: block;
    clear: both;
}

/* 方法2: 使用 overflow */
.container {
    overflow: hidden;  /* 或 auto */
}

/* 方法3: 使用 flex（推荐现代方案）*/
.container {
    display: flex;
}
```

---

## 外边距合并

### 垂直外边距合并

相邻块级元素的上下外边距会合并：

```css
/* ❌ 两个元素间距只有 20px，不是 40px */
.box1 { margin-bottom: 20px; }
.box2 { margin-top: 20px; }

/* ✅ 解决方案1: 只设置一个 */
.box1 { margin-bottom: 40px; }

/* ✅ 解决方案2: 使用 padding 替代 */
.box1 { padding-bottom: 20px; }
.box2 { padding-top: 20px; }

/* ✅ 解决方案3: 触发 BFC */
.container {
    overflow: hidden;  /* 或 display: flow-root; */
}
```

---

## Flexbox 问题

### flex: 1 的含义

```css
/* flex: 1 是以下三个属性的简写 */
.item {
    flex-grow: 1;   /* 放大比例 */
    flex-shrink: 1; /* 缩小比例 */
    flex-basis: 0%; /* 基础宽度 */
}
```

### 项目不换行

```css
.container {
    display: flex;
    flex-wrap: nowrap;  /* 默认不换行 */
}
```

### 项目等宽

```css
.container {
    display: flex;
}
.item {
    flex: 1;  /* 所有项目等宽 */
}
```

---

## 盒子模型

### 标准盒模型 vs IE 盒模型

```css
/* 标准盒模型（默认）*/
box-sizing: content-box;  /* width = content */

/* IE 盒模型 */
box-sizing: border-box;   /* width = content + padding + border */
```

### 全局设置

```css
*, *::before, *::after {
    box-sizing: border-box;
}
```

---

## BFC（块级格式化上下文）

### 触发 BFC 的条件

- `overflow` 不为 `visible`
- `display: flow-root` 或 `inline-block`
- `position: absolute` 或 `fixed`
- `float` 不为 `none`

### BFC 的作用

```css
/* 1. 包含浮动元素 */
.container {
    overflow: hidden;
}

/* 2. 防止外边距合并 */
.container {
    overflow: hidden;
}

/* 3. 阻止元素被浮动元素覆盖 */
.text {
    overflow: hidden;  /* 或 display: flow-root */
}
```

---

## z-index 层叠问题

### 层叠上下文

以下属性会创建新的层叠上下文：

```css
/* z-index 只在同一层叠上下文内比较 */
.element {
    position: relative;
    z-index: 1;  /* 或任何非 auto 值 */
}
```

### 常见问题

```css
/* ❌ 问题：父元素 z-index 小，子元素再大也没用 */
.parent { position: relative; z-index: 1; }
.child { position: absolute; z-index: 9999; }

/* ✅ 解决方案：提升父元素的 z-index */
.parent { position: relative; z-index: 100; }
```

---

## 图片底部空白

### 原因

行内元素（如 `<img>`）与文字基线对齐，底部会留白。

### 解决方案

```css
/* 方法1: 设置 vertical-align */
img {
    vertical-align: middle;  /* 或 bottom/sub/top */
}

/* 方法2: 设置为块级元素 */
img {
    display: block;
}

/* 方法3: 设置父元素 font-size 为 0 */
.container {
    font-size: 0;
}
```

---

## 点击高亮问题

### 移动端点击高亮

```css
/* 禁用点击高亮 */
.no-select {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    user-select: none;
}
```

---

## CSS 动画性能

### 使用 transform 和 opacity

```css
/* ❌ 会触发重排重绘 */
.animated {
    left: 100px;
    background: red;
}

/* ✅ 只触发合成，性能更好 */
.animated {
    transform: translateX(100px);
    opacity: 0.5;
}
```

### 开启 GPU 加速

```css
.animated {
    transform: translateZ(0);
    /* 或 */
    will-change: transform;
}
```

---

## 响应式布局问题

### 图片响应式

```css
/* 方法1: max-width */
img {
    max-width: 100%;
    height: auto;
}

/* 方法2: object-fit */
img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}
```

### 文字不换行省略

```css
/* 单行省略 */
.text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* 多行省略 */
.text {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
```

---

## CSS 变量问题

### 定义与使用

```css
:root {
    --color-primary: #1890ff;
    --spacing: 8px;
}

.button {
    background: var(--color-primary);
    padding: var(--spacing);
}

/* 带默认值 */
.button {
    padding: var(--spacing, 16px);
}
```

### 主题切换

```css
[data-theme="dark"] {
    --bg: #1a1a1a;
    --text: #fff;
}

.light {
    --bg: #fff;
    --text: #333;
}
```

---

## Flex 项目不收缩

### flex-shrink 默认值

```css
.item {
    flex-shrink: 1;  /* 默认可以收缩 */
}

/* 不允许收缩 */
.item {
    flex-shrink: 0;
}
```

---

## Sticky 定位不生效

### 条件要求

- 父元素不能有 `overflow: hidden/auto`
- 必须设置 top/bottom/left/right 其一
- 父元素高度要大于 sticky 元素高度

```css
.sticky {
    position: sticky;
    top: 0;  /* 必须设置 */
}
```

---

## 样式优先级

### !important 优先级最高

```css
/* ❌ 滥用 !important 难以维护 */
.selector {
    color: red !important;
}

/* ✅ 正确做法：提升选择器优先级 */
.parent .parent .selector {
    color: red;
}
```

### 选择器优先级计算

| 选择器 | 权重 |
|--------|------|
| `*` | 0 |
| 元素/伪元素 | 1 |
| 类/属性/伪类 | 10 |
| ID | 100 |
| 内联样式 | 1000 |
| `!important` | 最高 |
