function debounce(func, wait = 300, immediate = false) {
  let timeout;
  
  return function(...args) {
    const context = this;

    if (immediate && !timeout) {
      func.apply(context, args);  // 立即执行一次
    }

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (!immediate) {
        func.apply(context, args);  // 等待时间后执行
      }
    }, wait);
  };
}

-------------------------------------------------------------------

const myFunction = () => {
  console.log("Function executed!");
};

const debouncedFunction = debounce(myFunction, 500, true);

// 用户输入时会调用 debouncedFunction
debouncedFunction();
debouncedFunction();
debouncedFunction();
