---
title: JavaScript 工具封装
date: 2024-02-04
author: Maple 
---


# JS封装模板 

``` js
(function (global, fun) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = fun() :
        typeof define === 'function' && define.amd ? define(fun) :
            (global = global, global.untils = fun());
}(this, function () {
    function untils() {
        // do something
    }  
return untils
}))
```


# 获取url参数

```js 
(function (global, fun) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = fun() :
        typeof define === 'function' && define.amd ? define(fun) :
            (global = global, global.getUrlData = fun());
}(this, function () {
    function getUrlData(url = window.location.href, key) {
        let data = {};
        let i = url.indexOf('?');
        if (i !== -1) {
          let  queryArr = url.substr(i + 1).split('&');
            for (let _i = 0; _i < queryArr.length; _i++) {
                const element = queryArr[_i];
                data[element.split('=')[0]] = element.split('=')[1]
            }
            if (data[key]) return data[key];
            return data
        }
    }
    return getUrlData
}))
```

# 浮点数精度计算

```javascript

(function (global, fun) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = fun() :
        typeof define === 'function' && define.amd ? define(fun) :
            (global = global, global.floatCalculation = fun());
}(this, function () {
    //** */
    function floatCalculation(val1 = 0, val2 = 0, rule = '+') {
        var resultData = 0
        var p1 = 0  //  exponential1 
        var p2 = 0  //  exponential2
        var pMax = 0  //
        function getDataLength(val) {
            const len = val.toString().length - val.toString().indexOf('.') - 1
            return Math.pow(10, len)
        }
        p1 = getDataLength(val1)
        p2 = getDataLength(val2)
        pMax = Math.max(p1, p2)
        switch (rule) {
            case '+':  // +
                resultData = ((val1 * pMax) + (val2 * pMax)) / pMax
                break;
            case '-': // -
                resultData = ((val1 * pMax) - (val2 * pMax)) / pMax
                break; 
            case '*': // * 
                resultData = ((val1 * p1) * (val2 * p2)) / (p1 * p2)
                break;
            case '/': //  / 
                resultData = ((val1 * p1) / (val2 * p2)) / (p1 / p2)
                break;
            default:
                break;
        }
        return resultData;
    }
    return floatCalculation
}))

```



