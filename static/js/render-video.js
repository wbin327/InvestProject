let player = videojs("video-play", options);;
$("#video-ico").click(function () {
    $("#video-group").show();
});
$("#video-close").click(function () {
    player.pause();
    $("#video-group").hide();
})
