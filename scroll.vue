<template>
  <div>
    <div v-for="item in visibleItems" class="item" :key="item.id">{{ item.content }}</div>
    <div v-if="loading" class="loading">加载中...</div>
    <div v-if="allLoaded" class="loaded">已加载全部数据</div>
  </div>
</template>

<script>
import throttle from '../utils/throttle';

export default {
  data() {
    return {
      visibleItems: [], // 存储可见数据
      loading: false, // 控制加载状态
      allLoaded: false, // 控制是否加载完全部数据
      page: 1, // 当前页数
      pageSize: 10, // 每页条数
    };
  },
  methods: {
    fetchData() {
      if (!this.allLoaded && !this.loading) {
        this.loading = true;
        // 模拟异步加载数据
        setTimeout(() => {
          // 模拟从服务器获取数据，这里使用假数据
          const newItems = Array.from({ length: this.pageSize }, (_, index) => ({
            id: this.visibleItems.length + index,
            content: `Item ${this.visibleItems.length + index + 1}`,
          }));
          this.visibleItems = [...this.visibleItems, ...newItems];
          this.page += 1;
          this.loading = false;
          this.checkAllLoaded();
        }, 1000); // 延迟1秒模拟加载
      }
    },
    checkAllLoaded() {
      // 检查是否加载完全部数据
      // if (this.visibleItems.length >= this.page * this.pageSize) {
      //   this.allLoaded = true;
      // }
      if (this.page > 3) {
        this.allLoaded = true;
        window.removeEventListener('scroll', this.handleScrollThrottled);
      }
    },
    handleScroll() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.offsetHeight;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (windowHeight + scrollTop >= documentHeight - 100) {
        this.fetchData();
      }
    },
  },
  mounted() {
    // 使用throttle包装handleScroll方法，限制事件触发频率为500毫秒
    this.handleScrollThrottled = throttle(this.handleScroll, 300);
    // 监听滚动事件
    window.addEventListener('scroll', this.handleScrollThrottled);
    // 初始加载数据
    this.fetchData();
  },
  beforeUnmount() {
    // 移除滚动事件监听，防止内存泄漏
    window.removeEventListener('scroll', this.handleScrollThrottled);
  },
};
</script>

<style>
.loading {
  text-align: center;
  padding: 10px;
  background-color: #eee;
}

.loaded {
  text-align: center;
  padding: 10px;
  background-color: #ccc;
  color: #fff;
}

.item {
  height: 80px;
  background-color: #f2f2f2;
  margin-bottom: 10px;
}
</style>
