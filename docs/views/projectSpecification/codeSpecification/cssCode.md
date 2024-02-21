---
title: CSS 编写规范
date: 2024-02-20
author: Maple
tags:
  - CSS
categories:
  - CSS
---

## 1 命名规范

### 1.1 长名称或词组可以使用中横线来连接

```html
<ul class="list">
  <li class="list-item">
    <span class="list-item-left"></span>
    <span class="list-item-right"></span>
  </li>
</ul>
```

### 1.2 不使用“\_”下划线来命名

### 1.3 尽量不采用缩略词，采用完整的有意义的单词，禁止采用中文拼音和中文拼音缩写。

### 1.4 一律采用小写英文字母或数字，不以数字和 - 开头。

## 2 CSS 属性书写顺序

- 按以下顺序书写：
  - 1.位置属性(position, top, right, z-index, display, float 等)
  - 2.大小(width, height, padding, margin)
  - 3.文字系列(font, line-height, letter-spacing, color- text-align 等)
  - 4.背景(background, border 等)
  - 5.其他(animation, transition 等)

> 原则就是会触发重排（或称回流 reflow）的属性要写在触发重绘（repaint）的属性前面。因为重排步骤会包括重绘。


## 3 CSS书写原则

### 3.1 不随意使用id

`id` 在 `css` 中是唯一的，不能多次使用，而使用 `class` 类选择器却可以重复使用，另外 `id` 的优先级优先与`class`，所以id应该按需使用，而不能滥用。使用前，要对项目的中的id命名进行统筹规划，例如：可以以模块为划分，在每个 `id` 名字前加`项目前缀和模块前缀`。


### 3.2 禁止在ID选择器前面进行嵌套或写附加的选择器


### 3.3 尽量减少使用 !important 来强制覆盖样式	


### 3.4 为元素添加 z-index 前请先进行 z-index 的分层规划。	

### 3.5 尽量利用 css 继承。


## 4 简单样式效果可由CSS实现


#### 三角形

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
.triangle-topleft {
  width: 0;
  height: 0;
  border-top: 40px solid red;
  border-right: 40px solid transparent;
}
.triangle-topright {
  width: 0;
  height: 0;
  border-top: 40px solid red;
  border-left: 40px solid transparent;
}
.triangle-bottomleft {
  width: 0;
  height: 0;
  border-bottom: 40px solid red;
  border-right: 40px solid transparent;
}
.triangle-bottomright {
  width: 0;
  height: 0;
  border-bottom: 40px solid red;
  border-left: 40px solid transparent;
}
```

<style>
 .triangle-list{
      display:flex;
      align-items: center;
          flex-wrap: wrap;
    list-style: none;
  }
  .triangle-list li{
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 10px;
    padding: 15px 10px;
    align-items: center;
       
  }
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
  .triangle-topleft {
    width: 0;
    height: 0;
    border-top: 40px solid red;
    border-right: 40px solid transparent;
  }
  .triangle-topright {
    width: 0;
    height: 0;
    border-top: 40px solid red;
    border-left: 40px solid transparent;
  }
  .triangle-bottomleft {
    width: 0;
    height: 0;
    border-bottom: 40px solid red;
    border-right: 40px solid transparent;
  }
  .triangle-bottomright {
    width: 0;
    height: 0;
    border-bottom: 40px solid red;
    border-left: 40px solid transparent;
  }
</style>
<ul class="triangle-list">
    <li>
      <span>triangle-up</span>
      <div class="triangle-up"></div>      
    </li>
     <li>
      <span>triangle-down</span>
      <div class="triangle-down"></div>      
    </li>
     <li>
      <span>triangle-left</span>
      <div class="triangle-left"></div>      
    </li>
     <li>
      <span>triangle-right</span>
      <div class="triangle-right"></div>      
    </li>
     <li>
      <span>triangle-topleft</span>
      <div class="triangle-topleft"></div>      
    </li>
     <li>
      <span>triangle-topright</span>
      <div class="triangle-topright"></div>      
    </li>
     <li>
      <span>triangle-bottomleft</span>
      <div class="triangle-bottomleft"></div>      
    </li>
     <li>
      <span>triangle-bottomright</span>
      <div class="triangle-bottomright"></div>      
    </li>
</ul>

#### 阴影

- 基本用法

```css
.shadow-rightBottom {
  box-shadow: 2px 2px 5px #000;
}
.shadow-all {
  box-shadow: 0px 0px 10px #000;
}
```

<style>
.shadow-list{
    display:flex;
    align-items: center;
    flex-wrap: wrap;
    list-style: none;
}
.shadow-list li{
    width:100px;
    height:100px;
    background: #8080805c;
    border-radius: 15px;
    margin-right:20px;
}
.shadow-rightBottom {
    box-shadow:2px 2px 5px #000;
}
.shadow-all {
   box-shadow:0px 0px 10px #000;
}
.shadow-inset {
   box-shadow:inset 2px 2px 5px #000;
}
.shadow-bottom {
  box-shadow:0px 15px 10px -15px #000;
}
.shadow-insetTop {
 box-shadow:inset 0px 15px 10px -15px #000;
}
</style>
<ul class="shadow-list">
    <li class="shadow-rightBottom"></li>
    <li class="shadow-all"></li>
</ul>

- 内阴影

```css
box-shadow: inset 2px 2px 5px #000;
```

<ul class="shadow-list">
    <li class="shadow-inset"></li>
</ul>

- 底部阴影

```css
box-shadow: 0px 15px 10px -15px #000;
```

<ul class="shadow-list">
    <li class="shadow-bottom"></li>
</ul>

- 顶部阴影

```css
box-shadow: inset 0px 15px 10px -15px #000;
```

<ul class="shadow-list">
    <li class="shadow-insetTop"></li>
</ul>

- 伪元素::before 和::after 的乐趣
  使用伪元素::before 和::after，我们能创造出非常逼真的只有图片才能实现的阴影效果

```html
<style>
  .shadow {
    width: 300px;
    height: 100px;
    background: #ccc;
    border-radius: 15px;
    margin: 10px;
    position: relative;
    max-width: 270px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3), 0px 0px 20px rgba(0, 0, 0, 0.1) inset;
  }

  .shadow::before,
  .shadow::after {
    content: "";
    position: absolute;
    z-index: -1;
  }

  .shadow::before,
  .shadow::after {
    content: "";
    position: absolute;
    z-index: -1;
    bottom: 15px;
    left: 10px;
    width: 50%;
    height: 20%;
  }

  .shadow::before,
  .shadow::after {
    content: "";
    position: absolute;
    z-index: -1;
    bottom: 15px;
    left: 10px;
    width: 50%;
    height: 20%;
    box-shadow: 0 15px 10px rgba(0, 0, 0, 0.7);
    transform: rotate(-3deg);
  }

  .shadow::after {
    right: 10px;
    left: auto;
    transform: rotate(3deg);
  }
