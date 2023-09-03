// main.js
import { createApp } from 'vue';
import App from './App.vue';
import MyCustomComponent from './components/MyCustomComponent.vue';
import MessagePlugin from './messagePlugin';

const app = createApp(App);

app.use(MessagePlugin);

import videoComment from './components/videoComment.ce.vue';

// 转换为自定义元素构造器
const ExampleElement = defineCustomElement(videoComment);

// 注册
customElements.define('xs-vue-video', ExampleElement);

app.mount('#app');
