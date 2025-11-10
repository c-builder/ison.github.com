# Nuxt 深入浅出教程

## 目录
1. [Nuxt 简介](#nuxt-简介)
2. [环境搭建与项目初始化](#环境搭建与项目初始化)
3. [核心概念](#核心概念)
4. [路由系统](#路由系统)
5. [页面与布局](#页面与布局)
6. [组件开发](#组件开发)
7. [数据获取](#数据获取)
8. [状态管理](#状态管理)
9. [插件系统](#插件系统)
10. [中间件](#中间件)
11. [模块系统](#模块系统)
12. [SEO优化](#seo优化)
13. [性能优化](#性能优化)
14. [部署上线](#部署上线)
15. [进阶实战](#进阶实战)

---

## Nuxt 简介

### 什么是 Nuxt？

Nuxt 是一个基于 Vue.js 的高级框架，用于创建现代化的 Web 应用程序。它提供了服务端渲染（SSR）、静态站点生成（SSG）和单页应用（SPA）等多种渲染模式。

### Nuxt 的核心优势

1. **服务端渲染（SSR）**：提升首屏加载速度和 SEO 效果
2. **自动路由**：基于文件系统的路由，无需手动配置
3. **代码分割**：自动优化打包，提升性能
4. **强大的模块生态**：丰富的官方和社区模块
5. **开发体验优秀**：热模块替换、TypeScript 支持等

### Nuxt 2 vs Nuxt 3

| 特性 | Nuxt 2 | Nuxt 3 |
|------|--------|--------|
| Vue 版本 | Vue 2 | Vue 3 |
| 构建工具 | Webpack | Vite/Webpack |
| TypeScript | 需要配置 | 原生支持 |
| Composition API | 需要插件 | 原生支持 |
| 性能 | 良好 | 更优秀 |
| 包体积 | 较大 | 更小 |

**本教程主要基于 Nuxt 3，因为它是未来的趋势。**

---

## 环境搭建与项目初始化

### 前置要求

- Node.js 16.x 或更高版本
- npm、yarn 或 pnpm 包管理器
- 基础的 Vue.js 知识

### 创建 Nuxt 3 项目

#### 方法一：使用 nuxi（推荐）

```bash
# 使用 npx
npx nuxi@latest init my-nuxt-app

# 使用 pnpm（推荐）
pnpm dlx nuxi@latest init my-nuxt-app

# 使用 yarn
yarn dlx nuxi@latest init my-nuxt-app
```

#### 方法二：使用模板

```bash
git clone https://github.com/nuxt/starter my-nuxt-app
cd my-nuxt-app
pnpm install
```

### 项目结构

```
my-nuxt-app/
├── .nuxt/              # 构建输出目录（自动生成）
├── .output/            # 生产构建输出
├── assets/             # 静态资源（需要处理）
├── components/         # Vue 组件
├── composables/        # 组合式函数
├── content/            # Nuxt Content 内容
├── layouts/            # 布局组件
├── middleware/         # 路由中间件
├── pages/              # 页面组件（自动路由）
├── plugins/            # 插件
├── public/             # 静态文件（直接访问）
├── server/             # 服务端代码
│   ├── api/           # API 路由
│   ├── routes/        # 服务端路由
│   └── middleware/    # 服务端中间件
├── utils/              # 工具函数
├── app.vue             # 根组件
├── nuxt.config.ts      # Nuxt 配置文件
├── package.json        # 项目依赖
└── tsconfig.json       # TypeScript 配置
```

### 启动开发服务器

```bash
cd my-nuxt-app
pnpm install
pnpm dev
```

访问 `http://localhost:3000` 查看应用。

### 基础配置

#### nuxt.config.ts

```typescript
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 开发工具
  devtools: { enabled: true },
  
  // 应用配置
  app: {
    head: {
      title: 'My Nuxt App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'My amazing Nuxt application' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  
  // CSS 配置
  css: ['~/assets/css/main.css'],
  
  // 运行时配置
  runtimeConfig: {
    // 仅服务端可用
    apiSecret: process.env.API_SECRET,
    // 公共配置（客户端也可用）
    public: {
      apiBase: process.env.API_BASE_URL || '/api'
    }
  },
  
  // 模块
  modules: [],
  
  // TypeScript
  typescript: {
    strict: true,
    typeCheck: true
  }
})
```

---

## 核心概念

### 1. 自动导入

Nuxt 3 会自动导入以下内容，无需手动 import：

- **组件**：`components/` 目录下的组件
- **组合式函数**：`composables/` 目录下的函数
- **工具函数**：`utils/` 目录下的函数
- **Vue API**：ref, computed, watch 等
- **Nuxt API**：navigateTo, useFetch 等

```vue
<template>
  <div>
    <!-- 自动导入组件 -->
    <MyButton />
    
    <!-- 使用自动导入的组合式函数 -->
    <div>{{ count }}</div>
  </div>
</template>

<script setup>
// 无需 import，直接使用
const count = ref(0)
const { data } = await useFetch('/api/data')
</script>
```

### 2. 渲染模式

#### 服务端渲染（SSR）

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true // 默认值
})
```

优点：
- SEO 友好
- 首屏加载快
- 更好的性能指标

#### 客户端渲染（SPA）

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: false
})
```

#### 混合渲染

```vue
<script setup>
// 在特定页面禁用 SSR
defineRouteRules({
  ssr: false
})
</script>
```

### 3. 生命周期

Nuxt 扩展了 Vue 的生命周期：

```vue
<script setup>
// Vue 生命周期
onMounted(() => {
  console.log('组件已挂载')
})

// Nuxt 生命周期钩子
onBeforeRouteLeave((to, from) => {
  console.log('离开路由前')
})

// 页面元数据
definePageMeta({
  middleware: 'auth',
  layout: 'custom'
})
</script>
```

---

## 路由系统

### 基于文件的路由

Nuxt 会根据 `pages/` 目录自动生成路由。

#### 基础路由

```
pages/
├── index.vue          → /
├── about.vue          → /about
├── contact.vue        → /contact
└── blog/
    ├── index.vue      → /blog
    └── post.vue       → /blog/post
```

#### 动态路由

```
pages/
├── users/
│   ├── index.vue           → /users
│   ├── [id].vue            → /users/:id
│   └── [id]/
│       └── profile.vue     → /users/:id/profile
└── posts/
    └── [...slug].vue       → /posts/* (捕获所有)
```

**示例：动态路由页面**

```vue
<!-- pages/users/[id].vue -->
<template>
  <div>
    <h1>用户详情</h1>
    <p>用户 ID: {{ route.params.id }}</p>
    <div v-if="pending">加载中...</div>
    <div v-else-if="error">错误: {{ error.message }}</div>
    <div v-else>
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

// 获取用户数据
const { data: user, pending, error } = await useFetch(`/api/users/${route.params.id}`)

// 设置页面元数据
useHead({
  title: `用户 ${route.params.id}`
})
</script>
```

#### 嵌套路由

```
pages/
└── parent/
    ├── index.vue
    ├── child1.vue
    └── child2.vue
```

```vue
<!-- pages/parent.vue -->
<template>
  <div>
    <h1>父页面</h1>
    <nav>
      <NuxtLink to="/parent">首页</NuxtLink>
      <NuxtLink to="/parent/child1">子页面1</NuxtLink>
      <NuxtLink to="/parent/child2">子页面2</NuxtLink>
    </nav>
    
    <!-- 子路由出口 -->
    <NuxtPage />
  </div>
</template>
```

### 路由导航

#### 使用 NuxtLink

```vue
<template>
  <div>
    <!-- 基础链接 -->
    <NuxtLink to="/about">关于我们</NuxtLink>
    
    <!-- 动态链接 -->
    <NuxtLink :to="`/users/${userId}`">用户详情</NuxtLink>
    
    <!-- 对象形式 -->
    <NuxtLink :to="{ name: 'users-id', params: { id: 123 } }">
      用户 123
    </NuxtLink>
    
    <!-- 外部链接 -->
    <NuxtLink to="https://nuxt.com" external>Nuxt 官网</NuxtLink>
    
    <!-- 自定义激活样式 -->
    <NuxtLink 
      to="/about" 
      active-class="active"
      exact-active-class="exact-active"
    >
      关于
    </NuxtLink>
  </div>
</template>
```

#### 编程式导航

```vue
<script setup>
const router = useRouter()
const route = useRoute()

// 导航到指定路由
const goToAbout = () => {
  navigateTo('/about')
}

// 带参数导航
const goToUser = (id) => {
  navigateTo(`/users/${id}`)
}

// 使用对象形式
const goToUserProfile = (id) => {
  navigateTo({
    name: 'users-id-profile',
    params: { id }
  })
}

// 外部链接
const goToExternal = () => {
  navigateTo('https://nuxt.com', {
    external: true,
    open: {
      target: '_blank'
    }
  })
}

// 返回上一页
const goBack = () => {
  router.back()
}

// 替换当前路由（不添加历史记录）
const replaceRoute = () => {
  navigateTo('/new-page', { replace: true })
}
</script>
```

### 路由中间件

中间件用于在导航到特定路由之前执行代码。

#### 全局中间件

```typescript
// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useState('user')
  
  // 如果用户未登录且访问的不是登录页
  if (!user.value && to.path !== '/login') {
    return navigateTo('/login')
  }
})
```

#### 命名中间件

```typescript
// middleware/admin.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useState('user')
  
  if (!user.value?.isAdmin) {
    return abortNavigation('需要管理员权限')
  }
})
```

在页面中使用：

```vue
<script setup>
definePageMeta({
  middleware: 'admin'
})
</script>
```

#### 内联中间件

```vue
<script setup>
definePageMeta({
  middleware: [
    function (to, from) {
      // 自定义逻辑
      if (to.params.id === '1') {
        return abortNavigation()
      }
    }
  ]
})
</script>
```

### 路由验证

```vue
<script setup>
definePageMeta({
  validate: async (route) => {
    // 验证路由参数
    const id = Number(route.params.id)
    
    // 返回 true 表示验证通过
    // 返回 false 或抛出错误表示验证失败
    return !isNaN(id) && id > 0
  }
})
</script>
```

---

## 页面与布局

### 页面组件

页面是 Nuxt 应用的核心，每个页面对应一个路由。

#### 基础页面

```vue
<!-- pages/index.vue -->
<template>
  <div class="home">
    <h1>欢迎来到首页</h1>
    <p>这是一个 Nuxt 3 应用</p>
  </div>
</template>

<script setup>
// 设置页面元数据
useHead({
  title: '首页',
  meta: [
    { name: 'description', content: '这是首页描述' }
  ]
})

// 定义页面配置
definePageMeta({
  layout: 'default',
  middleware: ['auth']
})
</script>

<style scoped>
.home {
  padding: 20px;
}
</style>
```

### 布局系统

布局是包裹页面的容器，用于定义应用的整体结构。

#### 默认布局

```vue
<!-- layouts/default.vue -->
<template>
  <div class="app-layout">
    <header class="header">
      <nav>
        <NuxtLink to="/">首页</NuxtLink>
        <NuxtLink to="/about">关于</NuxtLink>
        <NuxtLink to="/blog">博客</NuxtLink>
      </nav>
    </header>
    
    <main class="main-content">
      <!-- 页面内容插槽 -->
      <slot />
    </main>
    
    <footer class="footer">
      <p>&copy; 2024 My Nuxt App</p>
    </footer>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: #333;
  color: white;
  padding: 1rem;
}

.header nav {
  display: flex;
  gap: 1rem;
}

.header a {
  color: white;
  text-decoration: none;
}

.main-content {
  flex: 1;
  padding: 2rem;
}

.footer {
  background: #f5f5f5;
  padding: 1rem;
  text-align: center;
}
</style>
```

#### 自定义布局

```vue
<!-- layouts/admin.vue -->
<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <h2>管理面板</h2>
      <nav>
        <NuxtLink to="/admin/dashboard">仪表板</NuxtLink>
        <NuxtLink to="/admin/users">用户管理</NuxtLink>
        <NuxtLink to="/admin/settings">设置</NuxtLink>
      </nav>
    </aside>
    
    <div class="admin-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background: #2c3e50;
  color: white;
  padding: 2rem;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}

.sidebar a {
  color: white;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 4px;
}

.sidebar a:hover {
  background: rgba(255, 255, 255, 0.1);
}

.admin-content {
  flex: 1;
  padding: 2rem;
}
</style>
```

在页面中使用自定义布局：

```vue
<script setup>
definePageMeta({
  layout: 'admin'
})
</script>
```

#### 动态布局

```vue
<!-- pages/dynamic.vue -->
<template>
  <div>
    <button @click="toggleLayout">切换布局</button>
    <NuxtLayout :name="layout">
      <h1>动态布局页面</h1>
    </NuxtLayout>
  </div>
</template>

<script setup>
const layout = ref('default')

const toggleLayout = () => {
  layout.value = layout.value === 'default' ? 'admin' : 'default'
}
</script>
```

### App.vue

`app.vue` 是应用的根组件，所有页面都会在其中渲染。

```vue
<!-- app.vue -->
<template>
  <div id="app">
    <!-- 使用 NuxtLayout 启用布局系统 -->
    <NuxtLayout>
      <!-- 页面内容 -->
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// 全局状态初始化
const user = useState('user', () => null)

// 全局错误处理
onErrorCaptured((err) => {
  console.error('捕获到错误:', err)
  return false
})

// 设置全局 meta
useHead({
  titleTemplate: (title) => title ? `${title} - My App` : 'My App',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ]
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}
</style>
```

---

## 组件开发

### 组件自动导入

Nuxt 会自动导入 `components/` 目录下的组件。

```
components/
├── Button.vue              → <Button />
├── form/
│   ├── Input.vue          → <FormInput />
│   └── Select.vue         → <FormSelect />
└── layout/
    ├── Header.vue         → <LayoutHeader />
    └── Footer.vue         → <LayoutFooter />
```

#### 基础组件

```vue
<!-- components/Button.vue -->
<template>
  <button 
    :class="['btn', `btn-${type}`, { 'btn-loading': loading }]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="spinner"></span>
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger'].includes(value)
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  if (!props.loading && !props.disabled) {
    emit('click', event)
  }
}
</script>

<style scoped>
.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
  position: relative;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-primary:hover {
  background: #2980b9;
}

.btn-secondary {
  background: #95a5a6;
  color: white;
}

.btn-danger {
  background: #e74c3c;
  color: white;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-loading {
  pointer-events: none;
}

.spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  margin-right: 0.5rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
```

#### 表单组件

```vue
<!-- components/form/Input.vue -->
<template>
  <div class="form-input">
    <label v-if="label" :for="inputId">{{ label }}</label>
    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      @input="handleInput"
      @blur="handleBlur"
    />
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  placeholder: String,
  disabled: Boolean,
  required: Boolean,
  error: String
})

const emit = defineEmits(['update:modelValue', 'blur'])

const inputId = `input-${Math.random().toString(36).substr(2, 9)}`

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const handleBlur = (event) => {
  emit('blur', event)
}
</script>

<style scoped>
.form-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

label {
  font-weight: 500;
  color: #333;
}

input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #3498db;
}

input:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.error-message {
  color: #e74c3c;
  font-size: 0.875rem;
}
</style>
```

### 组件通信

#### Props 和 Emits

```vue
<!-- components/UserCard.vue -->
<template>
  <div class="user-card">
    <img :src="user.avatar" :alt="user.name" />
    <h3>{{ user.name }}</h3>
    <p>{{ user.email }}</p>
    <Button @click="handleEdit">编辑</Button>
    <Button type="danger" @click="handleDelete">删除</Button>
  </div>
</template>

<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])

const handleEdit = () => {
  emit('edit', props.user.id)
}

const handleDelete = () => {
  emit('delete', props.user.id)
}
</script>
```

#### Provide / Inject

```vue
<!-- layouts/default.vue -->
<script setup>
const theme = ref('light')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

// 提供给子组件
provide('theme', readonly(theme))
provide('toggleTheme', toggleTheme)
</script>
```

```vue
<!-- components/ThemeToggle.vue -->
<script setup>
// 注入
const theme = inject('theme')
const toggleTheme = inject('toggleTheme')
</script>

<template>
  <button @click="toggleTheme">
    当前主题: {{ theme }}
  </button>
</template>
```

### 组件懒加载

```vue
<template>
  <div>
    <!-- 懒加载组件 -->
    <LazyHeavyComponent v-if="showComponent" />
    
    <!-- 使用 ClientOnly 仅在客户端渲染 -->
    <ClientOnly>
      <HeavyChart />
      <template #fallback>
        <div>加载中...</div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup>
const showComponent = ref(false)

onMounted(() => {
  // 延迟加载
  setTimeout(() => {
    showComponent.value = true
  }, 1000)
})
</script>
```

---

## 数据获取

Nuxt 提供了多种数据获取方式，支持 SSR 和客户端渲染。

### useFetch

`useFetch` 是最常用的数据获取方法，支持自动请求去重和缓存。

```vue
<template>
  <div>
    <div v-if="pending">加载中...</div>
    <div v-else-if="error">错误: {{ error.message }}</div>
    <div v-else>
      <h1>{{ data.title }}</h1>
      <p>{{ data.content }}</p>
    </div>
    
    <button @click="refresh">刷新</button>
  </div>
</template>

<script setup>
// 基础用法
const { data, pending, error, refresh } = await useFetch('/api/posts/1')

// 带选项
const { data: users } = await useFetch('/api/users', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer token'
  },
  query: {
    page: 1,
    limit: 10
  },
  // 转换响应数据
  transform: (data) => {
    return data.map(user => ({
      ...user,
      fullName: `${user.firstName} ${user.lastName}`
    }))
  },
  // 选择需要的数据
  pick: ['id', 'name', 'email'],
  // 监听变化
  watch: [page],
  // 仅在客户端执行
  server: false
})
</script>
```

### useAsyncData

`useAsyncData` 提供更灵活的数据获取方式。

```vue
<script setup>
const route = useRoute()

// 基础用法
const { data, pending, error, refresh } = await useAsyncData(
  'posts', // 唯一键
  () => $fetch('/api/posts')
)

// 动态参数
const { data: post } = await useAsyncData(
  `post-${route.params.id}`,
  () => $fetch(`/api/posts/${route.params.id}`)
)

// 使用 composable
const { data: userData } = await useAsyncData(
  'user',
  async () => {
    const user = await $fetch('/api/user')
    const posts = await $fetch(`/api/users/${user.id}/posts`)
    return { user, posts }
  }
)

// 懒加载（不阻塞导航）
const { data: comments, pending: commentsPending } = useLazyAsyncData(
  'comments',
  () => $fetch('/api/comments')
)
</script>
```

### $fetch

Nuxt 提供的全局 fetch 函数，基于 ofetch。

```vue
<script setup>
// 在事件处理器中使用
const handleSubmit = async () => {
  try {
    const result = await $fetch('/api/posts', {
      method: 'POST',
      body: {
        title: 'New Post',
        content: 'Content here'
      }
    })
    console.log('创建成功:', result)
  } catch (error) {
    console.error('创建失败:', error)
  }
}

// 并发请求
const loadData = async () => {
  const [users, posts, comments] = await Promise.all([
    $fetch('/api/users'),
    $fetch('/api/posts'),
    $fetch('/api/comments')
  ])
  
  return { users, posts, comments }
}

// 带拦截器
const api = $fetch.create({
  baseURL: '/api',
  onRequest({ request, options }) {
    // 添加认证头
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${getToken()}`
    }
  },
  onResponse({ response }) {
    // 处理响应
    console.log('响应:', response.status)
  },
  onResponseError({ response }) {
    // 处理错误
    if (response.status === 401) {
      navigateTo('/login')
    }
  }
})
</script>
```

### 数据刷新和缓存

```vue
<script setup>
const { data, refresh, clear } = await useFetch('/api/posts')

// 刷新数据
const refreshData = () => {
  refresh()
}

// 清除缓存
const clearCache = () => {
  clear()
}

// 使用 refreshNuxtData 刷新所有数据
const refreshAll = () => {
  refreshNuxtData()
}

// 刷新特定键的数据
const refreshPosts = () => {
  refreshNuxtData('posts')
}
</script>
```

### 错误处理

```vue
<script setup>
const { data, error } = await useFetch('/api/posts', {
  // 自定义错误处理
  onResponseError({ response }) {
    if (response.status === 404) {
      showError({
        statusCode: 404,
        message: '文章不存在'
      })
    }
  }
})

// 使用 try-catch
try {
  const data = await $fetch('/api/posts')
} catch (error) {
  // 处理错误
  console.error('请求失败:', error)
  
  // 显示错误页面
  throw createError({
    statusCode: 500,
    message: '服务器错误'
  })
}
</script>
```

### 实战示例：分页列表

```vue
<!-- pages/posts/index.vue -->
<template>
  <div class="posts-page">
    <h1>文章列表</h1>
    
    <div class="filters">
      <select v-model="category">
        <option value="">全部分类</option>
        <option value="tech">技术</option>
        <option value="life">生活</option>
      </select>
      
      <input 
        v-model="search" 
        placeholder="搜索..." 
        @input="debounceSearch"
      />
    </div>
    
    <div v-if="pending" class="loading">加载中...</div>
    
    <div v-else-if="error" class="error">
      错误: {{ error.message }}
      <button @click="refresh">重试</button>
    </div>
    
    <div v-else>
      <div v-if="data.posts.length === 0" class="empty">
        暂无文章
      </div>
      
      <div v-else class="posts-grid">
        <article 
          v-for="post in data.posts" 
          :key="post.id"
          class="post-card"
        >
          <h2>{{ post.title }}</h2>
          <p>{{ post.excerpt }}</p>
          <NuxtLink :to="`/posts/${post.id}`">
            阅读更多
          </NuxtLink>
        </article>
      </div>
      
      <div class="pagination">
        <button 
          :disabled="page === 1" 
          @click="page--"
        >
          上一页
        </button>
        
        <span>第 {{ page }} 页 / 共 {{ data.totalPages }} 页</span>
        
        <button 
          :disabled="page === data.totalPages" 
          @click="page++"
        >
          下一页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const page = ref(1)
const category = ref('')
const search = ref('')

// 监听参数变化自动刷新
const { data, pending, error, refresh } = await useFetch('/api/posts', {
  query: {
    page,
    category,
    search
  },
  watch: [page, category, search]
})

// 防抖搜索
let searchTimeout
const debounceSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    page.value = 1 // 重置页码
  }, 500)
}

// SEO
useHead({
  title: '文章列表',
  meta: [
    { name: 'description', content: '浏览所有文章' }
  ]
})
</script>

<style scoped>
.posts-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.filters {
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
}

.filters select,
.filters input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.post-card {
  border: 1px solid #ddd;
  padding: 1.5rem;
  border-radius: 8px;
  transition: transform 0.3s;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading,
.error,
.empty {
  text-align: center;
  padding: 3rem;
  color: #666;
}
</style>
```

---

## 状态管理

### useState

Nuxt 提供的跨组件共享状态的方法。

```vue
<!-- composables/useAuth.ts -->
<script setup>
export const useAuth = () => {
  // 创建全局状态
  const user = useState('user', () => null)
  const token = useState('token', () => '')
  
  // 登录
  const login = async (credentials) => {
    try {
      const data = await $fetch('/api/auth/login', {
        method: 'POST',
        body: credentials
      })
      
      user.value = data.user
      token.value = data.token
      
      // 保存到 localStorage
      if (process.client) {
        localStorage.setItem('token', data.token)
      }
      
      return true
    } catch (error) {
      console.error('登录失败:', error)
      return false
    }
  }
  
  // 登出
  const logout = () => {
    user.value = null
    token.value = ''
    
    if (process.client) {
      localStorage.removeItem('token')
    }
    
    navigateTo('/login')
  }
  
  // 检查登录状态
  const checkAuth = async () => {
    if (process.client) {
      const savedToken = localStorage.getItem('token')
      if (savedToken) {
        token.value = savedToken
        try {
          const data = await $fetch('/api/auth/me', {
            headers: {
              Authorization: `Bearer ${savedToken}`
            }
          })
          user.value = data.user
        } catch (error) {
          logout()
        }
      }
    }
  }
  
  return {
    user: readonly(user),
    token: readonly(token),
    login,
    logout,
    checkAuth
  }
}
</script>
```

使用：

```vue
<script setup>
const { user, login, logout } = useAuth()

const handleLogin = async () => {
  const success = await login({
    email: 'user@example.com',
    password: 'password'
  })
  
  if (success) {
    navigateTo('/dashboard')
  }
}
</script>

<template>
  <div>
    <div v-if="user">
      欢迎, {{ user.name }}
      <button @click="logout">登出</button>
    </div>
    <div v-else>
      <button @click="handleLogin">登录</button>
    </div>
  </div>
</template>
```

### Pinia

Pinia 是 Vue 官方推荐的状态管理库。

#### 安装

```bash
pnpm add pinia @pinia/nuxt
```

#### 配置

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@pinia/nuxt']
})
```

#### 创建 Store

```typescript
// stores/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  // State
  state: () => ({
    user: null as User | null,
    token: '',
    isLoading: false
  }),
  
  // Getters
  getters: {
    isAuthenticated: (state) => !!state.user,
    userName: (state) => state.user?.name || '游客',
    isAdmin: (state) => state.user?.role === 'admin'
  },
  
  // Actions
  actions: {
    async login(credentials: LoginCredentials) {
      this.isLoading = true
      try {
        const data = await $fetch('/api/auth/login', {
          method: 'POST',
          body: credentials
        })
        
        this.user = data.user
        this.token = data.token
        
        // 保存到 localStorage
        if (process.client) {
          localStorage.setItem('token', data.token)
        }
        
        return true
      } catch (error) {
        console.error('登录失败:', error)
        return false
      } finally {
        this.isLoading = false
      }
    },
    
    logout() {
      this.user = null
      this.token = ''
      
      if (process.client) {
        localStorage.removeItem('token')
      }
      
      navigateTo('/login')
    },
    
    async fetchUser() {
      if (!this.token) return
      
      try {
        const data = await $fetch('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        this.user = data.user
      } catch (error) {
        this.logout()
      }
    },
    
    updateProfile(updates: Partial<User>) {
      if (this.user) {
        this.user = { ...this.user, ...updates }
      }
    }
  }
})

// TypeScript 类型
interface User {
  id: number
  name: string
  email: string
  role: string
  avatar?: string
}

interface LoginCredentials {
  email: string
  password: string
}
```

#### 使用 Store

```vue
<template>
  <div>
    <div v-if="isAuthenticated">
      <p>欢迎, {{ userName }}</p>
      <img v-if="user.avatar" :src="user.avatar" />
      <button @click="handleLogout">登出</button>
    </div>
    
    <div v-else>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="邮箱" />
        <input v-model="password" type="password" placeholder="密码" />
        <button type="submit" :disabled="isLoading">
          {{ isLoading ? '登录中...' : '登录' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

// 使用 storeToRefs 保持响应性
const { user, isAuthenticated, userName, isLoading } = storeToRefs(userStore)

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  const success = await userStore.login({
    email: email.value,
    password: password.value
  })
  
  if (success) {
    navigateTo('/dashboard')
  }
}

const handleLogout = () => {
  userStore.logout()
}

// 初始化时检查登录状态
onMounted(() => {
  userStore.fetchUser()
})
</script>
```

#### Store 组合

```typescript
// stores/cart.ts
import { defineStore } from 'pinia'
import { useUserStore } from './user'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    loading: false
  }),
  
  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    isEmpty: (state) => state.items.length === 0
  },
  
  actions: {
    async addItem(product: Product) {
      // 访问其他 store
      const userStore = useUserStore()
      if (!userStore.isAuthenticated) {
        navigateTo('/login')
        return
      }
      
      const existingItem = this.items.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        })
      }
      
      // 同步到服务器
      await this.syncToServer()
    },
    
    removeItem(itemId: number) {
      const index = this.items.findIndex(item => item.id === itemId)
      if (index > -1) {
        this.items.splice(index, 1)
        this.syncToServer()
      }
    },
    
    updateQuantity(itemId: number, quantity: number) {
      const item = this.items.find(item => item.id === itemId)
      if (item) {
        item.quantity = quantity
        if (quantity <= 0) {
          this.removeItem(itemId)
        } else {
          this.syncToServer()
        }
      }
    },
    
    async syncToServer() {
      const userStore = useUserStore()
      if (!userStore.token) return
      
      try {
        await $fetch('/api/cart', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${userStore.token}`
          },
          body: { items: this.items }
        })
      } catch (error) {
        console.error('同步购物车失败:', error)
      }
    },
    
    async loadCart() {
      const userStore = useUserStore()
      if (!userStore.token) return
      
      this.loading = true
      try {
        const data = await $fetch('/api/cart', {
          headers: {
            Authorization: `Bearer ${userStore.token}`
          }
        })
        this.items = data.items
      } catch (error) {
        console.error('加载购物车失败:', error)
      } finally {
        this.loading = false
      }
    },
    
    clearCart() {
      this.items = []
      this.syncToServer()
    }
  }
})

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface Product {
  id: number
  name: string
  price: number
}
```

---

## 插件系统

插件用于在应用启动时注册全局功能。

### 创建插件

```typescript
// plugins/hello.ts
export default defineNuxtPlugin((nuxtApp) => {
  // 插件逻辑
  console.log('Hello from plugin!')
  
  // 返回提供的内容
  return {
    provide: {
      hello: (name: string) => `Hello ${name}!`
    }
  }
})
```

使用：

```vue
<script setup>
const { $hello } = useNuxtApp()

