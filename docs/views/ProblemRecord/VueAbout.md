---
title: Vue 问题记录
description: 记录所遇到的Vue相关问题
date: 2026-03-15
author: Maple
---

## Vue2 响应式原理

Vue2 使用 Object.defineProperty() 实现响应式，但存在以下问题：

### 数组响应式问题

Vue2 中直接通过索引设置数组元素不是响应式的：

```javascript
// ❌ 不是响应式的
this.items[0] = newValue;

// ✅ 使用 Vue.set 或 this.$set
Vue.set(this.items, 0, newValue);
this.$set(this.items, 0, newValue);

// ✅ 或者使用 splice
this.items.splice(0, 1, newValue);
```

### 对象响应式问题

动态添加的属性不是响应式的：

```javascript
// ❌ 新增属性不是响应式的
this.user.newProp = '新属性';

// ✅ 使用 Vue.set
Vue.set(this.user, 'newProp', '新属性');
this.$set(this.user, 'newProp', '新属性');

// ✅ 替换整个对象（确保新对象是响应式的）
this.user = { ...this.user, newProp: '新属性' };
```

---

## 组件通信问题

### 父子组件通信

| 通信方式 | 适用场景 |
|----------|----------|
| `props` / `$emit` | 父子组件间 |
| `$parent` / `$children` | 父子组件间（不推荐） |
| `$refs` | 父组件访问子组件实例 |
| `provide` / `inject` | 祖先与后代组件间 |

```javascript
// 父组件
<ChildComponent
    :message="parentMessage"
    @update="handleUpdate"
    ref="childRef"
/>

// 子组件
props: {
    message: String
},
methods: {
    sendToParent() {
        this.$emit('update', '数据');
    }
}
```

### 兄弟组件通信

通过中央事件总线（EventBus）：

```javascript
// eventBus.js
import Vue from 'vue';
export const eventBus = new Vue();

// 组件 A - 发送
import { eventBus } from '@/eventBus';
eventBus.$emit('message', '来自 A 的数据');

// 组件 B - 接收
import { eventBus } from '@/eventBus';
eventBus.$on('message', (data) => {
    console.log(data);
});

// 组件销毁时移除监听
eventBus.$off('message');
```

---

## 路由相关问题

### 路由参数获取

```javascript
// 组件中获取路由参数
this.$route.params.id      // 动态路由参数
this.$route.query.name     // URL 查询参数
this.$route.hash           // URL hash 值
```

### 路由守卫

```javascript
// 全局前置守卫
router.beforeEach((to, from, next) => {
    // to: 目标路由
    // from: 当前路由
    // next: 确认导航
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});

// 组件内守卫
export default {
    beforeRouteEnter(to, from, next) {
        // 组件渲染前调用，this 不可用
        next(vm => {
            // 通过 vm 访问组件实例
        });
    },
    beforeRouteLeave(to, from, next) {
        // 离开组件时调用
        const answer = window.confirm('确定要离开吗？');
        if (answer) {
            next();
        } else {
            next(false);
        }
    }
}
```

---

## 生命周期钩子顺序

```
beforeCreate → created → beforeMount → mounted
→ beforeUpdate → updated
→ beforeDestroy → destroyed
```

### keep-alive 缓存组件

```html
<keep-alive include="Home,About">
    <router-view />
</keep-alive>
```

```javascript
// 缓存后多出两个钩子
activated() {},   // 被激活
deactivated() {}  // 被停用
```

---

## v-for 使用问题

### 必加 key

```html
<!-- ❌ 不推荐：未使用 key -->
<div v-for="item in items">{{ item.name }}</div>

<!-- ✅ 推荐：使用唯一 key -->
<div v-for="item in items" :key="item.id">{{ item.name }}</div>
```

### v-if 与 v-for 优先级

v-for 优先级更高，但不要同时使用：

```html
<!-- ❌ 不推荐：v-for 和 v-if 同时使用 -->
<div v-for="item in items" v-if="item.show">{{ item.name }}</div>

<!-- ✅ 正确：先过滤再遍历 -->
<div v-for="item in filteredItems" :key="item.id">{{ item.name }}</div>

<script>
computed: {
    filteredItems() {
        return this.items.filter(item => item.show);
    }
}
</script>
```

---

## computed 与 watch

### computed 计算属性

用于派生数据，自动缓存，依赖变化时重新计算：

```javascript
computed: {
    fullName() {
        return this.firstName + ' ' + this.lastName;
    },
    // 完整写法（可设置 getter/setter）
    fullNameFull: {
        get() {
            return this.firstName + ' ' + this.lastName;
        },
        set(val) {
            [this.firstName, this.lastName] = val.split(' ');
        }
    }
}
```

### watch 侦听器

用于响应数据变化执行异步操作：

```javascript
watch: {
    // 简单写法
    message(newVal, oldVal) {
        console.log('变化了');
    },
    // 完整写法（深度监听）
    info: {
        handler(newVal) {
            console.log('info 变化了');
        },
        deep: true,    // 深度监听
        immediate: true  // 立即执行
    }
}
```

---

## slot 插槽问题

### 作用域插槽

子组件向父组件传递数据：

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

### 动态插槽名

```html
<base-component>
    <template #[slotName]>
        动态插槽内容
    </template>
</base-component>

<script>
data() {
    return {
        slotName: 'header'
    };
}
</script>
```

---

## nextTick 使用

DOM 更新是异步的，需要 nextTick 获取更新后的 DOM：

```javascript
methods: {
    async updateContent() {
        this.content = '新内容';
        // ❌ 此时 DOM 还未更新
        console.log(this.$refs.text.innerText);

        // ✅ 使用 nextTick
        await this.$nextTick();
        console.log(this.$refs.text.innerText);  // 新内容
    }
}
```

---

## filters 过滤器（Vue2）

Vue2 支持过滤器，Vue3 已移除：

```html
<!-- 使用过滤器 -->
{{ name | capitalize }}
{{ date | formatDate('YYYY-MM-DD') }}

<script>
filters: {
    capitalize(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    },
    formatDate(value, format) {
        // ...
    }
}
</script>
```

Vue3 中建议使用计算属性或方法替代。
