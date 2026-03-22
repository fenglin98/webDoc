---
title: JavaScript 工具封装
date: 2026-03-15
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


# 防抖函数

> **描述**：防止函数被频繁调用，只有在停止触发指定时间后才执行。常用于搜索框输入、窗口resize等场景。

```javascript
(function (global, fun) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = fun() :
        typeof define === 'function' && define.amd ? define(fun) :
            (global = global, global.debounce = fun());
}(this, function () {
    function debounce(fn, delay = 300, immediate = false) {
        let timer = null;
        return function (...args) {
            const context = this;
            if (immediate && !timer) {
                fn.apply(context, args);
            }
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                if (!immediate) {
                    fn.apply(context, args);
                }
                timer = null;
            }, delay);
        };
    }
    return debounce
}))
```

**使用示例**：
```javascript
const handleSearch = debounce((keyword) => {
    console.log('搜索:', keyword);
}, 500);

// 搜索框输入时调用
input.addEventListener('input', (e) => handleSearch(e.target.value));
```


# 节流函数

> **描述**：限制函数在指定时间间隔内只执行一次，不论触发多少次。常用于滚动事件、按钮防重复点击等场景。

```javascript
(function (global, fun) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = fun() :
        typeof define === 'function' && define.amd ? define(fun) :
            (global = global, global.throttle = fun());
}(this, function () {
    function throttle(fn, delay = 300) {
        let lastTime = 0;
        return function (...args) {
            const context = this;
            const now = Date.now();
            if (now - lastTime >= delay) {
                lastTime = now;
                fn.apply(context, args);
            }
        };
    }
    return throttle
}))
```

**使用示例**：
```javascript
const handleScroll = throttle(() => {
    console.log('滚动位置:', window.scrollY);
}, 200);

window.addEventListener('scroll', handleScroll);
```


# 深拷贝

> **描述**：对对象进行深层次拷贝，支持嵌套对象、数组、Date、正则等类型。解决引用类型赋值时的相互影响问题。

```javascript
(function (global, fun) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = fun() :
        typeof define === 'function' && define.amd ? define(fun) :
            (global = global, global.deepClone = fun());
}(this, function () {
    function deepClone(target, cache = new WeakMap()) {
        if (target === null || typeof target !== 'object') return target;
        if (cache.has(target)) return cache.get(target);

        const type = Object.prototype.toString.call(target).slice(8, -1);
        let clone;
        if (type === 'Date') {
            clone = new Date(target.getTime());
        } else if (type === 'RegExp') {
            clone = new RegExp(target.source, target.flags);
        } else if (type === 'Map') {
            clone = new Map();
            cache.set(target, clone);
            target.forEach((v, k) => clone.set(deepClone(k, cache), deepClone(v, cache)));
        } else if (type === 'Set') {
            clone = new Set();
            cache.set(target, clone);
            target.forEach(v => clone.add(deepClone(v, cache)));
        } else if (Array.isArray(target)) {
            clone = [];
            cache.set(target, clone);
            target.forEach(item => clone.push(deepClone(item, cache)));
        } else {
            clone = {};
            cache.set(target, clone);
            Object.keys(target).forEach(key => clone[key] = deepClone(target[key], cache));
        }
        return clone;
    }
    return deepClone
}))
```

**使用示例**：
```javascript
const original = { name: '张三', info: { age: 25, hobbies: ['篮球', '足球'] } };
const copy = deepClone(original);
copy.info.age = 30;
console.log(original.info.age); // 25，原对象不受影响
```


# 格式化日期

> **描述**：将Date对象或时间戳格式化为指定格式的字符串。支持多种格式化模板。

```javascript
(function (global, fun) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = fun() :
        typeof define === 'function' && define.amd ? define(fun) :
            (global = global, global.formatDate = fun());
}(this, function () {
    function formatDate(date = new Date(), format = 'YYYY-MM-DD HH:mm:ss') {
        const d = typeof date === 'number' ? new Date(date) : date;
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const seconds = String(d.getSeconds()).padStart(2, '0');

        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hours)
            .replace('mm', minutes)
            .replace('ss', seconds);
    }
    return formatDate
}))
```

**使用示例**：
```javascript
formatDate();                    // 2026-03-22 15:30:45
formatDate(new Date(), 'YYYY-MM-DD');           // 2026-03-22
formatDate(1710998400000, 'YYYY年MM月DD日');    // 2024年03月21日
formatDate(new Date(), 'HH:mm');                // 15:30
```