console.log($hello('World')) // "Hello World!"
</script>
```

### Vue 插件集成

```typescript
// plugins/vue-toastification.client.ts
import Toast, { type PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  const options: PluginOptions = {
    timeout: 3000,
    position: 'top-right'
  }
  
  nuxtApp.vueApp.use(Toast, options)
  
  return {
    provide: {
      toast: nuxtApp.vueApp.config.globalProperties.$toast
    }
  }
})
```

### 第三方库集成

#### Axios

```typescript
// plugins/axios.ts
import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  
  const api = axios.create({
    baseURL: config.public.apiBase
  })
  
  // 请求拦截器
  api.interceptors.request.use(
    (config) => {
      const token = useState('token').value
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )
  
  // 响应拦截器
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        navigateTo('/login')
      }
      return Promise.reject(error)
    }
  )
  
  return {
    provide: {
      api
    }
  }
})
```

#### Day.js

```typescript
// plugins/dayjs.ts
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

export default defineNuxtPlugin(() => {
  dayjs.extend(relativeTime)
  dayjs.locale('zh-cn')
  
  return {
    provide: {
      dayjs
    }
  }
})
```

使用：

```vue
<script setup>
const { $dayjs } = useNuxtApp()

const formattedDate = $dayjs('2024-01-01').format('YYYY年MM月DD日')
const relativeDate = $dayjs('2024-01-01').fromNow()
</script>
```

### 插件顺序

```typescript
// plugins/01.first.ts
export default defineNuxtPlugin(() => {
  console.log('First plugin')
})

