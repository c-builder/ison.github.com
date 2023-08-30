<template>
  <div v-if="modelValue"
  class="modal" ref="modal" :style="state.zIndexStyle">
    <div class="modal-overlay" @click="overlayClickAction"></div>
    <div class="modal-content" :style="contentStyle">
      <div class="modal-header">
        <h2>{{ title }}</h2>
        <button @click="cancelAction" class="close-button">关闭</button>
      </div>
      <slot name="content"></slot>
      <button @click="confirmAction">确定</button>
      <button @click="cancelAction">取消</button>
    </div>
  </div>
</template>

<script setup>
import {
  ref, defineProps, defineEmits, watch,
  reactive,
} from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '确认',
  },
  closeOnOverlayClick: {
    typeof: Boolean,
    default: false,
  },
});
const emits = defineEmits(['confirmed', 'canceled', 'update:modelValue']);

const modal = ref(null);
const contentStyle = ref({});
const state = reactive({
  zIndexStyle: {},
});

watch(() => props.modelValue, (newValue) => {
  if (newValue && modal.value) {
    state.zIndexStyle = {
      zIndex: new Date().getTime(),
    };
    const contentDom = modal.value.querySelector('.modal-content');
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const topOffset = (windowHeight - contentDom.offsetHeight) / 2;
    const leftOffset = (windowWidth - contentDom.offsetWidth) / 2;
    contentStyle.value = {
      marginTop: `${topOffset}px`,
      marginLeft: `${leftOffset}px`,
    };
  } else {
    state.zIndexStyle = {};
  }
}, {
  flush: 'post',
  immediate: true,
});

const confirmAction = async () => {
  emits('confirmed'); // 触发确认事件，由父组件处理确认请求
};

const cancelAction = () => {
  emits('canceled'); // 触发取消事件，由父组件处理取消操作
  // 默认的取消事件
  emits('update:modelValue', false); // 关闭模态框
};

const overlayClickAction = () => {
  if (props.closeOnOverlayClick) {
    cancelAction();
  }
};
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.modal-content {
  position: absolute;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
