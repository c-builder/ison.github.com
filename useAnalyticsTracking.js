<template>
  <div @click="analyticsTracking.trackLinkClick">
    
    <!-- 面包屑 -->
    <a href="http://localhost:8080/#/">首页</a>

    <!-- 热榜组件 - 事件注删也可以写在组件内部：@click.stop="analyticsTracking.trackLinkClick($event, '热榜')"  -->
    <hotComponent @click.stop="analyticsTracking.trackLinkClick($event, '热榜')" />

    <!-- 其他链接 -->
    <a href="#">链接4</a>
  </div>
</template>

<script setup>
import useAnalyticsTracking from '../hooks/useAnalyticsTracking';
import hotComponent from '../components/hotComponent.vue';

const analyticsTracking = useAnalyticsTracking('首页');

</script>
