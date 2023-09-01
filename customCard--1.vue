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
    const contextData = {
      type: 'topic', // topic,comment,childComment
      commentType: 'top', // topList, commentList, waterList
      id: 'wwe34343', // uuid , commentId, childReplyId
      parentId: '97777', // 父id
      videoId,
    };
    replacedHtml = str.replace(regex, `<xs-vue-video data='${JSON.stringify(contextData)}'></xs-vue-video>`);
  }
  return replacedHtml;
};

</script>
<style lang="">

</style>
