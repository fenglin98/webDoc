---
title: Claude Code 接入指南
description: 记录如何安装、配置及使用 Claude Code 命令行工具
date: 2026-03-15
author: Maple
---

## 安装 Claude Code

Claude Code 是 Anthropic 提供的命令行工具，允许开发者通过终端与 Claude 进行交互式协作。安装前请确保 Node.js 版本 >= 18.0。

```bash
# 使用 npm 全局安装
npm install -g @anthropic-ai/claude-code

# 验证安装成功
claude --version
```

## 初始化配置

首次使用需要进行身份验证，配置 API 密钥或完成 OAuth 登录

```bash

# 启动配置向导
claude auth

# 或直接设置 API 密钥
export ANTHROPIC_API_KEY="your-api-key-here"
```

配置完成后，可通过以下命令测试连接：

```bash
claude --model claude-3-5-sonnet-20241022 "Hello, introduce yourself"
```

## 基本使用方式

### 交互式会话

直接在终端中启动交互式对话：

```bash
claude 
```

## 单次命令模式

### 通过管道或直接传入指令，获取单次响应

```bash

# 直接提问
claude "解释一下什么是闭包"

# 结合管道使用
cat file.js | claude "分析这段代码的性能问题"

```

## 文件操作与上下文

### Claude Code 可以读取当前目录下的文件作为上下文

```bash

# 将代码文件作为上下文
claude --file ./src/index.js "这个函数有什么问题？"

# 批量添加文件
claude --file ./src/*.ts "为这些 TypeScript 文件生成类型定义"
```

## 常用配置选项

| 选项 | 说明 |
|-------|-------|
| model | 指定使用的模型版本 |
| max-tokens | 设置响应最大   token 数|
| temperature | 控制输出随机性（0-1） |
| file | 添加文件作为上下文 |

实例

```bsah
claude --model claude-3-haiku-20240307 --temperature 0.5 "写一个快速排序"

```

## 注意事项


1.API 密钥请妥善保管，避免提交到代码仓库

2.交互模式下使用 Ctrl + C 退出会话

3.长文本处理时注意 token 限制，建议分批处理

4.企业用户可配置代理环境变量 HTTP_PROXY 和 HTTPS_PROXY