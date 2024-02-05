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

# 





