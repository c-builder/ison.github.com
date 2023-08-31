// messageStore.js
import { defineStore } from 'pinia';

export const useMessageStore = defineStore({
  id: 'message',
  state() {
    return {
      messageQueue: []
    };
  },
  actions: {
    addNewMessage(text) {
      this.messageQueue.push({ text });
    }
  }
});
