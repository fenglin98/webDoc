---
title: Vue3 学习笔记
description: Vue3 框架学习笔记
date: 2026-02-01 07:18
author: Maple
---

## 概述

Vue3 是 Vue.js 的最新主要版本，相比 Vue2 有显著升级。

**新特性**：
- Composition API
- Teleport 传送门
- Fragments 多根节点
- Suspense 异步组件
- TypeScript 支持
- 更好的性能（Proxy 响应式）

---

## 基础语法

### 模板语法

```html
<div :class="className"></div>          <!-- 绑定属性 -->
<button @click="handleClick"></button>  <!-- 绑定事件 -->
<ChildComponent :msg="msg" @update="handle" />
```

### 响应式变量

```javascript
import { ref, reactive } from 'vue'

// ref 用于基本类型
const count = ref(0)
count.value++

// reactive 用于对象
const state = reactive({
  name: 'Vue3',
  version: 3
})
state.name = 'Vue'
```

---

## Composition API

### setup

`setup` 是 Composition API 的入口，在 `beforeCreate` 前执行：

```javascript
export default {
  setup() {
    const message = ref('Hello Vue3')

    const handleClick = () => {
      message.value = 'Clicked'
    }

    return { message, handleClick }
  }
}
```

### 生命周期

```javascript
import { onMounted, onUpdated, onUnmounted } from 'vue'

export default {
  setup() {
    onMounted(() => { console.log('mounted') })
    onUpdated(() => { console.log('updated') })
    onUnmounted(() => { console.log('unmounted') })
  }
}
```

| Vue2 钩子 | Vue3 Composition API |
|-----------|---------------------|
| `beforeCreate` | `setup` |
| `created` | `setup` |
| `beforeMount` | `onBeforeMount` |
| `mounted` | `onMounted` |
| `beforeUpdate` | `onBeforeUpdate` |
| `updated` | `onUpdated` |
| `beforeDestroy` | `onBeforeUnmount` |
| `destroyed` | `onUnmounted` |
| `errorCaptured` | `onErrorCaptured` |

### 计算属性

```javascript
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed(() => firstName.value + ' ' + lastName.value)

const fullNameRW = computed({
  get() { return firstName.value + ' ' + lastName.value },
  set(val) { [firstName.value, lastName.value] = val.split(' ') }
})
```

### 侦听器

```javascript
import { ref, watch } from 'vue'

const message = ref('Hello')

// 简单监听
watch(message, (newVal, oldVal) => {
  console.log(`${oldVal} -> ${newVal}`)
})

// 深度监听
const state = ref({ count: 0 })
watch(state, (newVal) => { console.log('changed') }, { deep: true })

// 监听多个
watch([message, state], ([msg, st]) => {
  console.log(msg, st.count)
})

// 立即执行
watch(message, (newVal) => { console.log(newVal) }, { immediate: true })
```

---

## 依赖注入

provide / inject 实现祖先向后代传值：

```javascript
// 祖先组件
import { provide, ref } from 'vue'
const message = ref('来自祖先')
provide('message', message)
provide('greet', (name) => `Hello ${name}`)

// 后代组件
import { inject } from 'vue'
const message = inject('message')
const greet = inject('greet')
console.log(message.value)  // 来自祖先
console.log(greet('Vue'))   // Hello Vue
```

---

## 组件通信

### defineProps / defineEmits

```javascript
// 子组件
const props = defineProps({
  title: String,
  count: { type: Number, default: 0 }
})

const emit = defineEmits(['update', 'delete'])

emit('update', newValue)
emit('delete', id)
```

```html
<!-- 父组件 -->
<ChildComponent
  :count="count"
  @update="handleUpdate"
/>
```

### expose / defineExpose

子组件显式暴露属性和方法：

```javascript
// 子组件
defineExpose({
  name: 'ChildComponent',
  method: () => console.log('method called')
})

// 父组件
<ChildComponent ref="childRef" />
<script>
const child = childRef.value
console.log(child.name)  // ChildComponent
child.method()           // method called
</script>
```

---

## 响应式原理

Vue3 使用 Proxy 实现响应式：

```javascript
import { reactive, ref } from 'vue'

// ref 原理
function ref(value) {
  return {
    _value: value,
    get value() { track() },
    set value(newVal) { trigger() }
  }
}

// reactive 原理
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) { track(target, key) },
    set(target, key, value) { target[key] = value; trigger(target, key) }
  })
}
```

---

## 内置组件

### Teleport

