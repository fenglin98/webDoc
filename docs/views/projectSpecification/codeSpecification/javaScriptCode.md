---
title: JavaScript 规范
date: 2024-02-20
author: Maple 
---

## 1 命名规范

### 1.1 用驼峰形式命名

第一个字母小写，剩下的每个单词的首字母大写。如：

```javascript
const userName = "xxx";
const newUserName = "xxx";
```
<br/>

### 1.2 常量可以采用全大写的形式，但普通的 const 修饰的变量不应该大写

正确示例：

```javascript
const HOURS_IN_DAY = 24;
const USER_AGE = 30;
// 下面这些并不是常量，只是不会被修改的变量，不应该大写
const user = findUser();
const today = new Date();
```

错误示例：

```javascript
const USER = findUser();
const TODAY = new Date();
```
<br/>

### 1.3 两个字母的缩略词都大写，大于两个则改驼峰

正确示例：

```javascript
IO;
AppID;
```
<br/>

### 1.4 下划线是有特定意义的，不要乱用

- 表示私有

```javascript
function User(name) {
  this._id = "123abc"; // 表示私有属性
  this.name = name;
}
User.prototype._getUserId = function() {
  // 表示私有方法
  return this._id;
};

const user = new User("刘能");
user._id; // 刘能
user._getUserId(); // 123abc
```

- 表示系统相关

```javascript
__dirname; // 表示当前文件所在的目录的绝对路径
__filename; // 表示当前文件的绝对路径
```
<br/>

### 1.5 有意义的命名

#### 1.5.1 使用具有描述性的名字

正确示例：

```javascript
    var userId;
    function getUserInfo(){};
    function setUserName(){};
    function deleteUser()();
    // ……
```

#### 1.5.2 用词应尽量精简，无法精简长些也无妨，不能为了精简而放弃语义

正确示例：

```javascript
function findUserById() {}
function findUserByIdOrPhone() {}
function deleteUserById() {}
// ……
```
<br/>

### 1.6 在上下文中保证意义明确

```javascript
    Class Employee {
        constructor (name) {
            this.name = name; // 正确示例
            this.employeeName = name; // 错误示例 因为本身就处在 Employee 这个上下文中，信息冗余
        }
    }

    // 这里在 name 前加 employee 是有必要的，因为已经脱离了 Employee 这个上下文
    const employeeName = new Employee('gavin').name;
```
<br/>

### 1.7 保证动词的统一性

常用的动词有 `get`, `set`, `read,` `create`, `add`, `update`, `reset`, `delete`, `remove`等。

正确示例：

```javascript
getQuestion;
getUserPosts;
getUsers;
```

错误示例：

```javascript
// bad 有很多近意动词，选一个一直用，不要变来变去
getQuestion;
returnUsers;
retrieveUsers;
```
<br/>

### 1.8 函数或方法名尽量采用动词或判断性词汇

函数名一般由一个 `动词` 加一个 `名词` 组成。正确示例：

```javascript
function getFullYear() {} // 取值
function toString() {} // 转换
function isArray() {} // 判断
```
<br/>

### 1.9 布尔值的命名

布尔值一般用`is`, `can`, `has`, `need`等助动词开头，如 `isVisible`, `hasLicense`, `canEvaluate`, `shouldAbort`。返回布尔值的函数或方法，命名规则相同，如 `Array.isArray(arr)`。但这样容易出现函数名和变量名冲突的情况，这个时候可以在函数前加`check`, `get`等区分。正确示例：

```javascript
const hasApple = checkHasApple(fruits, "apple");

// hasApple       是否包含苹果
// checkHasApple  判断是否包含苹果
```
<br/>

### 1.10 数值的命名

首选有意义的简短命名，如 `width`、`length`、`count`，如果没有合适的就采用 `numberOfXXX` `xxxCount` 之类的通用命名。正确示例：

```javascript
width, length, total, maxWidth, numberOfErrors, errorCount;
```
<br/>

### 1.11、类名用名词

正确示例：

```javascript
class Car {}
new User();
class MakeCar {} // 错误 类本来就是一类事物的抽象，加动词干啥
```
<br/>

### 1.12、字典(Map)的命名

正确示例：

```javascript
const usersByID = {
  id12345: { name: "byted", age: 9 },
  // ...
};
```

错误示例：

```javascript
values; // 提供的信息不够充分
keysToValuesMap; // 名字里不要体现类型，类型信息交给 TypeScript
mapOfKeysToValues, mapFromKeysToValues;
```
<br/>

## 2 函数

这里的函数包括类的构造函数和普通函数

### 2.1 函数参数

#### 2.1.1 函数定义的形参尽量不要超过 3 个。当参数个数超过 3 个时，第 3 个参数请设置为一个配置对象

同时将常用的形参放在前两个形参中。设置为配置对象也有利于后续的函数参数扩展时对旧版本的兼容。  
例如：获取一个 websocket 连接实例的方法，一般只要传入链接的地址和 token 即可，至于其他的数据传输要是否要采用二进制传输，数据是否要先进行一层加密，都可以当作是配置项，同时在函数内部定义好这些配置项的默认值。
正确示例：

```javascript
function getWebsocketInstance(
  url,
  token,
  config = { binary: true, encrypt: true }
) {
  //...
}
```

