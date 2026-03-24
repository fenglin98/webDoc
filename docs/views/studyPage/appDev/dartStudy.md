---
title: Dart 语言基础
description: Dart 编程语言入门学习
date: 2026-02-19 18:21
author: Maple
---

## 概述

Dart 是 Google 开发的一门编程语言，主要用于 Flutter 应用开发。

**特点**：
- 面向对象
- 类型安全（支持类型推断）
- 支持 JIT 和 AOT 编译
- 空安全
- 丰富的标准库

**官网**: [https://dart.dev](https://dart.dev)

---

## 基础语法

### 变量声明

```dart
// 明确类型
int count = 0;
String name = 'Dart';
double price = 19.99;
bool isActive = true;

// 类型推断
var message = 'Hello';        // String
final now = DateTime.now();   // 运行时常量
const PI = 3.14159;          // 编译时常量

// 空安全
String? nullable;      // 可空类型
String nonNull = '';   // 非空类型（必须初始化）
```

### 数据类型

| 类型 | 说明 | 示例 |
|------|------|------|
| `int` | 整数 | `10`, `-5` |
| `double` | 浮点数 | `3.14`, `-0.5` |
| `String` | 字符串 | `'Hello'`, `"Dart"` |
| `bool` | 布尔 | `true`, `false` |
| `List` | 列表 | `[1, 2, 3]` |
| `Set` | 集合 | `{1, 2, 3}` |
| `Map` | 字典 | `{'a': 1}` |

---

## 函数

### 基本定义

```dart
// 返回类型可省略（类型推断）
int add(int a, int b) {
  return a + b;
}

// 箭头函数（单表达式）
int multiply(int a, int b) => a * b;

// 可选参数
void greet(String name, [String? title]) {
  print('${title ?? ''} $name');
}

// 默认参数
void greet2(String name, {String title = 'Mr.'}) {
  print('$title $name');
}
```

### 命名参数

```dart
void createUser({
  required String name,
  int age = 18,
  bool isActive = true,
}) {
  print('$name, $age, $isActive');
}

createUser(name: 'Tom', age: 20);
```

---

## 控制流程

### 条件判断

```dart
if (condition) {
  // ...
} else if (other) {
  // ...
} else {
  // ...
}

// 三元运算符
String status = isActive ? '在线' : '离线';

// ?? 运算符
String display = name ?? '匿名';
```

### 循环

```dart
// for 循环
for (int i = 0; i < 5; i++) {
  print(i);
}

// for-in 循环
for (var item in list) {
  print(item);
}

// forEach
list.forEach((item) => print(item));

// while 循环
while (condition) {
  // ...
}

// do-while
do {
  // ...
} while (condition);
```

---

## 集合

### List（列表）

```dart
// 创建
var list = [1, 2, 3];
List<int> nums = [1, 2, 3];

// 操作
list.add(4);
list.addAll([5, 6]);
list.insert(0, 0);
list.remove(1);
list.removeAt(0);
list.clear();

// 访问
print(list[0]);
print(list.length);

// 遍历
for (var item in list) print(item);
list.forEach((item) => print(item));

// 映射
var doubled = list.map((e) => e * 2).toList();

// 过滤
var evens = list.where((e) => e % 2 == 0).toList();

// 查找
var found = list.firstWhere((e) => e > 2, orElse: () => 0);
```

### Set（集合）

```dart
// 创建
var set = {1, 2, 3};
Set<String> names = {'Tom', 'Jerry'};

// 操作
set.add(4);
set.addAll([5, 6]);
set.remove(1);
set.clear();

// 运算
var union = set1.union(set2);
var intersect = set1.intersection(set2);
```

### Map（字典）

```dart
// 创建
var map = {'a': 1, 'b': 2};
Map<String, int> scores = {'语文': 90, '数学': 95};

// 操作
map['c'] = 3;
map['a'] = 10;  // 更新
map.remove('b');
map.clear();

// 访问
print(map['a']);
print(map.length);
print(map.keys);
print(map.values);

// 遍历
map.forEach((key, value) => print('$key: $value'));
for (var entry in map.entries) {
  print('${entry.key}: ${entry.value}');
}
```

---

## 类

### 定义类

```dart
class Person {
  String name;
  int age;

  // 构造函数
  Person(this.name, this.age);

  // 命名构造函数
  Person.guest() : name = 'Guest', age = 0;

  // 工厂构造函数
  factory Person.fromJson(Map<String, dynamic> json) {
    return Person(json['name'], json['age']);
  }

  // 方法
  void introduce() {
    print('我是 $name，今年 $age 岁');
  }

  // getter
  String get info => '$name ($age)';

  // 静态方法
  static void greet() {
    print('Hello');
  }
}

// 使用
var person = Person('Tom', 20);
person.introduce();
var guest = Person.guest();
var p = Person.fromJson({'name': 'Jerry', 'age': 18});
```

### 继承

```dart
class Student extends Person {
  int grade;

  // super 调用父类构造函数
  Student(String name, int age, this.grade) : super(name, age);

  // 重写方法
  @override
  void introduce() {
    super.introduce();  // 调用父类方法
    print('我是 $name，年级 $grade');
  }
}
```

### 接口和抽象类

```dart
// 抽象类
abstract class Animal {
  void speak();  // 抽象方法
}

// 实现接口
class Dog implements Animal {
  @override
  void speak() {
    print('Wang!');
  }
}

// mixin
mixin Flyable {
  void fly() => print('Flying');
}

class Bird with Flyable {
  void chirp() => print('Chirp');
}
```

---

## 异步编程

### Future

```dart
// 模拟异步操作
Future<String> fetchData() async {
  await Future.delayed(Duration(seconds: 1));
  return 'Data loaded';
}

// 使用
fetchData().then((result) {
  print(result);
}).catchError((error) {
  print('Error: $error');
});

// async-await
Future<void> loadData() async {
  try {
    String result = await fetchData();
    print(result);
  } catch (e) {
    print('Error: $e');
  }
}
```

### Stream

```dart
// 创建 Stream
Stream<int> countStream() async* {
  for (int i = 1; i <= 5; i++) {
    await Future.delayed(Duration(seconds: 1));
    yield i;
  }
}

// 监听
countStream().listen(
  (data) => print('Received: $data'),
  onDone: () => print('Done'),
  onError: (e) => print('Error: $e'),
);

// 异步遍历
await for (var value in countStream()) {
  print(value);
}
```

---

## 异常处理

```dart
try {
  int result = 10 ~/ 0;  // ~/ 是整数除法
} on IntegerDivisionByZeroException {
  print('不能除以零');
} catch (e, stackTrace) {
  print('Error: $e');
  print('Stack: $stackTrace');
} finally {
  print('Finally');
}

// 抛出异常
void validate(int age) {
  if (age < 0) {
    throw ArgumentError('年龄不能为负');
  }
}
```

---

## 泛型

```dart
// 泛型类
class Box<T> {
  T value;
  Box(this.value);
  T get() => value;
}

var intBox = Box<int>(123);
var strBox = Box<String>('Hello');

// 泛型方法
T first<T>(List<T> list) {
  return list.first;
}

// 泛型约束
class NumberBox<T extends num> {
  T value;
  NumberBox(this.value);
}
```

---

## 扩展

### 扩展方法

```dart
extension StringExtension on String {
  int toIntOrDefault(int defaultValue) {
    return int.tryParse(this) ?? defaultValue;
  }

  bool get isEmail => contains('@');
}

print('123'.toIntOrDefault(0));  // 123
print('abc'.toIntOrDefault(0)); // 0
print('test@email.com'.isEmail); // true
```

### 扩展属性

```dart
extension IntExtension on int {
  bool get isEven => this % 2 == 0;
  bool get isOdd => this % 2 != 0;
}

print(10.isEven);  // true
```

---

## 标准库常用

### dart:math

```dart
import 'dart:math';

print(pi);           // 3.141592653589793
print(e);            // 2.718281828459045
print(sqrt(16));     // 4.0
print(pow(2, 3));    // 8.0
print(max(1, 5));    // 5
print(min(1, 5));    // 1
print(random());     // 0.0 ~ 1.0
```

### dart:convert（JSON）

```dart
import 'dart:convert';

// JSON 编码
String json = jsonEncode({'name': 'Tom', 'age': 20});

// JSON 解码
Map<String, dynamic> data = jsonDecode(json);

// 列表
String listJson = jsonEncode([1, 2, 3]);
List<dynamic> list = jsonDecode(listJson);
```

### dart:io（文件操作）

```dart
import 'dart:io';

Future<void> readFile() async {
  var file = File('data.txt');
  String content = await file.readAsString();
  print(content);
}

Future<void> writeFile() async {
  var file = File('output.txt');
  await file.writeAsString('Hello Dart');
}
```
