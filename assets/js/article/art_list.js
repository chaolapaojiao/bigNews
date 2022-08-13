$(function() {
    // 创建一个用于接受表单数据的对象

    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage;

    var p = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    renderTable()
    initCate()
        // 获取数据并渲染表格的函数
    function renderTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: p,
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderpage(res.tatal)
            }
        })
    }

    // 初始化文章分类
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                return layer.msg(res.message)
                var htmlStr = template('tpl-class',res)
                $('#all-class').html(htmlStr)
                form.render()
                }
        })
    }

    // 定义渲染分页的方法
    function renderpage(total) {
        laypage.render({
            elem: 'pageBox' //注意，这里的 test1 是 ID，不用加 # 号
            , count: 50, //数据总数，从服务端得到
            limit: 3,
            curr: 1,
            jump: function (onj, first) {
                q.pagenum = onj.curr
                if (!first) {
                    initTable()
                }
            }
        })
        
    }
    // 通过代理的形式，为删除按钮绑定点击事件处理函数
  $('tbody').on('click', '.btn-delete', function() {
    // 获取删除按钮的个数
    var len = $('.btn-delete').length
    console.log(len)
    // 获取到文章的 id
    var id = $(this).attr('data-id')
    // 询问用户是否要删除数据
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/delete/' + id,
        success: function(res) {
          if (res.status !== 0) {
            return layer.msg('删除文章失败！')
          }
          layer.msg('删除文章成功！')
          // 当数据删除完成后，需要判断当前这一页中，是否还有剩余的数据
          // 如果没有剩余的数据了,则让页码值 -1 之后,
          // 再重新调用 initTable 方法
          // 4
          if (len === 1) {
            // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了
            // 页码值最小必须是 1
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
          }
          initTable()
        }
      })

      layer.close(index)
    })
  })
})