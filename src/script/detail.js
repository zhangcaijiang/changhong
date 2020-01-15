;
(function ($) {
    class Details {
        constructor() {
            //接收sid
            this.sid = location.search.substring(1).split('=')[1];
            this.spic = $('#spic');
            this.bpic = $('#bpic');
            this.sf = $('#sf');
            this.bf = $('#bf');
            this.list = $('#list');
            this.list_ul = $('#list ul');
            this.count = $('#count');
        }

        init() {
            //将接收的sid传给后端。
            $.ajax({
                url: 'http://10.31.152.12/changhong/php/getsid.php',
                data: {
                    sid: this.sid
                },
                dataType: 'json'
            }).done((objdata) => {
                $('#spic img').attr('src', objdata.picurl);
                $('.loadtitle').html(objdata.title1);
                $('.loadpcp').html(objdata.price);
                $(' #bf img').attr('src', objdata.picurl)
                let piclist = objdata.urls.split(',');
                let $strhtml = '';
                $.each(piclist, function (index, value) {
                    $strhtml += `<li><img src="${value}" /></li>`;
                });

                this.list_ul.html($strhtml)

            });
            //执行添加购物车操作
            this.addcart();
        }
        //添加购物车操作
        addcart() {
            let goodsnum = []; //商品的数量
            let goodsid = []; //商品的编号
            //cartnum  cartsid:本地存储的key值
            function getcookie() {
                if (localStorage.getItem('cartnum') && localStorage.getItem('cartsid')) {
                    goodsnum = localStorage.getItem('cartnum').split(',');
                    goodsid = localStorage.getItem('cartsid').split(',');
                }
            }
            $('.p-btn a').on('click', () => {
                getcookie();
                if ($.inArray(this.sid, goodsid) === -1) { //第一次点击,将sid传入，取到数量直接传入
                    goodsid.push(this.sid);
                    localStorage.setItem('cartsid', goodsid); //存入sid
                    goodsnum.push(this.count.val());
                    localStorage.setItem('cartnum', goodsnum); //存入数量
                } else {
                    let index = $.inArray(this.sid, goodsid); //当前sid在数组中对应的位置
                    let newnum = parseInt(goodsnum[index]) + parseInt(this.count.val()); //原来存储的值+当前的值
                    goodsnum[index] = newnum; //新的数量
                    localStorage.setItem('cartnum', goodsnum); //存入数量
                }
            });
        }
    }
    new Details().init();
})(jQuery);
! function ($) {
    class Fdj {
        constructor() {
            this.wrap = $('.wrap');
            this.spic = $('#spic');
            this.sf = $('#sf');
            this.bf = $('#bf');
            this.bpic = $('#bpic');
            this.left = $('#let');
            this.right = $('#rgt');
            this.ulmove = $('#list ul');
            this.list = $('#list ul li');
            this.ulist = $('#ulist')
        }
        init() {
            //1.鼠标移入移出显示隐藏小放和大放。
            let _this = this;
            this.spic.hover(() => {
                $('#sf,#bf').css('visibility', 'visible');

                //3.求小放的尺寸和比例
                this.sf.css({
                    width: this.spic.outerWidth() * this.bf.outerWidth() / this.bpic.outerWidth(),
                    height: this.spic.outerHeight() * this.bf.outerHeight() / this.bpic.outerHeight()
                });
                //求比例
                this.bili = this.bpic.outerWidth() / this.spic.outerWidth();



                //2.鼠标在小图中移动，小放跟随鼠标
                this.spic.on('mousemove', (e) => {
                    let $l = e.pageX - this.wrap.offset().left - this.sf.width() / 2;
                    let $t = e.pageY - this.wrap.offset().top - this.sf.height() / 2;
                    if ($l < 0) {
                        $l = 0;
                    } else if ($l >= this.spic.outerWidth() - this.sf.outerWidth()) {
                        $l = this.spic.outerWidth() - this.sf.outerWidth() - 2;
                    }

                    if ($t < 0) {
                        $t = 0;
                    } else if ($t >= this.spic.outerHeight() - this.sf.outerHeight()) {
                        $t = this.spic.outerHeight() - this.sf.outerHeight() - 2;
                    }

                    this.sf.css({
                        left: $l,
                        top: $t
                    });

                    //大图进行赋值
                    this.bpic.css({
                        left: -$l * this.bili,
                        top: -$t * this.bili
                    });
                });
            }, () => {
                $('#sf,#bf').css('visibility', 'hidden');
            });


            //4.点击对应的li切换缩放的图片
            //#list ul li:委托的元素
            //$(this):委托的元素。
            this.ulmove.on('click', 'li', function () {
                let $imgurl = $(this).find('img').attr('src');
                _this.spic.find('img').attr('src', $imgurl);
                _this.bpic.attr('src', $imgurl);
                console.log($(this).find('img').outerWidth())
            });
            let $num = 6;
            this.ulist.on('click', '#rgt', function () {
               
                let $linum = $(this).siblings('#list').find('ul li').length;
                let $liwidth=$(this).siblings('#list').find('ul li').outerWidth(true);
                if ($linum <= $num) {
                    _this.right.css('color', '#fff');
                }
                if ($linum > $num) {
                    $num++;
                    _this.left.css('color', '#333');
                    if ($num === $linum) {
                        _this.right.css('color', '#fff');
                    }
                    _this.ulmove.animate({
                        left: -($num - 6) * $liwidth
                    });
                }
            })

            this.ulist.on('click','#let',function() {
                
                let $linum = $(this).siblings('#list').find('ul li').length;
                let $liwidth=$(this).siblings('#list').find('ul li').outerWidth(true);
                if ($num > 6) {
                    $num--;
                    _this.right.css('color', '#333');
                    if ($num === 6) {
                        _this.left.css('color', '#fff');
                    }
                    _this.ulmove.animate({
                        left: -($num - 6) * $liwidth
                    });
                }
            });
    
        }
    }

    new Fdj().init();
}(jQuery);



