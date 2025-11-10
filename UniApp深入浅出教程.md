# UniApp 深入浅出教程 - 从入门到精通

## 目录
1. [UniApp 简介](#1-uniapp-简介)
2. [环境搭建](#2-环境搭建)
3. [基础知识](#3-基础知识)
4. [核心概念](#4-核心概念)
5. [组件系统](#5-组件系统)
6. [API 使用](#6-api-使用)
7. [路由与页面管理](#7-路由与页面管理)
8. [状态管理](#8-状态管理)
9. [网络请求](#9-网络请求)
10. [插件与生态](#10-插件与生态)
11. [性能优化](#11-性能优化)
12. [实战项目](#12-实战项目)
13. [进阶技巧](#13-进阶技巧)

---

## 1. UniApp 简介

### 1.1 什么是 UniApp？

UniApp 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可发布到：
- iOS
- Android
- Web（H5）
- 微信小程序
- 支付宝小程序
- 百度小程序
- 头条小程序
- QQ小程序
- 快应用
- 360小程序
- 快手小程序

### 1.2 核心优势

```
✅ 一次开发，多端发布
✅ 基于 Vue.js，学习成本低
✅ 丰富的组件和API
✅ 完善的生态系统
✅ 原生渲染性能
✅ 云端一体化开发
```

### 1.3 技术架构

```
┌─────────────────────────────────────┐
│         UniApp 应用层               │
├─────────────────────────────────────┤
│         Vue.js 框架层               │
├─────────────────────────────────────┤
│      UniApp 编译器 & 运行时         │
├─────────────────────────────────────┤
│   各平台适配层（小程序/App/H5）     │
└─────────────────────────────────────┘
```

---

## 2. 环境搭建

### 2.1 安装 HBuilderX（推荐）

1. 下载 HBuilderX：https://www.dcloud.io/hbuilderx.html
2. 选择 App 开发版
3. 安装完成后，安装必要插件：
   - uni-app 编译器
   - 内置浏览器
   - 微信开发者工具

### 2.2 使用 Vue CLI 创建项目

```bash
# 全局安装 Vue CLI
npm install -g @vue/cli

# 创建 uni-app 项目
vue create -p dcloudio/uni-preset-vue my-project

# 选择模板
# - 默认模板
# - 默认模板（TypeScript）
# - 自定义模板

cd my-project
npm run dev:mp-weixin  # 微信小程序
npm run dev:h5         # H5
npm run dev:app        # App
```

### 2.3 项目结构

```
my-project/
├── pages/              # 页面文件
│   ├── index/
│   │   └── index.vue
│   └── list/
│       └── list.vue
├── static/            # 静态资源
│   └── logo.png
├── components/        # 组件
│   └── MyComponent.vue
├── uni_modules/       # uni_modules 插件
├── store/            # 状态管理
│   └── index.js
├── utils/            # 工具函数
│   └── request.js
├── App.vue           # 应用配置
├── main.js           # 入口文件
├── manifest.json     # 应用配置
├── pages.json        # 页面路由配置
└── uni.scss          # 全局样式变量
```

---

## 3. 基础知识

### 3.1 第一个页面

**pages/index/index.vue**

```vue
<template>
  <view class="container">
    <text class="title">Hello UniApp!</text>
    <button @click="handleClick">点击我</button>
    <view class="count">点击次数: {{ count }}</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    handleClick() {
      this.count++
      uni.showToast({
        title: `已点击 ${this.count} 次`,
        icon: 'none'
      })
    }
  },
  onLoad() {
    console.log('页面加载完成')
  },
  onShow() {
    console.log('页面显示')
  }
}
</script>

<style scoped>
.container {
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 40rpx;
}

.count {
  margin-top: 20rpx;
  color: #666;
}
</style>
```

### 3.2 配置页面路由

**pages.json**

```json
{
  "pages": [
    {
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": "首页",
        "navigationBarBackgroundColor": "#007AFF",
        "navigationBarTextStyle": "white"
      }
    },
    {
      "path": "pages/list/list",
      "style": {
        "navigationBarTitleText": "列表",
        "enablePullDownRefresh": true
      }
    }
  ],
  "globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "UniApp教程",
    "navigationBarBackgroundColor": "#F8F8F8",
    "backgroundColor": "#F8F8F8"
  },
  "tabBar": {
    "color": "#7A7E83",
    "selectedColor": "#007AFF",
    "borderStyle": "black",
    "backgroundColor": "#F8F8F8",
    "list": [
      {
        "pagePath": "pages/index/index",
        "iconPath": "static/home.png",
        "selectedIconPath": "static/home-active.png",
        "text": "首页"
      },
      {
        "pagePath": "pages/list/list",
        "iconPath": "static/list.png",
        "selectedIconPath": "static/list-active.png",
        "text": "列表"
      }
    ]
  }
}
```

### 3.3 生命周期

#### 应用生命周期（App.vue）

```vue
<script>
export default {
  onLaunch() {
    console.log('App Launch - 应用初始化')
  },
  onShow() {
    console.log('App Show - 应用显示')
  },
  onHide() {
    console.log('App Hide - 应用隐藏')
  },
  onError(err) {
    console.log('App Error:', err)
  }
}
</script>
```

#### 页面生命周期

```javascript
export default {
  // 页面加载
  onLoad(options) {
    console.log('页面加载', options)
  },
  
  // 页面显示
  onShow() {
    console.log('页面显示')
  },
  
  // 页面初次渲染完成
  onReady() {
    console.log('页面初次渲染完成')
  },
  
  // 页面隐藏
  onHide() {
    console.log('页面隐藏')
  },
  
  // 页面卸载
  onUnload() {
    console.log('页面卸载')
  },
  
  // 下拉刷新
  onPullDownRefresh() {
    console.log('下拉刷新')
    // 停止刷新
    setTimeout(() => {
      uni.stopPullDownRefresh()
    }, 1000)
  },
  
  // 上拉加载
  onReachBottom() {
    console.log('触底加载')
  },
  
  // 页面滚动
  onPageScroll(e) {
    console.log('页面滚动', e.scrollTop)
  },
  
  // 分享
  onShareAppMessage() {
    return {
      title: '分享标题',
      path: '/pages/index/index'
    }
  }
}
```

---

## 4. 核心概念

### 4.1 尺寸单位 rpx

rpx（responsive pixel）是 UniApp 的响应式尺寸单位：
- 规定屏幕宽度为 750rpx
- 自动适配不同屏幕宽度
- 1rpx = 屏幕宽度 / 750

```css
/* 在 iPhone6 上，1rpx = 0.5px */
.box {
  width: 750rpx;  /* 占满屏幕宽度 */
  height: 200rpx;
  font-size: 28rpx;
}
```

### 4.2 条件编译

根据不同平台编译不同代码：

```vue
<template>
  <view>
    <!-- #ifdef MP-WEIXIN -->
    <view>仅在微信小程序显示</view>
    <!-- #endif -->
    
    <!-- #ifdef H5 -->
    <view>仅在H5显示</view>
    <!-- #endif -->
    
    <!-- #ifdef APP-PLUS -->
    <view>仅在App显示</view>
    <!-- #endif -->
    
    <!-- #ifndef H5 -->
    <view>除了H5都显示</view>
    <!-- #endif -->
  </view>
</template>

<script>
export default {
  methods: {
    handlePlatform() {
      // #ifdef MP-WEIXIN
      console.log('微信小程序')
      // #endif
      
      // #ifdef H5
      console.log('H5')
      // #endif
    }
  }
}
</script>

<style>
/* #ifdef MP-WEIXIN */
.weixin-only {
  color: red;
}
/* #endif */

/* #ifdef H5 */
.h5-only {
  color: blue;
}
/* #endif */
</style>
```

### 4.3 样式导入

```vue
<style>
/* 导入外部样式 */
@import "@/common/style.css";

/* 使用全局变量 */
.text {
  color: $uni-color-primary;
}
</style>
```

**uni.scss** - 全局样式变量

```scss
/* 颜色变量 */
$uni-color-primary: #007AFF;
$uni-color-success: #4cd964;
$uni-color-warning: #f0ad4e;
$uni-color-error: #dd524d;

/* 文字基本颜色 */
$uni-text-color: #333;
$uni-text-color-grey: #999;

/* 背景色 */
$uni-bg-color: #f8f8f8;
$uni-bg-color-hover: #f1f1f1;

/* 边框颜色 */
$uni-border-color: #e5e5e5;

/* 尺寸变量 */
$uni-spacing-row-lg: 30rpx;
$uni-spacing-row-base: 20rpx;
$uni-spacing-row-sm: 10rpx;
```

---

## 5. 组件系统

### 5.1 基础组件

#### view - 视图容器

```vue
<template>
  <view class="container">
    <view class="box" hover-class="box-hover">
      点击我有悬停效果
    </view>
  </view>
</template>

<style>
.box {
  background-color: #007AFF;
  color: white;
  padding: 20rpx;
}

.box-hover {
  background-color: #0056b3;
}
</style>
```

#### text - 文本

```vue
<template>
  <view>
    <text>普通文本</text>
    <text selectable>可选择的文本</text>
    <text space="ensp">保留  空格</text>
    <text decode>&lt;div&gt;解码HTML实体&lt;/div&gt;</text>
  </view>
</template>
```

#### image - 图片

```vue
<template>
  <view>
    <image 
      src="/static/logo.png" 
      mode="aspectFit"
      @load="imageLoad"
      @error="imageError"
    />
    
    <!-- 懒加载 -->
    <image 
      src="https://example.com/image.jpg" 
      lazy-load
      mode="widthFix"
    />
  </view>
</template>

<script>
export default {
  methods: {
    imageLoad(e) {
      console.log('图片加载成功', e)
    },
    imageError(e) {
      console.log('图片加载失败', e)
    }
  }
}
</script>
```

#### scroll-view - 滚动视图

```vue
<template>
  <view>
    <!-- 垂直滚动 -->
    <scroll-view 
      scroll-y 
      class="scroll-y"
      @scrolltoupper="upper"
      @scrolltolower="lower"
      @scroll="scroll"
    >
      <view v-for="item in 50" :key="item" class="item">
        Item {{ item }}
      </view>
    </scroll-view>
    
    <!-- 水平滚动 -->
    <scroll-view scroll-x class="scroll-x">
      <view class="scroll-content">
        <view v-for="item in 10" :key="item" class="scroll-item">
          {{ item }}
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  methods: {
    upper() {
      console.log('滚动到顶部')
    },
    lower() {
      console.log('滚动到底部')
    },
    scroll(e) {
      console.log('滚动中', e.detail.scrollTop)
    }
  }
}
</script>

<style>
.scroll-y {
  height: 400rpx;
}

.scroll-x {
  white-space: nowrap;
}

.scroll-content {
  display: inline-flex;
}

.scroll-item {
  display: inline-block;
  width: 200rpx;
  height: 200rpx;
  margin-right: 20rpx;
}
</style>
```

### 5.2 表单组件

```vue
<template>
  <view class="form-container">
    <form @submit="formSubmit" @reset="formReset">
      <!-- 输入框 -->
      <view class="form-item">
        <text>用户名：</text>
        <input 
          v-model="formData.username"
          placeholder="请输入用户名"
          maxlength="20"
        />
      </view>
      
      <!-- 密码输入 -->
      <view class="form-item">
        <text>密码：</text>
        <input 
          v-model="formData.password"
          type="password"
          placeholder="请输入密码"
        />
      </view>
      
      <!-- 单选框 -->
      <radio-group @change="radioChange">
        <label v-for="item in radioItems" :key="item.value">
          <radio :value="item.value" :checked="item.checked"/>
          {{ item.name }}
        </label>
      </radio-group>
      
      <!-- 复选框 -->
      <checkbox-group @change="checkboxChange">
        <label v-for="item in checkboxItems" :key="item.value">
          <checkbox :value="item.value" :checked="item.checked"/>
          {{ item.name }}
        </label>
      </checkbox-group>
      
      <!-- 开关 -->
      <switch 
        :checked="formData.agree"
        @change="switchChange"
      />
      
      <!-- 滑块 -->
      <slider 
        :value="formData.volume"
        @change="sliderChange"
        min="0"
        max="100"
        show-value
      />
      
      <!-- 选择器 -->
      <picker 
        mode="selector"
        :range="cities"
        @change="pickerChange"
      >
        <view class="picker">
          当前选择：{{ cities[cityIndex] }}
        </view>
      </picker>
      
      <!-- 日期选择器 -->
      <picker 
        mode="date"
        :value="formData.date"
        @change="dateChange"
      >
        <view class="picker">
          日期：{{ formData.date }}
        </view>
      </picker>
      
      <!-- 按钮 -->
      <button form-type="submit" type="primary">提交</button>
      <button form-type="reset">重置</button>
    </form>
  </view>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: '',
        password: '',
        gender: '',
        hobbies: [],
        agree: false,
        volume: 50,
        city: '',
        date: '2025-01-01'
      },
      radioItems: [
        { name: '男', value: 'male', checked: true },
        { name: '女', value: 'female', checked: false }
      ],
      checkboxItems: [
        { name: '阅读', value: 'reading', checked: false },
        { name: '运动', value: 'sports', checked: false },
        { name: '音乐', value: 'music', checked: false }
      ],
      cities: ['北京', '上海', '广州', '深圳'],
      cityIndex: 0
    }
  },
  methods: {
    radioChange(e) {
      this.formData.gender = e.detail.value
    },
    checkboxChange(e) {
      this.formData.hobbies = e.detail.value
    },
    switchChange(e) {
      this.formData.agree = e.detail.value
    },
    sliderChange(e) {
      this.formData.volume = e.detail.value
    },
    pickerChange(e) {
      this.cityIndex = e.detail.value
      this.formData.city = this.cities[e.detail.value]
    },
    dateChange(e) {
      this.formData.date = e.detail.value
    },
    formSubmit() {
      console.log('提交表单', this.formData)
      uni.showToast({
        title: '提交成功',
        icon: 'success'
      })
    },
    formReset() {
      console.log('重置表单')
    }
  }
}
</script>
```

### 5.3 自定义组件

**components/MyCard/MyCard.vue**

```vue
<template>
  <view class="card" :class="{'card-shadow': shadow}" @click="handleClick">
    <view class="card-header" v-if="title">
      <text class="card-title">{{ title }}</text>
      <slot name="extra"></slot>
    </view>
    <view class="card-body">
      <slot></slot>
    </view>
    <view class="card-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'MyCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    shadow: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
.card {
  background-color: #fff;
  border-radius: 8rpx;
  padding: 30rpx;
  margin: 20rpx;
}

.card-shadow {
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.card-title {
  font-size: 32rpx;
  font-weight: bold;
}

.card-footer {
  margin-top: 20rpx;
  padding-top: 20rpx;
  border-top: 1rpx solid #eee;
}
</style>
```

**使用自定义组件**

```vue
<template>
  <view>
    <my-card title="卡片标题" @click="cardClick">
      <template #extra>
        <text>更多</text>
      </template>
      
      <view>这是卡片内容</view>
      
      <template #footer>
        <button size="mini">操作</button>
      </template>
    </my-card>
  </view>
</template>

<script>
import MyCard from '@/components/MyCard/MyCard.vue'

export default {
  components: {
    MyCard
  },
  methods: {
    cardClick() {
      console.log('卡片被点击')
    }
  }
}
</script>
```

---

## 6. API 使用

### 6.1 网络请求

```javascript
// utils/request.js
const BASE_URL = 'https://api.example.com'

// 请求拦截
const request = (options) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        'Authorization': uni.getStorageSync('token') || ''
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          uni.showToast({
            title: '请求失败',
            icon: 'none'
          })
          reject(res)
        }
      },
      fail: (err) => {
        uni.showToast({
          title: '网络错误',
          icon: 'none'
        })
        reject(err)
      }
    })
  })
}

export default {
  get(url, data) {
    return request({ url, method: 'GET', data })
  },
  post(url, data) {
    return request({ url, method: 'POST', data })
  },
  put(url, data) {
    return request({ url, method: 'PUT', data })
  },
  delete(url, data) {
    return request({ url, method: 'DELETE', data })
  }
}
```

**使用示例**

```vue
<script>
import request from '@/utils/request.js'

export default {
  data() {
    return {
      userList: []
    }
  },
  onLoad() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      uni.showLoading({ title: '加载中...' })
      try {
        const res = await request.get('/api/users', { page: 1, size: 10 })
        this.userList = res.data
      } catch (err) {
        console.error(err)
      } finally {
        uni.hideLoading()
      }
    }
  }
}
</script>
```

### 6.2 数据存储

```javascript
// 同步存储
uni.setStorageSync('key', 'value')
const value = uni.getStorageSync('key')
uni.removeStorageSync('key')
uni.clearStorageSync()

// 异步存储
uni.setStorage({
  key: 'token',
  data: 'abc123',
  success() {
    console.log('存储成功')
  }
})

uni.getStorage({
  key: 'token',
  success(res) {
    console.log('获取成功', res.data)
  }
})

// 存储对象
const user = { name: '张三', age: 25 }
uni.setStorageSync('user', JSON.stringify(user))
const userData = JSON.parse(uni.getStorageSync('user'))
```

### 6.3 路由跳转

```javascript
// 1. 保留当前页面，跳转到应用内的某个页面
uni.navigateTo({
  url: '/pages/detail/detail?id=123',
  success() {
    console.log('跳转成功')
  }
})

// 2. 关闭当前页面，跳转到应用内的某个页面
uni.redirectTo({
  url: '/pages/login/login'
})

// 3. 关闭所有页面，打开到应用内的某个页面
uni.reLaunch({
  url: '/pages/index/index'
})

// 4. 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
uni.switchTab({
  url: '/pages/home/home'
})

// 5. 关闭当前页面，返回上一页面或多级页面
uni.navigateBack({
  delta: 1 // 返回的页面数，默认1
})

// 6. 传递参数
uni.navigateTo({
  url: '/pages/detail/detail?id=123&name=test'
})

// 接收参数
export default {
  onLoad(options) {
    console.log(options.id)   // 123
    console.log(options.name) // test
  }
}
```

### 6.4 界面交互

```javascript
// 显示提示框
uni.showToast({
  title: '操作成功',
  icon: 'success',
  duration: 2000
})

// 显示加载提示
uni.showLoading({
  title: '加载中...',
  mask: true
})
uni.hideLoading()

// 显示模态对话框
uni.showModal({
  title: '提示',
  content: '确定要删除吗？',
  success(res) {
    if (res.confirm) {
      console.log('用户点击确定')
    } else if (res.cancel) {
      console.log('用户点击取消')
    }
  }
})

// 显示操作菜单
uni.showActionSheet({
  itemList: ['拍照', '从相册选择'],
  success(res) {
    console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
  }
})
```

### 6.5 媒体API

```javascript
// 选择图片
uni.chooseImage({
  count: 9,
  sizeType: ['original', 'compressed'],
  sourceType: ['album', 'camera'],
  success(res) {
    const tempFilePaths = res.tempFilePaths
    console.log(tempFilePaths)
  }
})

// 预览图片
uni.previewImage({
  urls: ['image1.jpg', 'image2.jpg'],
  current: 0
})

// 上传文件
uni.uploadFile({
  url: 'https://api.example.com/upload',
  filePath: tempFilePaths[0],
  name: 'file',
  formData: {
    user: 'test'
  },
  success(res) {
    console.log('上传成功', res.data)
  }
})

// 下载文件
uni.downloadFile({
  url: 'https://example.com/file.pdf',
  success(res) {
    if (res.statusCode === 200) {
      console.log('下载成功', res.tempFilePath)
    }
  }
})
```

### 6.6 设备API

```javascript
// 获取系统信息
uni.getSystemInfo({
  success(res) {
    console.log('设备型号：', res.model)
    console.log('系统版本：', res.system)
    console.log('屏幕宽度：', res.screenWidth)
    console.log('屏幕高度：', res.screenHeight)
    console.log('状态栏高度：', res.statusBarHeight)
    console.log('平台：', res.platform)
  }
})

// 获取位置信息
uni.getLocation({
  type: 'gcj02',
  success(res) {
    console.log('纬度：', res.latitude)
    console.log('经度：', res.longitude)
  }
})

// 扫码
uni.scanCode({
  success(res) {
    console.log('扫码结果：', res.result)
  }
})

// 振动
uni.vibrateLong() // 长振动
uni.vibrateShort() // 短振动

// 剪贴板
uni.setClipboardData({
  data: 'hello',
  success() {
    console.log('复制成功')
  }
})

uni.getClipboardData({
  success(res) {
    console.log('剪贴板内容：', res.data)
  }
})
```

---

## 7. 路由与页面管理

### 7.1 页面栈管理

```javascript
// 获取当前页面栈
const pages = getCurrentPages()
const currentPage = pages[pages.length - 1]
console.log('当前页面路由：', currentPage.route)

// 获取上一页面
const prevPage = pages[pages.length - 2]
if (prevPage) {
  // 调用上一页面的方法
  prevPage.$vm.refreshData()
}
```

### 7.2 页面间通信

**方法1：通过 URL 传参**

```javascript
// 发送页面
uni.navigateTo({
  url: '/pages/detail/detail?id=123&name=test'
})

// 接收页面
export default {
  onLoad(options) {
    console.log(options.id, options.name)
  }
}
```

**方法2：通过事件总线**

```javascript
// utils/eventBus.js
class EventBus {
  constructor() {
    this.events = {}
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
  }
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data))
    }
  }
  
  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback)
    }
  }
}

export default new EventBus()
```

**使用事件总线**

```javascript
// 页面A - 发送事件
import eventBus from '@/utils/eventBus.js'

eventBus.emit('dataUpdate', { id: 123, name: 'test' })

// 页面B - 监听事件
import eventBus from '@/utils/eventBus.js'

export default {
  onLoad() {
    eventBus.on('dataUpdate', this.handleDataUpdate)
  },
  onUnload() {
    eventBus.off('dataUpdate', this.handleDataUpdate)
  },
  methods: {
    handleDataUpdate(data) {
      console.log('收到数据：', data)
    }
  }
}
```

**方法3：通过全局数据**

```javascript
// App.vue
export default {
  globalData: {
    userInfo: null,
    token: ''
  }
}

// 使用
const app = getApp()
app.globalData.userInfo = { name: '张三' }
console.log(app.globalData.userInfo)
```

---

## 8. 状态管理

### 8.1 使用 Vuex

**安装 Vuex**

```bash
npm install vuex@3 --save
```

**store/index.js**

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: null,
    token: '',
    cartCount: 0
  },
  
  getters: {
    isLogin: state => !!state.token,
    userName: state => state.userInfo?.name || '游客'
  },
  
  mutations: {
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    SET_TOKEN(state, token) {
      state.token = token
      uni.setStorageSync('token', token)
    },
    SET_CART_COUNT(state, count) {
      state.cartCount = count
    },
    LOGOUT(state) {
      state.userInfo = null
      state.token = ''
      state.cartCount = 0
      uni.removeStorageSync('token')
    }
  },
  
  actions: {
    // 登录
    async login({ commit }, { username, password }) {
      try {
        const res = await uni.request({
          url: 'https://api.example.com/login',
          method: 'POST',
          data: { username, password }
        })
        
        commit('SET_TOKEN', res.data.token)
        commit('SET_USER_INFO', res.data.userInfo)
        
        return res.data
      } catch (err) {
        throw err
      }
    },
    
    // 获取购物车数量
    async getCartCount({ commit }) {
      const res = await uni.request({
        url: 'https://api.example.com/cart/count'
      })
      commit('SET_CART_COUNT', res.data.count)
    }
  }
})

export default store
```

**main.js - 挂载 store**

```javascript
import Vue from 'vue'
import App from './App'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
```

**在页面中使用**

```vue
<template>
  <view>
    <text>用户名：{{ userName }}</text>
    <text>购物车数量：{{ cartCount }}</text>
    <button @click="handleLogin">登录</button>
    <button @click="handleLogout">退出</button>
  </view>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['cartCount']),
    ...mapGetters(['isLogin', 'userName'])
  },
  
  methods: {
    ...mapMutations(['LOGOUT']),
    ...mapActions(['login', 'getCartCount']),
    
    async handleLogin() {
      try {
        await this.login({
          username: 'test',
          password: '123456'
        })
        uni.showToast({ title: '登录成功' })
      } catch (err) {
        uni.showToast({ title: '登录失败', icon: 'none' })
      }
    },
    
    handleLogout() {
      this.LOGOUT()
      uni.showToast({ title: '已退出' })
    }
  },
  
  onLoad() {
    if (this.isLogin) {
      this.getCartCount()
    }
  }
}
</script>
```

### 8.2 模块化 Store

**store/modules/user.js**

```javascript
export default {
  namespaced: true,
  
  state: {
    userInfo: null,
    token: ''
  },
  
  mutations: {
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    SET_TOKEN(state, token) {
      state.token = token
    }
  },
  
  actions: {
    async login({ commit }, credentials) {
      // 登录逻辑
    }
  }
}
```

**store/modules/cart.js**

```javascript
export default {
  namespaced: true,
  
  state: {
    list: [],
    count: 0
  },
  
  mutations: {
    ADD_TO_CART(state, item) {
      state.list.push(item)
      state.count++
    }
  }
}
```

**store/index.js**

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import cart from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    cart
  }
})
```

**使用模块化 store**

```vue
<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState('user', ['userInfo']),
    ...mapState('cart', ['count'])
  },
  
  methods: {
    ...mapMutations('cart', ['ADD_TO_CART'])
  }
}
</script>
```

---

## 9. 网络请求

### 9.1 封装完整的请求库

**utils/http.js**

```javascript
class Http {
  constructor() {
    this.baseURL = 'https://api.example.com'
    this.timeout = 30000
    this.header = {
      'Content-Type': 'application/json'
    }
  }
  
  // 请求拦截器
  interceptRequest(config) {
    // 添加 token
    const token = uni.getStorageSync('token')
    if (token) {
      config.header.Authorization = `Bearer ${token}`
    }
    
    // 显示加载
    if (config.loading !== false) {
      uni.showLoading({
        title: config.loadingText || '加载中...',
        mask: true
      })
    }
    
    return config
  }
  
  // 响应拦截器
  interceptResponse(response, config) {
    // 隐藏加载
    if (config.loading !== false) {
      uni.hideLoading()
    }
    
    const { statusCode, data } = response
    
    // HTTP 状态码判断
    if (statusCode !== 200) {
      this.handleError(statusCode, data)
      return Promise.reject(response)
    }
    
    // 业务状态码判断
    if (data.code !== 0) {
      this.handleBusinessError(data)
      return Promise.reject(data)
    }
    
    return data.data
  }
  
  // 错误处理
  handleError(statusCode, data) {
    let message = '请求失败'
    
    switch (statusCode) {
      case 400:
        message = '请求参数错误'
        break
      case 401:
        message = '未授权，请登录'
        // 跳转到登录页
        uni.reLaunch({ url: '/pages/login/login' })
        break
      case 403:
        message = '拒绝访问'
        break
      case 404:
        message = '请求地址不存在'
        break
      case 500:
        message = '服务器错误'
        break
      case 502:
        message = '网关错误'
        break
      case 503:
        message = '服务不可用'
        break
      case 504:
        message = '网关超时'
        break
      default:
        message = data.message || '请求失败'
    }
    
    uni.showToast({
      title: message,
      icon: 'none',
      duration: 2000
    })
  }
  
  // 业务错误处理
  handleBusinessError(data) {
    const message = data.message || '操作失败'
    
    uni.showToast({
      title: message,
      icon: 'none',
      duration: 2000
    })
  }
  
  // 基础请求方法
  request(options) {
    // 合并配置
    const config = {
      url: this.baseURL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: { ...this.header, ...options.header },
      timeout: options.timeout || this.timeout,
      loading: options.loading,
      loadingText: options.loadingText
    }
    
    // 请求拦截
    const interceptedConfig = this.interceptRequest(config)
    
    return new Promise((resolve, reject) => {
      uni.request({
        ...interceptedConfig,
        success: (response) => {
          // 响应拦截
          this.interceptResponse(response, config)
            .then(resolve)
            .catch(reject)
        },
        fail: (error) => {
          // 隐藏加载
          if (config.loading !== false) {
            uni.hideLoading()
          }
          
          uni.showToast({
            title: '网络连接失败',
            icon: 'none'
          })
          
          reject(error)
        }
      })
    })
  }
  
  // GET 请求
  get(url, data, options = {}) {
    return this.request({
      url,
      method: 'GET',
      data,
      ...options
    })
  }
  
  // POST 请求
  post(url, data, options = {}) {
    return this.request({
      url,
      method: 'POST',
      data,
      ...options
    })
  }
  
  // PUT 请求
  put(url, data, options = {}) {
    return this.request({
      url,
      method: 'PUT',
      data,
      ...options
    })
  }
  
  // DELETE 请求
  delete(url, data, options = {}) {
    return this.request({
      url,
      method: 'DELETE',
      data,
      ...options
    })
  }
  
  // 上传文件
  upload(url, filePath, formData = {}, options = {}) {
    const config = {
      url: this.baseURL + url,
      filePath,
      name: options.name || 'file',
      formData,
      header: {
        ...this.header,
        ...options.header
      }
    }
    
    // 添加 token
    const token = uni.getStorageSync('token')
    if (token) {
      config.header.Authorization = `Bearer ${token}`
    }
    
    return new Promise((resolve, reject) => {
      const uploadTask = uni.uploadFile({
        ...config,
        success: (response) => {
          if (response.statusCode === 200) {
            const data = JSON.parse(response.data)
            resolve(data)
          } else {
            reject(response)
          }
        },
        fail: reject
      })
      
      // 监听上传进度
      if (options.onProgress) {
        uploadTask.onProgressUpdate(options.onProgress)
      }
    })
  }
  
  // 下载文件
  download(url, options = {}) {
    return new Promise((resolve, reject) => {
      const downloadTask = uni.downloadFile({
        url: this.baseURL + url,
        success: (response) => {
          if (response.statusCode === 200) {
            resolve(response.tempFilePath)
          } else {
            reject(response)
          }
        },
        fail: reject
      })
      
      // 监听下载进度
      if (options.onProgress) {
        downloadTask.onProgressUpdate(options.onProgress)
      }
    })
  }
}

export default new Http()
```

### 9.2 API 模块化管理

**api/user.js**

```javascript
import http from '@/utils/http.js'

export default {
  // 登录
  login(data) {
    return http.post('/auth/login', data)
  },
  
  // 注册
  register(data) {
    return http.post('/auth/register', data)
  },
  
  // 获取用户信息
  getUserInfo() {
    return http.get('/user/info')
  },
  
  // 更新用户信息
  updateUserInfo(data) {
    return http.put('/user/info', data)
  },
  
  // 上传头像
  uploadAvatar(filePath) {
    return http.upload('/user/avatar', filePath, {}, {
      onProgress: (progress) => {
        console.log('上传进度：', progress.progress)
      }
    })
  }
}
```

**api/product.js**

```javascript
import http from '@/utils/http.js'

export default {
  // 获取商品列表
  getList(params) {
    return http.get('/products', params)
  },
  
  // 获取商品详情
  getDetail(id) {
    return http.get(`/products/${id}`)
  },
  
  // 搜索商品
  search(keyword) {
    return http.get('/products/search', { keyword })
  }
}
```

**api/index.js**

```javascript
import user from './user'
import product from './product'

export default {
  user,
  product
}
```

**main.js - 挂载 API**

```javascript
import Vue from 'vue'
import api from './api'

Vue.prototype.$api = api
```

**在页面中使用**

```vue
<script>
export default {
  data() {
    return {
      productList: []
    }
  },
  
  async onLoad() {
    await this.loadProducts()
  },
  
  methods: {
    async loadProducts() {
      try {
        const data = await this.$api.product.getList({
          page: 1,
          size: 10
        })
        this.productList = data.list
      } catch (err) {
        console.error(err)
      }
    },
    
    async handleLogin() {
      try {
        const data = await this.$api.user.login({
          username: 'test',
          password: '123456'
        })
        console.log('登录成功', data)
      } catch (err) {
        console.error('登录失败', err)
      }
    }
  }
}
</script>
```

---

## 10. 插件与生态

### 10.1 uni_modules 插件

**安装插件**

1. 访问插件市场：https://ext.dcloud.net.cn/
2. 搜索需要的插件
3. 点击"使用 HBuilderX 导入插件"或"下载插件 ZIP"

**常用插件推荐**

```
1. uni-ui - 官方组件库
2. uView UI - 功能丰富的UI框架
3. uni-simple-router - 路由增强
4. uni-read-pages - 读取pages.json配置
5. z-paging - 分页组件
6. uni-ajax - 网络请求库
7. uni-datetime-picker - 日期时间选择器
8. uni-file-picker - 文件选择器
9. uni-goods-nav - 商品导航
10. uni-rate - 评分组件
```

### 10.2 使用 uni-ui

**安装 uni-ui**

```bash
npm install @dcloudio/uni-ui
```

**配置 pages.json**

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue"
    }
  }
}
```

**使用组件（无需导入）**

```vue
<template>
  <view>
    <!-- 数据列表 -->
    <uni-list>
      <uni-list-item 
        v-for="item in list" 
        :key="item.id"
        :title="item.title"
        :note="item.note"
        thumb="/static/logo.png"
        clickable
        @click="handleClick(item)"
      />
    </uni-list>
    
    <!-- 徽标数字 -->
    <uni-badge text="99+" type="error" />
    
    <!-- 折叠面板 -->
    <uni-collapse>
      <uni-collapse-item title="标题1">
        <text>内容1</text>
      </uni-collapse-item>
      <uni-collapse-item title="标题2">
        <text>内容2</text>
      </uni-collapse-item>
    </uni-collapse>
    
    <!-- 分段器 -->
    <uni-segmented-control 
      :values="['选项1', '选项2', '选项3']"
      @clickItem="segmentChange"
    />
    
    <!-- 步进器 -->
    <uni-number-box 
      :value="count"
      @change="numberChange"
    />
    
    <!-- 评分 -->
    <uni-rate 
      :value="rating"
      @change="rateChange"
    />
    
    <!-- 搜索框 -->
    <uni-search-bar 
      placeholder="请输入搜索内容"
      @confirm="searchConfirm"
    />
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      count: 1,
      rating: 4
    }
  },
  methods: {
    handleClick(item) {
      console.log('点击了', item)
    },
    segmentChange(e) {
      console.log('选中了', e.currentIndex)
    },
    numberChange(value) {
      this.count = value
    },
    rateChange(value) {
      this.rating = value
    },
    searchConfirm(value) {
      console.log('搜索', value)
    }
  }
}
</script>
```

### 10.3 使用 uView UI

**安装 uView**

```bash
npm install uview-ui@2.0.36
```

**main.js 引入**

```javascript
import uView from 'uview-ui'
Vue.use(uView)
```

**App.vue 引入样式**

```vue
<style lang="scss">
@import "uview-ui/index.scss";
</style>
```

**uni.scss 引入变量**

```scss
@import "uview-ui/theme.scss";
```

**使用 uView 组件**

```vue
<template>
  <view>
    <!-- 按钮 -->
    <u-button type="primary" @click="handleClick">主要按钮</u-button>
    <u-button type="success">成功按钮</u-button>
    <u-button type="warning">警告按钮</u-button>
    <u-button type="error">错误按钮</u-button>
    
    <!-- 表单 -->
    <u-form :model="form" ref="uForm">
      <u-form-item label="姓名" prop="name">
        <u-input v-model="form.name" />
      </u-form-item>
      <u-form-item label="手机号" prop="phone">
        <u-input v-model="form.phone" />
      </u-form-item>
    </u-form>
    
    <!-- 弹窗 -->
    <u-popup v-model="showPopup" mode="center">
      <view class="popup-content">
        <text>这是弹窗内容</text>
      </view>
    </u-popup>
    
    <!-- 加载更多 -->
    <u-loadmore :status="loadStatus" />
    
    <!-- 空状态 -->
    <u-empty mode="data" text="暂无数据" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        phone: ''
      },
      showPopup: false,
      loadStatus: 'loadmore' // loadmore, loading, nomore
    }
  },
  methods: {
    handleClick() {
      this.$u.toast('点击了按钮')
    }
  }
}
</script>
```

---

## 11. 性能优化

### 11.1 图片优化

```vue
<template>
  <view>
    <!-- 使用 mode 属性优化图片显示 -->
    <image 
      src="/static/banner.jpg"
      mode="aspectFill"
      lazy-load
      @load="imageLoad"
      @error="imageError"
    />
    
    <!-- 使用占位图 -->
    <image 
      :src="imageUrl || '/static/placeholder.png'"
      mode="aspectFit"
    />
    
    <!-- 图片压缩 -->
    <image 
      :src="compressImage(imageUrl, 750)"
      mode="widthFix"
    />
  </view>
