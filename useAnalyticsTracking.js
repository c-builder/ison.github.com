// hooks/useAnalyticsTracking.js

// from 全局来源名
export default function useAnalyticsTracking(from = '') {
  // linkUrl为将要重定向的地址
  function saveTrackPage(fromName, linkUrl) {
    // 通过linkUrl来判断是否符合跳转条件
    // console.log(linkUrl);
    if (fromName) {
      window.sessionStorage.setItem('previousTrackPage', fromName);
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