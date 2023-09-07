<template>
  <div :class="{ 'image-wrapper': !useBackground }" :style="getWrapperStyle" ref="imageWrapper">
    <img v-if="isImage && !useBackground" ref="image" :src="src" :alt="alt" @load="handleImageLoad" @error="handleImageError" />
    <div v-else :style="getDefaultImageStyle" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

// 创建响应式变量
const isImage = ref(false); // 是否显示图片
const observer = ref(null); // IntersectionObserver 实例

// 获取包裹容器的样式
const getWrapperStyle = () => {
  return useBackground.value
    ? { backgroundImage: isImage.value ? `url(${src})` : `url(${defaultImage})` }
    : {};
};

// 获取默认图像的样式
const getDefaultImageStyle = computed(() => {
  if (useBackground.value) {
    const style = {
      backgroundImage: `url(${defaultImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
    if (width && height) {
      style.width = `${width}px`;
      style.height = `${height}px`;
    }
    return style;
  } else {
    return {};
  }
});

// 处理图片加载成功事件
const handleImageLoad = () => {
  isImage.value = true; // 图片加载成功后设置为显示图片
  if (observer.value) {
    observer.value.disconnect(); // 停止观察
  }
};

// 在组件挂载后，监听图片是否进入视口
onMounted(() => {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1, // 根据需要调整此阈值
  };

  // 创建 IntersectionObserver 实例
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!isImage.value) {
          observer.value.unobserve(entry.target); // 停止观察
        }
      }
    });
  }, observerOptions);

  // 开始观察图片容器元素
  observer.value.observe(imageWrapper.value);
});

</script>

<style>
.image-wrapper {
  width: 100%; /* 设置包裹容器的固定宽度 */
  max-width: 100%; /* 确保图片适应父容器的宽度 */
  overflow: hidden; /* 隐藏任何溢出的内容 */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 用于背景图片的可选样式 */
.image-wrapper.useBackground {
  background-size: cover;
  background-position: center;
}
</style>
