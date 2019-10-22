$.ajax({
    type: 'get',
    url: 'posts/random',
    success: function(res) {
        var temp = `
        {{each data}}
        <li>
        <a href="javascript:;">
            <p class="title">{{$value.title}}</p>
            <p class="reading">{{$value.metaviews}}</p>
            <div class="pic">
                <img src="{{$value.thumbnail}}" alt="">
            </div>
        </a>
    </li>
        {{/each}}
        `

        var str = template.render(temp, { data: res })


        $('#publicBox').html(str)
    }
})
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {

        var navTpl =
            `{{each data}}
            <li>
				<a href="list.html?categoryId={{$value._id}}">
					<i class="fa {{$value.className}}"></i>{{$value.title}}
				</a>
			</li>
        {{/each}}`

        var html = template.render(navTpl, { data: res });
        // $('#navBox').html(html)
        // $('#topNavBox').html(html)
        $('.nav_item').html(html);
    }
})
var arr = []

function render(data) {
    var html = template('sTpl', {
        res: data
    })
    $('tbody').html(html)
}
$('.search form').on('submit', function() {
    // alert(1)
    var keys = $(this).find('.keys').val()
    location.href = '/search.html?key=' + keys
    return false;
})

function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&')
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=')
        if (tmp[0] == name) {
            return tmp[1]
        }
    }
    return -1
}