传送到指定 DOM 位置：

```html
<Teleport to="body">
  <div class="modal">模态框</div>
</Teleport>

<Teleport to="#modal-container">
  <div>传送到指定容器</div>
</Teleport>
```

### Suspense

异步组件加载状态：

```html
<Suspense>
  <template #default>
    <AsyncComponent />
  </template>
  <template #fallback>
    <div>加载中...</div>
  </template>
</Suspense>
```

```javascript
const AsyncComponent = defineAsyncComponent(() =>
  import('./AsyncComponent.vue')
)
```

### Transition / TransitionGroup

```html
<Transition name="fade">
  <div v-if="show">内容</div>
</Transition>

<TransitionGroup name="list">
  <div v-for="item in list" :key="item.id">{{ item.name }}</div>
</TransitionGroup>
```

```css
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.list-enter-active, .list-leave-active { transition: all 0.3s; }
.list-move { transition: transform 0.3s; }
```

---

## 路由

### 基本配置

```javascript
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: Home },
  { path: '/about/:id', component: About }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

### 组合式 API

```javascript
import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()

    const id = route.params.id
    router.push('/')
  }
}
```

### 导航守卫

```javascript
// 全局前置
router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !isAuth) return '/login'
})

// 组件内
onBeforeRouteEnter((to, from) => {
  // 无法访问 this，可通过 next(vm => { vm.xxx }) 回调访问
})
onBeforeRouteLeave((to, from) => {
  const answer = window.confirm('确定离开？')
  if (!answer) return false
})
```

---

## Pinia 状态管理

Vue3 推荐的状态管理库（Vuex 替代品）：

### 定义 Store

```javascript
// stores/counter.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  function increment() { count.value++ }

  return { count, doubleCount, increment }
})
```

### 组件中使用

```javascript
import { useCounterStore } from '@/stores/counter'

export default {
  setup() {
    const store = useCounterStore()

    // 解构响应式
    import { storeToRefs } from 'pinia'
    const { count, doubleCount } = storeToRefs(store)

    // 方法直接解构
    const { increment } = store

    return { count, doubleCount, increment }
  }
}
```

---

## 指令

### 自定义指令

```javascript
// 全局指令
const vFocus = {
  mounted: (el) => el.focus()
}

// 局部指令
const vLoading = {
  mounted(el, binding) {
    if (binding.value) el.style.opacity = '0.5'
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      el.style.opacity = binding.value ? '0.5' : '1'
    }
  }
}

export default {
  directives: { focus: vFocus, loading: vLoading }
}
```

### 带参数指令

```javascript
const vColor = {
  mounted(el, binding) {
    el.style.color = binding.value
  }
}

<div v-color="'red'">红色文字</div>
```

---

## TypeScript 支持

### 定义类型

```typescript
interface Props {
  title: string
  count?: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update', value: string): void
  (e: 'delete', id: number): void
}>()
```

### 泛型组件

```typescript
import { ref } from 'vue'

function useData<T>(url: string) {
  const data = ref<T | null>(null)
  const loading = ref(false)

  const fetchData = async () => {
    loading.value = true
    const res = await fetch(url)
    data.value = await res.json()
    loading.value = false
  }

  return { data, loading, fetchData }
}
```

---

## 异步组件

### defineAsyncComponent

```javascript
import { defineAsyncComponent } from 'vue'

const AsyncModal = defineAsyncComponent(() =>
  import('./components/Modal.vue')
)

// 带加载组件
const AsyncModal = defineAsyncComponent({
  loader: () => import('./Modal.vue'),
  loadingComponent: LoadingSpinner,
  delay: 200
})
```

---

## 新增功能

### toRef / toRefs

将响应式对象的属性转为 ref：

```javascript
import { reactive, toRef, toRefs } from 'vue'

const state = reactive({ name: 'Vue', version: 3 })

// 单个属性
const name = toRef(state, 'name')
name.value = 'Vue3'

// 整个对象
const stateRefs = toRefs(state)
// { name: Ref, version: Ref }
```

### markRaw

标记对象为非响应式：

```javascript
import { reactive, markRaw } from 'vue'

const obj = markRaw({ count: 0 })
const state = reactive({ obj })
// state.obj.count 变化不会触发响应式更新
```

### shallowRef / shallowReactive

浅层响应式：

```javascript
import { shallowRef, shallowReactive } from 'vue'

const state = shallowReactive({
  deep: { nested: { value: 1 } }
  // 嵌套对象不是响应式的
})
```
