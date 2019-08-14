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
    debugger
    wechatShare()
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

// 微信分享
function wechatShare(){
    const wx = window['wx']
    const url = location.href.split('#')[0];
    // $.get("127.0.0.1:5000/getWeChatToken?url=" + encodeURIComponent(url), function (res) {
    //     console.log(res)
    //     debugger
    //     if(res.code === 200){
    //         wx.config({
    //             debug: true,
    //             appId: res.data.appId, // 必填，公众号的唯一标识
    //             timestamp: res.data.timestamp, // 必填，生成签名的时间戳
    //             nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
    //             signature: res.data.signature, // 必填，签名
    //             jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', 'onMenuShareWeibo'] // 必填，需要使用的JS接口列表
    //         });
    //
    //         wx.ready(function () {
    //             const title = '宏易资本集团';
    //             const desc = '宏易资本集团';
    //             const imgUrl = `${baseUrl}/static/images/share.png`;
    //
    //             // 分享给好友
    //             wx.updateAppMessageShareData({
    //                 title: title, // 分享标题
    //                 desc: desc, // 分享描述
    //                 link: location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //                 imgUrl: imgUrl, // 分享图标
    //                 success: function () {
    //                     // 设置成功
    //                     console.log("分享给好友成功")
    //                 }
    //             })
    //             // 分享到朋友圈
    //             wx.updateTimelineShareData({
    //                 title: title, // 分享标题
    //                 desc: desc,
    //                 link: location.href.split('#')[0],
    //                 imgUrl: imgUrl, // 分享图标
    //                 success: function () {
    //                     // 设置成功
    //                     console.log("分享到朋友圈成功")
    //                 }
    //             })
    //         })
    //     }
    // })
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:5000/getWeChatToken?url=" + encodeURIComponent(url),
        dataType: "json",
        success: function (res) {
            if(res.code === 200){
                wx.config({
                    debug: true,
                    appId: res.data.appId, // 必填，公众号的唯一标识
                    timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                    signature: res.data.signature, // 必填，签名
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', 'onMenuShareWeibo'] // 必填，需要使用的JS接口列表
                });

                wx.ready(function () {
                    const title = '宏易资本集团';
                    const desc = '宏易资本集团';
                    const imgUrl = `${baseUrl}/static/images/share.png`;

                    // 分享给好友
                    wx.updateAppMessageShareData({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            // 设置成功
                            console.log("分享给好友成功")
                        }
                    })
                    // 分享到朋友圈
                    wx.updateTimelineShareData({
                        title: title, // 分享标题
                        desc: desc,
                        link: location.href.split('#')[0],
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            // 设置成功
                            console.log("分享到朋友圈成功")
                        }
                    })
                })
            }
        },
        error: function (error) {
            console.log(error)
        }
    })
}
