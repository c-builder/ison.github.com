<template>
  <div>
    <h1>评论功能示例</h1>

    <deleteDialog />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import Comment from '../components/comment.vue'; // 根据实际路径进行引入
import useCommentStore from '../pinia/useCommentStore'; // 根据实际路径进行引入
import deleteDialog from '../components/deleteDialog.vue';

const store = useCommentStore();

const {
  comments,
} = storeToRefs(store);
</script>
