<template>
  <div ref="videoViewContainer" class="video-view-container" :class="{ 'default-view': !data.videoed }">

    <video v-if="data.videoed" ref="videoPlayer" class="video-js">

    </video>
    <div ref="refBar" class="custom-progress-container">
      <div class="custom-draggable-progress-bar" @click="seekTo">
        <div class="custom-progress-bar-fill"></div>
        <div class="custom-progress-buffer-fill"></div>
      </div>
    </div>

    <div v-if="!isPlaying" class="custom-play-button" @click="toggleVideoPlayback">
      <!-- 自定义播放按钮 -->
      <span :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'">
        {{ isPlaying ? 'stop' : 'play' }}
      </span>
    </div>
  </div>
</template>

<script setup>
import {
  reactive, ref, onMounted, toRefs, watch, defineProps,
} from 'vue';
import { storeToRefs } from 'pinia';
import useVideoStore from '../pinia/useVideoStore';
import '../assets/video.css';

const props = defineProps({
  comment: {
    type: Object,
    default() {
      return null;
    },
  },
  videoId: {
    type: String,
  },
});

const videoStroe = useVideoStore();

const { playerLists } = storeToRefs(videoStroe);
const data = reactive({
  videojsObject: null,
  player: null,
  videoType: '',
  videoSrc:
    '//imss-video.huawei.com/video/play/8af40f498833d3cc018971162c5c430c/8af40f498833d3cc018971162c72430d/28.m3u8',
  isPlaying: false, // 标记视频是否正在播放
  videoed: false,
  width: '',
  height: '',

  isDragging: false,
  progressBarWidth: '0%',
});

const videoType = ref('');
const videoPlayer = ref(null);
const videoViewContainer = ref(null);
const refBar = ref(null);
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

// 更新进度条和视频播放进度
function updateProgressBar(event) {
  const customPlayProgressBarFill = videoViewContainer.value.querySelector('.custom-progress-bar-fill');

  const currentTime = data.player.currentTime();
  const duration = data.player.duration();
  const percentage = (currentTime / duration) * 100;
  customPlayProgressBarFill.style.width = `${percentage}%`;
}
// 更新缓冲进度条
function updateBufferBar() {
  if (!videoViewContainer.value) {
    return;
  }
  const buffered = data.player.buffered();
  if (buffered.length > 0) {
    const end = buffered.end(buffered.length - 1);
    const duration = data.player.duration();
    const percentage = (end / duration) * 100;
    videoViewContainer.value.querySelector('.custom-progress-buffer-fill').style.width = `${percentage}%`;
  }
}

function seekTo(event) {
  if (!videoViewContainer.value) {
    return;
  }
  const progressBar = videoViewContainer.value.querySelector('.custom-draggable-progress-bar');
  const boundingRect = progressBar.getBoundingClientRect();
  const offsetX = event.clientX - boundingRect.left;
  const barWidth = progressBar.clientWidth;
  const percentage = (offsetX / barWidth) * 100;
  const duration = data.player.duration();
  const seekTime = (percentage / 100) * duration;
  data.player.currentTime(seekTime);
}

const loadVideoJS = () => {
  if (!data.player) {
    data.player = data.videojsObject(videoPlayer.value, {
      autoplay: true, // 不自动播放
      controls: true, // 禁用默认控件
      width: data.width,
      height: data.height,
      sources: [
        {
          src: videoSrc.value,
          type: videoType.value,
        },
      ],
    }, () => {
      // const clone = refBar.value.cloneNode(true);
      // console.log(clone);
      // console.log(data.player);
      // document.querySelector(`#${data.player.id()}`).appendChild(clone);
    });
    if (!playerLists.value.includes(videoPlayer.value.id)) {
      videoStroe.$patch((state) => {
        state.playerLists.push(data.player);
      });
    }
    data.player.on('play', () => {
      playerLists.value.forEach((player) => {
        if (player.id() !== data.player.id()) {
          player.pause();
        }
      });
      data.isPlaying = true;
    });
    data.player.on('pause', () => {
      data.isPlaying = false;
    });

    // 监听视频的时间更新事件
    data.player.on('timeupdate', () => {
      updateProgressBar();
    });

    // 监听视频的缓冲事件
    data.player.on('progress', () => {
      updateBufferBar();
    });
  }
};

onMounted(async () => {
  videoType.value = detectVideoType(videoSrc.value);
  const { default: videojs } = await import('video.js');
  data.videojsObject = videojs;
  const { offsetHeight, offsetWidth } = videoViewContainer.value;

  data.height = `${offsetHeight}px`;
  data.width = `${offsetWidth}px`;
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

.video-js .vjs-big-play-button {
  display: none;
}

/* 添加您的样式以自定义进度条和拖动手柄的外观 */
.custom-progress-container {
  width: 100%;
  margin: 10px auto;
}

.custom-draggable-progress-bar {
  position: relative;
  height: 8px;
  cursor: pointer;
  background-color: #ccc;
}

.custom-progress-bar-fill {
  position: absolute;
  z-index: 1;
  height: 100%;
  background-color: #4caf50;
}

.custom-progress-buffer-fill {
  position: absolute;
  height: 100%;
  background-color: #82d8e5;

  transition: width 0.2s ease-in-out;
}

.custom-drag-handle {
  position: absolute;
  top: -5px;
  left: 0;
  width: 10px;
  height: 18px;
  background-color: #2196F3;
  border-radius: 50%;
  cursor: pointer;
}</style>
