;
(function ($) {
    class Cartlist {
        constructor() {
            this.itemlist = $('.item-list');
        }
        init() {
        
            if (localStorage.getItem('cartsid') && localStorage.getItem('cartnum')) {
                console.log(localStorage.getItem('cartsid').split(','));
                console.log(localStorage.getItem('cartnum').split(','));
                let csid = localStorage.getItem('cartsid').split(','); 
                let cnum = localStorage.getItem('cartnum').split(','); 
                for (let i = 0; i < csid.length; i++) {
                    this.render(csid[i], cnum[i]);
                }
            }

         
            this.allselect();
         
            this.valuechange();
            
            this.delgoods();
        }
       
        render(sid, num) { 

            $.ajax({
                url: 'http://10.31.152.12/changhong/php/changhong.php',
                dataType: 'json'
            }).done((data) => {
                $.each(data, (index, value) => {
                    if (sid == value.sid) {
                        let $clonebox = $('.goods-item:hidden').clone(true, true);
                        $clonebox.find('.goods-pic img').attr('src', value.picurl);
                        $clonebox.find('.goods-pic img').attr('sid', value.sid);
                        $clonebox.find('.goods-d-info a').html(value.title1);
                        $clonebox.find('.b-price strong').html(value.price);
                        $clonebox.find('.quantity-form input').val(num);
                        $clonebox.find('.b-sum strong').html((value.price * num).toFixed(2));
                        $clonebox.show();
                        $('.item-list').append($clonebox);
                        this.allprice();
                    }
                });
            });
        }

       
        allprice() {
            let $goodsnum = 0; 
            let $goodsprice = 0; 
            $('.goods-item:visible').each(function (index, element) {
                if ($(element).find('input:checkbox').is(':checked')) {
                    $goodsnum += parseInt($(element).find('.quantity-form input').val());
                    $goodsprice += parseFloat($(element).find('.b-sum strong').html());
                }
            });
            $('.amount-sum em').html($goodsnum);
            $('.totalprice').html('￥' + $goodsprice);
        }

      
     
        allselect() {
            $('.allsel').on('change', () => {
                $('.goods-item:visible').find('input:checkbox').prop('checked', $('.allsel').prop('checked'));
                this.allprice(); 
            });
            let $checkinput = $('.goods-item:visible').find('input:checkbox'); //委托的元素。
            $('.item-list').on('click', $checkinput, () => {
                let $inputs = $('.goods-item:visible').find('input:checkbox');
                if ($('.goods-item:visible').find('input:checked').length === $inputs.length) {
                    $('.allsel').prop('checked', true);
                } else {
                    $('.allsel').prop('checked', false);
                }
                this.allprice(); 
            });
        }
        
        valuechange() {
          
            $('.quantity-add').on('click', function () {
                let $num = $(this).prev('input').val();
                $num++;
                $(this).prev('input').val($num);
                $(this).parents('.goods-info').find('.b-sum strong').html(singleprice($(this))); //求单价
                local($(this).parents('.goods-info').find('.goods-pic img').attr('sid'), $num); //存储数量
            });
        
            $('.quantity-down').on('click', function () {
                let $num = $(this).next('input').val();
                $num--;
                if ($num < 1) {
                    $num = 1;
                }
                $(this).next('input').val($num);
                $(this).parents('.goods-info').find('.b-sum strong').html(singleprice($(this)));
                local($(this).parents('.goods-info').find('.goods-pic img').attr('sid'), $num);
            });

            $('.quantity-form input').on('input', function () {
                let $reg = /^\d+$/;
                let $inputvlaue = $(this).val();
                if ($reg.test($(this).val())) {
                    if ($inputvlaue < 1) {
                        $(this).val(1)
                    } else {
                        $(this).val($(this).val())
                    }
                } else {
                    $(this).val(1);
                }
                $(this).parents('.goods-info').find('.b-sum strong').html(singleprice($(this)));
                local($(this).parents('.goods-info').find('.goods-pic img').attr('sid'), $(this).val());
            });

            function singleprice(obj) {
                let $dj = parseFloat(obj.parents('.goods-info').find('.b-price strong').html());
                let $count = parseFloat(obj.parents('.goods-info').find('.quantity-form input').val());
                return $dj * $count.toFixed(2);
            }


            function local(sid, value) { 
                if (localStorage.getItem('cartsid') && localStorage.getItem('cartnum')) {
                    let arrsid = localStorage.getItem('cartsid').split(',');
                    let arrnum = localStorage.getItem('cartnum').split(',');
                    let index = $.inArray(sid, arrsid); 
                    arrnum[index] = value;
                    localStorage.setItem('cartnum', arrnum.toString());
                }
            }
        }

        delgoods() {
            let arrsid = [];
            let arrnum = [];
            let _this = this;

            function getstorage() {
                if (localStorage.getItem('cartsid') && localStorage.getItem('cartnum')) {
                    arrsid = localStorage.getItem('cartsid').split(',');
                    arrnum = localStorage.getItem('cartnum').split(',');
                }
            }


           
            function delstorage(sid, arrsid) { 
                let $index = -1;
                $.each(arrsid, function (index, value) {
                    if (sid === value) {
                        $index = index; 
                    }
                });

                arrsid.splice($index, 1);
                arrnum.splice($index, 1);
                localStorage.setItem('cartsid', arrsid.toString());
                localStorage.setItem('cartnum', arrnum.toString());
            }

           
            $('.item-list').on('click', '.b-action a', function () {
                getstorage();
                if (window.confirm('你确定要删除吗?')) {
                    $(this).parents('.goods-item').remove();
                }
                delstorage($(this).parents('goods-item').find('.goods-pic img').attr('sid'), arrsid);
                _this.allprice();
            });


         
            $('.operation a').on('click', function () {
                getstorage(); 
                if (window.confirm('你确定要删除吗?')) {
                    $('.goods-item:visible').each(function (index, element) {
                        if ($(this).find('input:checkbox').is(':checked')) {
                            $(this).remove();
                        }
                        delstorage($(this).find('.goods-pic img').attr('sid'), arrsid);
                    });
                }
                _this.allprice();
            });
        }



    }

    new Cartlist().init();

})(jQuery);







