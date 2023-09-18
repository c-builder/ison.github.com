<template>
  <div>
    <!-- your component content here -->
    <button @click="scrollToTop">Scroll to Top</button>
  </div>
</template>

<script>
export default {
  methods: {
    scrollToTop() {
      this.scrollSmoothlyTo(0, 500); // 滚动到顶部，持续时间为500毫秒
    },
    scrollSmoothlyTo(targetY, duration) {
      const startY = window.pageYOffset;
      const distance = targetY - startY;
      const startTime = performance.now();

      function step(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easedProgress = easeOutQuad(progress); // 使用 easeOutQuad 缓动函数

        window.scrollTo(0, startY + distance * easedProgress);

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }

      function easeOutQuad(t) {
        return t * (2 - t);
      }

      requestAnimationFrame(step);
    },
  },
};
</script>
