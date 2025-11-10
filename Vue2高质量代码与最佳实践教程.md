# Vue2 高质量代码与最佳实践教程

## 目录
1. [代码组织与结构](#1-代码组织与结构)
2. [组件设计原则](#2-组件设计原则)
3. [Props 和 Data 的最佳实践](#3-props-和-data-的最佳实践)
4. [计算属性和方法的选择](#4-计算属性和方法的选择)
5. [生命周期钩子的正确使用](#5-生命周期钩子的正确使用)
6. [事件处理与通信](#6-事件处理与通信)
7. [性能优化技巧](#7-性能优化技巧)
8. [代码可维护性](#8-代码可维护性)
9. [错误处理与调试](#9-错误处理与调试)
10. [测试友好代码](#10-测试友好代码)
11. [常见反模式与解决方案](#11-常见反模式与解决方案)
12. [项目架构建议](#12-项目架构建议)

---

## 1. 代码组织与结构

### 1.1 组件文件结构

良好的文件结构是高质量代码的基础。推荐的标准组件结构：

```vue
<template>
  <!-- 模板内容 -->
</template>

<script>
// 1. 导入依赖
import { mixin1, mixin2 } from '@/mixins'
import ComponentA from './ComponentA.vue'
import { helperFunction } from '@/utils'

// 2. 组件定义
export default {
  // 组件名称（用于调试）
  name: 'ComponentName',
  
  // 组件注册
  components: {
    ComponentA
  },
  
  // 混入
  mixins: [mixin1, mixin2],
  
  // 继承
  extends: BaseComponent,
  
  // 依赖注入
  inject: ['providedValue'],
  
  // 组件属性
  props: {
    // props 定义
  },
  
  // 数据
  data() {
    return {
      // 数据定义
    }
  },
  
  // 计算属性
  computed: {
    // 计算属性定义
  },
  
  // 监听器
  watch: {
    // 监听器定义
  },
  
  // 生命周期钩子
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  
  // 方法
  methods: {
    // 方法定义
  }
}
</script>

<style scoped>
/* 样式 */
</style>
```

### 1.2 目录结构规范

推荐的项目目录结构：

```
src/
├── assets/          # 静态资源
│   ├── images/
│   ├── styles/
│   └── fonts/
├── components/      # 公共组件
│   ├── common/      # 通用组件
│   ├── business/    # 业务组件
│   └── layout/      # 布局组件
├── views/           # 页面组件
├── router/          # 路由配置
├── store/           # 状态管理
│   ├── modules/
│   └── index.js
├── api/             # API 接口
├── utils/           # 工具函数
├── mixins/          # 混入
├── directives/      # 自定义指令
├── filters/         # 过滤器
├── plugins/         # 插件
└── constants/       # 常量
```

### 1.3 命名规范

**组件命名：**
- PascalCase：`UserProfile.vue`
- 多单词组合：`UserCard.vue` 而不是 `Card.vue`

**Props 命名：**
- camelCase：`userName`, `isVisible`
- 模板中使用 kebab-case：`<component :user-name="name" :is-visible="true" />`

**事件命名：**
- kebab-case：`user-updated`, `form-submitted`

**方法命名：**
- camelCase：`handleSubmit()`, `fetchUserData()`
- 使用动词开头：`get`, `set`, `handle`, `fetch`, `update`

---

## 2. 组件设计原则

### 2.1 单一职责原则

每个组件应该只负责一个功能。

**❌ 不好的做法：**

```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }}
        <button @click="deleteItem(item.id)">删除</button>
        <button @click="editItem(item)">编辑</button>
      </li>
    </ul>
    <form @submit="addItem">
      <input v-model="newItem" />
      <button type="submit">添加</button>
    </form>
    <div class="pagination">
      <!-- 分页逻辑 -->
    </div>
  </div>
</template>
```

**✅ 好的做法：**

```vue
<!-- ItemList.vue -->
<template>
  <div>
    <item-header :title="title" />
    <item-list :items="items" @delete="handleDelete" @edit="handleEdit" />
    <item-form @submit="handleAdd" />
    <item-pagination :total="total" @page-change="handlePageChange" />
  </div>
</template>

<script>
import ItemHeader from './ItemHeader.vue'
import ItemList from './ItemList.vue'
import ItemForm from './ItemForm.vue'
import ItemPagination from './ItemPagination.vue'

export default {
  components: {
    ItemHeader,
    ItemList,
    ItemForm,
    ItemPagination
  },
  // ...
}
</script>
```

### 2.2 组件复用性

设计可复用的组件，通过 props 和插槽提供灵活性。

**✅ 可复用的按钮组件：**

```vue
<!-- Button.vue -->
<template>
  <button 
    :class="['btn', `btn-${type}`, `btn-${size}`, { 'btn-disabled': disabled }]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot name="icon"></slot>
    <slot>{{ text }}</slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'default',
      validator: value => ['default', 'primary', 'danger', 'success'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },
    text: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick(event) {
      if (!this.disabled) {
        this.$emit('click', event)
      }
    }
  }
}
</script>
```

### 2.3 组件通信

**父子组件通信：**

```vue
<!-- 父组件 -->
<template>
  <child-component 
    :message="parentMessage"
    @child-event="handleChildEvent"
  />
</template>

<script>
export default {
  data() {
    return {
      parentMessage: 'Hello from parent'
    }
  },
  methods: {
    handleChildEvent(data) {
      console.log('Received from child:', data)
    }
  }
}
</script>

<!-- 子组件 -->
<template>
  <div>
    <p>{{ message }}</p>
    <button @click="notifyParent">通知父组件</button>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    }
  },
  methods: {
    notifyParent() {
      this.$emit('child-event', { data: 'some data' })
    }
  }
}
</script>
```

**兄弟组件通信（通过父组件）：**

```vue
<!-- 父组件 -->
<template>
  <div>
    <component-a :shared-data="sharedData" @update="updateSharedData" />
    <component-b :shared-data="sharedData" @update="updateSharedData" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      sharedData: {}
    }
  },
  methods: {
    updateSharedData(newData) {
      this.sharedData = { ...this.sharedData, ...newData }
    }
  }
}
</script>
```

**使用 Vuex 进行全局状态管理：**

```javascript
// store/modules/user.js
export default {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    }
  },
  actions: {
    fetchUser({ commit }, userId) {
      return api.getUser(userId).then(user => {
        commit('SET_USER', user)
        return user
      })
    }
  },
  getters: {
    isAuthenticated: state => !!state.user
  }
}
```

---

## 3. Props 和 Data 的最佳实践

### 3.1 Props 定义规范

**✅ 完整的 Props 定义：**

```vue
<script>
export default {
  props: {
    // 基础类型检查
    title: {
      type: String,
      required: true
    },
    
    // 带默认值
    count: {
      type: Number,
      default: 0
    },
    
    // 对象/数组的默认值必须从函数返回
    config: {
      type: Object,
      default: () => ({})
    },
    
    // 自定义验证
    status: {
      type: String,
      validator: value => ['active', 'inactive', 'pending'].includes(value)
    },
    
    // 多种类型
    value: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>
```

### 3.2 Props 验证

**✅ 严格的 Props 验证：**

```vue
<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
      validator(user) {
        return user && typeof user.id === 'number' && typeof user.name === 'string'
      }
    },
    
    items: {
      type: Array,
      default: () => [],
      validator(items) {
        return items.every(item => item.id && item.name)
      }
    }
  }
}
</script>
```

### 3.3 Data 初始化

**✅ 正确的 Data 初始化：**

```vue
<script>
export default {
  data() {
    return {
      // 基础类型
      count: 0,
      message: '',
      isVisible: false,
      
      // 对象
      user: {
        id: null,
        name: '',
        email: ''
      },
      
      // 数组
      items: [],
      
      // 复杂对象
      formData: {
        username: '',
        password: '',
        remember: false
      }
    }
  }
}
</script>
```

**❌ 避免在 data 中直接使用 props：**

```vue
<!-- 不好的做法 -->
<script>
export default {
  props: ['initialValue'],
  data() {
    return {
      value: this.initialValue  // 不要这样做
    }
  }
}
</script>

<!-- 好的做法 -->
<script>
export default {
  props: ['value'],
  computed: {
    // 如果需要修改，使用计算属性或 watch
    localValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      }
    }
  }
}
</script>
```

### 3.4 响应式数据注意事项

**Vue2 响应式限制：**

```vue
<script>
export default {
  data() {
    return {
      user: {
        name: 'John'
      }
    }
  },
  methods: {
    // ❌ 这样不会触发响应式更新
    addProperty() {
      this.user.age = 25  // 不会响应式
    },
    
    // ✅ 使用 Vue.set 或 $set
    addPropertyCorrect() {
      this.$set(this.user, 'age', 25)
    },
    
    // ✅ 或者创建新对象
    addPropertyCorrect2() {
      this.user = { ...this.user, age: 25 }
    },
    
    // ❌ 直接通过索引设置数组项不会响应式
    updateArrayItem() {
      this.items[0] = newItem  // 不会响应式
    },
    
    // ✅ 使用 Vue.set
    updateArrayItemCorrect() {
      this.$set(this.items, 0, newItem)
    },
    
    // ✅ 使用 splice
    updateArrayItemCorrect2() {
      this.items.splice(0, 1, newItem)
    }
  }
}
</script>
```

---

## 4. 计算属性和方法的选择

### 4.1 何时使用计算属性

计算属性适用于：
- 基于响应式数据的派生值
- 需要缓存的结果
- 模板中的复杂表达式

**✅ 使用计算属性：**

```vue
<template>
  <div>
    <p>全名：{{ fullName }}</p>
    <p>已完成任务：{{ completedTasks.length }}</p>
    <p>总价：{{ totalPrice }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe',
      tasks: [
        { id: 1, title: 'Task 1', completed: true },
        { id: 2, title: 'Task 2', completed: false }
      ],
      items: [
        { name: 'Item 1', price: 10, quantity: 2 },
        { name: 'Item 2', price: 20, quantity: 1 }
      ]
    }
  },
  computed: {
    // 简单计算
    fullName() {
      return `${this.firstName} ${this.lastName}`
    },
    
    // 过滤数组
    completedTasks() {
      return this.tasks.filter(task => task.completed)
    },
    
    // 复杂计算
    totalPrice() {
      return this.items.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0)
    }
  }
}
</script>
```

### 4.2 何时使用方法

方法适用于：
- 事件处理
- 不需要缓存的操作
- 需要传递参数的操作

**✅ 使用方法：**

```vue
<template>
  <div>
    <button @click="handleClick">点击</button>
    <button @click="handleSubmit(formData)">提交</button>
    <p>{{ formatDate(new Date()) }}</p>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      console.log('Button clicked')
    },
    
    handleSubmit(data) {
      // 提交逻辑
      this.$emit('submit', data)
    },
    
    formatDate(date) {
      return date.toLocaleDateString()
    }
  }
}
</script>
```

### 4.3 计算属性 vs 方法

**性能对比：**

```vue
<template>
  <!-- 计算属性：只计算一次，有缓存 -->
  <div>{{ expensiveComputed }}</div>
  <div>{{ expensiveComputed }}</div>  <!-- 不会重新计算 -->
  
  <!-- 方法：每次调用都会执行 -->
  <div>{{ expensiveMethod() }}</div>
  <div>{{ expensiveMethod() }}</div>  <!-- 会执行两次 -->
</template>

<script>
export default {
  data() {
    return {
      items: [/* 大量数据 */]
    }
  },
  computed: {
    expensiveComputed() {
      // 只有 items 改变时才会重新计算
      return this.items.reduce((sum, item) => sum + item.value, 0)
    }
  },
  methods: {
    expensiveMethod() {
      // 每次调用都会执行
      return this.items.reduce((sum, item) => sum + item.value, 0)
    }
  }
}
</script>
```

---

## 5. 生命周期钩子的正确使用

### 5.1 生命周期钩子概览

```vue
<script>
export default {
  // 1. 创建阶段
  beforeCreate() {
    // 实例初始化之后，数据观测和事件配置之前
    // 此时无法访问 data、methods、computed
  },
  
  created() {
    // 实例创建完成
    // 可以访问 data、methods、computed
    // 适合：数据初始化、API 调用、事件监听
    this.fetchData()
    this.setupEventListeners()
  },
  
  // 2. 挂载阶段
  beforeMount() {
    // 模板编译完成，但尚未挂载到 DOM
  },
  
  mounted() {
    // 实例挂载到 DOM 后
    // 适合：DOM 操作、第三方库初始化、定时器
    this.$refs.input.focus()
    this.initChart()
    this.timer = setInterval(() => {
      // 定时任务
    }, 1000)
  },
  
  // 3. 更新阶段
  beforeUpdate() {
    // 数据更新时，DOM 更新之前
  },
  
  updated() {
    // DOM 更新完成后
    // 注意：避免在这里修改数据，可能导致无限循环
  },
  
  // 4. 销毁阶段
  beforeDestroy() {
    // 实例销毁之前
    // 适合：清理定时器、取消事件监听、清理订阅
    if (this.timer) {
      clearInterval(this.timer)
    }
    this.removeEventListeners()
  },
  
  destroyed() {
    // 实例销毁后
  }
}
</script>
```

### 5.2 常见使用场景

**✅ 在 created 中初始化数据：**

```vue
<script>
export default {
  data() {
    return {
      user: null,
      loading: false
    }
  },
  async created() {
    this.loading = true
    try {
      this.user = await this.fetchUser()
    } catch (error) {
      this.handleError(error)
    } finally {
      this.loading = false
    }
  },
  methods: {
    async fetchUser() {
      const response = await api.getUser()
      return response.data
    }
  }
}
</script>
```

**✅ 在 mounted 中进行 DOM 操作：**

```vue
<template>
  <div ref="chartContainer"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    // DOM 已挂载，可以安全操作
    this.chart = echarts.init(this.$refs.chartContainer)
    this.renderChart()
  },
  beforeDestroy() {
    // 清理资源
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
  },
  methods: {
    renderChart() {
      this.chart.setOption({
        // 图表配置
      })
    }
  }
}
</script>
```

**✅ 清理资源：**

```vue
<script>
export default {
  data() {
    return {
      timer: null,
      eventBus: null
    }
  },
  created() {
    // 设置定时器
    this.timer = setInterval(() => {
      this.updateData()
    }, 1000)
    
    // 监听事件
    this.eventBus = this.$bus
    this.eventBus.$on('custom-event', this.handleEvent)
  },
  beforeDestroy() {
    // 清理定时器
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
    
    // 移除事件监听
    if (this.eventBus) {
      this.eventBus.$off('custom-event', this.handleEvent)
    }
  },
  methods: {
    updateData() {
      // 更新数据
    },
    handleEvent(data) {
      // 处理事件
    }
  }
}
</script>
```

---

## 6. 事件处理与通信

### 6.1 事件命名规范

**✅ 使用 kebab-case：**

```vue
<!-- 父组件 -->
<template>
  <child-component 
    @user-updated="handleUserUpdate"
    @form-submitted="handleFormSubmit"
  />
</template>

<script>
export default {
  methods: {
    handleUserUpdate(user) {
      // 处理用户更新
    },
    handleFormSubmit(formData) {
      // 处理表单提交
    }
  }
}
</script>

<!-- 子组件 -->
<script>
export default {
  methods: {
    updateUser() {
      this.$emit('user-updated', this.user)
    },
    submitForm() {
      this.$emit('form-submitted', this.formData)
    }
  }
}
</script>
```

### 6.2 使用 .sync 修饰符

**✅ 双向绑定简化：**

```vue
<!-- 父组件 -->
<template>
  <child-component :visible.sync="isVisible" />
</template>

<script>
export default {
  data() {
    return {
      isVisible: false
    }
  }
}
</script>

<!-- 子组件 -->
<template>
  <div v-if="visible">
    <button @click="close">关闭</button>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
```

### 6.3 使用 v-model

**✅ 自定义组件的 v-model：**

```vue
<!-- 自定义输入组件 -->
<template>
  <input 
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  }
}
</script>

<!-- 使用 -->
<template>
  <custom-input v-model="username" />
</template>
```

### 6.4 事件总线（Event Bus）

**✅ 创建事件总线：**

```javascript
// utils/eventBus.js
import Vue from 'vue'
export default new Vue()
```

**✅ 使用事件总线：**

```vue
<!-- 组件 A -->
<script>
import eventBus from '@/utils/eventBus'

export default {
  methods: {
    sendMessage() {
      eventBus.$emit('message', { text: 'Hello' })
    }
  }
}
</script>

<!-- 组件 B -->
<script>
import eventBus from '@/utils/eventBus'

export default {
  created() {
    eventBus.$on('message', this.handleMessage)
  },
  beforeDestroy() {
    eventBus.$off('message', this.handleMessage)
  },
  methods: {
    handleMessage(data) {
      console.log('Received:', data)
    }
  }
}
</script>
```

---

## 7. 性能优化技巧

### 7.1 使用 v-show 和 v-if 的正确场景

**v-if：**
- 条件很少改变
- 需要条件性渲染
- 切换开销大

**v-show：**
- 频繁切换显示/隐藏
- 初始渲染开销大但切换开销小

```vue
<template>
  <!-- 使用 v-if：条件很少改变 -->
  <div v-if="userRole === 'admin'">
    <admin-panel />
  </div>
  
  <!-- 使用 v-show：频繁切换 -->
  <div v-show="isVisible">
    <tooltip />
  </div>
</template>
```

### 7.2 列表渲染优化

**✅ 使用 key：**

```vue
<template>
  <!-- 总是使用唯一的 key -->
  <div v-for="item in items" :key="item.id">
    {{ item.name }}
  </div>
</template>
```

**✅ 避免在模板中使用复杂计算：**

```vue
<!-- ❌ 不好的做法 -->
<template>
  <div v-for="item in items" :key="item.id">
    {{ expensiveComputation(item) }}
  </div>
</template>

<!-- ✅ 好的做法 -->
<template>
  <div v-for="item in processedItems" :key="item.id">
    {{ item.computedValue }}
  </div>
</template>

<script>
export default {
  computed: {
    processedItems() {
      return this.items.map(item => ({
        ...item,
        computedValue: this.expensiveComputation(item)
      }))
    }
  }
}
</script>
```

### 7.3 计算属性缓存

**✅ 利用计算属性缓存：**

```vue
<script>
export default {
  data() {
    return {
      items: [/* 大量数据 */]
    }
  },
  computed: {
    // 只有 items 改变时才重新计算
    filteredItems() {
      return this.items.filter(item => item.active)
    },
    
    // 可以依赖其他计算属性
    sortedItems() {
      return [...this.filteredItems].sort((a, b) => a.order - b.order)
    }
  }
}
</script>
```

### 7.4 异步组件和代码分割

**✅ 异步组件：**

```vue
<script>
export default {
  components: {
    // 异步加载组件
    HeavyComponent: () => import('./HeavyComponent.vue'),
    
    // 带加载状态
    AsyncComponent: () => ({
      component: import('./AsyncComponent.vue'),
      loading: LoadingComponent,
      error: ErrorComponent,
      delay: 200,
      timeout: 3000
    })
  }
}
</script>
```

### 7.5 使用 Object.freeze 优化大列表

**✅ 冻结不需要响应式的数据：**

```vue
<script>
export default {
  data() {
    return {
      // 大量静态数据，不需要响应式
      staticList: Object.freeze([
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' }
        // ...
      ])
    }
  }
}
</script>
```

### 7.6 防抖和节流

**✅ 使用防抖和节流：**

```javascript
// utils/debounce.js
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// utils/throttle.js
export function throttle(func, limit) {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}
```

**✅ 在组件中使用：**

```vue
<script>
import { debounce } from '@/utils/debounce'
import { throttle } from '@/utils/throttle'

export default {
  methods: {
    // 防抖：搜索输入
    handleSearch: debounce(function(query) {
      this.search(query)
    }, 300),
    
    // 节流：滚动事件
    handleScroll: throttle(function() {
      this.updateScrollPosition()
    }, 100)
  }
}
</script>
```

---

## 8. 代码可维护性

### 8.1 提取常量

**✅ 使用常量文件：**

```javascript
// constants/index.js
export const API_BASE_URL = 'https://api.example.com'
export const DEFAULT_PAGE_SIZE = 20
export const STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  INACTIVE: 'inactive'
}
```

**✅ 在组件中使用：**

```vue
<script>
import { STATUS, DEFAULT_PAGE_SIZE } from '@/constants'

export default {
  data() {
    return {
      status: STATUS.PENDING,
      pageSize: DEFAULT_PAGE_SIZE
    }
  }
}
</script>
```

### 8.2 提取工具函数

**✅ 工具函数：**

```javascript
// utils/format.js
export function formatDate(date, format = 'YYYY-MM-DD') {
  // 日期格式化逻辑
}

export function formatCurrency(amount, currency = 'CNY') {
  // 货币格式化逻辑
}

// utils/validation.js
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function validatePhone(phone) {
  const re = /^1[3-9]\d{9}$/
  return re.test(phone)
}
```

### 8.3 使用 Mixins

**✅ 创建 Mixin：**

```javascript
// mixins/formMixin.js
export default {
  data() {
    return {
      formErrors: {},
      isSubmitting: false
    }
  },
  methods: {
    validateForm() {
      // 通用表单验证逻辑
    },
    resetForm() {
      // 重置表单逻辑
    }
  }
}
```

**✅ 使用 Mixin：**

```vue
<script>
import formMixin from '@/mixins/formMixin'

export default {
  mixins: [formMixin],
  methods: {
    handleSubmit() {
      if (this.validateForm()) {
        this.isSubmitting = true
        // 提交逻辑
      }
    }
  }
}
</script>
```

### 8.4 组件文档化

**✅ 添加组件注释：**

```vue
<!--
  用户卡片组件
  
  @component UserCard
  @description 显示用户基本信息的卡片组件
  
  @prop {Object} user - 用户对象，必须包含 id 和 name
  @prop {Boolean} showActions - 是否显示操作按钮，默认 false
  
  @event user-click - 用户点击卡片时触发，参数：user 对象
  @event edit - 点击编辑按钮时触发，参数：user 对象
  
  @example
  <user-card 
    :user="currentUser" 
    :show-actions="true"
    @user-click="handleUserClick"
    @edit="handleEdit"
  />
-->
<template>
  <!-- 组件内容 -->
</template>
```

---

## 9. 错误处理与调试

### 9.1 错误边界处理

**✅ 全局错误处理：**

```javascript
// main.js
Vue.config.errorHandler = (err, vm, info) => {
  console.error('Global error:', err)
  console.error('Component:', vm)
  console.error('Info:', info)
  
  // 发送错误到监控服务
  errorTracker.log(err, {
    component: vm.$options.name,
    info
  })
}
```

**✅ 组件错误处理：**

```vue
<script>
export default {
  errorCaptured(err, instance, info) {
    // 捕获子组件错误
    console.error('Child component error:', err)
    // 返回 false 阻止错误继续传播
    return false
  },
  methods: {
    async fetchData() {
      try {
        const data = await api.getData()
        this.data = data
      } catch (error) {
        this.handleError(error)
      }
    },
    handleError(error) {
      // 统一错误处理
      if (error.response) {
        // HTTP 错误
        this.$message.error(`请求失败: ${error.response.status}`)
      } else if (error.request) {
        // 网络错误
        this.$message.error('网络连接失败')
      } else {
        // 其他错误
        this.$message.error('发生未知错误')
      }
    }
  }
}
</script>
```

### 9.2 调试技巧

**✅ 使用 Vue Devtools：**

```vue
<script>
export default {
  data() {
    return {
      debug: process.env.NODE_ENV === 'development'
    }
  },
  methods: {
    logData() {
      if (this.debug) {
        console.log('Component data:', this.$data)
        console.log('Props:', this.$props)
        console.log('Computed:', this.$options.computed)
      }
    }
  }
}
</script>
```

**✅ 使用 $nextTick：**

```vue
<script>
export default {
  methods: {
    updateDOM() {
      this.message = 'Updated'
      
      // 等待 DOM 更新后执行
      this.$nextTick(() => {
        // DOM 已更新
        console.log(this.$refs.message.textContent)
      })
    }
  }
}
</script>
```

---

## 10. 测试友好代码

### 10.1 可测试的组件设计

**✅ 纯函数方法：**

```vue
<script>
export default {
  methods: {
    // ✅ 纯函数，易于测试
    calculateTotal(items) {
      return items.reduce((sum, item) => sum + item.price, 0)
    },
    
    // ✅ 分离业务逻辑
    formatUser(user) {
      return {
        ...user,
        displayName: `${user.firstName} ${user.lastName}`
      }
    }
  }
}
</script>
```

**✅ 避免直接依赖全局对象：**

```vue
<!-- ❌ 不好的做法 -->
<script>
export default {
  methods: {
    fetchData() {
      axios.get('/api/data').then(res => {
        // ...
      })
    }
  }
}
</script>

<!-- ✅ 好的做法 -->
<script>
import api from '@/api'

export default {
  methods: {
    async fetchData() {
      const data = await api.getData()
      // ...
    }
  }
}
</script>
```

### 10.2 提供测试钩子

```vue
<script>
export default {
  data() {
    return {
      // 测试模式
      __TEST_MODE__: process.env.NODE_ENV === 'test'
    }
  },
  methods: {
    // 暴露内部方法供测试使用
    __testMethod__() {
      return this.internalMethod()
    }
  }
}
</script>
```

---

## 11. 常见反模式与解决方案

### 11.1 避免在模板中使用复杂逻辑

**❌ 不好的做法：**

```vue
<template>
  <div>
    {{ items.filter(item => item.active).map(item => item.name).join(', ') }}
  </div>
</template>
```

**✅ 好的做法：**

```vue
<template>
  <div>{{ activeItemNames }}</div>
</template>

<script>
export default {
  computed: {
    activeItemNames() {
      return this.items
        .filter(item => item.active)
        .map(item => item.name)
        .join(', ')
    }
  }
}
</script>
```

### 11.2 避免直接修改 Props

**❌ 不好的做法：**

```vue
<script>
export default {
  props: ['user'],
  methods: {
    updateUser() {
      this.user.name = 'New Name'  // 直接修改 props
    }
  }
}
</script>
```

**✅ 好的做法：**

```vue
<script>
export default {
  props: ['user'],
  data() {
    return {
      localUser: { ...this.user }
    }
  },
  methods: {
    updateUser() {
      this.localUser.name = 'New Name'
      this.$emit('update:user', this.localUser)
    }
  }
}
</script>
```

### 11.3 避免在 data 中使用箭头函数

**❌ 不好的做法：**

```vue
<script>
export default {
  data: () => ({
    message: 'Hello'
  })
}
</script>
```

**✅ 好的做法：**

```vue
<script>
export default {
  data() {
    return {
      message: 'Hello'
    }
  }
}
</script>
```

### 11.4 避免过度使用 watch

**❌ 不好的做法：**

```vue
<script>
export default {
  watch: {
    user() {
      this.fetchUserData()
    },
    userId() {
      this.fetchUserData()
    },
    userRole() {
      this.fetchUserData()
    }
  }
}
</script>
```

**✅ 好的做法：**

```vue
<script>
export default {
  computed: {
    shouldFetchData() {
      return this.user && this.userId && this.userRole
    }
  },
  watch: {
    shouldFetchData(newVal) {
      if (newVal) {
        this.fetchUserData()
      }
    }
  }
}
</script>
```

---

## 12. 项目架构建议

### 12.1 大型项目结构

```
src/
├── api/                 # API 接口层
│   ├── modules/
│   │   ├── user.js
│   │   └── product.js
│   └── index.js
├── assets/              # 静态资源
├── components/          # 组件
│   ├── common/         # 通用组件
│   ├── business/       # 业务组件
│   └── layout/         # 布局组件
├── constants/          # 常量
├── directives/         # 自定义指令
├── filters/           # 过滤器
├── mixins/            # 混入
├── plugins/           # 插件
├── router/            # 路由
│   ├── modules/
│   └── index.js
├── store/             # Vuex
│   ├── modules/
│   │   ├── user.js
│   │   └── product.js
│   └── index.js
├── styles/            # 样式
│   ├── variables.scss
│   ├── mixins.scss
│   └── main.scss
├── utils/             # 工具函数
│   ├── request.js
│   ├── format.js
│   └── validate.js
└── views/             # 页面
    ├── Home.vue
    └── About.vue
```

### 12.2 API 层封装

**✅ 统一的 API 封装：**

```javascript
// api/request.js
import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      Message.error(res.message || '请求失败')
      return Promise.reject(new Error(res.message || '请求失败'))
    }
    return res.data
  },
  error => {
    Message.error(error.message || '网络错误')
    return Promise.reject(error)
  }
)

export default service
```

**✅ 模块化 API：**

```javascript
// api/modules/user.js
import request from '../request'

export default {
  getUser(id) {
    return request({
      url: `/users/${id}`,
      method: 'get'
    })
  },
  
  updateUser(id, data) {
    return request({
      url: `/users/${id}`,
      method: 'put',
      data
    })
  },
  
  deleteUser(id) {
    return request({
      url: `/users/${id}`,
      method: 'delete'
    })
  }
}
```

### 12.3 Vuex 模块化

**✅ 模块化的 Vuex：**

```javascript
// store/modules/user.js
import userApi from '@/api/modules/user'

const state = {
  user: null,
  loading: false
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  }
}

const actions = {
  async fetchUser({ commit }, userId) {
    commit('SET_LOADING', true)
    try {
      const user = await userApi.getUser(userId)
      commit('SET_USER', user)
      return user
    } finally {
      commit('SET_LOADING', false)
    }
  }
}

const getters = {
  isAuthenticated: state => !!state.user,
  userName: state => state.user?.name || ''
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
```

### 12.4 路由模块化

**✅ 模块化路由：**

```javascript
// router/modules/user.js
export default {
  path: '/user',
  component: () => import('@/views/layout/UserLayout.vue'),
  children: [
    {
      path: 'profile',
      name: 'UserProfile',
      component: () => import('@/views/user/Profile.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: 'settings',
      name: 'UserSettings',
      component: () => import('@/views/user/Settings.vue'),
      meta: { requiresAuth: true }
    }
  ]
}

// router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import userRoutes from './modules/user'
import productRoutes from './modules/product'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  userRoutes,
  productRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
```

---

## 总结

编写高质量的 Vue2 代码需要遵循以下核心原则：

1. **组件设计**：单一职责、高复用性、清晰的通信方式
2. **代码组织**：合理的文件结构、命名规范、模块化
3. **性能优化**：合理使用计算属性、异步组件、防抖节流
4. **可维护性**：提取常量、工具函数、使用 Mixins、文档化
5. **错误处理**：全局错误处理、组件错误捕获
6. **测试友好**：纯函数、分离业务逻辑、提供测试钩子
7. **避免反模式**：不在模板中使用复杂逻辑、不直接修改 props

遵循这些最佳实践，可以编写出高质量、可维护、性能优秀的 Vue2 代码。

---

**教程结束**

希望这个教程能帮助你编写出高质量的 Vue2 代码！如有任何问题，欢迎继续深入学习 Vue 的其他特性。

