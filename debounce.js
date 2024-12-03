function debounce(func, wait = 300, immediate = false) {
  let timeout;
  let calledImmediately = false;

  return function(...args) {
    const context = this;
    let result;

    // 首次调用时立即执行
    if (immediate && !calledImmediately) {
      result = func.apply(context, args);  // 执行函数并保存结果
      calledImmediately = true;
    }

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      result = func.apply(context, args);  // 等待时间后执行并保存结果
    }, wait);

    return result;  // 返回函数的执行结果
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
