$(function() {
    // 调用getUserInfo获取用户基本信息
    getUserInfo()
    var layer = layui.layer

    // 点击退出按钮，用户退出登录事件
    $('#out').on('click', function() {
        layer.confirm('是否退出登录?', { icon: 3, title: '提示' }, function(index) {
            // 1.清除 locastorage 的token值
            localStorage.removeItem('token')
                // 2.跳转到登录界面
            location.href = './login.html'
        });
    })
})

// 获取用户信息的函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status != 0) {
                layer.msg('用户数据请求失败')
                return false
            }
            // 调用函数渲染头像
            renderAavatr(res.data)
        },

    })
}

// 渲染用户头像函数
function renderAavatr(user) {
    // 获取用户名称
    var name = user.nickname || user.username
        // 设置欢迎用户的文本
    $('#welcom').html('欢迎&nbsp' + name)
        // 按需渲染用户头像
    if (user.user_pic != null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.alp').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.alp').html(first).show()
    }
}