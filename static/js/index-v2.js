let user_data =
    `
{
    "company_logo": "{baseUrl}/static/images/index-images/company-logo.png",
    "project_introduction": "{baseUrl}/static/images/index-images/project-msg.png",
    "footer_image": "{baseUrl}/static/images/index-images/footer-image.png",
    "background_image": "{baseUrl}/static/images/index-images/background.png",
    "details_page_background": "{baseUrl}/static/images/details-page-images/background.png",
    "types": [
        {
            "nodeName": "深圳市中科宏易创业投资管理有限公司",
            "link": "{baseUrl}/list-page-v2/list-page-v2.html?typeIndex=0",
            "iconPath": "./static/images/index-images/ico1.png",
            "imagesPath": ["./static/images/details-page-images/1.png"]
        },
        {
            "nodeName": "深圳市本源晶鸿基金管理有限公司",
            "link": "{baseUrl}/list-page-v2/list-page-v2.html?typeIndex=1",
            "iconPath": "./static/images/index-images/ico1.png",
            "imagesPath": ["./static/images/details-page-images/2.png"]
        },
        {
            "nodeName": "集团资质",
            "link": "{baseUrl}/list-page-v2/list-page-v2.html?typeIndex=2",
            "iconPath": "./static/images/index-images/ico2.png",
            "imagesPath": ["./static/images/details-page-images/3.png"]
        },
        {
            "nodeName": "集团投资项目",
            "link": "{baseUrl}/list-page-v2/list-page-v2.html?typeIndex=3",
            "iconPath": "./static/images/index-images/ico3.png",
            "imagesPath": ["./static/images/details-page-images/4.png"]
        }
    ]
}
    `

// 页面加载时执行的方法
$("document").ready(function () {
    // 判断是否需要跳转到手机端
    isPhone();
    let data = getSetData();
    data = JSON.parse(data);
    render_main(data);
    render_footer(data);
    render_video(data);
    // 加载侧边栏JS渲染页面，解决数据没有请求成功，就加载侧边栏的情况，导致无法正常加载侧边栏
    $.getScript(`${baseUrl}/static/component/right-sidebar-v2/right-sidebar-v2.js`)
})
// 判断是否需要跳转到手机端页面
function isPhone() {
    if(!isPC()){
        let url = `${baseUrl}/index-phone.html`;
        window.location.href = url;
    }
}
// 每次打开首页时，向后台发送请求，获取用户的数据并保存到浏览器本地数据中，以供列表页和详情页使用
function getSetData(){
    let projectId = getUrlPara('projectId');
    let data = null;
    if(projectId){
        $.ajax({
            type:"GET",
            url: `${requestUrl}/v1/project/pageJsonData?projectId=${projectId}`,
            async:false,
            dataType: "json",
            success: function (res) {
                if(res.code === 200){
                    // console.log(res.data);
                    // 为每一个type构造link连接，后端返回的数据中并没有该参数，需要前端构建
                    data = constructionLink(res.data, projectId);
                }else{
                    // console.log(res);
                    alert(res.msg);
                }
            },
            error:function (error) {
                alert("发生错误:" + error);
            }
        })
    }else{
        data = user_data.format({'baseUrl': baseUrl});
        data = constructionLink(data);
    }
    // 保存数据到sessionStorage中,key-value形式
    sessionStorage.setItem("user_data", data);
    return data;
}

// 为后端返回json数据中的types属性构造link连接，后端返回的数据中并没有该参数，需要前端构建
function constructionLink(jsonStr, projectId) {
    let imageList = [];
    let jsonData = JSON.parse(jsonStr);
    for(let i=0; i<jsonData.types.length; i++){
        let typeImageList = [];
        // 将所有图片放入imageList集合中
        if('imagesPath' in jsonData.types[i]){
            // 顶级类别的链接，格式如下"link": "{baseUrl}/details-page/details-page-v2.html?typeIndex=设计成果&image_index=0&projectId",
            if(projectId){
                jsonData.types[i]['link'] = `${baseUrl}/details-page.html?typeIndex=${i}&projectId=${projectId}&image_index=0`
            }else{
                jsonData.types[i]['link'] = `${baseUrl}/details-page.html?typeIndex=${i}&image_index=0`
            }
            for(let j=0; j<jsonData.types[i].imagesPath.length; j++){
                typeImageList.push(jsonData.types[i].imagesPath[j]);
            }
        }
        imageList.push(typeImageList);
    }
    sessionStorage.setItem("image_list", JSON.stringify(imageList));
    return JSON.stringify(jsonData);
}
// 渲染页面主体内容
function render_main(data) {
    // 添加logo
    if('company_logo' in data){
        let img = `<img src="${data.company_logo}">`;
        $(".company-logo").append(img);
    }
    // 添加项目信息
    if('project_introduction' in data){
        let projectMsg = `<img src="${data.project_introduction}">`
        $(".project-msg").append(projectMsg)
    }
    // 添加背景图片
    if('background_image' in data){
        let backgroundImg = `<img src="${data.background_image}">`
        $(".background-image").append(backgroundImg);
    }
    // 引入背景图片随浏览器窗口缩放的JS
    $.getScript(`${baseUrl}/static/component/background-img/background-img.js`)
}
// 渲染底部导航栏
function render_footer(data){
    // 渲染页面
    let footer_html = doT.template($("#footer-script").html())(data);
    //console.log(footer_html);
    $("body").append(footer_html);
    // 为底部导航栏计算宽度
    let width = 100/data.types.length + '%';
    $(".footer-navigation-content a").css({'width': width});
}
// 渲染video
function render_video(data){
    // 渲染页面
    if('video' in data){
        let video_html = doT.template($("#video-script").html())(data);
        $("body").append(video_html);
        // 必须先将元素添加到body中再执行以下js,否则会无法渲染video
        $.getScript(`${baseUrl}/static/js/render-video.js`)
    }
}

// 视频播放相关JS
let options = {
    autoplay: false,
    controls: true,
    loop: true,
    preload: 'auto',
    height: 360,
    width: 639,
};


