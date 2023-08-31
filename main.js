// main.js
import { createApp } from 'vue';
import App from './App.vue';
import MessagePlugin from './messagePlugin';

const app = createApp(App);

app.use(MessagePlugin);

app.mount('#app');
