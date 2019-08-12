image_list = [
    `${baseUrl}/static/images/details-page-images/1-phone.png`,
    `${baseUrl}/static/images/details-page-images/2-phone.png`,
    `${baseUrl}/static/images/details-page-images/3-phone.png`,
    `${baseUrl}/static/images/details-page-images/4-phone.png`,
]

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
    setBgImgWidthHeight();
    setImg();
})

// 选择图片进行加载
function setImg(){
    let index = getUrlPara("index");
    $(".content-box").empty();
    let attr = `<img src='${image_list[index]}'>`;
    $(".content-box").append(attr);
}

$(".return-ico").click(function () {
    let url = `${baseUrl}/index-phone.html`;
    window.location.href = url;
})
