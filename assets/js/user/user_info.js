$(function() {
    var layer = layui.layer
    var form = layui.form
        // 用户名规则
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return layer.msg('昵称长度为1~6个字符')
            }
        }
    })

    initUserInfo()
        // 获取用户基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('获取用户信息失败')
                }
                // 调用form.val()快速为表单赋值
                form.val('formUserInfor', res.data)
            }
        })
    }

    // 重置表单信息
    $('#btnReset').on('click', function(e) {
        // 阻止表单默认重置行为
        e.preventDefault()
        initUserInfo()
    })

    // 提价表单信息
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                    // 调用父页面中的方法，重新渲染用户的头像
                window.parent.getUserInfo()
            }
        })
    })
})