错误示例：

```javascript
	function getWebsocketInstance(url,t oken, binary=true, encrypt=true){
        //...
    }
```
<br/>

### 2.2 函数的执行上下文对象

这里的函数执行上下文对象就是通常的 this 指针的指向对象。

#### 2.2.1 当函数提供了类型为函数的形参时，应同时提供一个形参来作为函数的执行上下文

正确示例:

```javascript
function emit(
  eventName: string,
  data: any,
  config: { callBack: () => void, context: any }
) {
  // ...
  if (config && config.callBack) {
    config.callBack.call(config.context);
  }
}
```

错误示例：

```javascript
function emit(eventName: string, data: any, config: { callBack: () => void }) {
  // ...
  if (config && config.callBack) {
    config.callBack();
  }
}
```
<br/>

### 2.3 函数的返回值

#### 2.3.1 在用 ts 语言编写代码时要注明返回值的类型。

```typescript
function getUserName(): string {
  return "刘能";
}
```

#### 2.3.2 如果函数没有特定的返回值，且函数是某个对象的成员函数或属性时，请返回 this，以便使用者可以实现链式调用。
<br/>

## 3 if/else/for/while/try 语句写法

`if/else/for/while/try` 无论后续跟了单条还是多条语句，都要有小括号、花括号和多行。这样有助于可读性。正确示例：

```javascript
if (condition) {
  doSomething();
}
```

错误示例：

```javascript
if (condition) doSomething();
```

`if` 处理单一异常跳出情况，可省略花括号。

```javascript
if (!condition) return;
```
<br/>

## 4 原生 dom 事件监听

### 4.1 添加 dom 事件监听的方法

- 当需要原生操作`dom的事件监听`时，必须通过`addEventListener`方法添加事件监听函数，禁止通过`on[事件名]`这类方法添加监听函数。因为通过`on[事件名]`添加监听函数，如果添加多次，只会存在最后一个监听函数。在多人协作开发项目中，容易引起不必要的事件处理函数被覆盖的问题。正确示例：

```javascript
const scrollHandler = function(event) {
  // ...
};
element.addEventListener("scroll", scrollHandler, false);
```

错误示例：

```javascript
element.onsrcoll = scrollHandler;
```

- 添加的`dom事件监听函数`，在不需要事件监听时，要及时移除事件的监听，这样有利于页面的性能表现。
<br/>

### 4.2 事件监听处理函数

**Dom 节点的事件监听处理函数和事件分发模型里的事件处理函数不能是匿名函数。**  
这是因为在`removeEventListener`函数和常见的事件分发模型中都会直接拿函数的指针来做两个函数是否相等的比较。如果通过`addEventListener`方法传入的事件处理函数是匿名函数，将无法移除该事件监听。正确示例：

```javascript
const scrollHandler = function(event) {
  // ...
};
element.addEventListener("scroll", scrollHandler, false);
```

错误示例：

```javascript
element.addEventListener(
  "scroll",
  function(event) {
    // ...
  },
  false
);
```
<br/>

### 4.3 批量 dom 节点的事件监听

当需要为批量的节点添加相同的事件监听时，使用事件委托的方式进行事件监听。这样有利于页面的性能表现。  
例如：当需要监听页面上的所有 a 标签的点击事件时， 正确示例：
正确示例：

```javascript
const aHandler = function(e) {
  const tartget = e.target;
  if (target.tagName.toLowerCase() === "a") {
    // ...
  }
};
document.body.addEevetListener("click", aHandler, true);
```

错误示例：

```javascript
const aNodes = document.body.querySelectorAll(“a”);
    aNodes.forEach((aNode)=>{
    aNode.addEevetListener("click",aHandler ,false);
});
```
<br/>

## 5 全局数据

### 5.1 全局数据的添加

- 尽可能避免往全局对象`window`或者`global(node环境)`上添加数据或属性，对这一操作要保持克制。
- 如果不可避免 `上述` 的操作，在添加全局数据之前，要争对项目，建立一个唯一的命名空间或称对象，且一个项目只建立一个这样的对象，后续的数据需要在全局作用域上的存活的，只能添加到该对象上。
<br/>

### 5.2 全局数据的移除

当全局数据不再使用时，应及时消除，避免内存的占用。
<br/>

## 6 尽可能使用严格等式

当编程时已明确知道类型，应使用 `===` 或者 `!==` 精确的比较操作符，避免在判断的过程中，由 `JavaScript` 的强制类型转换所造成的困扰。

```javascript
if (res.code === 200) {
  // ...
}
if (condition !== 1) {
  // ...
}
```
<br/>

## 7 对于修改全局对象的原型链要保持克制

尽可能不修改全局对象的原型链，因为一旦修改，将会在全局范围内起作用，不利于团队协作开发和将来的扩展和对将来可能的需求作出改变。
<br/>

## 8 for 循环在不需要继续遍历时，要使用 return 或 break 及时跳出，避免多余的遍历。

```javascript
for(let i = 0; i < arr.length-1; i ++) {
    if(!arr[i].result) {
        condition(arr[i]);
        break；
    }
}
```
<br/>

## 9 switch 必须添加 default,case 根据元素的出现频繁程度，越频繁的元素写在越前面。
