import React, { useState, useCallback, useEffect } from 'react';
import _ from 'lodash';

const SearchComponent = () => {
  const [query, setQuery] = useState('');

  // 使用 useCallback 来创建一个稳定的防抖函数
  const debouncedSearch = useCallback(
    _.debounce((query) => {
      // 这里放你的搜索逻辑，例如调用 API
      console.log('搜索查询:', query);
    }, 500),
    []
  );

  const handleChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  // 使用 useEffect 在组件卸载时取消防抖函数
  useEffect(() => {
    // 返回一个清理函数，用于取消防抖事件
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="输入搜索关键词..."
      />
    </div>
  );
};

export default SearchComponent;