# 判断数据类型

> **描述**：精确判断一个值的数据类型，返回如 'string'、'array'、'object'、'null'、'function' 等类型名称。

```javascript
(function (global, fun) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = fun() :
        typeof define === 'function' && define.amd ? define(fun) :
            (global = global, global.getDataType = fun());
}(this, function () {
    function getDataType(value) {
        if (value === null) return 'null';
        if (typeof value === 'undefined') return 'undefined';
        const type = Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
        return type;
    }
    return getDataType
}))
```

**使用示例**：
```javascript
getDataType([]);           // array
getDataType({});           // object
getDataType(null);         // null
getDataType(new Date());   // date
getDataType(/abc/);        // regexp
getDataType(function(){}); // function
getDataType('hello');      // string
```


# 数组去重

> **描述**：去除数组中的重复元素，支持基本类型和对象类型数组。支持按指定key进行对象数组去重。

```javascript
(function (global, fun) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = fun() :
        typeof define === 'function' && define.amd ? define(fun) :
            (global = global, global.unique = fun());
}(this, function () {
    function unique(arr, key) {
        if (!Array.isArray(arr)) return [];
        if (!key) {
            return [...new Set(arr)];
        }
        const seen = new Map();
        return arr.filter(item => {
            const val = typeof item === 'object' ? item[key] : item;
            if (seen.has(val)) return false;
            seen.set(val, true);
            return true;
        });
    }
    return unique
}))
```

**使用示例**：
```javascript
unique([1, 2, 2, 3, 3, 3]);                    // [1, 2, 3]
unique(['a', 'b', 'a', 'c', 'b']);             // ['a', 'b', 'c']
// 对象数组按id去重
unique([{id: 1, name: '张三'}, {id: 2, name: '李四'}, {id: 1, name: '王五'}], 'id');
// [{id: 1, name: '张三'}, {id: 2, name: '李四'}]
```


# 金额格式化

> **描述**：将数字格式化为金额形式，添加千分位分隔符和小数位。支持自定义小数位数和货币符号。

```javascript
(function (global, fun) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = fun() :
        typeof define === 'function' && define.amd ? define(fun) :
            (global = global, global.formatMoney = fun());
}(this, function () {
    function formatMoney(amount, decimals = 2, symbol = '¥') {
        if (isNaN(amount) || amount === null || amount === '') return symbol + '0.00';
        const num = parseFloat(amount);
        const parts = num.toFixed(decimals).split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return symbol + parts.join('.');
    }
    return formatMoney
}))
```

**使用示例**：
```javascript
formatMoney(1234567);              // ¥1,234,567.00
formatMoney(1234567, 0);           // ¥1,234,567
formatMoney(1234567, 0, '$');     // $1,234,567
formatMoney('1234.5', 2, '€');    // €1,234.50
```


# 手机号脱敏

> **描述**：将手机号中间四位数字替换为星号，保护用户隐私。适用于展示、日志记录等场景。

```javascript
(function (global, fun) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = fun() :
        typeof define === 'function' && define.amd ? define(fun) :
            (global = global, global.maskPhone = fun());
}(this, function () {
    function maskPhone(phone) {
        if (!phone || !/^1[3-9]\d{9}$/.test(phone)) return phone;
        return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    }
    return maskPhone
}))
```

**使用示例**：
```javascript
maskPhone('13812345678');    // 138****5678
maskPhone('19912345678');    // 199****5678
maskPhone('12345');          // 12345（格式不正确返回原值）
```


# 生成随机ID

> **描述**：生成一个唯一的随机字符串ID，可指定长度和前缀。适用于生成临时ID、元素标识等场景。

```javascript
(function (global, fun) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = fun() :
        typeof define === 'function' && define.amd ? define(fun) :
            (global = global, global.generateId = fun());
}(this, function () {
    function generateId(prefix = '', length = 8) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let id = '';
        for (let i = 0; i < length; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return prefix ? prefix + '_' + id : id;
    }
    return generateId
}))
```

**使用示例**：
```javascript
generateId();              // x7k9m2p1
generateId('user');        // user_a3b8c7d2
generateId('order', 12);   // order_9k2m5p8x1q3w
```


# UUID生成

> **描述**：生成符合RFC4122标准的UUID v4格式，用于需要唯一标识符的场景。

