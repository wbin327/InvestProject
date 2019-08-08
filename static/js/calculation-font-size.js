// 根据屏幕宽度计算字体大小,这里的设计稿宽度为1920
function Rem() {
    var docEl = document.documentElement,
        oSize = docEl.clientWidth / 19.2;
    if (oSize > 100) {
        oSize = 100; // 限制rem值 1920 / 19.2 =100
    }
    docEl.style.fontSize = oSize + 'px';
}
window.addEventListener('resize', Rem, false);
Rem();