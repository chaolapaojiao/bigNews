$(function() {
    $('.goReg').on('click', function() {
        $('#log').hide();
        $('#res').show();
    });
    $('.goLogin').on('click', function() {
            $('#res').hide();
            $('#log').show();
        })
        // 从layui获取form对象
    var form = layui.form
    var layer = layui.layer

    // 通过 form.verify()函数定义校验规则
    form.verify({
        // 自定义一个叫做 pwd 的校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('#firstpassword').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 注册提交信息
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#firstpassword').val()
        }
        console.log(data)
        $.post('/api/reguser',
            data,
            function(res) {
                if (res.status !== 0) {
                    z
                    return layer.msg(res.message)
                }
                layer.msg('注册成功 请登录')
                    // 注册成功后模拟个人点击行为
                $('.goLogin').click()
            })
    })

    // 登录
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            // 快速获取表单数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功')
                    // 将登录成功后得到的 token 保存到localStorage中
                localStorage.setItem('token', res.token)
                localStorage.href = './index.html'
            }
        })
    })
})