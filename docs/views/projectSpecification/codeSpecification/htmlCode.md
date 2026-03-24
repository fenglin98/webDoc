---
title: html 编写规范
date: 2026-02-01 20:00
author: Maple
tags:
  - html
categories:
  - html
---

## 1 HTML 编写原则

### 1.1 文档结构

- HTML 文档必须包含 DOCTYPE 声明，推荐使用 HTML5 标准 `<!DOCTYPE html>`
- html 标签应设置 lang 属性，指定文档语言，如 `<html lang="zh-CN">`
- head 标签中应包含正确的字符编码、视口设置、标题等必要元素

正确示例：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>页面标题</title>
</head>
<body></body>
</html>
```

### 1.2 尽可能减少页面上的标签数量

### 1.3 多利用 :before、:after 等伪元素等可能的实现手段来代替

### 1.4 尽可能的减少标签的嵌套

要牢记浏览器在解析一个标签时只有碰到标签的结束标记才有可能将该标签在页面上渲染呈现出来。某个标签越快在页面上呈现出来，标签里的内容就要写得越简单。

<br/>

## 2 语义化标签

### 2.1 使用语义化标签替代无语义的 div

根据内容的含义选择合适的标签，增强代码可读性和可访问性：

| 语义标签 | 适用场景 |
|----------|----------|
| `<header>` | 页面或区块的头部 |
| `<nav>` | 导航栏 |
| `<main>` | 主内容区 |
| `<article>` | 文章或独立内容 |
| `<section>` | 文档区块 |
| `<aside>` | 侧边栏 |
| `<footer>` | 页面或区块的底部 |
| `<figure>` | 插图、图表 |
| `<time>` | 时间或日期 |

正确示例：

```html
<header>
    <nav>
        <ul>
            <li><a href="/">首页</a></li>
            <li><a href="/about">关于</a></li>
        </ul>
    </nav>
</header>
<main>
    <article>
        <header>
            <h1>文章标题</h1>
            <time datetime="2026-03-15">2026年3月15日</time>
        </header>
        <p>文章内容...</p>
    </article>
</main>
```

### 2.2 表单元素使用 label 标签关联

正确示例：

```html
<label for="username">用户名</label>
<input type="text" id="username" name="username">
```

<br/>

## 3 图片与媒体

### 3.1 alt 属性

- 有意义的图片应提供描述性的 alt 属性
- 装饰性图片可使用空的 alt 属性 `alt=""`
- 如 alt 属性为空，可以直接删除

正确示例：

```html
<img src="avatar.jpg" alt="用户头像">
<img src="decorative.png" alt="">
```

### 3.2 响应式图片

使用 srcset 和 sizes 属性提供不同分辨率的图片：

```html
<img src="small.jpg"
     srcset="small.jpg 480w, medium.jpg 800w, large.jpg 1200w"
     sizes="(max-width: 600px) 480px, (max-width: 900px) 800px, 1200px"
     alt="描述">
```

<br/>

## 4 脚本与样式

### 4.1 尽量不在元素上使用 style 属性

可使用 class 类名来设置样式，保持样式与结构分离。

### 4.2 脚本加载

- 将 script 标签放在 body 结束标签前，避免阻塞页面渲染
- 对于不需要立即执行的脚本，添加 defer 或 async 属性：

```html
<!-- 顺序加载，DOM解析完成后执行 -->
<script defer src="bundle.js"></script>

<!-- 异步加载，执行时阻塞DOM解析 -->
<script async src="analytics.js"></script>
```

### 4.3 样式链接

```html
<link rel="stylesheet" href="styles.css">
```

<br/>

## 5 SEO 基础

### 5.1 标题标签

- 每个页面应只有一个 h1 标签
- 标题应按层级使用，避免跳过等级：

```html
<h1>主题</h1>
<h2>大章节</h2>
<h3>小节</h3>
```

### 5.2 meta 标签

```html
<meta name="description" content="页面描述，控制在150字符以内">
<meta name="keywords" content="关键词1, 关键词2">
<meta name="author" content="作者名">
```

### 5.3 链接

- 外部链接添加 rel="noopener noreferrer" 防止安全漏洞：

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">外部链接</a>
```

<br/>

## 6 可访问性（a11y）

### 6.1 键盘导航

- 确保所有可交互元素可以通过键盘访问
- 使用 tabindex 控制焦点顺序：

```html
<button type="button">可点击</button>
<a href="/page">可链接</a>
```

### 6.2 颜色对比度

文本与背景的颜色对比度应满足 WCAG 标准（至少 4.5:1）。

### 6.3 ARIA 属性

在语义化标签不足以表达含义时，使用 ARIA 属性：

```html
<button aria-label="关闭" type="button">×</button>
<div role="alert" aria-live="polite">提示信息</div>
```

<br/>

## 7 代码风格

### 7.1 缩进

使用 2 个空格进行缩进，保持代码整洁。

### 7.2 引号

属性值使用双引号：

```html
<input type="text" name="username">
```

### 7.3 自闭合标签

使用斜杠结尾（可选，但保持一致）：

```html
<img src="image.jpg" alt="描述" />
<br />
```