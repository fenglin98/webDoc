---
title: JavaScript 问题记录
description: 记录所遇到的Js相关问题
date: 2024-02-20
author: Maple
---

##  浮点数精度丢失

在JavaScript中，由于其使用的浮点数表示方式，存在小数点精度丢失的问题。

```javascript
let a = 0.1
let b = 0.1 
let c =a*b 
console.log(c)  // 0.010000000000000002
```

解决方法
1. 将浮点数转换为整数计算,然后将数据/10^n 得到最终结果
[封装完成的js函数](/views/utilsPage/jsUtils)  
```javascript
let a = 0.1
let b = 0.1 
let c = ((a*10) * (b*10))/100
console.log(c)  // 0.01
```

### 