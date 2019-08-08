
let header_html =
    '    <img src="{baseUrl}/static/component/header/images/return-ico.png">\n' +
    '    <div class="title">\n' +
    '        浏阳（长沙东）碧桂园高尔夫花园方案\n' +
    '    </div>\n' +
    '    <div class="subtitle">\n' +
    '        {subTitle}\n' +
    '    </div>'

// 页面渲染
let pageData = JSON.parse(sessionStorage.getItem('user_data'))
let typeIndex = parseInt(getUrlPara("typeIndex"));
let subTitle = pageData.types[typeIndex].nodeName
render()
function render(){
    header_html = header_html.format({'baseUrl': baseUrl, 'subTitle': subTitle});
    $("header").html(header_html);
    // header样式
    $("head").append("<link>");
    css = $("head").children(":last");
    css.attr({
        rel: "stylesheet",
        type: "text/css",
        // href: "/static/component/right-sidebar/css/right-sidebar.css",
        href: "{baseUrl}/static/component/header/css/header.css".format({'baseUrl': baseUrl}),
    });
}

// 格式化字符串
String.prototype.format = function(args) {
    let result = this;
    if (arguments.length < 1) {
        return result;
    }
    let data = arguments;
    if (arguments.length == 1 && typeof (args) == "object") {
        data = args;
    }
    for (let key in data) {
        let value = data[key];
        if (undefined != value) {
            // result = result.replace("{" + key + "}", value);
            // 替换字符串中匹配到的所有字符
            result = result.replace(new RegExp("{" + key + "}", 'g'), value);
        }
    }
    return result;
}

// 点击返回按钮
$("header img").click(function () {
    let projectId = getUrlPara('projectId');
    //获取当前窗口的路径
    let pathname = window.location.pathname;
    let i;
    for(i=0; i<linkTree.length; i++){
        if(pathname === linkTree[i]){
            break;
        }
    }
    switch (i) {
        case 1:
            window.location.href = `${linkTree[0]}?projectId=${projectId}`
            break;
        case 2:
            window.location.href = `${linkTree[1]}?typeIndex=${typeIndex}&projectId=${projectId}`
            break;
    }
})
