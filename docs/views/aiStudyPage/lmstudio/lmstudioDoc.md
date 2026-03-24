---
title: LM Studio 使用指南
description: LM Studio 本地大模型运行工具
date: 2026-02-23 15:07
author: Maple
---

## 简介

LM Studio 是一款本地大模型运行工具，支持在本地部署和运行各种开源大模型，提供图形界面和 API 服务。

**官网**: [https://lmstudio.ai](https://lmstudio.ai)
**GitHub**: [https://github.com/lmstudio-ai/lmstudio](https://github.com/lmstudio-ai/lmstudio)

---

## 安装

### macOS

```bash
# 使用 Homebrew 安装
brew install lmstudio
```

或从 [官网下载页](https://lmstudio.ai/download) 下载 `.dmg` 文件安装。

### Linux

```bash
# 下载 AppImage
chmod +x LM_Studio_x.x.x.AppImage
./LM_Studio_x.x.x.AppImage
```

或使用 `.deb` 包：

```bash
sudo dpkg -i lmstudio_linux_x.x.x.deb
```

### Windows

从 [官网下载页](https://lmstudio.ai/download) 下载 `.exe` 安装包，双击运行即可。

---

## 快速开始

### 图形界面

1. 启动 LM Studio
2. 在左侧搜索框中搜索模型（如 `llama`, `mistral`）
3. 点击 Download 下载模型
4. 选择模型后在顶部选择聊天模式
5. 开始对话

### API 服务

1. 点击左侧 **Developer** 选项卡
2. 点击 **Start Local Server**
3. 服务默认运行在 `http://localhost:1234`
4. 选择要加载的模型

---

## 常用操作

### 下载模型

在图形界面中：
1. 搜索框输入模型名称
2. 选择模型版本（推荐最新版本）
3. 点击下载按钮
4. 等待下载完成

### 模型存储位置

| 系统 | 路径 |
|------|------|
| macOS | `~/.lmstudio` |
| Linux | `~/.lmstudio` |
| Windows | `C:\Users\<用户>\.lmstudio` |

### 加载模型

1. 点击顶部模型选择器
2. 从本地模型列表选择
3. 等待模型加载完成（显示进度条）
4. 开始使用

---

## API 调用

### OpenAI 兼容接口

LM Studio 提供 OpenAI 兼容的 API，可直接替换使用：

```bash
# 对话接口
curl http://localhost:1234/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "local-model",
    "messages": [
      {"role": "user", "content": "你好"}
    ]
  }'

# 生成接口
curl http://localhost:1234/v1/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "local-model",
    "prompt": "写一个 Python Hello World"
  }'

# 模型列表
curl http://localhost:1234/v1/models
```

### Python SDK

```bash
pip install openai
```

```python
from openai import OpenAI

client = OpenAI(base_url="http://localhost:1234/v1", api_key="lm-studio")

# 对话
response = client.chat.completions.create(
    model="local-model",
    messages=[
        {"role": "user", "content": "你好"}
    ]
)
print(response.choices[0].message.content)

# 生成
response = client.completions.create(
    model="local-model",
    prompt="写一个 JS 定时器"
)
print(response.choices[0].text)
```

### Node.js SDK

```bash
npm install openai
```

```javascript
import OpenAI from 'openai'

const client = new OpenAI({
    baseURL: 'http://localhost:1234/v1',
    apiKey: 'lm-studio'
})

// 对话
const response = await client.chat.completions.create({
    model: 'local-model',
    messages: [{ role: 'user', content: '你好' }]
})
console.log(response.choices[0].message.content)
```

---

## 配置选项

### Server 选项

| 选项 | 说明 | 默认值 |
|------|------|--------|
| Port | 服务端口 | 1234 |
| Model | 默认加载模型 | - |
| Context Length | 上下文长度 | 模型最大值 |
| GPU Offload | GPU 卸载层数 | 最大 |
| Batch Size | 批处理大小 | 512 |

### Model 选项

| 选项 | 说明 | 默认值 |
|------|------|--------|
| Temperature | 随机性 | 0.8 |
| Max Tokens | 最大生成token | 4096 |
| Top P | 核采样概率 | 0.9 |
| Frequency Penalty | 频率惩罚 | 0 |
| Presence Penalty | 存在惩罚 | 0 |

---

## 常见问题

### 模型加载失败

1. 确认模型文件完整（重新下载）
2. 检查磁盘空间是否充足
3. 关闭其他占用内存的程序
4. 降低 GPU Offload 层数

### 显存不足

1. 减少 GPU Offload 层数
2. 使用量化模型（Q4_K_M 等）
3. 降低 Context Length
4. 关闭其他 GPU 程序

### API 连接失败

1. 确认 Server 已启动
2. 检查端口是否被占用
3. 防火墙允许 1234 端口
4. 确认模型已加载

---

## 与 Ollama 对比

| 特性 | LM Studio | Ollama |
|------|-----------|--------|
| 图形界面 | 有 | 无 |
| API 兼容 | OpenAI | 自有 |
| 模型格式 | Llama.cpp | 自有 |
| 跨平台 | 支持 | 支持 |
| 资源占用 | 较高 | 较低 |
| 配置灵活度 | 高 | 中 |