</template>

<script>
export default {
  methods: {
    // 图片压缩
    compressImage(url, width) {
      // 使用七牛云、阿里云OSS等图片处理服务
      return `${url}?imageView2/2/w/${width}`
    },
    
    imageLoad(e) {
      console.log('图片加载成功')
    },
    
    imageError(e) {
      console.log('图片加载失败，使用默认图')
      e.target.src = '/static/default.png'
    }
  }
}
</script>
```

### 11.2 列表优化

```vue
<template>
  <view>
    <!-- 使用分页加载 -->
    <scroll-view 
      scroll-y
      class="scroll-view"
      @scrolltolower="loadMore"
    >
      <view 
        v-for="item in list" 
        :key="item.id"
        class="list-item"
      >
        {{ item.title }}
      </view>
      
      <view class="loading" v-if="loading">
        加载中...
      </view>
      
      <view class="no-more" v-if="noMore">
        没有更多了
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      page: 1,
      pageSize: 20,
      loading: false,
      noMore: false
    }
  },
  
  onLoad() {
    this.loadData()
  },
  
  methods: {
    async loadData() {
      if (this.loading || this.noMore) return
      
      this.loading = true
      
      try {
        const res = await this.$api.getList({
          page: this.page,
          size: this.pageSize
        })
        
        if (res.data.length < this.pageSize) {
          this.noMore = true
        }
        
        this.list = [...this.list, ...res.data]
        this.page++
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    
    loadMore() {
      this.loadData()
    }
  }
}
</script>
```

### 11.3 使用计算属性和缓存

```vue
<script>
export default {
  data() {
    return {
      userList: [],
      keyword: ''
    }
  },
  
  computed: {
    // 使用计算属性过滤数据
    filteredList() {
      if (!this.keyword) return this.userList
      
      return this.userList.filter(user => 
        user.name.includes(this.keyword)
      )
    },
    
    // 缓存复杂计算
    totalPrice() {
      return this.cartList.reduce((sum, item) => {
        return sum + item.price * item.quantity
      }, 0)
    }
  },
  
  methods: {
    // 使用防抖优化搜索
    searchDebounce: null,
    handleSearch(keyword) {
      clearTimeout(this.searchDebounce)
      this.searchDebounce = setTimeout(() => {
        this.keyword = keyword
      }, 300)
    }
  }
}
</script>
```

### 11.4 分包加载

**pages.json**

```json
{
  "pages": [
    {
      "path": "pages/index/index"
    }
  ],
  "subPackages": [
    {
      "root": "pagesA",
      "pages": [
        {
          "path": "detail/detail"
        },
        {
          "path": "list/list"
        }
      ]
    },
    {
      "root": "pagesB",
      "pages": [
        {
          "path": "user/user"
        }
      ]
    }
  ],
  "preloadRule": {
    "pages/index/index": {
      "network": "all",
      "packages": ["pagesA"]
    }
  }
}
```

### 11.5 代码优化技巧

```javascript
// 1. 使用 Object.freeze 冻结不变的数据
export default {
  data() {
    return {
      // 大量静态数据，不需要响应式
      staticData: Object.freeze([
        { id: 1, name: '选项1' },
        { id: 2, name: '选项2' }
        // ... 更多数据
      ])
    }
  }
}

// 2. 及时销毁定时器
export default {
  data() {
    return {
      timer: null
    }
  },
  
  onLoad() {
    this.timer = setInterval(() => {
      // 定时任务
    }, 1000)
  },
  
  onUnload() {
    // 页面卸载时清除定时器
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }
}

// 3. 使用节流优化高频事件
export default {
  methods: {
    handleScroll: throttle(function(e) {
      console.log('滚动', e.scrollTop)
    }, 200)
  }
}

function throttle(fn, delay) {
  let timer = null
  return function(...args) {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}

// 4. 按需加载组件
export default {
  components: {
    HeavyComponent: () => import('@/components/HeavyComponent.vue')
  }
}
```

---

## 12. 实战项目

### 12.1 电商小程序实战

#### 项目结构

```
shop-app/
├── pages/
│   ├── index/              # 首页
│   ├── category/           # 分类
│   ├── cart/              # 购物车
│   ├── user/              # 我的
│   ├── product-detail/    # 商品详情
│   ├── order-list/        # 订单列表
│   └── login/             # 登录
├── components/
│   ├── product-card/      # 商品卡片
│   ├── tab-bar/           # 底部导航
│   └── address-picker/    # 地址选择
├── static/
├── store/
│   ├── modules/
│   │   ├── user.js
│   │   ├── cart.js
│   │   └── product.js
│   └── index.js
├── api/
│   ├── user.js
│   ├── product.js
│   └── order.js
├── utils/
│   ├── request.js
│   ├── auth.js
│   └── util.js
└── mixins/
    └── auth.js
```

#### 首页实现

**pages/index/index.vue**

```vue
<template>
  <view class="index-page">
    <!-- 搜索栏 -->
    <view class="search-bar">
      <input 
        class="search-input"
        placeholder="搜索商品"
        @focus="goSearch"
      />
    </view>
    
    <!-- 轮播图 -->
    <swiper 
      class="banner-swiper"
      indicator-dots
      autoplay
      circular
    >
      <swiper-item 
        v-for="(banner, index) in bannerList" 
        :key="index"
      >
        <image 
          :src="banner.image"
          mode="aspectFill"
          @click="handleBannerClick(banner)"
        />
      </swiper-item>
    </swiper>
    
    <!-- 分类导航 -->
    <view class="category-nav">
      <view 
        v-for="category in categoryList" 
        :key="category.id"
        class="category-item"
        @click="goCategory(category)"
      >
        <image :src="category.icon" mode="aspectFit" />
        <text>{{ category.name }}</text>
      </view>
    </view>
    
    <!-- 秒杀活动 -->
    <view class="seckill-section">
      <view class="section-header">
        <text class="title">限时秒杀</text>
        <text class="countdown">{{ countdown }}</text>
      </view>
      <scroll-view scroll-x class="seckill-list">
        <view 
          v-for="product in seckillList" 
          :key="product.id"
          class="seckill-item"
          @click="goDetail(product.id)"
        >
          <image :src="product.image" mode="aspectFill" />
          <view class="price">¥{{ product.seckillPrice }}</view>
          <view class="origin-price">¥{{ product.price }}</view>
        </view>
      </scroll-view>
    </view>
    
    <!-- 商品列表 -->
    <view class="product-section">
      <view class="section-header">
        <text class="title">为你推荐</text>
      </view>
      <view class="product-list">
        <product-card
          v-for="product in productList"
          :key="product.id"
          :product="product"
          @click="goDetail(product.id)"
        />
      </view>
      
      <!-- 加载更多 -->
      <view class="load-more" v-if="loading">
        加载中...
      </view>
      <view class="no-more" v-if="noMore">
        没有更多了
      </view>
    </view>
  </view>
</template>

<script>
import ProductCard from '@/components/product-card/product-card.vue'

export default {
  components: {
    ProductCard
  },
  
  data() {
    return {
      bannerList: [],
      categoryList: [],
      seckillList: [],
      productList: [],
      countdown: '00:00:00',
      page: 1,
      loading: false,
      noMore: false
    }
  },
  
  onLoad() {
    this.loadData()
    this.startCountdown()
  },
  
  onReachBottom() {
    this.loadMore()
  },
  
  onPullDownRefresh() {
    this.refresh()
  },
  
  methods: {
    async loadData() {
      try {
        const [banners, categories, seckills, products] = await Promise.all([
          this.$api.getBanners(),
          this.$api.getCategories(),
          this.$api.getSeckillProducts(),
          this.$api.getProducts({ page: 1 })
        ])
        
        this.bannerList = banners
        this.categoryList = categories
        this.seckillList = seckills
        this.productList = products.list
      } catch (err) {
        console.error(err)
      }
    },
    
    async loadMore() {
      if (this.loading || this.noMore) return
      
      this.loading = true
      this.page++
      
      try {
        const res = await this.$api.getProducts({ page: this.page })
        
        if (res.list.length === 0) {
          this.noMore = true
        } else {
          this.productList = [...this.productList, ...res.list]
        }
      } catch (err) {
        console.error(err)
        this.page--
      } finally {
        this.loading = false
      }
    },
    
    async refresh() {
      this.page = 1
      this.noMore = false
      await this.loadData()
      uni.stopPullDownRefresh()
    },
    
    startCountdown() {
      const endTime = new Date().setHours(24, 0, 0, 0)
      
      setInterval(() => {
        const now = Date.now()
        const diff = endTime - now
        
        if (diff <= 0) {
          this.countdown = '00:00:00'
          return
        }
        
        const hours = Math.floor(diff / 3600000)
        const minutes = Math.floor((diff % 3600000) / 60000)
        const seconds = Math.floor((diff % 60000) / 1000)
        
        this.countdown = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      }, 1000)
    },
    
    goSearch() {
      uni.navigateTo({
        url: '/pages/search/search'
      })
    },
    
    goCategory(category) {
      uni.navigateTo({
        url: `/pages/category/category?id=${category.id}`
      })
    },
    
    goDetail(id) {
      uni.navigateTo({
        url: `/pages/product-detail/product-detail?id=${id}`
      })
    },
    
    handleBannerClick(banner) {
      if (banner.link) {
        uni.navigateTo({
          url: banner.link
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.index-page {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.search-bar {
  padding: 20rpx;
  background-color: #fff;
  
  .search-input {
    height: 64rpx;
    background-color: #f5f5f5;
    border-radius: 32rpx;
    padding: 0 30rpx;
    font-size: 28rpx;
  }
}

.banner-swiper {
  height: 300rpx;
  
  image {
    width: 100%;
    height: 100%;
  }
}

.category-nav {
  display: flex;
  flex-wrap: wrap;
  padding: 20rpx;
  background-color: #fff;
  margin-top: 20rpx;
  
  .category-item {
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20rpx;
    
    image {
      width: 80rpx;
      height: 80rpx;
      margin-bottom: 10rpx;
    }
    
    text {
      font-size: 24rpx;
      color: #333;
    }
  }
}

.seckill-section {
  background-color: #fff;
  margin-top: 20rpx;
  padding: 20rpx;
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;
    
    .title {
      font-size: 32rpx;
      font-weight: bold;
    }
    
    .countdown {
      color: #ff4d4f;
      font-size: 28rpx;
    }
  }
  
  .seckill-list {
    white-space: nowrap;
    
    .seckill-item {
      display: inline-block;
      width: 200rpx;
      margin-right: 20rpx;
      
      image {
        width: 200rpx;
        height: 200rpx;
        border-radius: 8rpx;
      }
      
      .price {
        color: #ff4d4f;
        font-size: 32rpx;
        font-weight: bold;
        margin-top: 10rpx;
      }
      
      .origin-price {
        color: #999;
        font-size: 24rpx;
        text-decoration: line-through;
      }
    }
  }
}

.product-section {
  margin-top: 20rpx;
  
  .section-header {
    padding: 20rpx;
    background-color: #fff;
    
    .title {
      font-size: 32rpx;
      font-weight: bold;
    }
  }
  
  .product-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10rpx;
  }
  
  .load-more,
  .no-more {
    text-align: center;
    padding: 40rpx 0;
    color: #999;
    font-size: 28rpx;
  }
}
</style>
```

#### 商品卡片组件

**components/product-card/product-card.vue**

```vue
<template>
  <view class="product-card" @click="handleClick">
    <image 
      class="product-image"
      :src="product.image"
      mode="aspectFill"
      lazy-load
    />
    <view class="product-info">
      <text class="product-name">{{ product.name }}</text>
      <view class="product-price">
        <text class="price">¥{{ product.price }}</text>
        <text class="sales">已售{{ product.sales }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  
  methods: {
    handleClick() {
      this.$emit('click', this.product)
    }
  }
}
</script>

<style lang="scss" scoped>
.product-card {
  width: calc(50% - 10rpx);
  margin: 10rpx 5rpx;
  background-color: #fff;
  border-radius: 8rpx;
  overflow: hidden;
  
  .product-image {
    width: 100%;
    height: 345rpx;
  }
  
  .product-info {
    padding: 20rpx;
    
    .product-name {
      font-size: 28rpx;
      color: #333;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      line-height: 1.4;
      height: 78rpx;
    }
    
    .product-price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10rpx;
      
      .price {
        color: #ff4d4f;
        font-size: 32rpx;
        font-weight: bold;
      }
      
      .sales {
        color: #999;
        font-size: 24rpx;
      }
    }
  }
}
</style>
```

---

## 13. 进阶技巧

### 13.1 自定义导航栏

```vue
<template>
  <view class="custom-navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
    <view class="navbar-content" :style="{ height: navBarHeight + 'px' }">
      <view class="navbar-left" @click="handleBack">
        <text class="icon-back">←</text>
      </view>
      <view class="navbar-title">
        <text>{{ title }}</text>
      </view>
      <view class="navbar-right">
        <slot name="right"></slot>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    showBack: {
      type: Boolean,
      default: true
    }
  },
  
  data() {
    return {
      statusBarHeight: 0,
      navBarHeight: 44
    }
  },
  
  created() {
    const systemInfo = uni.getSystemInfoSync()
    this.statusBarHeight = systemInfo.statusBarHeight
    
    // #ifdef MP-WEIXIN
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
    this.navBarHeight = menuButtonInfo.height + (menuButtonInfo.top - systemInfo.statusBarHeight) * 2
    // #endif
  },
  
  methods: {
    handleBack() {
      if (this.showBack) {
        uni.navigateBack()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 999;
  
  .navbar-content {
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    
    .navbar-left {
      width: 100rpx;
      
      .icon-back {
        font-size: 36rpx;
      }
    }
    
    .navbar-title {
      flex: 1;
      text-align: center;
      font-size: 32rpx;
      font-weight: bold;
    }
    
    .navbar-right {
      width: 100rpx;
      text-align: right;
    }
  }
}
</style>
```

### 13.2 Mixins 复用逻辑

**mixins/auth.js**

```javascript
export default {
  methods: {
    // 检查登录状态
    checkLogin() {
      const token = uni.getStorageSync('token')
      if (!token) {
        uni.showModal({
          title: '提示',
          content: '请先登录',
          success: (res) => {
            if (res.confirm) {
              uni.navigateTo({
                url: '/pages/login/login'
              })
            }
          }
        })
        return false
      }
      return true
    },
    
    // 需要登录的操作
    requireLogin(callback) {
      if (this.checkLogin()) {
        callback && callback()
      }
    }
  }
}
```

**使用 Mixin**

```vue
<script>
import authMixin from '@/mixins/auth.js'

export default {
  mixins: [authMixin],
  
  methods: {
    handleAddToCart() {
      this.requireLogin(() => {
        // 添加到购物车的逻辑
        console.log('添加到购物车')
      })
    }
  }
}
</script>
```

### 13.3 自定义指令

**main.js**

```javascript
// 权限指令
Vue.directive('permission', {
  inserted(el, binding) {
    const permissions = uni.getStorageSync('permissions') || []
    const requiredPermission = binding.value
    
    if (!permissions.includes(requiredPermission)) {
      el.style.display = 'none'
    }
  }
})

// 防抖指令
Vue.directive('debounce', {
  inserted(el, binding) {
    let timer = null
    el.addEventListener('click', () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        binding.value()
      }, 500)
    })
  }
})
```

**使用自定义指令**

```vue
<template>
  <view>
    <button v-permission="'admin'">管理员可见</button>
    <button v-debounce="handleSubmit">提交</button>
  </view>
</template>
```

### 13.4 WebSocket 实时通信

**utils/websocket.js**

```javascript
class WebSocketClient {
  constructor(url) {
    this.url = url
    this.socketTask = null
    this.reconnectTimer = null
    this.heartbeatTimer = null
    this.isConnected = false
    this.listeners = {}
  }
  
  // 连接
  connect() {
    this.socketTask = uni.connectSocket({
      url: this.url,
      success: () => {
        console.log('WebSocket 连接成功')
      }
    })
    
    this.socketTask.onOpen(() => {
      this.isConnected = true
      this.startHeartbeat()
      this.emit('open')
    })
    
    this.socketTask.onMessage((res) => {
      const data = JSON.parse(res.data)
      this.emit('message', data)
    })
    
    this.socketTask.onClose(() => {
      this.isConnected = false
      this.stopHeartbeat()
      this.emit('close')
      this.reconnect()
    })
    
    this.socketTask.onError((err) => {
      console.error('WebSocket 错误', err)
      this.emit('error', err)
    })
  }
  
  // 发送消息
  send(data) {
    if (!this.isConnected) {
      console.error('WebSocket 未连接')
      return
    }
    
    this.socketTask.send({
      data: JSON.stringify(data),
      success: () => {
        console.log('发送成功')
      },
      fail: (err) => {
        console.error('发送失败', err)
      }
    })
  }
  
  // 关闭连接
  close() {
    if (this.socketTask) {
      this.socketTask.close()
    }
    this.stopHeartbeat()
    this.stopReconnect()
  }
  
  // 重连
  reconnect() {
    this.stopReconnect()
    this.reconnectTimer = setTimeout(() => {
      console.log('尝试重连...')
      this.connect()
    }, 3000)
  }
  
  stopReconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }
  }
  
  // 心跳
  startHeartbeat() {
    this.heartbeatTimer = setInterval(() => {
      this.send({ type: 'heartbeat' })
    }, 30000)
  }
  
  stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
  }
  
  // 事件监听
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }
  
  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback)
    }
  }
  
  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data))
    }
  }
}

