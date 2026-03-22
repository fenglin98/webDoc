---
title: JavaScript 问题记录
description: 记录所遇到的Js相关问题
date: 2026-03-15
author: Maple
---

## 浮点数精度丢失

在 JavaScript 中，由于其使用的浮点数表示方式，存在小数点精度丢失的问题。

```javascript
let a = 0.1
let b = 0.1
let c = a * b
console.log(c)  // 0.010000000000000002
```

**解决方法**：将浮点数转换为整数计算，然后再除以 10^n

```javascript
let a = 0.1
let b = 0.1
let c = ((a * 10) * (b * 10)) / 100
console.log(c)  // 0.01
```

也可以使用 [封装好的 JS 函数](/views/utilsPage/jsUtils) 中的 `floatCalculation` 方法。

---

## this 指向问题

### 普通函数中的 this

普通函数的 this 指向调用它的对象。

```javascript
const obj = {
    name: '张三',
    getName: function() {
        console.log(this.name);  // 指向 obj
    }
};
obj.getName();  // 张三
```

### 箭头函数中的 this

箭头函数没有自己的 this，会继承外层作用域的 this。

```javascript
const obj = {
    name: '张三',
    getName: () => {
        console.log(this.name);  // 指向 window 或 undefined
    }
};
obj.getName();  // undefined
```

### 解决方案

- 使用 `bind()` 绑定 this
- 使用 `call()` / `apply()` 显式绑定
- 将 this 保存为变量（如 `const self = this`）

---

## 数组方法区分

### forEach / map / filter / reduce

| 方法 | 返回值 | 用途 |
|------|--------|------|
| `forEach` | `undefined` | 遍历，无返回值 |
| `map` | 新数组 | 映射转换 |
| `filter` | 新数组 | 过滤筛选 |
| `reduce` | 任意类型 | 汇总计算 |
| `find` | 元素或 undefined | 查找第一个匹配 |
| `some` | `boolean` | 是否存在匹配 |
| `every` | `boolean` | 是否全部满足 |

```javascript
const arr = [1, 2, 3, 4, 5];

// map: 每个元素乘以 2
arr.map(x => x * 2);  // [2, 4, 6, 8, 10]

// filter: 过滤偶数
arr.filter(x => x % 2 === 0);  // [2, 4]

// reduce: 求和
arr.reduce((sum, x) => sum + x, 0);  // 15

// find: 找第一个大于 3 的
arr.find(x => x > 3);  // 4
```

---

## 对象拷贝问题

### 浅拷贝问题

直接赋值或使用 `Object.assign()` 是浅拷贝，嵌套对象仍会相互影响。

```javascript
const original = { name: '张三', info: { age: 25 } };
const copy = original;
copy.name = '李四';
copy.info.age = 30;
console.log(original.name);  // 李四 ❌
console.log(original.info.age);  // 30 ❌
```

### 深拷贝解决方案

```javascript
// 方法1: JSON 序列化（无法处理函数、undefined、Date 等）
const copy = JSON.parse(JSON.stringify(original));

// 方法2: 使用递归手写深拷贝
function deepClone(target) {
    if (target === null || typeof target !== 'object') return target;
    const clone = Array.isArray(target) ? [] : {};
    for (const key in target) {
        clone[key] = deepClone(target[key]);
    }
    return clone;
}

// 方法3: 使用 [封装好的工具函数](/views/utilsPage/jsUtils) 中的 deepClone
```

---

## 异步回调地狱

多层嵌套的回调函数难以维护。

```javascript
// 回调地狱 ❌
fetchData(function(data) {
    fetchMore(data.id, function(more) {
        fetchDetails(more.id, function(details) {
            // 嵌套越来越深
        });
    });
});
```

**解决方案：使用 Promise + async/await**

```javascript
// Promise 链式调用
fetchData()
    .then(data => fetchMore(data.id))
    .then(more => fetchDetails(more.id))
    .then(details => console.log(details))
    .catch(err => console.error(err));

// async/await（推荐）✅
async function getDetails() {
    try {
        const data = await fetchData();
        const more = await fetchMore(data.id);
        const details = await fetchDetails(more.id);
        return details;
    } catch (err) {
        console.error(err);
    }
}
```

---

## 类型判断的坑

### typeof 的局限性

```javascript
typeof null        // 'object' ❌ null 不是对象
typeof []          // 'object' ❌ 数组无法区分
typeof new Date()  // 'object'
typeof function(){} // 'function' ✅
```

### 正确判断类型

```javascript
// 判断是否为数组
Array.isArray([]);              // true ✅
Object.prototype.toString.call([]);  // '[object Array]'

// 判断是否为 null
value === null;                 // true ✅
// 不要用 typeof，因为 typeof null === 'object'

// 判断是否为普通对象
Object.prototype.toString.call({}) === '[object Object]';

// 判断是否为 Promise
value instanceof Promise;
value.then !== undefined;
```

---

## 事件委托中的 event.target

使用事件委托时，e.target 可能是嵌套元素，需要判断当前元素。

```javascript
// ❌ 问题：点击子元素时，target 不是预期的元素
ul.addEventListener('click', function(e) {
    if (e.target.classList.contains('item')) {
        // ...
    }
});

// ✅ 解决方案：使用 e.currentTarget 或 closest()
ul.addEventListener('click', function(e) {
    // currentTarget 是绑定事件的元素（ul）
    const item = e.target.closest('.item');
    if (item) {
        // ...
    }
});
```

---

## setTimeout 闭包问题

```javascript
// ❌ 问题：所有定时器输出同样的值
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i);  // 3, 3, 3
    }, 100);
}

// ✅ 解决方案1：使用 let
for (let i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i);  // 0, 1, 2
    }, 100);
}

// ✅ 解决方案2：使用闭包包装
for (var i = 0; i < 3; i++) {
    (function(index) {
        setTimeout(function() {
            console.log(index);  // 0, 1, 2
        }, 100);
    })(i);
}
```

---

## Map 和 Object 的选择

| 特性 | Map | Object |
|------|-----|--------|
| 键类型 | 任意类型 | 只能是字符串或 Symbol |
| 键顺序 | 有序 | 无序（除数字键） |
| 大小 | `size` 属性 | `Object.keys()` 长度 |
| 迭代 | 可直接迭代 | 需要 `Object.keys()` |
| 性能 | 插入/删除更快 | - |

```javascript
// 使用 Map 的场景
const map = new Map();
map.set('name', '张三');
map.set({}, '对象键');  // Object 可以作为键
map.get('name');  // 张三
map.size;  // 2

// 使用 Object 的场景
const user = { name: '张三', age: 25 };
JSON.stringify(user);  // 方便序列化
```
