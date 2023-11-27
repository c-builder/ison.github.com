<template lang="">
    <div class="list">
      <div class="left">
        <a href="http://localhost:8080/#/detail" target="_blank">首页</a>
      </div>
      <div class="right">
        <customCard v-for="(item, index) in commentList" :key="`xxx_yy_${index}`" :comment="item">

</customCard>
      </div>
    </div>
</template>
<script setup>
import {
  reactive, toRefs, provide, onMounted,
} from 'vue';
import customCard from './customCard.vue';

const data = {
  name: '88',
  age: 90,
};

// onMounted(() => {
//   // 获取所有的 a 标签
//   const allPageLinks = document.querySelectorAll('a');
//   allPageLinks.forEach((pageLink) => {
//     pageLink.addEventListener('click', (event) => {
//       // 获取当前页面的URL
//       const currentPage = window.location.href;

//       // 将当前页面URL保存到localStorage
//       window.sessionStorage.setItem('previousPageUrl', currentPage);
//     });
//   });
// });

const state = reactive({
  commentList: [

    {
      maskId: '3245413',
      maskName: '皮卡丘丘丘',
      maskType: 0,
      commentId: '916118479891898368',
      createTime: 1693553386000,
      content: '<div class="article-editor">[::::video::916204138807365632::::]<div>11[:::img:::]1111</div>[::::video::916204138807365632::::]\n</div> ',
      images: [],
      videos: [],
      attachmetList: [],
      attachments: '[]',
      matchedWords: [],
      faceUrl: 'https://xinsheng-image.huawei.com/cn/forumimage/data/uploads/2018/0911/16/5b978308ddbc5.png',
      floor: 3,
      banzhu: 0,
      clientType: 0,
      mobileType: 'PC',
      isHot: 0,
      isSpam: 0,
      isTop: 0,
      isFrozen: 0,
      isAdmin: 0,
      isReport: 0,
      isRequestDeletion: 0,
      isSelf: 0,
      isOwner: 0,
      likeCount: 0,
      isLike: 0,
      allowLike: 0,
      status: 1,
      isUploadImage: 0,
      isUploadVideoOrAudio: 0,
      commentReplyList: {
        page: {
          curPage: 1,
          pageSize: 10,
          totalRows: 0,
          totalPages: 0,
        },
        list: [],
      },
      isDisableRanking: 0,
      medalVoList: [],
      tagInfoList: [],
      maskStrings: [],
      allowEdit: 0,
    },
    {
      maskId: '60710',
      maskName: '坐等心花开',
      maskType: 0,
      commentId: '916132502296461312',
      createTime: 1693556729000,
      content: '<div class="article-editor"><div>222</div>[::::video::916204138807365632::::]\n</div> ',
      images: [],
      videos: [],
      attachmetList: [],
      attachments: '[]',
      matchedWords: [],
      faceUrl: 'https://xinsheng-image.huawei.com/cn/forumimage/showface-2ca855ca62cc68e907dd024aa38e7888-374dbe1ea526ae73a1de5c4529ce7f2e.jpg',
      floor: 4,
      banzhu: 0,
      clientType: 0,
      mobileType: 'PC',
      isHot: 0,
      isSpam: 0,
      isTop: 0,
      isFrozen: 0,
      isAdmin: 0,
      isReport: 0,
      isRequestDeletion: 0,
      isSelf: 0,
      isOwner: 0,
      likeCount: 0,
      isLike: 0,
      allowLike: 0,
      status: 1,
      isUploadImage: 0,
      isUploadVideoOrAudio: 0,
      commentReplyList: {
        page: {
          curPage: 1,
          pageSize: 10,
          totalRows: 0,
          totalPages: 0,
        },
        list: [],
      },
      isDisableRanking: 0,
      medalVoList: [],
      tagInfoList: [],
      maskStrings: [],
      allowEdit: 0,
    },
  ],
});

const { commentList } = toRefs(state);

provide('message', 'hherer');

</script>
<style lang="less">
.list {
  display: flex;
  justify-content: space-around;
  width: 1000px;
  margin-left: auto;
  margin-right: auto;

  .left {
    width: 200px;
    background: #f2f2f2;
  }
  .right {
    flex: 1;
    background: #ddd;
  }
}
</style>
