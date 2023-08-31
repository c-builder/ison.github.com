// messagePlugin.js
import MessageComponent from './MessageComponent.vue';

export default {
  install(app) {
    const messageQueue = [];

    const addNewMessage = text => {
      messageQueue.push({ text });
      // 在这里可以添加自动播放逻辑
    };

    app.component('MessageComponent', MessageComponent);
    app.config.globalProperties.$message = { addNewMessage };
  }
};
