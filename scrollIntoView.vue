<template>
  <div>
    <ul>
      <li v-for="comment in comments" :key="comment.id" :id="'comment-' + comment.id">
        <!-- 评论内容 -->
        {{ comment.text }}
      </li>
    </ul>
    <button @click="scrollToComment(3)">定位到评论ID为3的评论</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comments: [
        { id: 1, text: "评论1" },
        { id: 2, text: "评论2" },
        { id: 3, text: "评论3" },
        // ...
      ],
    };
  },
  methods: {
    scrollToComment(commentId) {
      const commentElement = document.getElementById('comment-' + commentId);
      if (commentElement) {
        commentElement.scrollIntoView({ behavior: "smooth" });
      }
    },
  },
};
</script>
