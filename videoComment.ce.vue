<template lang="">
  <div v-if="comment">
    <div v-html="videoHandle(comment.content)"></div>
  </div>

</template>
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  comment: {
    type: Object,
    default() {
      return null;
    },
  },
});

const videoHandle = (str) => {
  const regex = /\[::::video::(\d+)::::\]/g;

  let replacedHtml = str;
  const match = regex.exec(str);
  if (match) {
    const videoId = match[1];
    const arr = ['', 'topList', 'wwe34343', ''];

    const key = arr.join('_');
    // 查找到相应数据，放到store

    replacedHtml = str.replace(regex, `<xs-vue-video videoId='${videoId}' data='${key}'></xs-vue-video>`);
  }
  return replacedHtml;
};

</script>
<style lang="">

</style>
