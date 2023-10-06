<template>
  <div class="upload-view">
   <div class="upload-file">
    <input class="file-input" type="file" multiple @change="handleFileChange" ref="fileInput" />
    <span class="upload-button" @click="uploadClick">上传文件</span>
   </div>
    <div v-if="files.length" class="upload-progress">
      <ul >
        <li v-for="(fileItem) in files" :key="fileItem.file.name">
          <span>{{ fileItem.file.name }}</span>
          <span>文件大小: {{ formatFileSize(fileItem.file.size) }}</span>
          <span>文件类型: {{ fileItem.file.type }}</span>
          <div>
            <progress :value="fileItem.uploadProgress" max="100"></progress>
            {{ fileItem.uploadProgress }}%
          </div>
        </li>
      </ul>
      {{ totalSize }}
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'UploadComponent',
  data() {
    return {
      // file: 文件信息,
      // uploadProgress: 进度, isUploading: 是否正在上传, isNeedUpload: 需要上传, isError: false,
      files: [],
      totalSize: 0,
    };
  },
  methods: {
    handleFileChange(event) {
      const newFiles = Array.from(event.target.files);
      console.log(newFiles, '---');

      newFiles.forEach((newFile) => {
        const currSize = newFile.size;
        this.totalSize += currSize;
        if (this.totalSize > 1024 * 1024 * 1) {
          console.log('超过了最大');
          return;
        }
        this.files.push({
          file: newFile, uploadProgress: 0, isUploading: false, isNeedUpload: true, isError: false,
        }); // 初始化上传进度
      });
      this.uploadFiles();
    },
    uploadClick() {
      this.$refs.fileInput.click();
    },
    uploadFiles() {
      this.files.forEach((fileItem, index) => {
        const { file, isNeedUpload } = fileItem;
        if (!isNeedUpload) {
          return;
        }

        const formData = new FormData();
        formData.append(`file${index}`, file);

        // 创建一个新的XHR对象
        const xhr = new XMLHttpRequest();

        // 监听上传进度事件
        xhr.upload.addEventListener('progress', (event) => {
          fileItem.isUploading = true;
          if (event.lengthComputable) {
            // 更新当前文件的上传进度
            fileItem.uploadProgress = Math.round((event.loaded / event.total) * 100);
          }
        });

        // 监听上传完成事件
        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            // 处理上传成功的逻辑
            fileItem.isError = false;
            fileItem.isUploading = false;
          } else {
            // 处理上传失败的逻辑
            fileItem.isError = true;
          }
        });

        xhr.addEventListener('error', () => {
          fileItem.isError = true;
        });

        // 指定服务器端的上传地址，并确保CORS配置
        xhr.open('POST', 'https://your-server-upload-url.com'); // 替换为实际的上传地址
        xhr.send(formData);

        fileItem.isNeedUpload = false;
      });
    },
    formatFileSize(size) {
      if (size === 0) return '0 Bytes';

      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(size) / Math.log(k));
      return `${parseFloat((size / k ** i).toFixed(2))} ${sizes[i]}`;
    },
  },
};
</script>

<style lang="less" scoped>
.upload-view {
  width: 800px;
  border: 1px solid #666;
  padding: 20px;

  .upload-button {
    border: 1px solid #f5f5f5;
    width: 80px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.file-input {
  display: none;
}
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