```javascript
(function (global, fun) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = fun() :
        typeof define === 'function' && define.amd ? define(fun) :
            (global = global, global.uuid = fun());
}(this, function () {
    function uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    return uuid
}))
```

**使用示例**：
```javascript
uuid();  // 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
```


# 本地存储封装

> **描述**：封装localStorage操作，支持设置过期时间、自动JSON序列化/反序列化。避免存储大小超出限制和类型转换问题。

```javascript
(function (global, fun) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = fun() :
        typeof define === 'function' && define.amd ? define(fun) :
            (global = global, global.storage = fun());
}(this, function () {
    function storage() {
        const _this = this;

        _this.set = function(key, value, expire) {
            const data = {
                value: value,
                expire: expire ? Date.now() + expire : null
            };
            localStorage.setItem(key, JSON.stringify(data));
        };

        _this.get = function(key) {
            const item = localStorage.getItem(key);
            if (!item) return null;
            try {
                const data = JSON.parse(item);
                if (data.expire && Date.now() > data.expire) {
                    localStorage.removeItem(key);
                    return null;
                }
                return data.value;
            } catch {
                return item;
            }
        };

        _this.remove = function(key) {
            localStorage.removeItem(key);
        };

        _this.clear = function() {
            localStorage.clear();
        };

        return _this;
    }
    return new storage()
}))
```

**使用示例**：
```javascript
storage.set('token', 'abc123');                    // 存储
storage.set('userInfo', {name: '张三'}, 86400000); // 存储，24小时后过期
storage.get('token');                              // 获取
storage.remove('token');                           // 删除
storage.clear();                                   // 清空所有
```


# Cookie操作封装

> **描述**：封装Cookie的读取、设置、删除操作，支持设置过期时间、路径、域名等属性。

```javascript
(function (global, fun) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = fun() :
        typeof define === 'function' && define.amd ? define(fun) :
            (global = global, global.cookie = fun());
}(this, function () {
    function cookie() {
        const _this = this;

        _this.get = function(name) {
            const cookies = document.cookie.split('; ');
            for (let item of cookies) {
                const [key, val] = item.split('=');
                if (key === name) return decodeURIComponent(val);
            }
            return null;
        };

        _this.set = function(name, value, expireDays = 7, path = '/') {
            const expire = new Date();
            expire.setDate(expire.getDate() + expireDays);
            document.cookie = `${name}=${encodeURIComponent(value)};expires=${expire.toUTCString()};path=${path}`;
        };

        _this.remove = function(name, path = '/') {
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path}`;
        };

        return _this;
    }
    return new cookie()
}))
```

**使用示例**：
```javascript
cookie.set('username', '张三');              // 设置，7天后过期
cookie.set('token', 'abc123', 30);          // 设置，30天后过期
cookie.get('username');                      // 获取
cookie.remove('username');                   // 删除
```


# 节流立即执行版本

> **描述**：节流函数的增强版，第一次触发会立即执行，之后在指定时间间隔内最多执行一次。适用于需要立即响应又需要限制频率的场景。

```javascript
(function (global, fun) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = fun() :
        typeof define === 'function' && define.amd ? define(fun) :
            (global = global, global.throttleImmediate = fun());
}(this, function () {
    function throttleImmediate(fn, delay = 300) {
        let lastTime = 0;
        let timer = null;
        return function (...args) {
            const context = this;
            const now = Date.now();
            if (now - lastTime >= delay) {
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
                lastTime = now;
                fn.apply(context, args);
            } else if (!timer) {
                timer = setTimeout(() => {
                    lastTime = Date.now();
                    timer = null;
                    fn.apply(context, args);
                }, delay - (now - lastTime));
            }
        };
    }
    return throttleImmediate
}))
```

**使用示例**：
```javascript
const handleClick = throttleImmediate((id) => {
    console.log('发送请求:', id);
}, 1000);

// 快速连续点击只会执行第一次和最后一次
button.addEventListener('click', () => handleClick(123));
```


# 等待函数

> **描述**：返回一个Promise，在指定毫秒后resolve。适用于需要延迟执行的异步场景，是setTimeout的Promise版本。

```javascript
(function (global, fun) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = fun() :
        typeof define === 'function' && define.amd ? define(fun) :
            (global = global, global.sleep = fun());
}(this, function () {
    function sleep(ms = 1000) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    return sleep
}))
```

**使用示例**：
```javascript
async function fetchData() {
    console.log('开始...');
    await sleep(2000);  // 等待2秒
    console.log('继续...');
}

