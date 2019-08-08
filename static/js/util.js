// 获取请求连接中携带的参数
function getUrlPara(paraName){
    let url = document.location.toString();
    let arrObj = url.split("?");
    if(arrObj.length > 1){
        let arr_list = arrObj[1].split("&");
        let arr;
        for(let i=0; i<arr_list.length; i++){
            arr = arr_list[i].split("=");
            if(arr != null && arr[0] == paraName){
                // 这里得进行URI解码，否则输出的是URI编码后的中文
                return decodeURI(arr[1]);
            }
        }
    }
    else{
        return "";
    }
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

//全屏
function fullScreen(){
    let el = document.documentElement;
    let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
    if(typeof rfs != "undefined" && rfs) {
        rfs.call(el);
    };
    return;
}
//退出全屏
function exitScreen(){
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
    else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
    else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    if(typeof cfs != "undefined" && cfs) {
        cfs.call(el);
    }
}
