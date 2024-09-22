import { ref, onMounted, onUnmounted } from 'vue';

export function useIntersectionObserver(targetElement, options = {}) {
  const hasLeftView = ref(false); // 判断是否完全离开可视区域

  onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      // 当元素不再与视口相交（完全离开）时，isIntersecting 为 false
      if (!entry.isIntersecting) {
        hasLeftView.value = true;
      } else {
        hasLeftView.value = false;
      }
    }, options);

    if (targetElement.value) {
      observer.observe(targetElement.value);
    }

    onUnmounted(() => {
      if (targetElement.value) {
        observer.unobserve(targetElement.value);
      }
    });
  });

  return { hasLeftView };
}


<template>
  <div ref="mainPost" class="main-post">
    <!-- 主楼的内容 -->
    <p v-if="hasLeftView">主楼已完全离开可视区域</p>
    <p v-else>主楼在可视区域内</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useIntersectionObserver } from './useIntersectionObserver'; // 导入封装的函数

const mainPost = ref(null);

// 使用 threshold 为 0，监测元素完全离开视口的情况
const { hasLeftView } = useIntersectionObserver(mainPost, {
  threshold: 0 // 当元素完全离开视口时触发
});
</script>

<style scoped>
.main-post {
  /* 主楼的样式 */
}
</style>
