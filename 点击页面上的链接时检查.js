const whiteList = [".aa.com", ".bb.com"];

document.addEventListener("click", function(event) {
    const target = event.target;

    // 检查点击的目标是否是链接
    if (target.tagName === "A" && target.href) {
        const link = target.href;

        // 检查链接是否在白名单中
        const isWhitelisted = whiteList.some(domain => link.includes(domain));

        if (!isWhitelisted) {
            // 阻止默认行为并在新页面打开链接
            event.preventDefault();
            window.open(link, '_blank');
        }
    }
});
