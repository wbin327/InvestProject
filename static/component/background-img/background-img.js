// 动态修改背景图片
function setBgImgWidthHeight(){
    let height = document.documentElement.clientHeight;
    let width = document.documentElement.clientWidth;
    $(".background-image img").css({
        "height": height,
        "width": width
    })
}
window.onresize = setBgImgWidthHeight
