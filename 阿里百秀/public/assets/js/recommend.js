$.ajax({
    type: 'get',
    url: 'posts/recommend',
    success: function(res) {
        var temp = `
        {{each data}}
        <li>
        <a href="javascript:;">
            <img src="{{$value.thumbnail}}" alt="">
            <span>{{$value.title}}</span>
        </a>
    </li>
        {{/each}}
        `
        var str = template.render(temp, { data: res })
        $('#recommendBox').html(str)
    }
})
var arr = []

function render(data) {
    var html = template('sTpl', {
        res: data
    })
    $('tbody').html(html)
}

function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&')
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=')
        console.log(tmp);

        if (tmp[0] == name) {
            return tmp[1]
        }
    }
    return -1
}