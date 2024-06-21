import React, { useState, useEffect } from "react";

const DebouncedEffectComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // 自定义防抖函数
  const debounce = (func, delay) => {
    let timer = null;

    const debouncedFunction = (...args) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };

    // 清理函数以取消未执行的防抖调用
    const cancel = () => {
      if (timer) {
        clearTimeout(timer);
      }
    };

    return [debouncedFunction, cancel];
  };

  const [debouncedSearch, cancelDebouncedSearch] = debounce((term) => {
    console.log("Searching for:", term);
    // 在这里执行实际的搜索操作，例如发送 API 请求
  }, 500);

  useEffect(() => {
    if(!searchTerm) {
      return;
    }
    debouncedSearch(searchTerm);

    // 清理函数以取消未执行的防抖调用
    return () => {
      cancelDebouncedSearch();
    };
  }, [searchTerm, debouncedSearch, cancelDebouncedSearch]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search..."
      />
    </div>
  );
};

export default DebouncedEffectComponent;
