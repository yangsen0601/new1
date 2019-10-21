$.ajax({
    url: '/categories',
    type: 'get',
    success: function(res) {
        var html = template('categoryTpl', { data: res })
        $('#category').html(html)
    }
})
$('#feature').on('change', function() {
    var form = new FormData()
    form.append('cover', this.files[0])
    console.log(form);

    $.ajax({
        url: '/upload',
        type: 'post',
        data: form,
        processData: false,
        contentType: false,
        success: function(res) {
            $('#thumbnail').val(res[0].cover)
        }
    })
})
$('#addForm').on('submit', function() {
    var formData = $(this).serialize()
        // alert(formData)
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function() {
            location.href = '/admin/posts.html'
        }
    })
    return false
})



// 文章修改
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&')
        // console.log(paramsAry);

    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=')
        if (tmp[0] == name) {
            return tmp[1]
        }
    }
    return -1
}
var id = getUrlParams('id')
if (id != -1) {
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function(res) {
            console.log(res.category);
            console.log(res);
            console.log(res.createAt.substr(0, 16));

            $('#pAdd').hide()
            $('#pEdit').show()
            $('h1').text('修改文章')
            $('#title').val(res.title)
            $('#content').val(res.content)
            $('#prev').attr('src', res.thumbnail).show()
            $('#img').val(res.thumbnail)
            $('#category > option').each(function(value, item) {
                console.log(item);
                if ($(item).val() == res.category) {
                    $(item).prop('selected', true)
                }
            })
            $('#status > option').each(function(value, item) {

                if ($(item).attr('value') == res.state) {
                    $(item).prop('selected', true)
                }
            })
            $('#created').val(res.createAt.substr(0, 16))
        }
    })
}
$('#pEdit').on('submit', function() {
        var formData = $(this).serialize()
            // alert(formData)
        $.ajax({
            type: 'put',
            url: '/posts/' + id,
            data: formData,
            success: function() {
                location.href = '/admin/posts.html'
            }
        })
        return false
    })
    // var id = getUrlParams('id')
    // if (id != -1) {
    //     $.ajax({
    //         type: 'get',
    //         url: '/posts/' + id,
    //         success: function(res) {
    //             $.ajax({
    //                 url: '/categories',
    //                 type: 'get',
    //                 success: function(categories) {
    //                     res.categories = categories
    //                     console.log(res);

//                     var html = template('modifyTpl', res)
//                     $('#parentBox').html(html)
//                 }
//             })
//         }
//     })
// }

// // $('#parentBox').on('submit', '#modifyForm', function() {
// //     var formData = $(this).serialize()
// //     var id = $(this).attr('data-id')
// //     $.ajax({
// //         type: 'put',
// //         url: '/posts/' + id,
// //         data: formData,
// //         success: function() {
// //             location.href = '/admin/posts.html'
// //         }
// //     })
// //     return false

// // })