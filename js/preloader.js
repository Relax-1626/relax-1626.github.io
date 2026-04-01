document.addEventListener('DOMContentLoaded', function() {
  const preloader = document.getElementById('preloader');
  // 如果预加载元素不存在，则退出
  if (!preloader) return;

  // 检查是否已经访问过
  if (localStorage.getItem('hasVisited')) {
    // 已经访问过，直接隐藏预加载层并恢复滚动
    preloader.style.display = 'none';
    document.body.classList.add('loaded');
    return;
  }

  // 首次访问，播放动画
  const lines = [
    "> Initializing blog system...",
    "> Loading modules...",
    "> Connecting to database...",
    "> Rendering themes...",
    "> Welcome to my blog!",
    "> Enjoy your stay."
  ];
  
  let index = 0;
  const terminalBody = document.querySelector('.terminal-body');
  if (terminalBody) {
    terminalBody.innerHTML = ''; // 清空占位
    
    function addLine() {
      if (index < lines.length) {
        const p = document.createElement('p');
        p.textContent = lines[index];
        terminalBody.appendChild(p);
        index++;
        // 滚动到底部
        terminalBody.scrollTop = terminalBody.scrollHeight;
        setTimeout(addLine, 400); // 每行间隔0.4秒
      } else {
        // 动画完成，标记已访问，淡出并隐藏预加载层
        localStorage.setItem('hasVisited', 'true');
        setTimeout(() => {
          preloader.style.opacity = '0';
          setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.add('loaded');
          }, 500);
        }, 600);
      }
    }
    
    addLine();
  } else {
    // 如果没有找到terminal-body，直接隐藏并标记（防止出错）
    localStorage.setItem('hasVisited', 'true');
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
      document.body.classList.add('loaded');
    }, 500);
  }
});