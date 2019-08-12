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

$("document").ready(function () {
    isPhone();
    setBgImgWidthHeight();
})

// 判断是否需要跳转到手机端页面
function isPhone() {
    if(isPC()){
        let url = `${baseUrl}/index.html`;
        window.location.href = url;
    }
}

$(".content-group").click(function () {
    let index = parseInt(this.getAttribute("index"));
    let url = `${baseUrl}/details-page-phone.html?index=${index}`;
    window.location.href = url;
})
