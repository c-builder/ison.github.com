<template>
  <div class="video-view-container" :class="{ 'default-view': !data.videoed}">
    <video v-if="data.videoed" ref="videoPlayer" class="video-js"></video>
    <div v-if="!isPlaying"  class="custom-play-button" @click="toggleVideoPlayback">
      <!-- 自定义播放按钮 -->
      <span :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'">
        {{ isPlaying ? 'stop' : 'play' }}
      </span>
    </div>
  </div>
</template>

<script setup>
import {
  reactive, ref, onMounted, toRefs, watch,
} from 'vue';
import '../assets/video.css';

const props = defineProps({
  data: String,
});

const data = reactive({
  videojsObject: null,
  player: null,
  videoType: '',
  videoSrc:
    '//imss-video.huawei.com/video/play/8af40f498833d3cc018971162c5c430c/8af40f498833d3cc018971162c72430d/28.m3u8',
  isPlaying: false, // 标记视频是否正在播放
  videoed: false,
});

const videoType = ref('');
const videoPlayer = ref(null);
const { videoSrc, isPlaying } = toRefs(data);

const detectVideoType = (src) => {
  if (src.endsWith('.mp4')) {
    return 'video/mp4';
  }
  if (src.endsWith('.m3u8')) {
    return 'application/x-mpegURL';
  }
  return 'video/mp4';
};

const loadVideoJS = () => {
  if (data.videojsObject && !data.player) {
    data.player = data.videojsObject(videoPlayer.value, {
      autoplay: false, // 不自动播放
      controls: true, // 禁用默认控件
      sources: [
        {
          src: videoSrc.value,
          type: videoType.value,
        },
      ],
    }, () => {
      // 首次加载默认播放
      data.player.play();

      data.player.on('play', () => {
        data.isPlaying = true;
      });
      data.player.on('pause', () => {
        data.isPlaying = false;
      });
    });
  }
};

onMounted(async () => {
  videoType.value = detectVideoType(videoSrc.value);
  const { default: videojs } = await import('video.js');
  data.videojsObject = videojs;
});

const toggleVideoPlayback = () => {
  if (!data.player) {
    if (data.videoed === false) {
      data.videoed = true;
    }
    return;
  }
  if (data.isPlaying) {
    data.player.pause(); // 暂停视频播放
  } else {
    data.player.play(); // 重新播放视频
  }
};

watch(() => data.videoed, (newValue) => {
  if (newValue) {
    loadVideoJS();
  }
}, {
  flush: 'post',
});

</script>

<style src="../assets/video.css"></style>
<style lang="less">
.video-view-container {
  position: relative;
  margin-bottom: 10px;

  &.default-view {
    width: 100%;
    padding-bottom: 56.25%;
    background-color: #000;
  }
}
/* 添加样式以定制自定义播放按钮 */
.custom-play-button {
  cursor: pointer;
  background-color: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -50px;
  margin-top: -50px;
}
/* 添加悬停效果 */
.custom-play-button:hover {
  background-color: #333;
}
.video-js {
  width: 100%;
  padding-bottom: 56.25%;
}

.video-js .vjs-big-play-button {
  display: none;
}
</style>
