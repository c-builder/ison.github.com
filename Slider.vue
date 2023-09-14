<template>
  <div :class="[vertical ? 'vertical-slider' : 'slider']" :style="verticalHeight" @mousedown="onMouseDown">
    <div class="track"></div>
    <div class="bar" :style="barStyle"></div>
    <div class="thumb" :style="thumbStyle"></div>
  </div>
</template>

<script>
export default {
  props: {
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    modelValue: {
      type: Number,
      required: true,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    height: {
      type: Number,
      default: 100, // 设置默认高度
    },
  },
  data() {
    return {
      isDragging: false,
      thumbLeft: 0,
    };
  },
  computed: {
    thumbStyle() {
      const keyName = this.vertical ? 'top' : 'left';

      return this.vertical ? {
        top: `${((this.max - this.computedValue) / (this.max - this.min)) * 100}%`, // 反转映射
      } : {
        left: `${((this.modelValue - this.min) / (this.max - this.min)) * 100}%`,
      };
    },
    barStyle() {
      return this.vertical ? {
        height: `${((this.max - this.computedValue) / (this.max - this.min)) * 100}%`,
      } : {
        width: `${((this.modelValue - this.min) / (this.max - this.min)) * 100}%`,
      };
    },
    verticalHeight() {
      return this.vertical ? {
        height: `${this.height}px`,
      } : {};
    },
    computedValue() {
      return this.max - this.modelValue; // 反转 value 映射
    },
  },
  methods: {
    onMouseDown(event) {
      this.isDragging = true;
      this.updateValue(event);

      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseup', this.onMouseUp);
    },
    onMouseMove(event) {
      if (!this.isDragging) return;
      this.updateValue(event);
    },
    onMouseUp() {
      this.isDragging = false;
      window.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('mouseup', this.onMouseUp);
    },
    updateValue(event) {
      const sliderRect = this.$el.getBoundingClientRect();
      let percentage = 0;
      let newValue = 0;
      if (this.vertical === true) {
        const offsetY = event.clientY - sliderRect.top;
        percentage = offsetY / sliderRect.height;
        newValue = this.max - percentage * (this.max - this.min); // 反转映射
      } else {
        const offsetX = event.clientX - sliderRect.left;
        percentage = offsetX / sliderRect.width;
        newValue = this.min + percentage * (this.max - this.min);
      }

      newValue = Math.max(this.min, Math.min(this.max, newValue));
      this.$emit('update:modelValue', parseInt(newValue, 10));
    },
  },
};
</script>

<style lang="less" scoped>
/* 样式可以根据需要进行调整 */
.slider {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;

  .track {
    width: 100%;
    height: 5px;
    background-color: #ccc;
  }

  .bar {
    height: 5px;
    position: absolute;
    left: 0;
    background-color: #007bff;
  }

  .thumb {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: #007bff;
    border-radius: 50%;
    cursor: pointer;
    transform: translateX(-50%);
    top: -7px;
  }
}

.vertical-slider {
  position: relative;
  user-select: none;
  width: 0;
  transform: rotate(180deg);

  .track {
    width: 5px;
    height: 100%;
    background-color: #ccc;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .bar {
    width: 5px;
    position: absolute;
    left: -2px;
    background-color: #007bff;
  }

  .thumb {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: #007bff;
    border-radius: 50%;
    cursor: pointer;
    transform: translate(-50%, -50%);
  }
}
</style>
