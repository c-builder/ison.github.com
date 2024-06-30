let typingTimer; // 用来保存定时器
const doneTypingInterval = 1000; // 等待时间（毫秒）
let lastRequestController; // 保存上一个请求的控制器

const inputElement = document.getElementById('inputBox'); // 获取输入框元素

inputElement.addEventListener('input', () => {
    clearTimeout(typingTimer); // 清除之前的定时器
    typingTimer = setTimeout(doneTyping, doneTypingInterval); // 设置新的定时器
});

function doneTyping() {
    const inputValue = inputElement.value; // 获取输入框的当前值

    // 如果有正在进行的请求，则取消它
    if (lastRequestController) {
        lastRequestController.abort();
    }

    // 创建新的控制器
    lastRequestController = new AbortController();
    const signal = lastRequestController.signal;

    // 发起新的异步请求
    fetch(`your-api-endpoint?query=${encodeURIComponent(inputValue)}`, { signal })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // 处理请求响应
            console.log('Response:', data);
        })
        .catch(error => {
            if (error.name === 'AbortError') {
                console.log('Fetch aborted');
            } else {
                console.error('Fetch error:', error);
            }
        });
}
