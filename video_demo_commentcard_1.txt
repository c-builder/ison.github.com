<template lang="">
  <component :is="customComponents" :comment="comment" />
</template>
<script setup>
import {
  defineProps,
} from 'vue';

import customComponents from '../components/customComponents.vue';

const props = defineProps({
  comment: {
    type: Object,
    default() {
      return null;
    },
  },
});

</script>
<style lang="less">
</style>
