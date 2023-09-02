function throttle(func, wait) {
  let timer = null; // 定时器变量，用于延迟执行函数
  let lastArgs = null; // 最后一次函数执行时的参数
  let lastThis = null; // 最后一次函数执行时的上下文
  let leading = false; // 控制第一次是否立即执行

  function invokeFunc() {
    // 执行函数，并重置相关状态
    func.apply(lastThis, lastArgs);
    lastThis = null;
    lastArgs = null;
    timer = null;
  }
  return (...args) => {
    if (!timer) {
      if (leading) {
        // 如果是第一次执行，立即执行函数
        func.apply(this, args);
        leading = false;
      } else {
        // 否则，记录参数和上下文，并设置定时器延迟执行
        lastArgs = args;
        lastThis = this;
        timer = setTimeout(invokeFunc, wait);
      }
    }
  };
}
export default throttle;
