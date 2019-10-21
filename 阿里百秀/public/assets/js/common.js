< script >
    $('#loginOut').on('click', function() {
        var isConfirm = confirm('是否要退出')
        if (isConfirm) {
            $.ajax({
                type: 'post',
                url: '/logout',
                success: function(res) {
                    location.href = 'login.html'

                }
            })
        }
    }) <
    /script>