// plugins/02.second.ts
export default defineNuxtPlugin(() => {
  console.log('Second plugin')
})
```

### 客户端/服务端插件

```typescript
// plugins/analytics.client.ts - 仅在客户端运行
export default defineNuxtPlugin(() => {
  // Google Analytics
  window.gtag('config', 'GA_MEASUREMENT_ID')
})

// plugins/database.server.ts - 仅在服务端运行
export default defineNuxtPlugin(() => {
  // 数据库连接
})
```

---

## 中间件

中间件在路由导航前执行，用于权限验证、日志记录等。

### 路由中间件

#### 全局中间件

```typescript
// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useState('user')
  
  // 需要认证的路由
  const protectedRoutes = ['/dashboard', '/profile', '/settings']
  
  if (protectedRoutes.some(route => to.path.startsWith(route))) {
    if (!user.value) {
      return navigateTo('/login')
    }
  }
  
  // 已登录用户访问登录页，重定向到首页
  if (to.path === '/login' && user.value) {
    return navigateTo('/')
  }
})
```

#### 命名中间件

```typescript
// middleware/admin.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useState('user')
  
  if (!user.value?.isAdmin) {
    return abortNavigation({
      statusCode: 403,
      message: '需要管理员权限'
    })
  }
})
```

在页面中使用：

```vue
<script setup>
definePageMeta({
  middleware: ['auth', 'admin']
})
</script>
```

#### 日志中间件

```typescript
// middleware/logger.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    console.log(`导航: ${from.path} -> ${to.path}`)
    
    // 发送分析数据
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: to.path
      })
    }
  }
})
```

### 服务端中间件

```typescript
// server/middleware/log.ts
export default defineEventHandler((event) => {
  console.log(`[${new Date().toISOString()}] ${event.method} ${event.path}`)
})
```

```typescript
// server/middleware/cors.ts
export default defineEventHandler((event) => {
  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  })
  
  if (event.method === 'OPTIONS') {
    event.node.res.statusCode = 204
    event.node.res.end()
  }
})
```

---

## 模块系统

模块是 Nuxt 的扩展包，可以添加功能、集成第三方服务等。

### 常用官方模块

#### @nuxtjs/tailwindcss

```bash
pnpm add -D @nuxtjs/tailwindcss
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss']
})
```

#### @nuxt/content

```bash
pnpm add @nuxt/content
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  content: {
    highlight: {
      theme: 'github-dark'
    }
  }
})
```

使用：

```vue
<!-- pages/blog/[...slug].vue -->
<template>
  <main>
    <ContentDoc />
  </main>
