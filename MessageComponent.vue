<template>
  <div class="message-container">
    <transition-group name="message-fade" mode="out-in">
      <div
        class="message"
        v-for="(message, index) in messageStore.messageQueue"
        :key="index"
      >
        {{ message.text }}
      </div>
    </transition-group>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useMessageStore } from './messageStore';

export default {
  setup() {
    const messageStore = useMessageStore();

    return {
      messageStore
    };
  }
};
</script>

<style>
.message-container {
  position: relative;
}
.message-fade-enter-active,
.message-fade-leave-active {
  transition: all 0.5s;
}
.message-fade-enter,
.message-fade-leave-to {
  opacity: 0;
}
.message {
  position: absolute;
}
</style>
