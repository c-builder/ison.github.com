<template lang="">
  <div>
    <div>---video--{{state.videosObj}}-----</div>

  </div>
</template>
<script setup>
import { defineProps, reactive } from 'vue';

const props = defineProps({
  data: {
    type: String,
  },
});
const state = reactive({
  videosObj: null,
});

const videosObj = JSON.parse(props.data);

state.videosObj = videosObj;

</script>
<style lang="">

</style>