// 批量请求间隔执行
async function batchRequest(list) {
    for (const item of list) {
        await fetch(item);
        await sleep(500);  // 每个请求间隔500ms
    }
}
```


# 简易事件总线

> **描述**：实现一个简易的事件订阅/发布系统，用于组件间通信、模块间解耦通信。

```javascript
(function (global, fun) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = fun() :
        typeof define === 'function' && define.amd ? define(fun) :
            (global = global, global.eventBus = fun());
}(this, function () {
    function eventBus() {
        const listeners = {};
        this.on = function(event, callback) {
            if (!listeners[event]) listeners[event] = [];
            listeners[event].push(callback);
        };
        this.off = function(event, callback) {
            if (!listeners[event]) return;
            listeners[event] = listeners[event].filter(fn => fn !== callback);
        };
        this.emit = function(event, ...args) {
            if (!listeners[event]) return;
            listeners[event].forEach(fn => fn(...args));
        };
        this.once = function(event, callback) {
            const self = this;
            function wrapper(...args) {
                callback(...args);
                self.off(event, wrapper);
            }
            this.on(event, wrapper);
        };
    }
    return new eventBus()
}))
```

**使用示例**：
```javascript
eventBus.on('userLogin', (user) => console.log('用户登录:', user));
eventBus.on('userLogin', (user) => console.log('记录日志:', user));
eventBus.once('init', () => console.log('初始化只执行一次'));

// 触发事件
eventBus.emit('userLogin', {name: '张三', id: 1});

// 移除监听
eventBus.off('userLogin', callbackFn);
```


# 简易路由参数解析

> **描述**：将URL中的查询参数解析为对象，也可将对象还原为参数字符串。常用于页面间传参和参数解析。

```javascript
(function (global, fun) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = fun() :
        typeof define === 'function' && define.amd ? define(fun) :
            (global = global, global.queryString = fun());
}(this, function () {
    function queryString() {
        const _this = this;

        _this.parse = function(url = window.location.href) {
            const data = {};
            const i = url.indexOf('?');
            if (i === -1) return data;
            const query = url.slice(i + 1);
            query.split('&').forEach(item => {
                const [key, val] = item.split('=');
                if (key) data[decodeURIComponent(key)] = decodeURIComponent(val || '');
            });
            return data;
        };

        _this.stringify = function(obj) {
            return Object.keys(obj)
                .filter(key => obj[key] !== null && obj[key] !== undefined)
                .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
                .join('&');
        };

        return _this;
    }
    return new queryString()
}))
```

**使用示例**：
```javascript
queryString.parse('https://example.com/path?id=1&name=张三');
// {id: '1', name: '张三'}

queryString.stringify({id: 1, name: '张三', page: 2});
// id=1&name=%E5%BC%A0%E4%B8%89&page=2
```


# 判断是否为空对象

> **描述**：判断一个对象是否为空对象（没有任何自有属性）。常用于判断接口返回数据是否有效。

```javascript
(function (global, fun) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = fun() :
        typeof define === 'function' && define.amd ? define(fun) :
            (global = global, global.isEmptyObject = fun());
}(this, function () {
    function isEmptyObject(obj) {
        if (!obj || typeof obj !== 'object') return false;
        return Object.keys(obj).length === 0;
    }
    return isEmptyObject
}))
```

**使用示例**：
```javascript
isEmptyObject({});                // true
isEmptyObject({name: '张三'});    // false
isEmptyObject([]);                // false
isEmptyObject(null);              // false
isEmptyObject('');                // false
```


# 简易数组分页

> **描述**：将大数组按指定每页数量分成多个小数组，常用于列表分页展示场景。

```javascript
(function (global, fun) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = fun() :
        typeof define === 'function' && define.amd ? define(fun) :
            (global = global, global.pagination = fun());
}(this, function () {
    function pagination(arr, pageSize = 10) {
        if (!Array.isArray(arr) || pageSize < 1) return [];
        const result = [];
        for (let i = 0; i < arr.length; i += pageSize) {
            result.push(arr.slice(i, i + pageSize));
        }
        return result;
    }
    return pagination
}))
```

**使用示例**：
```javascript
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
pagination(arr, 5);
// [[1,2,3,4,5], [6,7,8,9,10], [11,12]]

const page2 = pagination(arr, 5)[1];  // [6,7,8,9,10]
```