</template>
```

#### @nuxtjs/i18n

```bash
pnpm add @nuxtjs/i18n
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],
  i18n: {
    locales: [
      { code: 'en', file: 'en.json' },
      { code: 'zh', file: 'zh.json' }
    ],
    defaultLocale: 'zh',
    langDir: 'locales/'
  }
})
```

```json
// locales/zh.json
{
  "welcome": "欢迎",
  "hello": "你好 {name}"
}
```

```vue
<template>
  <div>
    <p>{{ $t('welcome') }}</p>
    <p>{{ $t('hello', { name: '张三' }) }}</p>
    
    <button @click="switchLocale">切换语言</button>
  </div>
</template>

<script setup>
const { locale, setLocale } = useI18n()

const switchLocale = () => {
  setLocale(locale.value === 'zh' ? 'en' : 'zh')
}
</script>
```

### 创建自定义模块

```typescript
// modules/my-module/index.ts
import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'my-module',
    configKey: 'myModule'
  },
  defaults: {
    enabled: true
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    
    // 添加插件
    addPlugin(resolver.resolve('./runtime/plugin'))
    
    // 添加组件
    nuxt.hook('components:dirs', (dirs) => {
      dirs.push({
        path: resolver.resolve('./runtime/components')
      })
    })
    
    console.log('My module initialized!')
  }
})
```

---

## SEO优化

### 页面元数据

#### useHead

```vue
<script setup>
useHead({
  title: '页面标题',
  meta: [
    { name: 'description', content: '页面描述' },
    { name: 'keywords', content: 'nuxt, vue, seo' },
    { property: 'og:title', content: '页面标题' },
    { property: 'og:description', content: '页面描述' },
    { property: 'og:image', content: 'https://example.com/image.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ],
  link: [
    { rel: 'canonical', href: 'https://example.com/page' }
  ]
})
</script>
```

#### useSeoMeta

```vue
<script setup>
useSeoMeta({
  title: '我的页面',
  description: '这是页面描述',
  ogTitle: '我的页面',
  ogDescription: '这是页面描述',
  ogImage: 'https://example.com/image.jpg',
  ogUrl: 'https://example.com/page',
  twitterCard: 'summary_large_image',
  twitterTitle: '我的页面',
  twitterDescription: '这是页面描述',
  twitterImage: 'https://example.com/image.jpg'
})
</script>
```

#### 动态元数据

```vue
<script setup>
const route = useRoute()
const { data: post } = await useFetch(`/api/posts/${route.params.id}`)

useHead({
  title: post.value?.title,
  meta: [
    { name: 'description', content: post.value?.excerpt },
    { property: 'og:title', content: post.value?.title },
    { property: 'og:description', content: post.value?.excerpt },
    { property: 'og:image', content: post.value?.coverImage }
  ]
})
</script>
```

### 结构化数据

```vue
<script setup>
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: '文章标题',
        author: {
          '@type': 'Person',
          name: '作者名'
        },
        datePublished: '2024-01-01',
        image: 'https://example.com/image.jpg'
      })
    }
  ]
})
</script>
```

### Sitemap

```bash
pnpm add @nuxtjs/sitemap
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/sitemap'],
  sitemap: {
    hostname: 'https://example.com',
    gzip: true,
    routes: async () => {
      const { data } = await $fetch('/api/posts')
      return data.map(post => `/blog/${post.slug}`)
    }
  }
})
```

### Robots.txt

```typescript
// server/routes/robots.txt.ts
export default defineEventHandler(() => {
  return `
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml
  `.trim()
})
```

---

## 性能优化

### 代码分割

#### 组件懒加载

```vue
<template>
  <div>
    <!-- 懒加载组件 -->
    <LazyHeavyComponent v-if="show" />
  </div>