export default WebSocketClient
```

**使用 WebSocket**

```vue
<script>
import WebSocketClient from '@/utils/websocket.js'

export default {
  data() {
    return {
      ws: null,
      messages: []
    }
  },
  
  onLoad() {
    this.initWebSocket()
  },
  
  onUnload() {
    if (this.ws) {
      this.ws.close()
    }
  },
  
  methods: {
    initWebSocket() {
      this.ws = new WebSocketClient('wss://example.com/ws')
      
      this.ws.on('open', () => {
        console.log('连接成功')
      })
      
      this.ws.on('message', (data) => {
        console.log('收到消息', data)
        this.messages.push(data)
      })
      
      this.ws.on('close', () => {
        console.log('连接关闭')
      })
      
      this.ws.connect()
    },
    
    sendMessage(content) {
      this.ws.send({
        type: 'message',
        content
      })
    }
  }
}
</script>
```

### 13.5 原生能力调用

```javascript
// #ifdef APP-PLUS
// 调用原生插件
const nativePlugin = uni.requireNativePlugin('MyPlugin')

nativePlugin.doSomething({
  param: 'value'
}, (result) => {
  console.log('原生插件返回', result)
})

// 监听原生事件
plus.globalEvent.addEventListener('customEvent', (e) => {
  console.log('收到原生事件', e)
})

