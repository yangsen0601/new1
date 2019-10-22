var arr = []

function render(data) {
    var html = template('sTpl', {
        res: data
    })
    $('tbody').html(html)
}
$('#userForm').on('submit', function() {
        var formData = $(this).serialize()
        $.ajax({
                type: 'post',
                url: '/users',
                data: formData,
                success: function() {
                    // location.reload()
                    render()
                },
                error: function() {
                    alert('添加失败')
                }
            })
            // 阻止表单的默认提交行为
        return false;
    })
    // 当用户选择文件的时候
$('#modifyBox').on('change', '#avatar', function() {
    var form = new FormData()
    form.append('avatar', this.files[0])
    $.ajax({
        url: '/upload',
        type: 'post',
        data: form,
        processData: false,
        contentType: false,
        success: function(res) {
            $('#preview').attr('src', res[0].avatar);
            $('#hiddenAvatar').val(res[0].avatar)
        }
    })
})
$.ajax({
    type: 'get',
    url: '/users',
    success: function(res) {
        var html = template('userTpl', { data: res })
        $('#userBox').html(html)
    }
})
$('#userBox').on('click', '.edit', function() {
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function(res) {
            var html = template('modifyTpl', res)
            $('#modifyBox').html(html)
        }
    })

})
$('#modifyBox').on('submit', '#modifyForm', function() {
    var formData = $(this).serialize()
    console.log(formData);

    var id = $(this).attr('data-id')

    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function(res) {
            // location.reload()
            render()
        }
    })
})
$('#userBox').on('click', '.delete', function() {
    if (confirm('确认删除？')) {
        // 获取到即将要删除的用户id
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function() {
                // location.reload()
                render()
            }
        })
    }
})
var selectAll = $('#selectAll')
var deleteMany = $('#deleteMany')

selectAll.on('change', function() {
    var status = $(this).prop('checked')
    if (status) {
        deleteMany.show()
    } else {
        deleteMany.hide()
    }
    $('#userBox').find('input').prop('checked', status)
})
$('#userBox').on('click', '.userStatus', function() {
    var inputs = $('#userBox').find('input')
    if (inputs.length == inputs.filter(':checked').length) {
        selectAll.prop('checked', true)
    } else {
        selectAll.prop('checked', false)

    }
    if (inputs.filter(':checked').length > 0) {
        deleteMany.show()
    } else {
        deleteMany.hide()
    }
})
deleteMany.on('click', function() {
    var ids = []
    var checkedUser = $('#userBox').find('input').filter(':checked')
    checkedUser.each(function(index, element) {
        ids.push($(element).attr('data-id'))
    })
    if (confirm('确认要批量删除？')) {
        // 获取到即将要删除的用户id
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/users/' + ids.join('-'),
            success: function() {
                // location.reload()
                render()
            }
        })
    }
})