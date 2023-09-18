<template>
  <div>
    <input type="file" multiple @change="handleFileChange" ref="fileInput" />
    <button @click="uploadFiles">上传文件</button>
    <div v-if="files.length">
      <h3>文件信息:</h3>
      <ul>
        <li v-for="file in files" :key="file.name">
          <p>文件名: {{ file.name }}</p>
          <p>文件大小: {{ formatFileSize(file.size) }}</p>
          <p>文件类型: {{ file.type }}</p>
        </li>
      </ul>
    </div>
    <div v-if="isUploading">
      <h3>上传进度:</h3>
      <ul>
        <li v-for="(progress, index) in uploadProgress" :key="index">
          <progress :value="progress" max="100"></progress>
          <p>{{ progress }}%</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'UploadComponent',
  data() {
    return {
      files: [],
      isUploading: false,
      uploadProgress: [],
    };
  },
  methods: {
    handleFileChange(event) {
      this.files = Array.from(event.target.files);
    },
    uploadFiles() {
      if (!this.files.length) {
        alert('请选择文件');
        return;
      }

      this.isUploading = true;
      this.uploadProgress = Array(this.files.length).fill(0); // 初始化进度数组

      const formData = new FormData();
      this.files.forEach((file, index) => {
        formData.append(`file${index}`, file);

        // 创建一个新的XHR对象
        const xhr = new XMLHttpRequest();

        // 监听上传进度事件
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            // 更新当前文件的上传进度
            this.uploadProgress[index] = Math.round((event.loaded / event.total) * 100);
          }
        });

        // 监听上传完成事件
        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            // 处理上传成功的逻辑
            alert(`文件${index}上传成功！`);
          } else {
            // 处理上传失败的逻辑
            alert(`文件${index}上传失败。`);
          }

          // 检查是否所有文件都已上传完成
          const allFilesUploaded = this.uploadProgress.every(progress => progress === 100);

          if (allFilesUploaded) {
            this.isUploading = false;
            alert('所有文件上传完成！');
          }
        });

        // 指定服务器端的上传地址，并确保CORS配置
        xhr.open('POST', 'https://your-server-upload-url.com'); // 替换为实际的上传地址
        xhr.send(formData);
      });
    },
    formatFileSize(size) {
      if (size === 0) return '0 Bytes';

      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(size) / Math.log(k));
      return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
  },
};
</script>

<style scoped>
.upload-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
}

.upload-button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.file-info {
  margin-top: 20px;
}

.file-info ul {
  list-style: none;
  padding: 0;
}

.file-info li {
  margin-bottom: 10px;
}

.upload-progress {
  margin-top: 20px;
}

.upload-progress ul {
  list-style: none;
  padding: 0;
}

.upload-progress li {
  margin-bottom: 10px;
}
</style>
