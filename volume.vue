<template>
  <div>
    <h1>Slider Example</h1>
    <div class="wrap">
      <Slider v-model="sliderValue" />
    </div>
    <p>Current Value: {{ sliderValue }}</p>
  </div>
</template>

<script>
import Slider from './Slider.vue';

export default {
  components: {
    Slider,
  },
  data() {
    return {
      sliderValue: 30, // 初始值
    };
  },
};
</script>
<style>
.wrap {
  width: 200px;
}
</style>
