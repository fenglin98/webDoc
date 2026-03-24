---
title: Flutter 开发入门
description: Flutter 跨平台应用开发学习
date: 2026-02-28 10:20
author: Maple
---

## 概述

Flutter 是 Google 开发的跨平台 UI 框架，使用 Dart 语言。

**特点**：
- 高性能渲染（Skia 引擎）
- 跨平台（iOS、Android、Web、Desktop）
- 热重载开发
- 丰富的 Widget 库
- 自定义设计

**官网**: [https://flutter.dev](https://flutter.dev)

---

## 环境搭建

### 安装

1. 下载 Flutter SDK：[https://flutter.dev/sdk](https://flutter.dev/sdk)
2. 配置环境变量 PATH
3. 运行 `flutter doctor` 检查环境

### IDE 配置

推荐使用 VS Code 或 Android Studio：

```bash
# VS Code 扩展
# Flutter、Dart

# Android Studio 插件
# Flutter、Dart
```

### 创建项目

```bash
flutter create my_app
cd my_app
flutter run
```

---

## 基础概念

### Widget 简介

Flutter 中一切皆 Widget：

```dart
// 基础 Widget
Text('Hello Flutter')           // 文本
Icon(Icons.star)                 // 图标
Image.network('url')             // 网络图片
ElevatedButton(onPressed: () {}) // 按钮
```

### 组件分类

| 类型 | 说明 | 示例 |
|------|------|------|
| 有状态 Widget | 可变状态 | `StatefulWidget` |
| 无状态 Widget | 不可变 | `StatelessWidget` |
| 渲染 Widget | 绘制内容 | `Text`、`Image` |
| 布局 Widget | 排列子组件 | `Column`、`Row` |
| 容器 Widget | 添加样式 | `Container`、`Padding` |

---

## 基础组件

### 文本与样式

```dart
Text(
  'Hello Flutter',
  style: TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.bold,
    color: Colors.blue,
  ),
)

// 富文本
Text.rich(
  TextSpan(
    children: [
      TextSpan(text: 'Hello '),
      TextSpan(text: 'Flutter', style: TextStyle(fontWeight: FontWeight.bold)),
    ],
  ),
)
```

### 按钮

```dart
// 普通按钮
ElevatedButton(
  onPressed: () {},
  child: Text('提交'),
)

// 文字按钮
TextButton(onPressed: () {}, child: Text('取消'))

// 图标按钮
IconButton(icon: Icon(Icons.star), onPressed: () {})

// 浮动按钮
FloatingActionButton(onPressed: () {}, child: Icon(Icons.add))
```

### 图片

```dart
// 网络图片
Image.network('https://example.com/image.png')

// 本地图片（需配置 pubspec.yaml）
Image.asset('assets/images/logo.png')

// 圆角图片
ClipRRect(
  borderRadius: BorderRadius.circular(12),
  child: Image.network('url'),
)
```

---

## 布局组件

### 线性布局

```dart
// 垂直排列
Column(
  children: [
    Text('Item 1'),
    Text('Item 2'),
  ],
)

// 水平排列
Row(
  children: [
    Icon(Icons.star),
    Text('Rating'),
  ],
)

// 主轴对齐
Row(
  mainAxisAlignment: MainAxisAlignment.spaceBetween,
  children: [...],
)

// 交叉轴对齐
Row(
  crossAxisAlignment: CrossAxisAlignment.center,
  children: [...],
)
```

### 弹性布局

```dart
// Expanded
Row(
  children: [
    Expanded(flex: 2, child: Container(color: Colors.red)),
    Expanded(flex: 1, child: Container(color: Colors.blue)),
  ],
)

// Flexible
Flexible(
  fit: FlexFit.loose,
  child: Text('Content'),
)
```

### 堆叠布局

```dart
Stack(
  children: [
    Container(color: Colors.blue),
    Positioned(
      top: 10,
      right: 10,
      child: Icon(Icons.star, color: Colors.white),
    ),
  ],
)
```

### 居中布局

```dart
Center(child: Text('居中'))

// 或使用 Align
Align(
  alignment: Alignment.center,
  child: Text('居中'),
)
```

### 滚动视图

```dart
// 单子组件滚动
SingleChildScrollView(
  child: Column(children: [...]),
)

// 列表
ListView(
  children: [
    ListTile(title: Text('Item 1')),
    ListTile(title: Text('Item 2')),
  ],
)

// 动态列表
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) {
    return ListTile(title: Text(items[index]));
  },
)
```

---

## 状态管理

### setState

基础状态管理：

```dart
class CounterWidget extends StatefulWidget {
  @override
  State<CounterWidget> createState() => _CounterWidgetState();
}

class _CounterWidgetState extends State<CounterWidget> {
  int _count = 0;

  void _increment() {
    setState(() {
      _count++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Count: $_count'),
        ElevatedButton(onPressed: _increment, child: Text('+1')),
      ],
    );
  }
}
```

### Provider

全局状态管理：

```dart
// 定义 ChangeNotifier
class CounterModel extends ChangeNotifier {
  int _count = 0;
  int get count => _count;

  void increment() {
    _count++;
    notifyListeners();
  }
}

// 注册 Provider
MultiProvider(
  providers: [
    ChangeNotifierProvider(create: (_) => CounterModel()),
  ],
  child: MyApp(),
)

// 使用
class CounterWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final counter = context.watch<CounterModel>();
    return Text('Count: ${counter.count}');
  }
}
```

### Riverpod

更现代的状态管理：

```dart
// 定义 Provider
final counterProvider = StateProvider<int>((ref) => 0);

// 使用
final count = ref.watch(counterProvider);
ref.read(counterProvider.notifier).state++;
```

---

## 路由与导航

### 基础导航

```dart
// 跳转到新页面
Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => DetailPage()),
);

// 返回
Navigator.pop(context);

// 替换当前页
Navigator.pushReplacement(
  context,
  MaterialPageRoute(builder: (context) => NewPage()),
);
```

### 命名路由

```dart
// 定义路由
MaterialApp(
  initialRoute: '/',
  routes: {
    '/': (context) => HomePage(),
    '/detail': (context) => DetailPage(),
  },
);

// 跳转
Navigator.pushNamed(context, '/detail');

// 带参数
Navigator.pushNamed(context, '/detail', arguments: {'id': 123});

// 接收参数
class DetailPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context).settings.arguments as Map;
    return Text('ID: ${args['id']}');
  }
}
```

---

## 网络请求

### HTTP 封装

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const baseUrl = 'https://api.example.com';

  static Future<Map> get(String path) async {
    final response = await http.get(Uri.parse('$baseUrl$path'));
    return jsonDecode(response.body);
  }

  static Future<Map> post(String path, Map data) async {
    final response = await http.post(
      Uri.parse('$baseUrl$path'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(data),
    );
    return jsonDecode(response.body);
  }
}
```

### 使用示例

```dart
class UserList extends StatefulWidget {
  @override
  State<UserList> createState() => _UserListState();
}

class _UserListState extends State<UserList> {
  List _users = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _loadUsers();
  }

  Future<void> _loadUsers() async {
    try {
      final data = await ApiService.get('/users');
      setState(() {
        _users = data['users'];
        _loading = false;
      });
    } catch (e) {
      setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_loading) return CircularProgressIndicator();

    return ListView.builder(
      itemCount: _users.length,
      itemBuilder: (context, index) {
        return ListTile(title: Text(_users[index]['name']));
      },
    );
  }
}
```

---

## 本地存储

### SharedPreferences

```dart
import 'package:shared_preferences/shared_preferences.dart';

// 存储
Future<void> saveData() async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.setString('name', 'Tom');
  await prefs.setInt('age', 20);
  await prefs.setBool('isActive', true);
}

