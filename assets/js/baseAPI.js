// 每次调用get或者post时会先调用这个函数
$.ajaxPrefilter(function(option) {
    console.log(option.url);
    // 在发起 Ajax 请求之前，统一拼接请求路径
    option.url = 'http://www.liulongbin.top:3007' + option.url
})