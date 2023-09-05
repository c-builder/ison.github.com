import { ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
  mounted() {
    const init = () => {
      const route = useRoute();
      const currentPage = ref('');
      // 获取当前页面的URL
      currentPage.value = window.location.href;
      // 获取路由的 meta 信息
      const routeMeta = route.meta;

      // 检查是否禁用混入
      if (routeMeta.needCheck) {
        const allPageLinks = document.querySelectorAll('a');
        allPageLinks.forEach((pageLink) => {
          pageLink.addEventListener('click', () => {
            window.sessionStorage.setItem('previousPageUrl', currentPage.value);
          });
        });
      }
    };
    requestIdleCallback(init);
  },
};
