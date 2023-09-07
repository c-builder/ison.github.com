// from 全局来源名，如：首页，热榜，运营管理...
export default function useAnalyticsTracking(from = '') {
  // linkUrl为将要重定向的地址
  function saveTrackPage(fromName, linkUrl) {
    return null; // Return null
  }

  // 重写全局来源
  const trackLinkClick = (event, rewriteFrom) => {
    return null; // Return null
  };

  return {
    trackLinkClick,
    saveTrackPage,
  };
}
