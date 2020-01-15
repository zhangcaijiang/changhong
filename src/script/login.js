! function ($) {
    $('.login').on('click', function () {
        console
        $.ajax({
            type: 'post',
            url: 'http://10.31.152.12/changhong/php/login.php',
            data: {
                user: $('.username').val(),
                pass: hex_sha1($('.password').val())
            }
        }).done(function (result) {
            if (result) { //匹配成功
                location.href = 'index1.html';
                localStorage.setItem('username', $('.username').val());
            } else { //匹配失败
                $('.password').val('');
                alert('用户名或者密码错误');
            }
        });
    });
}(jQuery)