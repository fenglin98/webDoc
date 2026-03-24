---
title: Vue2 学习笔记
description: Vue2 框架学习笔记
date: 2026-02-12 00:35
author: Maple
---

## 概述

Vue2 是一款渐进式 JavaScript 框架，用于构建用户界面。

**特点**：
- 响应式数据绑定
- 组件化开发
- 指令系统
- 单文件组件（SFC）

---

## 基础语法

### 模板语法

```html
<div id="app">
  {{ message }}                    <!-- 文本插值 -->
  <div v-html="rawHtml"></div>      <!-- HTML 插值 -->
  <div :class="className"></div>    <!-- 属性绑定 -->
  <button @click="handleClick"></button>  <!-- 事件绑定 -->
</div>
```

### 指令

| 指令 | 说明 |
|------|------|
| `v-if` | 条件渲染 |
| `v-show` | 显示/隐藏切换 |
| `v-for` | 列表渲染 |
| `v-bind` | 属性绑定（缩写 `:`） |
| `v-on` | 事件绑定（缩写 `@`） |
| `v-model` | 双向绑定 |
| `v-slot` | 插槽 |

---

## 响应式原理

Vue2 使用 `Object.defineProperty()` 实现响应式：

```javascript
// 数组响应式问题
this.items[0] = newValue  // ❌ 不响应
this.$set(this.items, 0, newValue)  // ✅ 响应
this.items.splice(0, 1, newValue)  // ✅ 响应

// 对象响应式问题
this.user.newProp = 'value'  // ❌ 不响应
this.$set(this.user, 'newProp', 'value')  // ✅ 响应
```

---

## 生命周期

```
beforeCreate → created → beforeMount → mounted
→ beforeUpdate → updated
→ beforeDestroy → destroyed
```

| 钩子 | 说明 |
|------|------|
| `beforeCreate` | 实例初始化后 |
| `created` | 实例创建完成（可访问 data） |
| `beforeMount` | 挂载前 |
| `mounted` | 挂载完成 |
| `beforeUpdate` | 数据更新前 |
| `updated` | 更新完成 |
| `beforeDestroy` | 销毁前 |
| `destroyed` | 销毁完成 |

### keep-alive 缓存

```html
<keep-alive include="Home,About">
  <router-view />
</keep-alive>
```

缓存组件额外钩子：`activated` / `deactivated`

---

## 组件

### 组件注册

```javascript
// 全局注册
Vue.component('my-component', {
  template: '<div>组件内容</div>'
})

// 局部注册
import MyComponent from './MyComponent.vue'
export default {
  components: { MyComponent }
}
```

### Props

```javascript
props: {
  title: String,
  count: {
    type: Number,
    required: true,
    default: 0
  }
}
```

### 事件

```javascript
// 子组件
this.$emit('update', data)

// 父组件
<ChildComponent @update="handleUpdate" />
```

---

## 计算属性与侦听器

### computed

```javascript
computed: {
  fullName() {
    return this.firstName + ' ' + this.lastName
  },
  fullNameFull: {
    get() { return this.firstName + ' ' + this.lastName },
    set(val) { [this.firstName, this.lastName] = val.split(' ') }
  }
}
```

### watch

```javascript
watch: {
  message(newVal, oldVal) {
    console.log('变化了')
  },
  info: {
    handler(newVal) { console.log('info 变化了') },
    deep: true,
    immediate: true
  }
}
```

---

## 组件通信

| 方式 | 适用场景 |
|------|----------|
| `props` / `$emit` | 父子组件 |
| `$parent` / `$children` | 父子组件（不推荐） |
| `$refs` | 父访问子组件 |
| `provide` / `inject` | 祖先与后代 |
| EventBus | 兄弟组件 |
| Vuex | 全局状态管理 |

### EventBus

```javascript
// eventBus.js
import Vue from 'vue'
export const bus = new Vue()

// 组件 A
bus.$emit('event', data)

// 组件 B
bus.$on('event', (data) => { console.log(data) })
bus.$off('event')  // 销毁时移除
```

---

## 插槽

### 作用域插槽

```html
<!-- Child.vue -->
<slot :item="item" :index="index"></slot>

<!-- Parent.vue -->
<Child>
  <template v-slot:default="{ item, index }">
    <div>{{ index }}: {{ item.name }}</div>
  </template>
</Child>
```

### 动态插槽

```html
<base-component>
  <template #[slotName]>
    动态插槽内容
  </template>
</base-component>
```

---

## 路由

### 基本配置

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/about/:id', component: About, props: true }
]

const router = new VueRouter({ routes })

new Vue({ router }).$mount('#app')
```

### 路由守卫

```javascript
// 全局前置
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuth) {
    next('/login')
  } else {
    next()
  }
})

// 组件内
beforeRouteEnter(to, from, next) {
  next(vm => { /* 通过 vm 访问组件 */ })
}
```

---

## Vuex 状态管理

### 核心概念

```
State → Mutations → Actions → Getters
```

### 基本使用

```javascript
// store.js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) { state.count++ }
  },
  actions: {
    async increment({ commit }) {
      await api.call()
      commit('increment')
    }
  },
  getters: {
    doubleCount: state => state.count * 2
  }
})
```

```javascript
// 组件中使用
this.$store.state.count
this.$store.commit('increment')
this.$store.dispatch('increment')
this.$store.getters.doubleCount

// map辅助函数
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
computed: { ...mapState(['count']), ...mapGetters(['doubleCount']) }
methods: { ...mapMutations(['increment']), ...mapActions(['increment']) }
```

---

## 过滤器

Vue2 支持过滤器（Vue3 已移除）：

```html
{{ name | capitalize }}
{{ date | formatDate('YYYY-MM-DD') }}
```

```javascript
filters: {
  capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```

建议用计算属性或方法替代。

---

## nextTick

DOM 更新异步执行：

```javascript
async updateContent() {
  this.content = '新内容'
  await this.$nextTick()
  console.log(this.$refs.text.innerText)  // 获取更新后的 DOM
}
```

---

## 过渡动画

```html
<transition name="fade">
  <div v-if="show">内容</div>
</transition>
```

```css
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
```

---

## 混入 (Mixin)

```javascript
// mixin.js
export default {
  data() { return { shared: 'shared' } },
  created() { console.log('mixin created') }
}

// 组件使用
import mixin from './mixin'
export default {
  mixins: [mixin]
}
```

---

## 自定义指令

```javascript
// 全局指令
Vue.directive('focus', {
  inserted(el) { el.focus() }
})

// 局部指令
directives: {
  focus: {
    inserted(el) { el.focus() }
  }
}
```

```html
<input v-focus />
```