</template>
```

#### 动态导入

```vue
<script setup>
const showChart = ref(false)
let ChartComponent = null

const loadChart = async () => {
  if (!ChartComponent) {
    ChartComponent = (await import('~/components/Chart.vue')).default
  }
  showChart.value = true
}
</script>
```

### 图片优化

#### @nuxt/image

```bash
pnpm add @nuxt/image
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/image'],
  image: {
    quality: 80,
    format: ['webp']
  }
})
```

```vue
<template>
  <div>
    <!-- 自动优化 -->
    <NuxtImg 
      src="/images/photo.jpg" 
      width="800" 
      height="600"
      alt="照片"
      loading="lazy"
    />
    
    <!-- 响应式图片 -->
    <NuxtPicture
      src="/images/photo.jpg"
      :img-attrs="{ alt: '照片' }"
      sizes="sm:100vw md:50vw lg:400px"
    />
  </div>
</template>
```

### 缓存策略

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    // 静态页面，缓存1小时
    '/': { swr: 3600 },
    
    // API 路由，缓存10分钟
    '/api/**': { swr: 600 },
    
    // 完全静态
    '/about': { prerender: true },
    
    // 客户端渲染
    '/admin/**': { ssr: false },
    
    // 重定向
    '/old-page': { redirect: '/new-page' }
  }
})
```

