---
title: HTML 问题记录
description: 记录所遇到的HTML相关问题
date: 2026-02-12 07:52
author: Maple
---

## 语义化标签问题

### 常用语义化标签

| 标签 | 用途 |
|------|------|
| `<header>` | 头部区域 |
| `<nav>` | 导航区域 |
| `<main>` | 主内容区 |
| `<article>` | 文章内容 |
| `<section>` | 章节区块 |
| `<aside>` | 侧边栏 |
| `<footer>` | 底部区域 |
| `<figure>` | 插图/图表 |
| `<time>` | 时间日期 |

### 正确使用示例

```html
<!-- ❌ 滥用 div -->
<div class="header">导航</div>
<div class="content">主要内容</div>
<div class="footer">底部</div>

<!-- ✅ 使用语义化标签 -->
<header>导航</header>
<main>主要内容</main>
<footer>底部</footer>
```

---

## 表单问题

### label 关联

```html
<!-- ❌ 没有关联 -->
<input type="text" id="username">
<span>用户名</span>

<!-- ✅ 正确关联 -->
<label for="username">用户名</label>
<input type="text" id="username">

<!-- ✅ 或使用 label 包裹 -->
<label>
    用户名
    <input type="text">
</label>
```

### 表单提交按钮

```html
<!-- ❌ 提交按钮类型 -->
<button>提交</button>  <!-- 默认 type="submit" -->

<!-- ✅ 明确指定类型 -->
<button type="submit">提交</button>
<button type="button">普通按钮</button>
<button type="reset">重置</button>
```

---

## 图片问题

### alt 属性

```html
<!-- 有意义的图片 -->
<img src="avatar.jpg" alt="用户头像">

<!-- 装饰性图片 -->
<img src="decoration.png" alt="">

<!-- ✅ 不需要 alt -->
```

### 图片加载失败

```html
<!-- 使用占位符或默认图 -->
<img src="image.jpg"
     alt="描述"
     onerror="this.src='/default.jpg'">
```

---

## 链接问题

### 外部链接安全

```html
<!-- ✅ 添加安全属性 -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
    外部链接
</a>
```

### 下载链接

```html
<a href="/files/document.pdf" download="文档.pdf">
    下载 PDF
</a>
```

---

## SEO 相关问题

### meta 标签

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="页面描述，150字符以内">
    <meta name="keywords" content="关键词1, 关键词2">
    <meta name="author" content="作者名">
    <title>页面标题</title>
</head>
```

### h 标题层级

```html
<!-- ✅ 按层级使用，不要跳级 -->
<h1>主题</h1>
<h2>大章节</h2>
<h3>小节</h3>
<h4>子小节</h4>
```

---

## 可访问性问题

### ARIA 属性

```html
<!-- 无障碍标签 -->
<button aria-label="关闭">×</button>

<!-- 状态提示 -->
<div role="alert" aria-live="polite">
    操作成功
</div>

<!-- 表单错误提示 -->
<input type="text" aria-describedby="error-msg">
<div id="error-msg">请输入正确的格式</div>
```

### 键盘导航

```html
<!-- 确保可交互元素可被 focus -->
<a href="#" onclick="doSomething()">点击</a>

<!-- 可使用 tabindex 控制顺序 -->
<div tabindex="0">可聚焦的元素</div>
<div tabindex="-1">可编程聚焦（不可 Tab）</div>
```

---

## script 加载问题

### defer vs async

```html
<!-- 顺序加载，DOM 解析完成后执行 -->
<script defer src="bundle.js"></script>

<!-- 异步加载，执行时阻塞 DOM 解析 -->
<script async src="analytics.js"></script>
```

### 加载顺序

```html
<head>
    <!-- CSS 同步加载 -->
    <link rel="stylesheet" href="styles.css">

    <!-- JS 放在 body 末尾或使用 defer -->
    <script defer src="app.js"></script>
</head>
<body>
    <!-- 内容 -->
</body>
```

---

## DOCTYPE 问题

### HTML5 文档类型

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    ...
</head>
```

###  quirks mode

如果页面没有 DOCTYPE，浏览器会进入怪异模式，导致样式不一致。

---

## viewport 设置

```html
<!-- 移动端必须设置 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- 禁止用户缩放（不推荐）-->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

---

## 标签闭合问题

### 自闭合标签

```html
<!-- 这些标签通常不需要闭合 -->
<img src="..." />
<br />
<input type="text" />
<hr />

<!-- 但闭合也是正确的 -->
<img src="...">
<br>
<input type="text">
```

### 嵌套规则

```html
<!-- ❌ 错误嵌套 -->
<p>段落 <div>块级元素</div> 段落</p>

<!-- ✅ 正确嵌套 -->
<p>段落</p>
<div>块级元素</div>
<p>段落</p>
```

---

## link vs @import

```html
<!-- link（推荐，无阻塞）-->
<link rel="stylesheet" href="styles.css">

<!-- @import（会阻塞加载）-->
<style>
    @import url("styles.css");
</style>
```

---

## 图片格式选择

| 格式 | 用途 | 特点 |
|------|------|------|
| JPEG | 照片 | 有损压缩，体积小 |
| PNG | 图标/透明图 | 无损，支持透明 |
| SVG | 矢量图 | 可缩放，代码体积小 |
| WebP | 通用 | 压缩率高，兼容性稍差 |
| Base64 | 小图标 | 内联代码，体积大 |

```html
<!-- 响应式图片 -->
<img src="small.jpg"
     srcset="small.jpg 480w, medium.jpg 800w, large.jpg 1200w"
     sizes="(max-width: 600px) 480px, 800px"
     alt="描述">

<!-- picture 元素 -->
<picture>
    <source srcset="image.webp" type="image/webp">
    <source srcset="image.jpg" type="image/jpeg">
    <img src="image.jpg" alt="描述">
</picture>
```

---

## 表单验证

### HTML5 原生验证

```html
<input type="text" required minlength="2" maxlength="10">
<input type="email" placeholder="请输入邮箱">
<input type="url" placeholder="请输入网址">
<input type="number" min="1" max="100" step="1">
<input type="tel" pattern="[0-9]{11}">
```

### 自定义验证消息

```javascript
const input = document.querySelector('input');
input.setCustomValidity('请输入正确的手机号');
input.reportValidity();
```
