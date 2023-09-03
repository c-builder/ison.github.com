const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => ({
        ...options,
        compilerOptions: {
          // 将所有以 xs-vue- 开头的标签都视为自定义元素
          isCustomElement: (tag) => tag.startsWith('xs-vue-'),
        },
      }));
  },
});
