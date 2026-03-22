---
title: Ollama 使用指南
description: Ollama 本地大模型运行工具
date: 2026-03-15
author: Maple
---

## 简介

Ollama 是一款本地大模型运行工具，支持在本地部署和运行 Llama 2、Mistral、Gemma 等开源大模型。

**官网**: [https://ollama.com](https://ollama.com)
**GitHub**: [https://github.com/ollama/ollama](https://github.com/ollama/ollama)

---

## 安装

### macOS

```bash
# 使用 Homebrew 安装
brew install ollama
```

### Linux

```bash
# 一键安装
curl -fsSL https://ollama.com/install.sh | sh
```

### Windows

从 [官网下载页](https://ollama.com/download) 下载安装包，双击运行即可。

---

## 快速开始

### 启动服务

```bash
# 启动 Ollama
ollama serve
```

服务默认运行在 `http://localhost:11434`

### 拉取模型

```bash
# 拉取 Llama 2
ollama pull llama2

# 拉取 Mistral
ollama pull mistral

# 拉取 Gemma
ollama pull gemma
```

### 运行模型

```bash
# 命令行交互
ollama run llama2

# 示例输出
>>> 你好，请介绍一下你自己
我是 Llama 2，由 Meta AI 训练的大型语言模型。我可以回答问题、提供信息和进行对话。
```

---

## 常用命令

| 命令 | 说明 |
|------|------|
| `ollama serve` | 启动服务 |
| `ollama pull <模型>` | 拉取模型 |
| `ollama run <模型>` | 运行模型 |
| `ollama list` | 列出已下载模型 |
| `ollama rm <模型>` | 删除模型 |
| `ollama cp <源> <目标>` | 复制模型 |
| `ollama show <模型>` | 查看模型信息 |

---

## API 调用

### REST API

```bash
# 对话接口
curl http://localhost:11434/api/chat -d '{
  "model": "llama2",
  "messages": [
    { "role": "user", "content": "你好" }
  ]
}'

# 生成接口
curl http://localhost:11434/api/generate -d '{
  "model": "llama2",
  "prompt": "写一个 Python Hello World"
}'
```

### Python SDK

```bash
pip install ollama
```

```python
import ollama

# 对话
response = ollama.chat(model='llama2', messages=[
    {'role': 'user', 'content': '你好'}
])
print(response['message']['content'])

# 生成
response = ollama.generate(model='llama2', prompt='写一个 JS 定时器')
print(response['response'])
```

### Node.js SDK

```bash
npm install ollama
```

```javascript
import Ollama from 'ollama'

// 对话
const response = await Ollama.chat({
    model: 'llama2',
    messages: [{ role: 'user', content: '你好' }]
})
console.log(response.message.content)
```

---

## 模型列表

### 热门模型

| 模型 | 大小 | 说明 |
|------|------|------|
| llama2 | 3.8GB | Meta 开源模型，适合通用对话 |
| mistral | 4.1GB | 高性能稀疏 mixture-of-experts |
| gemma | 2GB | Google 轻量级模型 |
| codellama | 3.8GB | 代码专用模型 |
| neural-chat | 4.1GB | 优化对话体验 |

### 查看更多模型

访问 [https://ollama.com/library](https://ollama.com/library) 浏览全部模型。

---

## 自定义模型

### 导入已有模型

```bash
# 从 Safetensors 格式导入
ollama create custom-model -f /path/to/model
```

### Modelfile 配置

创建 `Modelfile` 自定义模型行为：

```dockerfile
FROM llama2

# 设置系统提示
SYSTEM """
你是一个专业的 Python 程序员，只回答 Python 相关问题。
"""

# 设置参数
PARAMETER temperature 0.7
PARAMETER top_p 0.9

# 安装初始 prompt
MESSAGE user 你好，请介绍一下自己
MESSAGE assistant 你好！我是一个 Python 编程助手。
```

```bash
# 创建自定义模型
ollama create python-assistant -f Modelfile

# 运行
ollama run python-assistant
```

---

## 常见问题

### 显存不足

模型需要足够内存，建议：

- Llama 2 7B: 至少 8GB 显存/内存
- Mistral 7B: 至少 8GB 显存/内存
- Gemma 2B: 至少 4GB 显存/内存

### 推理速度慢

- 使用量化模型（q4_0, q4_1, q5_1 等）
- 关闭其他占用内存的程序
- 使用 GPU 加速（NVIDIA GPU + CUDA）

### 后台运行

```bash
# Linux/macOS 后台启动
nohup ollama serve > ollama.log 2>&1 &

# Windows 使用任务计划程序或 nssm
```

---

## 配置

### 存储位置

| 系统 | 路径 |
|------|------|
| macOS | `~/.ollama` |
| Linux | `~/.ollama` |
| Windows | `C:\Users\<用户>\.ollama` |

### 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `OLLAMA_HOST` | 服务地址 | `127.0.0.1:11434` |
| `OLLAMA_MODELS` | 模型存储路径 | `~/.ollama/models` |
| `OLLAMA_NUM_PARALLEL` | 并行数量 | `1` |
| `OLLAMA_MAX_LOADED_MODELS` | 最大加载模型数 | `1` |