</style>
<div class="shadow"></div>
```

<style>
  .shadow {
    width: 300px;
    height: 100px;
    background: #ccc;
    border-radius: 15px;
    margin: 10px;
    position: relative;
    max-width: 270px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3), 0px 0px 20px rgba(0, 0, 0, 0.1) inset;
  }

  .shadow::before,
  .shadow::after {
    content: "";
    position: absolute;
    z-index: -1;
  }

  .shadow::before,
  .shadow::after {
    content: "";
    position: absolute;
    z-index: -1;
    bottom: 15px;
    left: 10px;
    width: 50%;
    height: 20%;
  }

  .shadow::before,
  .shadow::after {
    content: "";
    position: absolute;
    z-index: -1;
    bottom: 15px;
    left: 10px;
    width: 50%;
    height: 20%;
    box-shadow: 0 15px 10px rgba(0, 0, 0, 0.7);
    transform: rotate(-3deg);
  }

  .shadow::after {
    right: 10px;
    left: auto;
    transform: rotate(3deg);
  }
</style>
<div class="shadow"></div>

#### 渐变

- 基础线性渐变（从上往下）

```css
background: linear-gradient(blue, pink);
```

<style>
    .gradient1{
        width: 100px;
        height: 100px;
        background: linear-gradient(blue, pink);
    }
</style>
<div class="gradient1"></div>

- 指定方向线性渐变

```css
background: linear-gradient(to right, blue, pink);
```

<style>
    .gradient2{
        width: 200px;
        height: 100px;
        background: linear-gradient(to right, blue, pink);
    }
</style>
<div class="gradient2"></div>

- 对角线线性渐变

```css
background: linear-gradient(to bottom right, blue, pink);
```

<style>
    .gradient3{
        width: 200px;
        height: 100px;
        background: linear-gradient(to bottom right, blue, pink);
    }
</style>
<div class="gradient3"></div>

- 设置渐变角度

```css
background: linear-gradient(70deg, blue, pink);
```

<style>
    .gradient4{
        width: 200px;
        height: 100px;
        background: linear-gradient(70deg, blue, pink);
    }
</style>
<div class="gradient4"></div>

- 多色渐变

```css
background: linear-gradient(red, yellow, blue, orange);
```

<style>
    .gradient5{
        width: 100px;
        height: 150px;
        background: linear-gradient(red, yellow, blue, orange);
    }
</style>
<div class="gradient5"></div>
