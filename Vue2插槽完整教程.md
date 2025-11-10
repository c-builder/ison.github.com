# Vue2 插槽完整教程 - 从基础到高级

## 目录
1. [插槽简介](#1-插槽简介)
2. [默认插槽](#2-默认插槽)
3. [具名插槽](#3-具名插槽)
4. [作用域插槽](#4-作用域插槽)
5. [插槽的缩写语法](#5-插槽的缩写语法)
6. [动态插槽名](#6-动态插槽名)
7. [插槽的默认内容](#7-插槽的默认内容)
8. [插槽的高级用法](#8-插槽的高级用法)
9. [实际应用场景](#9-实际应用场景)
10. [最佳实践](#10-最佳实践)

---

## 1. 插槽简介

### 1.1 什么是插槽？

插槽（Slot）是 Vue 提供的一种内容分发机制，允许父组件向子组件传递模板内容。插槽让组件更加灵活和可复用。

### 1.2 为什么需要插槽？

在没有插槽的情况下，组件的内容是固定的。插槽允许我们：
- 自定义组件的内容
- 保持组件的结构不变
- 提高组件的复用性
- 实现更灵活的组件设计

### 1.3 插槽的基本概念

```html
<!-- 子组件 -->
<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<!-- 父组件使用 -->
<my-component>
  <p>这是插入的内容</p>
</my-component>
```

---

## 2. 默认插槽

### 2.1 基本用法

默认插槽是最简单的插槽形式，用于接收父组件传递的任意内容。

**子组件定义：**

```vue
<!-- ChildComponent.vue -->
<template>
  <div class="card">
    <div class="card-header">
      <h3>卡片标题</h3>
    </div>
    <div class="card-body">
      <!-- 默认插槽 -->
      <slot></slot>
    </div>
    <div class="card-footer">
      <p>卡片底部</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
}
.card-header {
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 15px;
}
.card-body {
  min-height: 100px;
}
.card-footer {
  border-top: 1px solid #eee;
  padding-top: 10px;
  margin-top: 15px;
  color: #999;
}
</style>
```

**父组件使用：**

```vue
<!-- ParentComponent.vue -->
<template>
  <div>
    <child-component>
      <p>这是卡片的主要内容</p>
      <ul>
        <li>列表项 1</li>
        <li>列表项 2</li>
        <li>列表项 3</li>
      </ul>
    </child-component>
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue'

export default {
  components: {
    ChildComponent
  }
}
</script>
```

### 2.2 使用场景

**场景 1：卡片组件**

```vue
<!-- Card.vue -->
<template>
  <div class="card-wrapper">
    <div class="card-header">
      <slot name="header"></slot>
    </div>
    <div class="card-content">
      <slot></slot> <!-- 默认插槽用于主要内容 -->
    </div>
  </div>
</template>

<!-- 使用 -->
<card>
  <p>这是卡片的主要内容区域</p>
</card>
```

**场景 2：布局容器**

```vue
<!-- Container.vue -->
<template>
  <div class="container">
    <div class="sidebar">
      <slot name="sidebar"></slot>
    </div>
    <div class="main-content">
      <slot></slot> <!-- 默认插槽用于主内容 -->
    </div>
  </div>
</template>

<!-- 使用 -->
<container>
  <article>
    <h1>文章标题</h1>
    <p>文章内容...</p>
  </article>
</container>
```

**场景 3：按钮组件**

```vue
<!-- Button.vue -->
<template>
  <button class="btn" :class="btnType" @click="handleClick">
    <slot></slot> <!-- 按钮文本内容 -->
  </button>
</template>

<script>
export default {
  props: {
    btnType: {
      type: String,
      default: 'default'
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<!-- 使用 -->
<button btn-type="primary" @click="handleSubmit">
  提交
</button>

<button btn-type="danger" @click="handleDelete">
  <i class="icon-delete"></i> 删除
</button>
```

---

## 3. 具名插槽

### 3.1 基本用法

当组件需要多个插槽时，使用具名插槽来区分不同的内容区域。

**子组件定义：**

```vue
<!-- Layout.vue -->
<template>
  <div class="layout">
    <header class="header">
      <slot name="header"></slot>
    </header>
    <main class="main">
      <slot name="main"></slot>
    </main>
    <aside class="sidebar">
      <slot name="sidebar"></slot>
    </aside>
    <footer class="footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 200px 1fr;
  min-height: 100vh;
}
.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
</style>
```

**父组件使用：**

```vue
<!-- 使用 template 和 v-slot 指令 -->
<layout>
  <template v-slot:header>
    <h1>网站标题</h1>
    <nav>导航菜单</nav>
  </template>

  <template v-slot:main>
    <article>
      <h2>文章标题</h2>
      <p>文章内容...</p>
    </article>
  </template>

  <template v-slot:sidebar>
    <ul>
      <li>侧边栏链接 1</li>
      <li>侧边栏链接 2</li>
    </ul>
  </template>

  <template v-slot:footer>
    <p>© 2024 版权所有</p>
  </template>
</layout>
```

### 3.2 使用场景

**场景 1：表单组件**

```vue
<!-- Form.vue -->
<template>
  <form class="form" @submit.prevent="handleSubmit">
    <div class="form-header">
      <slot name="title"></slot>
    </div>
    <div class="form-body">
      <slot name="fields"></slot>
    </div>
    <div class="form-footer">
      <slot name="actions"></slot>
    </div>
  </form>
</template>

<script>
export default {
  methods: {
    handleSubmit() {
      this.$emit('submit')
    }
  }
}
</script>

<!-- 使用 -->
<form @submit="handleFormSubmit">
  <template v-slot:title>
    <h2>用户注册</h2>
  </template>

  <template v-slot:fields>
    <input type="text" placeholder="用户名" v-model="username">
    <input type="email" placeholder="邮箱" v-model="email">
    <input type="password" placeholder="密码" v-model="password">
  </template>

  <template v-slot:actions>
    <button type="submit">注册</button>
    <button type="button" @click="handleCancel">取消</button>
  </template>
</form>
```

**场景 2：数据表格组件**

```vue
<!-- DataTable.vue -->
<template>
  <div class="data-table">
    <div class="table-header">
      <slot name="header">
        <h3>数据表格</h3>
      </slot>
    </div>
    <div class="table-toolbar">
      <slot name="toolbar"></slot>
    </div>
    <table class="table">
      <thead>
        <slot name="thead"></slot>
      </thead>
      <tbody>
        <slot name="tbody"></slot>
      </tbody>
    </table>
    <div class="table-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<!-- 使用 -->
<data-table>
  <template v-slot:header>
    <h3>用户列表</h3>
  </template>

  <template v-slot:toolbar>
    <button @click="handleAdd">添加</button>
    <button @click="handleExport">导出</button>
  </template>

  <template v-slot:thead>
    <tr>
      <th>ID</th>
      <th>姓名</th>
      <th>邮箱</th>
      <th>操作</th>
    </tr>
  </template>

  <template v-slot:tbody>
    <tr v-for="user in users" :key="user.id">
      <td>{{ user.id }}</td>
      <td>{{ user.name }}</td>
      <td>{{ user.email }}</td>
      <td>
        <button @click="handleEdit(user)">编辑</button>
        <button @click="handleDelete(user)">删除</button>
      </td>
    </tr>
  </template>

  <template v-slot:footer>
    <pagination :total="total" @change="handlePageChange"></pagination>
  </template>
</data-table>
```

**场景 3：模态框组件**

```vue
<!-- Modal.vue -->
<template>
  <div class="modal-overlay" v-if="visible" @click="handleOverlayClick">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <slot name="header">
          <h3>默认标题</h3>
        </slot>
        <button class="close-btn" @click="handleClose">×</button>
      </div>
      <div class="modal-body">
        <slot name="body"></slot>
      </div>
      <div class="modal-footer">
        <slot name="footer">
          <button @click="handleClose">关闭</button>
        </slot>
      </div>
    </div>
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
    handleClose() {
      this.$emit('update:visible', false)
    },
    handleOverlayClick() {
      this.handleClose()
    }
  }
}
</script>

<!-- 使用 -->
<modal :visible.sync="showModal">
  <template v-slot:header>
    <h3>确认删除</h3>
  </template>

  <template v-slot:body>
    <p>确定要删除这条记录吗？此操作不可恢复。</p>
  </template>

  <template v-slot:footer>
    <button @click="confirmDelete">确认删除</button>
    <button @click="showModal = false">取消</button>
  </template>
</modal>
```

---

## 4. 作用域插槽

### 4.1 基本用法

作用域插槽允许子组件向父组件传递数据，让父组件可以访问子组件内部的数据。

**子组件定义：**

```vue
<!-- UserList.vue -->
<template>
  <div class="user-list">
    <ul>
      <li v-for="user in users" :key="user.id">
        <slot :user="user" :index="index"></slot>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com' },
        { id: 2, name: '李四', age: 30, email: 'lisi@example.com' },
        { id: 3, name: '王五', age: 28, email: 'wangwu@example.com' }
      ]
    }
  }
}
</script>
```

**父组件使用：**

```vue
<!-- 使用作用域插槽 -->
<user-list>
  <template v-slot:default="slotProps">
    <div class="user-item">
      <span>{{ slotProps.user.name }}</span>
      <span>{{ slotProps.user.age }} 岁</span>
      <span>{{ slotProps.user.email }}</span>
    </div>
  </template>
</user-list>

<!-- 或者使用解构 -->
<user-list>
  <template v-slot:default="{ user, index }">
    <div class="user-item">
      <strong>{{ user.name }}</strong>
      <p>年龄: {{ user.age }}</p>
      <p>邮箱: {{ user.email }}</p>
    </div>
  </template>
</user-list>
```

### 4.2 具名作用域插槽

```vue
<!-- DataTable.vue -->
<template>
  <table class="data-table">
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.key">
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in data" :key="index">
        <td v-for="column in columns" :key="column.key">
          <slot 
            :name="column.key" 
            :row="row" 
            :column="column" 
            :index="index"
          >
            {{ row[column.key] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  }
}
</script>

<!-- 使用 -->
<data-table :columns="columns" :data="tableData">
  <!-- 自定义状态列 -->
  <template v-slot:status="{ row }">
    <span :class="['status', row.status]">
      {{ row.status === 'active' ? '活跃' : '禁用' }}
    </span>
  </template>

  <!-- 自定义操作列 -->
  <template v-slot:actions="{ row, index }">
    <button @click="handleEdit(row)">编辑</button>
    <button @click="handleDelete(row, index)">删除</button>
  </template>

  <!-- 自定义头像列 -->
  <template v-slot:avatar="{ row }">
    <img :src="row.avatar" :alt="row.name" class="avatar">
  </template>
</data-table>
```

### 4.3 使用场景

**场景 1：列表组件**

```vue
<!-- List.vue -->
<template>
  <div class="list">
    <div 
      v-for="(item, index) in items" 
      :key="item.id || index"
      class="list-item"
    >
      <slot :item="item" :index="index" :isLast="index === items.length - 1">
        <div>{{ item }}</div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<!-- 使用 -->
<list :items="products">
  <template v-slot:default="{ item, index, isLast }">
    <div class="product-card">
      <img :src="item.image" :alt="item.name">
      <h3>{{ item.name }}</h3>
      <p class="price">¥{{ item.price }}</p>
      <button v-if="!isLast" @click="addToCart(item)">加入购物车</button>
    </div>
  </template>
</list>
```

**场景 2：分页组件**

```vue
<!-- Pagination.vue -->
<template>
  <div class="pagination">
    <button 
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
    >
      上一页
    </button>
    
    <slot 
      :currentPage="currentPage"
      :totalPages="totalPages"
      :pageNumbers="pageNumbers"
      :goToPage="goToPage"
    >
      <span 
        v-for="page in pageNumbers" 
        :key="page"
        :class="['page-number', { active: page === currentPage }]"
        @click="goToPage(page)"
      >
        {{ page }}
      </span>
    </slot>
    
    <button 
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
    >
      下一页
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  computed: {
    pageNumbers() {
      const pages = []
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i)
      }
      return pages
    }
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('page-change', page)
      }
    }
  }
}
</script>

<!-- 使用 -->
<pagination 
  :current-page="currentPage" 
  :total-pages="totalPages"
  @page-change="handlePageChange"
>
  <template v-slot:default="{ pageNumbers, currentPage, goToPage }">
    <div class="custom-pagination">
      <span 
        v-for="page in pageNumbers" 
        :key="page"
        :class="['custom-page', { active: page === currentPage }]"
        @click="goToPage(page)"
      >
        {{ page }}
      </span>
    </div>
  </template>
</pagination>
```

**场景 3：表单验证组件**

```vue
<!-- FormField.vue -->
<template>
  <div class="form-field">
    <label>{{ label }}</label>
    <slot 
      :value="value"
      :error="error"
      :updateValue="updateValue"
      :validate="validate"
    >
      <input 
        :value="value" 
        @input="updateValue($event.target.value)"
        :class="{ error: error }"
      >
    </slot>
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    value: [String, Number],
    rules: Array
  },
  data() {
    return {
      error: ''
    }
  },
  methods: {
    updateValue(newValue) {
      this.$emit('input', newValue)
      this.validate(newValue)
    },
    validate(value) {
      if (!this.rules) return true
      
      for (let rule of this.rules) {
        if (rule.required && !value) {
          this.error = rule.message || '此字段为必填项'
          return false
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          this.error = rule.message || '格式不正确'
          return false
        }
      }
      this.error = ''
      return true
    }
  }
}
</script>

<!-- 使用 -->
<form-field 
  label="邮箱" 
  v-model="email"
  :rules="emailRules"
>
  <template v-slot:default="{ value, updateValue, error }">
    <input 
      type="email"
      :value="value"
      @input="updateValue($event.target.value)"
      :class="{ 'has-error': error }"
      placeholder="请输入邮箱地址"
    >
  </template>
</form-field>
```

---

## 5. 插槽的缩写语法

### 5.1 v-slot 缩写

Vue 2.6+ 支持使用 `#` 作为 `v-slot` 的缩写。

```vue
<!-- 完整语法 -->
<template v-slot:header>
  <h1>标题</h1>
</template>

<!-- 缩写语法 -->
<template #header>
  <h1>标题</h1>
</template>

<!-- 作用域插槽的缩写 -->
<template #default="{ user }">
  <div>{{ user.name }}</div>
</template>

<!-- 具名作用域插槽的缩写 -->
<template #actions="{ row }">
  <button @click="handleEdit(row)">编辑</button>
</template>
```

### 5.2 slot 属性（旧语法，Vue 2.6 之前）

在 Vue 2.6 之前，使用 `slot` 属性：

```vue
<!-- 旧语法 - 默认插槽 -->
<child-component>
  <div slot>内容</div>
</child-component>

<!-- 旧语法 - 具名插槽 -->
<child-component>
  <div slot="header">头部内容</div>
  <div slot="footer">底部内容</div>
</child-component>

<!-- 旧语法 - 作用域插槽 -->
<child-component>
  <div slot="default" slot-scope="props">
    {{ props.user.name }}
  </div>
</child-component>
```

**注意：** Vue 2.6+ 仍然支持 `slot` 和 `slot-scope` 属性，但推荐使用新的 `v-slot` 语法。

---

## 6. 动态插槽名

### 6.1 基本用法

可以使用动态指令参数来定义动态插槽名。

```vue
<!-- DynamicSlot.vue -->
<template>
  <div>
    <slot name="header"></slot>
    <slot name="content"></slot>
    <slot name="footer"></slot>
  </div>
</template>

<!-- 使用 -->
<dynamic-slot>
  <template v-slot:[dynamicSlotName]>
    <p>动态插槽内容</p>
  </template>
</dynamic-slot>

<script>
export default {
  data() {
    return {
      dynamicSlotName: 'header' // 可以是 'header', 'content', 'footer'
    }
  }
}
</script>
```

### 6.2 使用场景

**场景：可配置的布局组件**

```vue
<!-- ConfigurableLayout.vue -->
<template>
  <div class="layout">
    <div 
      v-for="section in sections" 
      :key="section.name"
      :class="['section', section.name]"
    >
      <slot :name="section.name"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sections: {
      type: Array,
      required: true
    }
  }
}
</script>

<!-- 使用 -->
<configurable-layout :sections="layoutSections">
  <template v-slot:[section.name] v-for="section in layoutSections" :key="section.name">
    <component :is="section.component" v-bind="section.props"></component>
  </template>
</configurable-layout>

<script>
export default {
  data() {
    return {
      layoutSections: [
        { name: 'top', component: 'HeaderComponent' },
        { name: 'middle', component: 'ContentComponent' },
        { name: 'bottom', component: 'FooterComponent' }
      ]
    }
  }
}
</script>
```

---

## 7. 插槽的默认内容

### 7.1 基本用法

可以在 `<slot>` 标签内提供默认内容，当父组件没有提供内容时显示。

```vue
<!-- Button.vue -->
<template>
  <button class="btn">
    <slot>默认按钮</slot>
  </button>
</template>

<!-- 使用时不提供内容 -->
<button></button> <!-- 显示 "默认按钮" -->

<!-- 使用时提供内容 -->
<button>点击我</button> <!-- 显示 "点击我" -->
```

### 7.2 使用场景

**场景 1：带默认提示的输入框**

```vue
<!-- InputWithHint.vue -->
<template>
  <div class="input-wrapper">
    <input 
      :type="type" 
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
    <div class="hint">
      <slot name="hint">
        <span class="default-hint">请输入内容</span>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: String,
    value: [String, Number]
  }
}
</script>

<!-- 使用默认提示 -->
<input-with-hint v-model="username"></input-with-hint>

<!-- 自定义提示 -->
<input-with-hint v-model="email">
  <template v-slot:hint>
    <span class="custom-hint">请输入有效的邮箱地址</span>
  </template>
</input-with-hint>
```

**场景 2：卡片组件**

```vue
<!-- Card.vue -->
<template>
  <div class="card">
    <div class="card-header">
      <slot name="header">
        <h3>默认标题</h3>
      </slot>
    </div>
    <div class="card-body">
      <slot>
        <p>这是默认内容</p>
      </slot>
    </div>
    <div class="card-footer">
      <slot name="footer">
        <button>默认操作</button>
      </slot>
    </div>
  </div>
</template>
```

---

## 8. 插槽的高级用法

### 8.1 多个插槽的组合使用

```vue
<!-- Article.vue -->
<template>
  <article class="article">
    <header class="article-header">
      <slot name="title"></slot>
      <slot name="meta"></slot>
    </header>
    <div class="article-content">
      <slot name="content"></slot>
    </div>
    <aside class="article-sidebar">
      <slot name="sidebar"></slot>
    </aside>
    <footer class="article-footer">
      <slot name="footer"></slot>
    </footer>
  </article>
</template>

<!-- 使用 -->
<article>
  <template v-slot:title>
    <h1>文章标题</h1>
  </template>
  
  <template v-slot:meta>
    <div class="meta">
      <span>作者：张三</span>
      <span>发布时间：2024-01-01</span>
    </div>
  </template>
  
  <template v-slot:content>
    <p>文章正文内容...</p>
  </template>
  
  <template v-slot:sidebar>
    <div class="related-articles">
      <h4>相关文章</h4>
      <ul>
        <li>相关文章 1</li>
        <li>相关文章 2</li>
      </ul>
    </div>
  </template>
  
  <template v-slot:footer>
    <div class="tags">
      <span class="tag">Vue</span>
      <span class="tag">JavaScript</span>
    </div>
  </template>
</article>
```

### 8.2 插槽的嵌套使用

```vue
<!-- OuterComponent.vue -->
<template>
  <div class="outer">
    <inner-component>
      <template v-slot:header>
        <slot name="outer-header"></slot>
      </template>
      <template v-slot:content>
        <slot name="outer-content"></slot>
      </template>
    </inner-component>
  </div>
</template>

<!-- InnerComponent.vue -->
<template>
  <div class="inner">
    <div class="inner-header">
      <slot name="header"></slot>
    </div>
    <div class="inner-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<!-- 使用 -->
<outer-component>
  <template v-slot:outer-header>
    <h1>外层头部</h1>
  </template>
  <template v-slot:outer-content>
    <p>外层内容</p>
  </template>
</outer-component>
```

### 8.3 条件插槽

```vue
<!-- ConditionalSlot.vue -->
<template>
  <div>
    <slot v-if="showSlot" name="conditional"></slot>
    <div v-else class="fallback">
      <slot name="fallback">默认内容</slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showSlot: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<!-- 使用 -->
<conditional-slot :show-slot="hasData">
  <template v-slot:conditional>
    <div>条件内容</div>
  </template>
  <template v-slot:fallback>
    <div>没有数据时显示</div>
  </template>
</conditional-slot>
```

### 8.4 插槽与 v-for 结合

```vue
<!-- ListWithSlots.vue -->
<template>
  <div class="list">
    <div 
      v-for="(item, index) in items" 
      :key="item.id || index"
      class="list-item"
    >
      <slot 
        name="item" 
        :item="item" 
        :index="index"
        :isFirst="index === 0"
        :isLast="index === items.length - 1"
      >
        <div>{{ item }}</div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<!-- 使用 -->
<list-with-slots :items="products">
  <template v-slot:item="{ item, index, isFirst, isLast }">
    <div 
      :class="['product-item', { 
        'first-item': isFirst, 
        'last-item': isLast 
      }]"
    >
      <img :src="item.image" :alt="item.name">
      <h3>{{ item.name }}</h3>
      <p class="price">¥{{ item.price }}</p>
      <button @click="addToCart(item)">购买</button>
    </div>
  </template>
</list-with-slots>
```

---

## 9. 实际应用场景

### 9.1 场景一：可复用的表格组件

```vue
<!-- ReusableTable.vue -->
<template>
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in data" :key="rowIndex">
          <td v-for="column in columns" :key="column.key">
            <slot 
              :name="`cell-${column.key}`"
              :row="row"
              :column="column"
              :value="row[column.key]"
              :rowIndex="rowIndex"
            >
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  }
}
</script>

<!-- 使用 -->
<reusable-table :columns="userColumns" :data="users">
  <!-- 自定义头像列 -->
  <template v-slot:cell-avatar="{ value }">
    <img :src="value" class="avatar" alt="头像">
  </template>
  
  <!-- 自定义状态列 -->
  <template v-slot:cell-status="{ value }">
    <span :class="['badge', value]">
      {{ value === 'active' ? '活跃' : '禁用' }}
    </span>
  </template>
  
  <!-- 自定义操作列 -->
  <template v-slot:cell-actions="{ row }">
    <button @click="editUser(row)">编辑</button>
    <button @click="deleteUser(row)">删除</button>
  </template>
</reusable-table>
```

### 9.2 场景二：表单构建器

```vue
<!-- FormBuilder.vue -->
<template>
  <form class="form-builder" @submit.prevent="handleSubmit">
    <div 
      v-for="(field, index) in fields" 
      :key="index"
      class="form-field"
    >
      <label>{{ field.label }}</label>
      <slot 
        :name="`field-${field.type}`"
        :field="field"
        :value="formData[field.name]"
        :updateValue="(val) => updateField(field.name, val)"
      >
        <input 
          :type="field.type"
          :value="formData[field.name]"
          @input="updateField(field.name, $event.target.value)"
        >
      </slot>
    </div>
    <div class="form-actions">
      <slot name="actions">
        <button type="submit">提交</button>
      </slot>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    fields: {
      type: Array,
      required: true
    },
    initialData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      formData: { ...this.initialData }
    }
  },
  methods: {
    updateField(name, value) {
      this.$set(this.formData, name, value)
    },
    handleSubmit() {
      this.$emit('submit', this.formData)
    }
  }
}
</script>

<!-- 使用 -->
<form-builder 
  :fields="formFields" 
  :initial-data="formData"
  @submit="handleFormSubmit"
>
  <!-- 自定义日期选择器 -->
  <template v-slot:field-date="{ field, value, updateValue }">
    <date-picker 
      :value="value"
      @change="updateValue"
    ></date-picker>
  </template>
  
  <!-- 自定义文件上传 -->
  <template v-slot:field-file="{ field, value, updateValue }">
    <file-upload 
      :value="value"
      @upload="updateValue"
    ></file-upload>
  </template>
  
  <!-- 自定义提交按钮 -->
  <template v-slot:actions>
    <button type="submit" class="btn-primary">保存</button>
    <button type="button" @click="handleCancel">取消</button>
  </template>
</form-builder>
```

### 9.3 场景三：布局系统

```vue
<!-- LayoutSystem.vue -->
<template>
  <div class="layout-system" :class="layoutClass">
    <div class="layout-top">
      <slot name="top"></slot>
    </div>
    <div class="layout-middle">
      <div class="layout-left">
        <slot name="left"></slot>
      </div>
      <div class="layout-center">
        <slot name="center"></slot>
      </div>
      <div class="layout-right">
        <slot name="right"></slot>
      </div>
    </div>
    <div class="layout-bottom">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    layout: {
      type: String,
      default: 'default',
      validator: value => ['default', 'sidebar', 'fullwidth'].includes(value)
    }
  },
  computed: {
    layoutClass() {
      return `layout-${this.layout}`
    }
  }
}
</script>

<style scoped>
.layout-system {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.layout-middle {
  display: flex;
  flex: 1;
}
.layout-center {
  flex: 1;
}
</style>

<!-- 使用 -->
<layout-system layout="sidebar">
  <template v-slot:top>
    <header>网站头部</header>
  </template>
  
  <template v-slot:left>
    <aside>侧边栏</aside>
  </template>
  
  <template v-slot:center>
    <main>主内容区</main>
  </template>
  
  <template v-slot:right>
    <aside>右侧栏</aside>
  </template>
  
  <template v-slot:bottom>
    <footer>网站底部</footer>
  </template>
</layout-system>
```

### 9.4 场景四：步骤条组件

```vue
<!-- Stepper.vue -->
<template>
  <div class="stepper">
    <div 
      v-for="(step, index) in steps" 
      :key="index"
      class="step"
      :class="{ active: currentStep === index, completed: currentStep > index }"
    >
      <div class="step-number">{{ index + 1 }}</div>
      <div class="step-content">
        <slot 
          :name="`step-${index}`"
          :step="step"
          :index="index"
          :isActive="currentStep === index"
          :isCompleted="currentStep > index"
          :goToStep="() => goToStep(index)"
        >
          <div class="step-title">{{ step.title }}</div>
          <div class="step-description">{{ step.description }}</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    steps: {
      type: Array,
      required: true
    },
    currentStep: {
      type: Number,
      default: 0
    }
  },
  methods: {
    goToStep(index) {
      this.$emit('step-change', index)
    }
  }
}
</script>

<!-- 使用 -->
<stepper 
  :steps="steps" 
  :current-step="currentStep"
  @step-change="handleStepChange"
>
  <template v-slot:step-0="{ step, isActive }">
    <div class="custom-step">
      <h3>{{ step.title }}</h3>
      <p v-if="isActive">这是第一步，请填写基本信息</p>
    </div>
  </template>
  
  <template v-slot:step-1="{ step, isActive }">
    <div class="custom-step">
      <h3>{{ step.title }}</h3>
      <p v-if="isActive">这是第二步，请确认信息</p>
    </div>
  </template>
</stepper>
```

---

## 10. 最佳实践

### 10.1 命名规范

- 使用语义化的插槽名称
- 使用 kebab-case 命名（如 `user-header` 而不是 `userHeader`）
- 为默认插槽提供有意义的默认内容

```vue
<!-- 好的命名 -->
<slot name="user-header"></slot>
<slot name="action-buttons"></slot>

<!-- 不好的命名 -->
<slot name="header1"></slot>
<slot name="btn"></slot>
```

### 10.2 性能优化

- 避免在插槽中使用复杂的计算
- 使用 `v-if` 和 `v-show` 控制插槽的显示
- 对于大量数据的列表，考虑使用虚拟滚动

```vue
<!-- 优化前 -->
<template v-slot:item="{ item }">
  <div>
    {{ expensiveComputation(item) }}
  </div>
</template>

<!-- 优化后 -->
<template v-slot:item="{ item }">
  <div>
    {{ item.computedValue }} <!-- 在数据准备阶段计算 -->
  </div>
</template>
```

### 10.3 可访问性

- 为插槽内容提供适当的 ARIA 属性
- 确保插槽内容符合语义化 HTML

```vue
<!-- 好的做法 -->
<template v-slot:header>
  <header role="banner">
    <h1>网站标题</h1>
  </header>
</template>

<!-- 不好的做法 -->
<template v-slot:header>
  <div>
    <div>网站标题</div>
  </div>
</template>
```

### 10.4 文档化

为组件和插槽提供清晰的文档说明：

```vue
<!-- MyComponent.vue -->
<template>
  <div>
    <!-- 
      @slot header - 组件头部内容
      @slot default - 组件主要内容
      @slot footer - 组件底部内容
    -->
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </div>
</template>
```

### 10.5 常见错误和解决方案

**错误 1：在同一个元素上使用多个插槽**

```vue
<!-- 错误 -->
<div slot="header" slot="footer">内容</div>

<!-- 正确 -->
<template v-slot:header>头部内容</template>
<template v-slot:footer>底部内容</template>
```

**错误 2：作用域插槽的解构问题**

```vue
<!-- 错误 - 不能直接解构 -->
<template v-slot:default="user.name">
  {{ user.name }}
</template>

<!-- 正确 -->
<template v-slot:default="{ user }">
  {{ user.name }}
</template>
```

**错误 3：在非 template 元素上使用 v-slot**

```vue
<!-- 错误 -->
<div v-slot:header>内容</div>

<!-- 正确 -->
<template v-slot:header>
  <div>内容</div>
</template>
```

---

## 总结

Vue2 的插槽系统提供了强大的内容分发机制，主要包括：

1. **默认插槽** - 用于传递主要内容
2. **具名插槽** - 用于传递多个不同区域的内容
3. **作用域插槽** - 用于子组件向父组件传递数据
4. **动态插槽** - 用于动态确定插槽名称
5. **插槽默认内容** - 提供后备内容

通过合理使用插槽，可以创建更加灵活、可复用的组件，提高开发效率和代码质量。

---

## 附录：完整示例

### 示例：完整的用户卡片组件

```vue
<!-- UserCard.vue -->
<template>
  <div class="user-card">
    <div class="user-card-header">
      <slot name="header" :user="user">
        <h3>{{ user.name }}</h3>
      </slot>
    </div>
    <div class="user-card-body">
      <slot :user="user" :isVip="user.isVip">
        <div class="user-info">
          <p>邮箱：{{ user.email }}</p>
          <p>年龄：{{ user.age }}</p>
        </div>
      </slot>
    </div>
    <div class="user-card-footer">
      <slot name="footer" :user="user">
        <button @click="handleDefaultAction">默认操作</button>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleDefaultAction() {
      this.$emit('action', this.user)
    }
  }
}
</script>

<!-- 使用示例 -->
<user-card :user="currentUser" @action="handleUserAction">
  <template v-slot:header="{ user }">
    <div class="custom-header">
      <img :src="user.avatar" :alt="user.name">
      <h3>{{ user.name }}</h3>
      <span v-if="user.isVip" class="vip-badge">VIP</span>
    </div>
  </template>
  
  <template v-slot:default="{ user, isVip }">
    <div class="custom-body">
      <p><strong>邮箱：</strong>{{ user.email }}</p>
      <p><strong>电话：</strong>{{ user.phone }}</p>
      <p v-if="isVip" class="vip-info">VIP 用户专属信息</p>
    </div>
  </template>
  
  <template v-slot:footer="{ user }">
    <button @click="editUser(user)">编辑</button>
    <button @click="deleteUser(user)">删除</button>
    <button @click="sendMessage(user)">发消息</button>
  </template>
</user-card>
```

---

**教程结束**

希望这个教程能帮助你全面掌握 Vue2 插槽的使用！如有任何问题，欢迎继续学习 Vue 的其他特性。

