// hooks/useAnalyticsTracking.js

// from 全局来源名，如：首页，热榜，运营管理...
export default function useAnalyticsTracking(from = '') {
  // linkUrl为将要重定向的地址
  function saveTrackPage(fromName, linkUrl) {
    // 通过linkUrl来判断是否符合跳转条件
    
    // 正则表达式匹配
    const regex = /\/next\/#\/detail\?|\/next\/detail\/#\//;
    
    // 检查是否匹配任何一个部分或包含特定字符串
    const isMatch = regex.test(linkUrl) || linkUrl.includes("/xsapi/user/v1/posts/redirect?uuid=");
    
    // 输出结果
    console.log(`URL ${isMatch ? '包含' : '不包含'} '/next/#/detail?'、'/next/detail/#/' 或 '/xsapi/user/v1/posts/redirect?uuid='`);

    if (isMatch && fromName) {
      window.localStorage.setItem('previousTrackPage', fromName);
    }
  }

  // 重写全局来源
  const trackLinkClick = (event, rewriteFrom) => {
    if (event && event.target && event.target.tagName === 'A') {
      // console.log('点击了链接，执行埋码统计：', event.target.textContent);
      saveTrackPage(rewriteFrom || from, event.target.getAttribute('href'));
    }
  };

  return {
    trackLinkClick,
    saveTrackPage,
  };
}
