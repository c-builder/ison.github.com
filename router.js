import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      needCheck: true,
    },
  },
  {
    path: '/test',
    name: 'test',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/TestView.vue'),
  },
  {
    path: '/detail',
    name: 'detail',
    meta: {
      needCheck: true, // 默认不禁用混入
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/detailView.vue'),
  },
  {
    path: '/custom',
    name: 'custom',
    meta: {
      needCheck: true, // 默认不禁用混入
    },
    component: () => import(/* webpackChunkName: "customView" */ '../views/customView.vue'),
  },
  {
    path: '/scroll',
    name: 'scroll',
    component: () => import(/* webpackChunkName: "scrollView" */ '../views/scroll.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
