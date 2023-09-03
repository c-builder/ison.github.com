import {
  createApp, onMounted, ref, onBeforeUnmount,
} from 'vue';
import videoComponent from '../components/videoComponent.vue';

function usevideoWebCommponet(comment) {
  const customHTMLContainer = ref(null);

  const createCustomComponent = (videoId) => {
    const app = createApp(videoComponent, {
      videoId,
      comment,
    });

    const container = document.createElement('div');
    app.mount(container);

    return { app, container };
  };

  const customComponents = [];

  // 在组件挂载后执行
  onMounted(() => {
    const customTags = customHTMLContainer.value.querySelectorAll('xs-vue-video');
    customTags.forEach((tag) => {
      const componentData = createCustomComponent(tag.getAttribute('videoId'));
      customComponents.push(componentData);
      tag.replaceWith(componentData.container);
    });
  });

  onBeforeUnmount(() => {
    customComponents.forEach((componentData) => {
      componentData.app.unmount();
    });
  });

  const videoHandle = (str) => {
    const regex = /\[::::video::(\d+)::::\]/g;
    let replacedHtml = str;
    const match = regex.exec(str);
    if (match) {
      const videoId = match[1];
      const template = `<xs-vue-video videoId='${videoId}'></xs-vue-video>`;
      replacedHtml = str.replace(regex, template);
    }
    return replacedHtml;
  };
  comment.content = videoHandle(comment.content);
  return { customHTMLContainer };
}

export default usevideoWebCommponet;
