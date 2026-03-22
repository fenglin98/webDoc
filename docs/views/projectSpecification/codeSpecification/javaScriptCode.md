---
title: JavaScript 规范
date: 2026-03-15
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
    function deleteUser() {};
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
	function getWebsocketInstance(url, token, binary = true, encrypt = true) {
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
element.onscroll = scrollHandler;
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
document.body.addEventListener("click", aHandler, true);
```

错误示例：

```javascript
const aNodes = document.body.querySelectorAll(“a”);
    aNodes.forEach((aNode)=>{
    aNode.addEventListener("click", aHandler, false);
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
        break;
    }
}
```
<br/>

## 9 switch 必须添加 default,case 根据元素的出现频繁程度，越频繁的元素写在越前面。

## 10 注释规范

### 10.1 注释原则

- 注释应该解释「为什么」而不是「是什么」
- 不要添加无意义的注释
- 保持注释与代码同步更新

### 10.2 单行注释

```javascript
// 正确示例：解释原因
// 由于接口返回的时间是 UTC 格式，需要转换
const localTime = new Date(utcTime);

// 错误示例：重复代码内容
// 定义用户ID
const userId = '123';
```

### 10.3 多行注释

```javascript
/**
 * 计算用户年龄
 * @param {Date|string} birthday - 生日日期
 * @returns {number} 年龄
 */
function calculateAge(birthday) {
    // ...
}
```

### 10.4 函数注释

使用 JSDoc 风格：

```javascript
/**
 * 获取用户信息
 * @param {string} userId - 用户ID
 * @param {Object} [options] - 可选配置
 * @param {boolean} [options.includeDetail=false] - 是否包含详细信息
 * @returns {Promise<Object>} 用户信息对象
 */
async function getUserInfo(userId, options = {}) {
    // ...
}
```

## 11 异步编程

### 11.1 优先使用 async/await

正确示例：

```javascript
async function fetchUserData(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('获取用户数据失败:', error);
        throw error;
    }
}
```

### 11.2 Promise 链式调用

```javascript
fetch('/api/user')
    .then(res => res.json())
    .then(data => processData(data))
    .catch(error => handleError(error))
    .finally(() => hideLoading());
```

### 11.3 并行请求

```javascript
// 同时发起多个请求
const [user, posts] = await Promise.all([
    fetch('/api/user').then(r => r.json()),
    fetch('/api/posts').then(r => r.json())
]);
```

## 12 错误处理

### 12.1 使用 try-catch

```javascript
try {
    const data = JSON.parse(jsonString);
    validateData(data);
    saveData(data);
} catch (error) {
    if (error instanceof SyntaxError) {
        console.error('JSON 解析错误:', error.message);
    } else if (error instanceof ValidationError) {
        console.error('数据验证失败:', error.message);
    } else {
        throw error; // 重新抛出未知错误
    }
}
```

### 12.2 自定义错误

```javascript
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
    }
}

function validateUser(user) {
    if (!user.name) {
        throw new ValidationError('用户名不能为空', 'name');
    }
}
```

### 12.3 条件判断提前返回

```javascript
function processData(data) {
    if (!data) return;  // 提前返回，减少嵌套
    if (!data.items) return;

    // 正式处理逻辑
    data.items.forEach(item => {
        // ...
    });
}
```

## 13 模块规范

### 13.1 ES Module 导出

```javascript
// 命名导出
export const MAX_COUNT = 100;
export function formatDate() {}

// 默认导出
export default class UserService {}

// 统一导出
const utils = { formatDate, validate };
export default utils;
```

### 13.2 导入顺序

```javascript
// 1. React/框架核心
import React from 'react';

// 2. 第三方库
import { debounce } from 'lodash';

// 3. 工具函数
import { formatDate } from './utils';

// 4. 组件
import Button from '@/components/Button';

// 5. 样式/资源
import './styles.css';
```

### 13.3 避免循环依赖

```javascript
// a.js
import { bMethod } from './b';

export function aMethod() {
    return 'a';
}
export { bMethod };

// b.js
// 不要直接导入 a 的具体方法，改为在需要时通过参数传递
export function bMethod(a) {
    return a ? a.aMethod() : null;
}
```

## 14 类型检查

### 14.1 类型判断

```javascript
// 基础类型判断
typeof 'str' === 'string'
typeof 123 === 'number'
typeof true === 'boolean'
typeof undefined === 'undefined'
typeof null === 'object'  // 注意
typeof function(){} === 'function'

// 对象类型判断
Object.prototype.toString.call([]) === '[object Array]'
Array.isArray([])
value instanceof Date
value instanceof RegExp
```

### 14.2 数值判断

```javascript
// 判断是否为有效数字
Number.isNaN(NaN)           // true
Number.isFinite(Infinity)   // false

// 判断是否为整数
Number.isInteger(3.14)     // false

// 判断是否为空
!value                  // 对于 null/undefined/空字符串/0 都为 true
value !== null && value !== undefined  // 明确判断非空
```

## 15 字符串处理

### 15.1 模板字符串

```javascript
const name = '张三';
const message = `您好，${name}！
今天是 ${new Date().toLocaleDateString()}。
欢迎来到 ${location.href}。`;
```

### 15.2 字符串拼接

正确示例：

```javascript
const path = ['a', 'b', 'c'].join('/');
const query = Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
```

错误示例：

```javascript
const path = 'a' + '/' + 'b' + '/' + 'c';  // 不推荐
```

## 16 代码检测

### 16.1 使用 ESLint

推荐配置：

```json
{
    "extends": ["eslint:recommended"],
    "parserOptions": {
        "ecmaVersion": 2022,
        "sourceType": "module"
    },
    "rules": {
        "no-console": "warn",
        "no-unused-vars": "error",
        "prefer-const": "error"
    }
}
```

### 16.2 Git Hooks

使用 husky + lint-staged：

```json
{
    "husky": {
        "hooks": {
            "pre-commit": "lint-staged"
        }
    },
    "lint-staged": {
        "*.js": ["eslint --fix", "git add"]
    }
}
```
