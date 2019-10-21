$('#addCategory').on('submit', function() {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function() {
            location.reload()
                // console.log(res);
                // 
        }
    })
    return false
})
$.ajax({
        type: 'get',
        url: '/categories',
        success: function(res) {
            var html = template('categoryListTpl', { data: res })
            $('#categoryBox').html(html)
        }
    })
    //为编辑按钮添加事件
$('#categoryBox').on('click', '.edit', function() {
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function(res) {
            var html = template('modifyCategoryTpl', res)
            $('#formBox').html(html)
        }
    })
})
$('#formBox').on('submit', '#modifyCategory', function() {
    var formData = $(this).serialize()
    var id = $(this).attr('data-id')
    $.ajax({
            type: 'put',
            url: '/categories/' + id,
            data: formData,
            success: function() {
                location.reload()
            }
        })
        // 阻止表单的默认提交行为
    return false;
})
$('#categoryBox').on('click', '.delete', function() {
    if (confirm('确认删除？')) {
        var id = $(this).attr('data-id')

        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function() {
                location.reload()
            }
        })
    }
})