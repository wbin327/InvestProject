// debugger
let image_list = [];
// let subTitle = getUrlPara('subTitle');
let typeIndex = parseInt(getUrlPara('typeIndex'));
let image_index = parseInt(getUrlPara('image_index'));
if(image_index == null){
    image_index = 0;
}
render_page();

// 修改页面内容
function render_page() {
    // 添加背景图片
    if('background_image' in data){
        let backgroundImg = `<img src="${data.details_page_background}">`
        $(".background-image").append(backgroundImg);
    }
    // 设置图片数据集合
    image_list = JSON.parse(sessionStorage.getItem("image_list"))[typeIndex]
    // 页面显示相应的图片
    edit_image();
    // 是否需要隐藏按钮
    show_or_hide_button();
    // console.log(image_list);
}
function edit_image(){
    $(".image-box img").attr('src', image_list[image_index]);
    $(".black-screen .main-img").attr('src', image_list[image_index]);
}
function deal_image_index(){
    if(image_index > image_list.length-1){
        image_index = image_list.length-1;
    }
    if(image_index < 0){
        image_index = 0;
    }
}
function show_or_hide_button(){
    if(image_list.length == 1){
        $(".right-button").hide();
        $(".left-button").hide();
        return
    }
    if(image_index >= image_list.length-1){
        $(".right-button").hide();
    }
    else if(image_index <= 0){
        $(".left-button").hide();
    }else{
        $(".right-button").show();
        $(".left-button").show();
    }
}

// 左右按钮
function changeImg(index){
    deal_image_index();
    show_or_hide_button();
    $(".image-box img").attr('src', image_list[index]);
    $(".black-screen .main-img").attr('src', image_list[index]);
}
$(".left-button").click(function () {
    image_index--;
    // console.log(image_index);
    changeImg(image_index);
})
$(".right-button").click(function () {
    image_index++;
    changeImg(image_index);
})

// 将右方导航栏下移
$(document).ready(function () {
    $(".right-sidebar-ico img").css({'top': '0.645rem'});
})

// 返回按钮
$(".return-ico").click(function () {
    let projectId = getUrlPara('projectId');
    window.location.href =  projectId ? `${linkTree[0]}?projectId=${projectId}` : `${linkTree[0]}`
})
