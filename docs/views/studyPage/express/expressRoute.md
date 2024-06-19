---
title: express路由中间件
date: 2024-05-06
author: Maple
tags:
 - express
categories:
 - express
---

路由（Routing）是由一个 URI（或者叫路径）和一个特定的 `HTTP` 方法（GET、POST 等） 组成的，涉及到应用如何响应客户端对某个网站节点的访问
<br/>

## 路由中间件实现路由

```javascript
const app = express();

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

app.listen(3000, () => {
    console.log("express server start");
});
```
> 接口数量较多时，代码不好管理。可以内置中间件`express.Router()`进行拆分，以便于管理。
<br/>

## express.Router()
`express`中的`Router`作用就是为了方便我们更好的根据路由去分模块。避免将所有路由都写在入口文件中

### 简单使用Router

```javascript
const express = require("express");

const app = express();

//创建路由实例，我们可以在该实例上自由的添加路由
const usersRouter = express.Router();
const orderRouter = express.Router();

//注意这时候再加路由，就可以不带前面的/users路径了
// http://localhost:3000/order
usersRouter.get("/", function (req, res) {
    res.send("用户首页");
});

// http://localhost:3000/order/123  
usersRouter.get("/:id", (req, res) => {
    res.send(`${req.params.id} 用户信息`);
});

//注意这时候再加路由，就可以不带前面的/order路径了
// http://localhost:3000/user
orderRouter.get("/", (req, res) =>{
    res.send("订单首页");
});

// http://localhost:3000/user/123
orderRouter.get("/:id", (req, res) => {
    res.send(`${req.params.id} 订单信息`);
});

//添加两个路由到应用上
app.use("/user", usersRouter);
app.use("/order", orderRouter);

app.listen(3000, () => {
    console.log("express server start");
});
```
<br/>

### 划分文件使用

server.js文件
```javascript
const express = require("express");

const app = express();

app.use("/api/user", require("./router/user"));
app.use("/api/order", require("./router/order"));

app.use((err, req, res, next) => {
    if (err) return res.status(500).json({ msg: "服务器内部错误", err });
    res.send("404 ");
});

app.listen(3000, () => {
    console.log("express server start");
});
```

创建一个routes目录，专门用于放置路由文件，通过`module.exports`导出供外部使用。  
* users.js的代码：
```javascript
const express = require("express");

let router = express.Router();

// 定向 /api/user/:id/order 到 /api/order
router.use("/:id/order", require("./order"));

router.get("/", (req, res) => {
    res.send("用户首页");
});

router.get("/:id", (req, res) => {
    res.send(`${req.params.id} 用户信息`);
});

//导出该路由
module.exports = router;
```

* order.js的代码：
```javascript
const express = require("express");

let router = express.Router();

router.get("/", (req, res) => {
    res.send("订单首页");
});

router.get("/:id", (req, res) => {
    res.send(`${req.params.id} 订单信息`);
});

//导出该路由
module.exports = router;
```
> `Router`是可以嵌套的，如果你想划分的更细，一个子路由还以引用子子路由，不断分下去。
<br/>

### 动态路由配置
```javascript
router.get("/:id", (req, res) => {
    console.log(req.params)
    res.send(`${req.params.id}`);
});
```
<br/>

### 路由的正则匹配
```javascript
router.get("/ab*cd", (req, res) => {
    res.send(`${req.method}`);
});
```
<br/>

## 获取请求参数

### 获取动态路由参数
```javascript
router.get("/:id", (req, res) => {
    console.log(req.params)
    res.send(`${req.params.id}`);
});
```
<br/>

### 获取get请求方式参数
> `GET` 请求的参数在`URL`中，在原生`Node`中，需要使用url模块来识别参数字符串。在`Express`中，不需要使用url模块了。可以直接使用`req.query`对象。
```javascript
// http://localhost:3000/login?name=123&pwd=321
router.get("/login", (req, res) => {
    console.log(req.query); // { name: '123', pwd: '321' }
    res.send(JSON.stringify(req.body));
});
```
<br/>

### 获取post请求参数
> `POST`请求在`express`中不能直接获得，可以使用`body-parser`模块。使用后，将可以用`req.body`得到参数。但是如果表单中含有文件上传，那么还是需要使用`multiparty`模块。

```bash
$ npm install body-parser
```
使用`req.body`获取post过来的参数
```javascript
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use((req, res) => {
    res.end(JSON.stringify(req.body));
});
```
<br/>

## 获取请求其他内容
```javascript
router.use((req, res, next) => {
    console.log(req.url); // 请求路径
    console.log(req.method); // 请求方式
    console.log(req.headers); // 请求头
    // ……
    next();
});
```
