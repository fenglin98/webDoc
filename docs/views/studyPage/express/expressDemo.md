---
title: 简单的 express 服务
date: 2024-05-06
author: Maple
tags:
  - Express  nodejs
categories: 
  - Express
---

:::tip 简介
`Express` 是一个基于 `Node.js` 平台，快速、开放、极简的 `web` 开发框架，它提供一系 列强大的特性，帮助你创建各种 `Web` 和移动设备应用。
:::
<br/>

## 初始化

初始化项目：
```bash
$ npm init --y
```

英语官网：[http://expressjs.com/](http://expressjs.com/)  
中文官网：[http://www.expressjs.com.cn/](http://www.expressjs.com.cn/)
<br/>

## 安装 express

```bash
 $ cnpm i express --save

 # nodemon 用作监听文件改动启动node服务
 $ cnpm i nodemon --save-dev
```
<br/>

## 实现一个简单服务

```javascript
// app.js

/* 1:引入express第三方对象 */
const express = require("express"); 

/* 2:构建一个服务器对象 */
const server = express();

// 静态文件服务
const path = require("path");
server.use("/public", express.static(path.join(__dirname, "static")))

/* 3:开启服务器监听端口 */
server.listen(3000);

/* 4:处理响应 */
server.use((req,res)=> { 
    res.end("hello world!!"); 
});
```
 <br/>

## 启动服务

```bash
$ nodemon app.js
```
浏览器访问 http://localhost:3000 

<br/>

## static 托管静态文件

```javascript
const express = require("express");
const path = require("path");
const app = express();

app.use("/public", express.static(path.join(__dirname, "static")))

app.listen(3000, () => {
    console.log("express server start");
});
```
> 现在，你就可以通过带有 `/public` 前缀的地址来访问 `static` 目录下 面的文件了。
