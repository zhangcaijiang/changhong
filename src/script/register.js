
        // ! function ($) {
        //     let $user = $('input[name="username"]');
        //     let $userflag = true;

        //     $user.on('blur', function () {
        //         $.ajax({
        //             type: 'post',
        //             url: 'http://10.31.152.12/changhong/php/register.php',
        //             data: {
        //                 username: $user.val()
        //             }
        //         }).done(function (result) {
        //             console.log(result)
        //             if (!result) { //不存在
        //                 $('.span').html('√').css('color', 'green');
        //                 $userflag = true;
        //             } else {
        //                 $('.span').html('改用户名已经存在').css('color', 'red');
        //                 $userflag = false;
        //             }
        //         });
        //     });
        //     $('form').on('submit', function () {
        //         if ($user.val() == '') {
        //             $('span').html('请输入用户名').css('color', 'red');
        //             $userflag = false;
        //         };
        //         if (!$userflag) {
        //             return false;
        //         }
        //     });


        // }(jQuery);

  class register{
      constructor(){

      }
      init(){
        let $user = $('input[name="username"]');
        let $userflag = true;

        $user.on('blur', function () {
            $.ajax({
                type: 'post',
                url: 'http://10.31.152.12/changhong/php/register.php',
                data: {
                    username: $user.val()
                }
            }).done(function (result) {
                console.log(result)
                if (!result) { //不存在
                    $('.span').html('√').css('color', 'green');
                    $userflag = true;
                } else {
                    $('.span').html('改用户名已经存在').css('color', 'red');
                    $userflag = false;
                }
            });
        });
        $('form').on('submit', function () {
            if ($user.val() == '') {
                $('span').html('请输入用户名').css('color', 'red');
                $userflag = false;
            };
            if (!$userflag) {
                return false;
            }
        });
      }
  }
      export{
        register 
      }
            