// 读取
Future<void> loadData() async {
  final prefs = await SharedPreferences.getInstance();
  final name = prefs.getString('name') ?? '';
  final age = prefs.getInt('age') ?? 0;
  final isActive = prefs.getBool('isActive') ?? false;
}

// 删除
prefs.remove('name');
prefs.clear();
```

---

## 生命周期

### StatefulWidget 生命周期

```
createState → initState → build
→ didChangeDependencies → setState → build
→ deactivate → dispose
```

| 钩子 | 说明 |
|------|------|
| `initState` | 组件初始化 |
| `didChangeDependencies` | 依赖变化 |
| `build` | 构建 UI |
| `didUpdateWidget` | 父组件更新 |
| `deactivate` | 停用 |
| `dispose` | 销毁 |

```dart
@override
void initState() {
  super.initState();
  // 初始化操作，如请求数据
}

@override
void didChangeDependencies() {
  super.didChangeDependencies();
  // 依赖变化时调用
}

@override
void didUpdateWidget(Widget oldWidget) {
  super.didUpdateWidget(oldWidget);
  // 组件更新时调用
}

@override
void dispose() {
  // 清理资源，如取消订阅
  super.dispose();
}
```

---

## 动画

### 基础动画

```dart
// 透明度动画
FadeTransition(
  opacity: _controller,
  child: Text('Hello'),
)

// 缩放动画
ScaleTransition(
  scale: _controller,
  child: Container(color: Colors.blue),
)

// 旋转动画
RotationTransition(
  turns: _controller,
  child: Icon(Icons.star),
)
```

### 完整示例

```dart
class AnimatedWidget extends StatefulWidget {
  @override
  State<AnimatedWidget> createState() => _AnimatedWidgetState();
}

class _AnimatedWidgetState extends State<AnimatedWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: Duration(seconds: 1),
      vsync: this,
    );
    _animation = Tween<double>(begin: 0, end: 1).animate(_controller);
    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: _animation,
      child: Text('Hello Animation'),
    );
  }
}
```

---

## 组件封装

### 自定义 Widget

```dart
class CustomCard extends StatelessWidget {
  final String title;
  final String content;
  final VoidCallback? onTap;

  const CustomCard({
    Key? key,
    required this.title,
    required this.content,
    this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: Theme.of(context).textTheme.titleMedium),
              SizedBox(height: 8),
              Text(content),
            ],
          ),
        ),
      ),
    );
  }
}

// 使用
CustomCard(
  title: '标题',
  content: '内容',
  onTap: () => print('Tapped'),
)
```

---

## 调试技巧

### 日志输出

```dart
print('Debug: $variable');

// 生产环境日志
import 'package:flutter/foundation.dart';
debugPrint('Debug message');
```

### 条件渲染调试

```dart
// 只在调试模式执行
assert(() {
  // 检查逻辑
  return true;
}());
```

### 常用调试工具

| 工具 | 说明 |
|------|------|
| `flutter run -d <device>` | 指定设备运行 |
| `flutter inspect` | Widget 检查器 |
| `flutter analyze` | 代码分析 |
| `flutter test` | 运行测试 |

---

## 发布构建

### Android

```bash
# Debug 构建
flutter build apk --debug

# Release 构建
flutter build apk --release

# APK 位置: build/app/outputs/flutter-apk/
```

### iOS

```bash
# Debug 构建
flutter build ios --debug

# Release 构建（需配置签名）
flutter build ios --release
```

### Web

```bash
flutter build web
# 输出目录: build/web/
```
