import { ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
  mounted() {
    const route = useRoute();
    // 获取路由的 meta 信息
    const routeMeta = route.meta;

    const init = () => {
      // 检查是否禁用混入
      if (routeMeta.needCheck) {
        const allPageLinks = document.querySelectorAll('a');
        allPageLinks.forEach((pageLink) => {
          pageLink.addEventListener('click', () => {
            // 获取当前页面的URL
            const currentPage = ref('');
            currentPage.value = window.location.href;
            window.sessionStorage.setItem('previousPageUrl', currentPage.value);
          });
        });
      }
    };

    // 检查浏览器是否支持requestIdleCallback
    if ('requestIdleCallback' in window) {
      // 浏览器支持requestIdleCallback
      window.requestIdleCallback(() => {
      // 在空闲时执行任务
        init();
      });
    } else {
      // 浏览器不支持requestIdleCallback，使用setTimeout作为备用方案
      setTimeout(() => {
        init();
      }, 300);
    }
  },
};