// 调用原生模块
plus.android.importClass('android.widget.Toast')
plus.android.importClass('android.content.Context')

const Toast = plus.android.importClass('android.widget.Toast')
const Context = plus.android.importClass('android.content.Context')

Toast.makeText(
  plus.android.runtimeMainActivity(),
  '这是原生Toast',
  Toast.LENGTH_SHORT
).show()
// #endif
```

---

## 总结

### 学习路线图

```
第1阶段：入门（1-2周）
├── 环境搭建
├── 基础语法
├── 组件使用
└── 简单页面开发

第2阶段：进阶（2-3周）
├── 路由管理
├── 状态管理
├── 网络请求
├── 插件使用
└── 完整项目开发

第3阶段：高级（3-4周）
├── 性能优化
├── 自定义组件
├── 原生能力
├── 多端适配
└── 项目部署

第4阶段：精通（持续学习）
├── 源码阅读
├── 插件开发
├── 架构设计
└── 最佳实践
```

### 推荐资源

1. **官方文档**
   - UniApp 官网：https://uniapp.dcloud.io/
   - uni-ui 组件库：https://uniapp.dcloud.io/component/uniui/uni-ui
   - 插件市场：https://ext.dcloud.net.cn/

2. **学习社区**
   - DCloud 社区：https://ask.dcloud.net.cn/
   - GitHub：搜索 uniapp 相关项目

3. **开发工具**
   - HBuilderX：https://www.dcloud.io/hbuilderx.html
   - 微信开发者工具
   - 各平台模拟器

### 常见问题

1. **跨域问题**：配置 manifest.json 中的网络请求域名
2. **样式兼容**：使用 rpx 单位，避免使用平台特有样式
3. **性能优化**：图片懒加载、分包加载、代码优化
4. **调试技巧**：使用条件编译、console.log、断点调试

### 最佳实践

1. 统一的代码规范
2. 组件化开发
3. 模块化管理
4. 合理使用缓存
5. 做好错误处理
6. 注重用户体验
7. 持续优化性能

---

**祝你学习愉快，早日精通 UniApp！** 🎉

