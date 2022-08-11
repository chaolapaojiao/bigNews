$(function() {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        // 密码长度
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格！'
        ],
        // 检测新旧密码是否相同
        newAndOld: function(value) {
            if (value == $('#oldPwd').val()) {
                layer.msg('新密码与旧密码不能相同！')
                return false
            }
        },
        // 检查两次输入的新密码是否相同
        pwdSame: function(value) {
            if (value != $('#newPwd').val()) {
                layer.msg('两次密码不一致！')
                return false
            }
        }
    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
            }
        })
    })
})