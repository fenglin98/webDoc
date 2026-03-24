---
title: 搭建个人 GitHub.io 静态博客
date: 2026-02-13 14:32
author: Maple
tags:
  - GitHub
  - VuePress
categories:
  - 学习分享
---

:::tip 前言
本文详细介绍如何从零开始搭建一个基于 GitHub Pages 的静态博客网站，使用 VuePress 1.x + vuepress-reco 主题。涵盖从环境配置、项目创建到部署上线的完整流程，并附有常见问题解决方案。
:::

<!-- more -->

## 1，环境准备

### 1.1 安装 Node.js

VuePress 基于 Node.js 运行，请确保你的电脑已安装 Node.js 环境。

**检查方式：**

```bash
node -v
npm -v
```

**推荐版本：**
- Node.js: `>= 12.x`（VuePress 1.x 支持）
- npm: `>= 6.x`

**下载地址：** [https://nodejs.org/](https://nodejs.org/)

:::warning 注意
避免使用 Node.js 最新大版本（如 17+），可能出现兼容性问题。建议使用 LTS 版本。
:::

### 1.2 注册 GitHub 账号

如果你还没有 GitHub 账号，请前往 [https://github.com/](https://github.com/) 注册。

**重要提示：**
- 用户名将决定你的博客地址，如 `username.github.io`
- 用户名只能包含字母、数字和连字符
- 不能以连字符开头或结尾

### 1.3 安装 Git

Windows 用户推荐安装 Git Bash，下载地址：[https://git-scm.com/download/win](https://git-scm.com/download/win)

**验证安装：**

```bash
git --version
```

## 2，创建 GitHub 仓库

### 2.1 创建仓库

1. 登录 GitHub，点击右上角 `+` → `New repository`

2. 填写仓库信息：

| 配置项 | 说明 |
|:------|:-----|
| Repository name | `你的用户名.github.io`（必须） |
| Description | 个人博客（可选） |
| Public/Private | 选择 Public（免费托管需选择公开） |
| Initialize | 不勾选任何选项 |

:::danger 重要
仓库名称必须严格遵循 `用户名.github.io` 的格式，否则 GitHub Pages 将无法正确识别。
:::

### 2.2 本地关联仓库

创建仓库后，在本地进行关联：

```bash
# 进入你的项目文件夹
cd your-project-folder

# 初始化 Git
git init

# 添加远程仓库（将 username 替换为你的 GitHub 用户名）
git remote add origin https://github.com/username/username.github.io.git
```

## 3，创建 VuePress 项目

### 3.1 初始化项目

在项目根目录下初始化 package.json：

```bash
npm init -y
```

### 3.2 安装 VuePress 及 reco 主题

```bash
# 安装 VuePress 1.x
npm install vuepress@1 -D

# 安装 reco 主题 1.x
npm install vuepress-theme-reco@1 -D

# 安装必要插件（可选但推荐）
npm install vuepress-plugin-zooming -D   # 图片放大
npm install vuepress-plugin-one-click-copy -D  # 代码一键复制
```

:::warning 版本注意
VuePress 1.x 和 vuepress-theme-reco 1.x 必须配合使用，不要混用 2.x 版本。
:::

### 3.3 配置 package.json

在 `package.json` 的 `scripts` 中添加：

```json
{
  "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

如果使用 gh-pages 进行部署，还需要安装：

```bash
npm install gh-pages -D
```

## 4，项目结构

创建以下目录结构：

```
your-project/
├── docs/
│   ├── .vuepress/
│   │   ├── public/
│   │   │   └── img/
│   │   │       └── avatar.png
│   │   ├── config.js      # 核心配置文件
│   │   └── enhanceApp.js  # 主题增强配置
│   ├── README.md          # 首页
│   └── views/             # 文章目录
│       └── article.md
├── package.json
└── README.md
```

## 5，配置 VuePress

### 5.1 创建基础配置文件

在 `docs/.vuepress/` 下创建 `config.js`：

```javascript
module.exports = {
  title: '我的博客',
  description: '记录学习与成长',
  base: '/',  // 部署到根目录，如果部署到子路径请修改

  theme: 'reco',

  themeConfig: {
    logo: '/img/avatar.png',
    author: 'Your Name',
    authorAvatar: '/img/avatar.png',

    // 导航栏配置
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/article/' },
      { text: '关于', link: '/about/' }
    ],

    // 侧边栏配置
    sidebar: [
      {
        title: '学习笔记',
        collapsable: false,
        children: [
          ['/article/note1', '笔记一'],
          ['/article/note2', '笔记二']
        ]
      }
    ],

    // 评论功能（可选）
    valineConfig: {
      appId: 'your-app-id',
      appKey: 'your-app-key'
    }
  },

  // 插件配置
  plugins: [
    'vuepress-plugin-zooming',
    'vuepress-plugin-one-click-copy'
  ]
}
```

### 5.2 首页配置

在 `docs/README.md` 中配置首页：

```yaml
---
home: true
heroText: 我的技术博客
tagline: 记录学习点滴，分享技术成长
heroImage: /img/logo.png
heroImageStyle: { maxWidth: '120px', width: '100%' }
actionText: 开始阅读 →
actionLink: /article/
features:
  - title: 学习笔记
    details: 原创技术文章，深度总结
  - title: 问题记录
    details: 踩坑记录，经验分享
  - title: 资源整理
    details: 优质工具推荐，效率提升
footer: MIT Licensed | Copyright © 2024 Your Name
---
```

:::tip 提示
`heroImage` 和 `logo` 的路径是相对于 `.vuepress/public/` 目录的。
:::

## 6，创建文章

### 6.1 文章基本格式

每篇文章都需要在顶部添加 Front Matter：

```markdown
---
title: 文章标题
date: 2024-01-15
author: 作者名
tags:
  - 标签1
  - 标签2
categories:
  - 分类1
---

文章正文内容...

<!-- more -->

以下是摘要后的内容（首页只会显示 <!-- more --> 之前的内容）
```

### 6.2 reco 主题特有功能

**自定义容器：**

```markdown
:::tip 提示
这是一个提示框
:::

:::warning 警告
这是一个警告框
:::

:::danger 危险
这是一个危险警告
:::

:::details 点击查看详情
这里是隐藏的详情内容
:::
```

**评论功能：**

确保在 `config.js` 中配置了 valine（需要去 [LeanCloud](https://leancloud.cn/) 注册应用获取 appId 和 appKey）。

## 7，部署到 GitHub Pages

### 7.1 方式一：使用 gh-pages

1. 在 `package.json` 所在目录执行：

```bash
npm run deploy
```

2. 脚本会自动构建并推送到 `gh-pages` 分支

### 7.2 方式二：使用 GitHub Actions

在项目根目录创建 `.github/workflows/pages.yml`：

```yaml
name: GitHub Pages

on:
  push:
    branches:
      - main  # 你的主分支名称

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '16'

      - name: Cache npm dependencies
        uses: actions/cache@v3
        with:
          path: ~/.npm
          key: ${{ runner.os }}-npm-${{ hashFiles('**/package-lock.json') }}

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs/.vuepress/dist
          publish_branch: gh-pages
```

### 7.3 访问你的博客

部署完成后，访问 `https://你的用户名.github.io`

:::tip 首次部署
首次部署可能需要 5-10 分钟才能生效，之后通常在 1-2 分钟内更新。
:::

## 8，常见问题与解决方案

### 问题一：页面显示 404

**原因：**
- 仓库名称不正确
- 部署分支选择错误
- `base` 配置与仓库名称不匹配

**解决方案：**
1. 检查仓库名称是否为 `用户名.github.io`
2. 在 GitHub 仓库 `Settings` → `Pages` 中确认 Source 指向正确分支
3. 如果博客在子目录下，确保 `config.js` 中的 `base` 设置为 `/子目录名/`

### 问题二：CSS/JS/图片资源加载失败

**原因：**
- `base` 配置错误
- 资源路径使用了绝对路径

**解决方案：**
- 确保 `config.js` 中的 `base` 与实际部署路径一致
- 资源路径使用相对路径或正确的 `base` 前缀

### 问题三：部署后首页空白

**原因：**
- 路由模式问题
- 静态资源路径错误

**解决方案：**
在 `config.js` 中添加：

```javascript
module.exports = {
  // ...
  dest: './docs/.vuepress/dist',
  // 如果使用 hash 路由模式
  // base: '/仓库名/',
}
```

### 问题四：评论功能不可用

**原因：**
- 未正确配置 Valine
- LeanCloud 应用未设置安全域名

**解决方案：**
1. 确保在 [LeanCloud](https://leancloud.cn/) 创建了应用并获取了正确的 AppID 和 AppKey
2. 在应用设置中添加你的 GitHub Pages 域名到安全域名列表

### 问题五：npm install 报错

**常见错误：**
- `ERM` - 权限问题
- `EINTEGRITY` - 缓存损坏

**解决方案：**

```bash
# 清除 npm 缓存
npm cache clean --force

# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

### 问题六：热更新不生效

**原因：**
- `.vuepress/dist` 目录未清理

**解决方案：**

```bash
# 删除 dist 目录后重新运行
rm -rf docs/.vuepress/dist
npm run dev
```

### 问题七：构建成功但页面样式错乱

**原因：**
- 主题样式未正确加载

**解决方案：**
1. 检查 `.vuepress/public/` 目录是否存在且包含正确资源
2. 确认 `config.js` 中的主题配置正确

## 9，进阶配置

### 9.1 添加自定义样式

创建 `docs/.vuepress/styles/index.styl`：

```stylus
// 覆盖主题变量
$textColor = #2c3e50
$accentColor = #42b983
$borderColor = #eaecef

// 自定义样式
.home {
  .hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
  }
}
```

### 9.2 添加看板娘（可选）

```bash
npm install @vuepress-reco/vuepress-plugin-kan-ban-niang -D
```

在 `config.js` 中添加：

```javascript
plugins: [
  ['@vuepress-reco/vuepress-plugin-kan-ban-niang', {
    model: ['kanna', 'milktea'],
    clean: true
  }]
]
```

### 9.3 SEO 优化

安装 SEO 插件：

```bash
npm install vuepress-plugin-seo -D
```

配置：

```javascript
plugins: [
  ['vuepress-plugin-seo', {
    siteTitle: '我的博客',
    title: true,
    description: '博客描述',
    author: '作者名',
    tags: ['标签1', '标签2']
  }]
]
```

## 10，总结

通过以上步骤，你应该已经成功搭建了一个完整的个人博客。VuePress + reco 主题提供了：
- 简洁美观的界面
- Markdown 直接写文章
- 分类、标签、评论等博客功能
- 免费托管在 GitHub Pages

后续你可以根据需要添加更多插件、定制主题样式，持续丰富博客内容。

:::tip 建议
- 定期备份你的源文件到其他仓库
- 文章使用 Git 管理，方便追踪历史修改
- 可以购买自定义域名绑定 GitHub Pages
:::
