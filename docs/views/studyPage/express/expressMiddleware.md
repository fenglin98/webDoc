---
title: express中间件
date: 2024-05-06
author:  Maple
tags:
 - express
categories:
 - express
---

**中间件**是匹配路由之前或者匹配路由完成做的一系列的操作。通俗来说就是请求和响应中间发生的一些`”事“`。  
中间件函数中有三个基本参数，`req`、`res`、`next`：
* `req`：就是请求相关的对象，它和下一个中间件函数中的req对象是一个对象
* `res`：就是响应相关的对象，它和下一个中间件函数中的res对象是一个对象
* `next`：它是一个函数，调用它将会跳出当前的中间件函数，执行后续中间件；
> 如果不调用`next`，也不执行`res.end`，则整个请求都会在当前中间件卡住
<br/>

## 内置中间件 
内置中间件就是express内部本来就有的，无需下载，用的时候直接使用就可以

```javascript
app.use(express.json());
app.use(express.urlencoded());
app.use("/public", express.static("static"));
```
<br/>

## 应用及中间件

```javascript
app.use( do something )
```

> 应用级中间件绑定到 `app` 对象 使用 `app.use()` 和 `app.METHOD()`， 其中`METHOD`是需要处理的 `HTTP` 请求的方法

```javascript
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); //允许跨域
    res.header("Access-control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS"); //请求方式
    // 等等其他操作
    next(); 
});
```
```javascript
// http://localhost:3000/test   get
app.get("/test", (req, res, next) => {
    res.end("get");
});

// http://localhost:3000/test   post
app.post("/test", (req, res, next) => {
    res.end("post");
});

// http://localhost:3000/test   put
app.put("/test", (req, res, next) => {
    res.end("put");
});

// http://localhost:3000/test   delete
app.delete("/test", (req, res, next) => {
    res.end("delete");
});
```
<br/>
 
## 路由级中间件 
路由级中间件和应用级中间件一样，只是它绑定的对象为 `express.Router()`。

路由级使用 `router.use()` 或 `router.METHOD()` 加载。

上述在应用级创建的中间件系统，可通过如下代码改写为路由级

```javascript
const express = require("express");
const app = express();
const router = express.Router();
router.get("/login", (req, res, next) => {
    console.log(req.query);
    res.status(200).json({ result: true, msg: "登录成功！" });
});
app.use("/api/user", router);
app.listen(3000, () => {
    console.log("server start!");
});
```
> 接口数量较多时，代码不好管理。可以进行拆分，以便于管理。具体操作见[路由划分文件使用](./router.html#划分文件使用)
<br/>
## 错误处理中间件 

在express中统一处理错误```next(err)```

```javascript
// 模拟报错
app.get("/error", ()=>{
    throw new Error();
})

app.use((err, req, res, next) => {
    if (err) return res.status(500).json({ msg: "服务器内部错误", err });
    res.send("404 ");
});
```
<br/>

## 第三方中间件

通过使用第三方中间件从而为 `Express` 应用增加更多功能。  
安装所需功能的 `node` 模块，并在应用中加载，可以在应用级加载，也可以在路由级加载。
> 根据实际业务需要，也可以自行封装中间件 `app.use(搞事情)`

```javascript
var express = require("express");
var app = express();
var cookieParser = require("cookie-parser");

// 加载用于解析 cookie 的中间件
app.use(cookieParser());
```
+ res 扩展
```javascript
res.end(); // 快速结束处理流程
res.render(); // 渲染视图模板
res.download('./xxx.txt') // 下载文件
res.json({})  // 发送一个JSON格式的响应
res.jsonp(数据) // 发送一个支持JSONP的JSON格式的响应
res.redirect()  //  重定向请求 301是永久重定向, 302临时重定向
res.send()    // 发送各种类型的响应 可以是一个缓冲区对象，一个字符串，一个单纯的对象或者数组
res.sendFile() // 以八位字节流的形式发送文件
res.status() // 在响应上设置http状态
res.sendStatus() // 设置响应状态代码，并将其以字符串形式作为响应体的一部分发送
```
