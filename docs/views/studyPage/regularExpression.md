---
title: JavaScript 正则表达式
date: 2026-03-15
author: Maple
tags:
  - JavaScript
categories:
  - JavaScript
---

:::tip 简介
正则表达式（Regular Expression）是用于匹配字符串中字符组合的模式。在 JavaScript 中，正则表达式常用于表单验证、字符串搜索替换、数据提取等场景。
:::

<!-- more -->

## 1，基础语法

### 1.1 创建正则表达式

```javascript
// 字面量方式（推荐）
const reg1 = /pattern/flags;

// 构造函数方式
const reg2 = new RegExp('pattern', 'flags');
```

### 1.2 常用修饰符（flags）

| 修饰符 | 说明 |
| :----: | :--- |
| `g` | 全局匹配 |
| `i` | 忽略大小写 |
| `m` | 多行匹配 |

```javascript
const str = 'Hello World hello world';
/hello/i.test(str);  // true，忽略大小写
/hello/g.test(str); // true，全局匹配
```

## 2，常用正则表达式

### 2.1 校验类

#### 手机号码（中国大陆）

```javascript
/^1[3-9]\d{9}$/
```

:::details 点击查看详情

**校验规则：**

- 以 1 开头
- 第二位为 3-9 中的任意数字
- 后面接 9 位数字

:::

#### 电子邮箱

```javascript
/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
```

#### 身份证号码（中国大陆）

```javascript
/^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/
```

#### URL 链接

```javascript
/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
```

#### IP 地址（IPv4）

```javascript
/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
```

#### 用户名（4-16位，字母数字下划线）

```javascript
/^[a-zA-Z0-9_]{4,16}$/
```

#### 密码（至少8位，包含大小写字母和数字）

```javascript
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
```

#### 汉字姓名（2-10位）

```javascript
/^[\u4e00-\u9fa5]{2,10}$/
```

#### 邮政编码（中国）

```javascript
/^[1-9]\d{5}$/
```

#### 固定电话（中国）

```javascript
/^0\d{2,3}-?\d{7,8}$/
```

#### QQ 号码

```javascript
/^[1-9]\d{4,10}$/
```

#### 港澳通行证

```javascript
/^[HMhm]\d{10}$/
```

#### 护照号码

```javascript
/^[a-zA-Z0-9]{6,9}$/
```

### 2.2 提取类

#### 提取 URL 中的参数

```javascript
const url = 'https://example.com?name=John&age=30';
const params = {};
url.match(/\w+=\w+/g)?.forEach(item => {
  const [key, value] = item.split('=');
  params[key] = value;
});
// { name: 'John', age: '30' }
```

#### 提取日期（YYYY-MM-DD 格式）

```javascript
const str = '今天是2024-03-15，天气晴朗';
str.match(/\d{4}-\d{2}-\d{2}/)[0];  // '2024-03-15'
```

#### 提取 HTML 标签内容

```javascript
const html = '<h1>标题</h1><p>段落</p>';
html.match(/<(\w+)>.*?<\/\1>/g);  // ['<h1>标题</h1>', '<p>段落</p>']
```

#### 提取图片链接

```javascript
const content = '<img src="img1.jpg" /><img src="img2.png" />';
content.match(/src="([^"]+)"/g);  // ['src="img1.jpg"', 'src="img2.png"']
```

### 2.3 替换类

#### 去除字符串空格

```javascript
// 去除首尾空格
str.replace(/^\s+|\s+$/g, '');

// 去除所有空格
str.replace(/\s+/g, '');

// 去除多余空格（保留单个空格）
str.replace(/\s+/g, ' ').trim();
```

#### 替换敏感词

```javascript
const sensitiveWords = ['暴力', '色情', '赌博'];
const text = '这是一段包含暴力和色情的文字';
const pattern = new RegExp(sensitiveWords.join('|'), 'g');
text.replace(pattern, '***');  // '这是一段包含***和***的文字'
```

#### 格式化手机号码

```javascript
'13812345678'.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3');
// '138****5678'
```

#### 格式化银行卡号（每4位空格分隔）

```javascript
'6222021234567890123'.replace(/(\d{4})/g, '$1 ').trim();
// '6222 0212 3456 7890 123'
```

#### 驼峰命名转短横线命名

```javascript
'helloWorld'.replace(/([A-Z])/g, '-$1').toLowerCase();
// 'hello-world'
```

#### 短横线命名转驼峰命名

```javascript
'hello-world'.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
// 'helloWorld'
```

### 2.4 匹配类

#### 匹配中文

```javascript
/[\u4e00-\u9fa5]/
```

#### 匹配空白行

```javascript
/^\s*$/m
```

#### 匹配 HTML 注释

```javascript
/<!--[\s\S]*?-->/g
```

#### 匹配代码中的 URL

```javascript
/(https?:\/\/[^\s"'<>`]+)/g
```

#### 匹配颜色值（十六进制）

```javascript
/#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/g
```

#### 匹配日期格式（多种格式）

```javascript
/(\d{4}[-/年]\d{1,2}[-/月]\d{1,2}[日]?)/g
```

## 3，RegExp 常用方法

### 3.1 test() - 校验是否匹配

```javascript
const regex = /^1[3-9]\d{9}$/;
regex.test('13812345678');  // true
regex.test('12345678');     // false
```

### 3.2 exec() - 返回匹配结果

```javascript
const regex = /(\d{4})-(\d{2})-(\d{2})/;
const result = regex.exec('2024-03-15');
// result[0] = '2024-03-15'
// result[1] = '2024'
// result[2] = '03'
// result[3] = '15'
```

### 3.3 String 对象的正则方法

| 方法 | 说明 |
| :--- | :--- |
| `match()` | 返回匹配结果数组 |
| `replace()` | 替换匹配的内容 |
| `search()` | 返回匹配的位置索引 |
| `split()` | 用正则分隔字符串 |

```javascript
const str = 'hello world hello';
str.match(/hello/g);        // ['hello', 'hello']
str.replace(/hello/g, 'hi'); // 'hi world hi'
str.search(/world/);         // 6
str.split(/o/g);            // ['hell', ' w', 'rld']
```

## 4，实用工具函数

### 4.1 校验手机号

```javascript
function isPhone(phone) {
  return /^1[3-9]\d{9}$/.test(phone);
}
```

### 4.2 校验邮箱

```javascript
function isEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}
```

### 4.3 校验身份证

```javascript
function isIdCard(id) {
  return /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/.test(id);
}
```

### 4.4 去除 XSS 攻击脚本

```javascript
function removeXSS(str) {
  return str.replace(/[<>'"&]/g, (c) => ({
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
    '&': '&amp;'
  }[c]));
}
```

## 5，注意事项

:::warning 性能优化

- 避免在循环中频繁创建正则表达式
- 对于固定模式，使用字面量方式创建正则
- 复杂正则考虑使用 `RegExp` 构造函数动态创建

:::

:::warning 常见错误

- 使用 `|` 时注意优先级，通常需要用括号分组
- 全局匹配 `g` 与 `test()` 一起使用时会有_lastIndex 残留问题
- 中文匹配使用 `[\u4e00-\u9fa5]` 而不是 `\w`

:::