### 预加载和预取

```vue
<template>
  <div>
    <!-- 预加载关键资源 -->
    <NuxtLink to="/important" prefetch>重要页面</NuxtLink>
    
    <!-- 不预取 -->
    <NuxtLink to="/heavy" :prefetch="false">重页面</NuxtLink>
  </div>
</template>
```

### 性能监控

```typescript
// plugins/performance.client.ts
export default defineNuxtPlugin(() => {
  if (process.client && 'PerformanceObserver' in window) {
    // 监控 LCP
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime)
    })
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
    
    // 监控 FID
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        console.log('FID:', entry.processingStart - entry.startTime)
      })
    })
    fidObserver.observe({ entryTypes: ['first-input'] })
  }
})
```

---

## 部署上线

### 构建应用

#### SSR 构建

```bash
pnpm build
```

生成 `.output` 目录，包含服务端和客户端代码。

#### 静态生成（SSG）

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  }
})
```

```bash
pnpm generate
```

### 部署平台

#### Vercel

```bash
# 安装 Vercel CLI
pnpm add -g vercel

# 部署
vercel
```

或使用 Git 集成自动部署。

#### Netlify

```toml
# netlify.toml
[build]
  command = "pnpm build"
  publish = ".output/public"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Cloudflare Pages

```bash
pnpm build
```

