// 获取当前 URL
const currentUrl = window.location.href;

// 使用正则表达式匹配 ? 后面的内容
const regex = /\?(.*)$/;
const match = currentUrl.match(regex);

// 如果匹配成功，输出结果
if (match && match[1]) {
  const queryString = match[1];
  console.log(queryString);
} else {
  console.log('没有查询参数');
}


================================================

// 获取当前 URL
const currentUrl = window.location.href;

// 创建 URL 对象
const url = new URL(currentUrl);

// 获取查询参数
const queryParams = url.searchParams;

// 将查询参数转换为一个对象
const params = {};
queryParams.forEach((value, key) => {
  params[key] = value;
});

// 输出结果
console.log(params);
============================================

// 获取当前 URL
const currentUrl = window.location.href;

// 创建 URL 对象
const url = new URL(currentUrl);

// 获取查询参数
const queryString = url.search; // 包含 '?' 和参数
const params = url.searchParams;

// 输出查询字符串
console.log(queryString);

// 将查询参数转换为对象
const paramsObject = {};
params.forEach((value, key) => {
  paramsObject[key] = value;
});

// 输出参数对象
console.log(paramsObject);
