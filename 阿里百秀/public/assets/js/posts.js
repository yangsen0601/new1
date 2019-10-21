$.ajax({
    type: 'get',
    url: '/posts',
    success: function(res) {
        // console.log(res);
        var html = template('postsTpl', res)
        $('#postsBox').html(html)
        var page = template('pageTpl', res)
        $('#page').html(page)
    }
})

function formateDate(date) {
    date = new Date(date)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function(res) {
            var html = template('postsTpl', res)
            $('#postsBox').html(html)
            var page = template('pageTpl', res)
            $('#page').html(page)
        }
    })
}
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        var html = template('categoryTpl', { data: res })
        $('#categoryBox').html(html)
    }
})
$('#filterForm').on('submit', function() {
    var formData = $(this).serialize()
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function(res) {
            var html = template('postsTpl', res)
            $('#postsBox').html(html)
            var page = template('pageTpl', res)
            $('#page').html(page)
        }
    })
    return false
})
$('#postsBox').on('click', '.delete', function() {
    if (confirm('确定删除？')) {
        var id = $(this).attr('data-id')
        $.ajax({
            url: '/posts/' + id,
            type: 'delete',
            success: function() {
                location.reload()
            }
        })
    }
})