在 Cloudflare Pages 设置：
- 构建命令: `pnpm build`
- 输出目录: `.output/public`

#### Node.js 服务器

```bash
# 构建
pnpm build

# 启动
node .output/server/index.mjs
```

使用 PM2 管理：

```bash
# 安装 PM2
pnpm add -g pm2

# 启动应用
pm2 start .output/server/index.mjs --name "nuxt-app"

# 保存配置
pm2 save

# 开机自启
pm2 startup
```

#### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# 复制依赖文件
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 构建应用
RUN pnpm build

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["node", ".output/server/index.mjs"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  nuxt-app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### 环境变量

```bash
# .env
API_BASE_URL=https://api.example.com
API_SECRET=your-secret-key
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    apiSecret: process.env.API_SECRET,
    public: {
      apiBase: process.env.API_BASE_URL
    }
  }
})
```

---

## 进阶实战

### 实战项目：博客系统

#### 项目结构

```
blog-app/
├── components/
│   ├── blog/
│   │   ├── PostCard.vue
│   │   ├── PostList.vue
│   │   └── CommentSection.vue
│   └── ui/
│       ├── Button.vue
│       └── Input.vue
├── pages/
│   ├── index.vue
│   ├── blog/
│   │   ├── index.vue
│   │   └── [slug].vue
│   ├── admin/
│   │   ├── index.vue
│   │   └── posts/
│   │       ├── index.vue
│   │       ├── new.vue
│   │       └── [id]/edit.vue
│   └── auth/
│       ├── login.vue
│       └── register.vue
├── server/
│   ├── api/
│   │   ├── posts/
│   │   │   ├── index.get.ts
│   │   │   ├── index.post.ts
│   │   │   ├── [id].get.ts
│   │   │   ├── [id].put.ts
│   │   │   └── [id].delete.ts
│   │   ├── auth/
│   │   │   ├── login.post.ts
│   │   │   └── register.post.ts
│   │   └── comments/
│   │       ├── index.get.ts
│   │       └── index.post.ts
│   └── middleware/
│       └── auth.ts
├── composables/
│   ├── useAuth.ts
│   ├── usePosts.ts
│   └── useComments.ts
└── stores/
    ├── user.ts
    └── posts.ts
```

#### API 路由实现

```typescript
// server/api/posts/index.get.ts
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 10
  const category = query.category as string
  
  // 模拟数据库查询
  const posts = await fetchPosts({ page, limit, category })
  const total = await countPosts({ category })
  
  return {
    posts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  }
})
```

```typescript
// server/api/posts/[id].get.ts
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  const post = await getPostById(id)
  
  if (!post) {
    throw createError({
      statusCode: 404,
      message: '文章不存在'
    })
  }
  
  return post
})
```

```typescript
// server/api/posts/index.post.ts
export default defineEventHandler(async (event) => {
  // 验证用户权限
  const user = await requireAuth(event)
  
  if (!user.isAdmin) {
    throw createError({
      statusCode: 403,
      message: '没有权限'
    })
  }
  
  const body = await readBody(event)
  
  // 验证数据
  const { title, content, category } = body
  if (!title || !content) {
    throw createError({
      statusCode: 400,
      message: '标题和内容不能为空'
    })
  }
  
  // 创建文章
  const post = await createPost({
    title,
    content,
    category,
    authorId: user.id
  })
  
  return post
})
```

#### 页面实现

```vue
<!-- pages/blog/[slug].vue -->
<template>
  <div class="post-page">
    <div v-if="pending" class="loading">加载中...</div>
    
    <div v-else-if="error" class="error">
      <h1>文章不存在</h1>
      <NuxtLink to="/blog">返回博客列表</NuxtLink>
    </div>
    
    <article v-else class="post">
      <header class="post-header">
        <h1>{{ post.title }}</h1>
        <div class="post-meta">
          <span>作者: {{ post.author.name }}</span>
          <span>发布于: {{ formatDate(post.createdAt) }}</span>
          <span>分类: {{ post.category }}</span>
        </div>
      </header>
      
      <div class="post-content" v-html="post.content"></div>
      
      <footer class="post-footer">
        <div class="tags">
          <span 
            v-for="tag in post.tags" 
            :key="tag"
            class="tag"
          >
            #{{ tag }}
          </span>
        </div>
        
        <div class="actions">
          <button @click="handleLike">
            ❤️ {{ post.likes }}
          </button>
          <button @click="handleShare">
            🔗 分享
          </button>
        </div>
      </footer>
      
      <CommentSection :post-id="post.id" />
    </article>
  </div>
</template>

<script setup>
const route = useRoute()
const { $dayjs } = useNuxtApp()

// 获取文章数据
const { data: post, pending, error } = await useFetch(
  `/api/posts/${route.params.slug}`
)

// SEO
useHead({
  title: post.value?.title,
  meta: [
    { name: 'description', content: post.value?.excerpt },
    { property: 'og:title', content: post.value?.title },
    { property: 'og:description', content: post.value?.excerpt },
    { property: 'og:image', content: post.value?.coverImage },
    { property: 'og:type', content: 'article' }
  ]
})

// 格式化日期
const formatDate = (date) => {
  return $dayjs(date).format('YYYY年MM月DD日')
}

// 点赞
const handleLike = async () => {
  await $fetch(`/api/posts/${post.value.id}/like`, {
    method: 'POST'
  })
  post.value.likes++
}

// 分享
const handleShare = () => {
  if (navigator.share) {
    navigator.share({
      title: post.value.title,
      text: post.value.excerpt,
      url: window.location.href
    })
  }
}
</script>

<style scoped>
.post-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.post-header {
  margin-bottom: 2rem;
}

.post-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.post-meta {
  display: flex;
  gap: 1rem;
  color: #666;
  font-size: 0.9rem;
}

.post-content {
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.post-footer {
  border-top: 1px solid #eee;
  padding-top: 2rem;
  margin-bottom: 2rem;
}

.tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  background: #f0f0f0;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.actions {
  display: flex;
  gap: 1rem;
}

.actions button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
}

.actions button:hover {
  background: #f5f5f5;
}
</style>
```

#### 评论组件

```vue
<!-- components/blog/CommentSection.vue -->
<template>
  <div class="comment-section">
    <h2>评论 ({{ comments.length }})</h2>
    
    <div v-if="user" class="comment-form">
      <textarea 
        v-model="newComment"
        placeholder="写下你的评论..."
        rows="4"
      ></textarea>
      <Button 
        @click="submitComment"
        :loading="submitting"
      >
        发表评论
      </Button>
    </div>
    
    <div v-else class="login-prompt">
      <p>请先<NuxtLink to="/auth/login">登录</NuxtLink>后再评论</p>
    </div>
    
    <div class="comments-list">
      <div 
        v-for="comment in comments" 
        :key="comment.id"
        class="comment"
      >
        <div class="comment-header">
          <img :src="comment.author.avatar" :alt="comment.author.name" />
          <div>
            <strong>{{ comment.author.name }}</strong>
            <span class="comment-date">
              {{ formatDate(comment.createdAt) }}
            </span>
          </div>
        </div>
        <p class="comment-content">{{ comment.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  postId: {
    type: Number,
    required: true
  }
})

const { user } = useAuth()
const { $dayjs } = useNuxtApp()

const newComment = ref('')
const submitting = ref(false)

// 获取评论
const { data: comments, refresh } = await useFetch(
  `/api/comments?postId=${props.postId}`
)

// 提交评论
const submitComment = async () => {
  if (!newComment.value.trim()) return
  
  submitting.value = true
  try {
    await $fetch('/api/comments', {
      method: 'POST',
      body: {
        postId: props.postId,
        content: newComment.value
      }
    })
    
    newComment.value = ''
    await refresh()
  } catch (error) {
    console.error('评论失败:', error)
  } finally {
    submitting.value = false
  }
}

const formatDate = (date) => {
  return $dayjs(date).fromNow()
}
</script>

<style scoped>
.comment-section {
  margin-top: 3rem;
}

.comment-form {
  margin: 2rem 0;
}

.comment-form textarea {
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-family: inherit;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.comment {
  border: 1px solid #eee;
  padding: 1rem;
  border-radius: 8px;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.comment-header img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.comment-date {
  color: #666;
  font-size: 0.9rem;
  margin-left: 0.5rem;
}

.comment-content {
  line-height: 1.6;
}
</style>
```

### 最佳实践总结

1. **项目结构**
   - 按功能模块组织代码
   - 使用 TypeScript 提升代码质量
   - 合理使用 composables 复用逻辑

2. **性能优化**
   - 使用组件懒加载
   - 合理配置缓存策略
   - 优化图片和静态资源

3. **SEO**
   - 使用 SSR 或 SSG
   - 正确设置 meta 标签
   - 实现结构化数据

4. **安全性**
   - 验证用户输入
   - 使用环境变量保护敏感信息
   - 实现适当的权限控制

5. **用户体验**
   - 提供加载状态
   - 优雅处理错误
   - 实现响应式设计

---

## 总结

通过本教程，你已经学习了：

1. ✅ Nuxt 3 的核心概念和架构
2. ✅ 路由系统和页面管理
3. ✅ 组件开发和复用
4. ✅ 数据获取和状态管理
5. ✅ 插件和中间件系统
6. ✅ SEO 优化技巧
7. ✅ 性能优化方法
8. ✅ 部署和上线流程
9. ✅ 实战项目开发

### 继续学习资源

- [Nuxt 官方文档](https://nuxt.com)
- [Vue 3 文档](https://vuejs.org)
- [Nuxt Examples](https://nuxt.com/docs/examples)
- [Nuxt Modules](https://nuxt.com/modules)

### 下一步

1. 实践构建自己的 Nuxt 项目
2. 深入学习 Vue 3 Composition API
3. 探索 Nuxt 模块生态
4. 参与开源社区

祝你在 Nuxt 开发之旅中取得成功！🚀

