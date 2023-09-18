// 在组件中
mounted() {
  // 获取上次保存的滚动位置
  const savedScrollPosition = localStorage.getItem('scrollPosition');
  if (savedScrollPosition) {
    window.scrollTo(0, parseInt(savedScrollPosition, 10));
  }

  // 监听滚动事件，保存滚动位置
  window.addEventListener('scroll', this.saveScrollPosition);
},

beforeDestroy() {
  // 在组件销毁前移除滚动事件监听
  window.removeEventListener('scroll', this.saveScrollPosition);
},

methods: {
  saveScrollPosition() {
    // 保存当前滚动位置到localStorage
    localStorage.setItem('scrollPosition', window.scrollY.toString());
  }
}
window.scrollY
