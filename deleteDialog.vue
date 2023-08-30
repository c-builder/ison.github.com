<template>
  <div>
    <button @click="showModalComponent">打开模态框</button>
    <modal-component v-model="isModalVisible" @confirmed="onConfirmed">
      <template #content>
        <div class="dialog">
          <p>确认要执行这个操作吗？</p>
        </div>
      </template>
    </modal-component>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ModalComponent from './Modal.vue';

const isModalVisible = ref(false);

const showModalComponent = () => {
  isModalVisible.value = true;
};

const performRequest = () =>
  // 模拟请求，返回一个 Promise
  new Promise((resolve) => {
    setTimeout(() => {
      const success = true; // 模拟请求成功或失败
      if (success) {
        resolve('请求成功');
      }
    }, 1000);
  });

const onConfirmed = async () => {
  try {
    // 在这里发起请求
    const response = await performRequest(); // 假设这是请求服务接口的方法
    console.log('请求响应', response);
    isModalVisible.value = false; // 请求成功后关闭模态框
    console.log('执行操作');
  } catch (error) {
    console.error('请求失败', error);
  }
};

</script>

<style>

.dialog {
  width: 300px;
  height: 200px;
}
/* 样式同上 */
</style>
