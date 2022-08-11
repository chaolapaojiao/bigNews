// 每次调用get或者post时会先调用这个函数
$.ajaxPrefilter(function(option) {
    // 在发起 Ajax 请求之前，统一拼接请求路径
    option.url = 'http://www.liulongbin.top:3007' + option.url

    // 统一为有权限接口，添加headers请求头
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局统一挂载 complete 函数
    option.compelet = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            console.log(1);
            // 1.清空 token 
            localStorage.removeItem('token')
                // 2.跳转回登录页面
            location.href = './login.html'
        }
    }
})