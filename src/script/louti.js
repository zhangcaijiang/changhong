!function($){
     $('#louti ul li').not('.loutifirstli').on('click',function(){
         $(this).addClass('active').siblings('li').removeClass('active');
         let $top=$('.louceng').eq($(this).index()).offset().top;
         $('html').animate({
             scrollTop:$top
         })
     });
     $('.loutifirstli').on('click', function () {
        $('html').animate({
            scrollTop: $('#notice').offset().top
        });
    });
    $(window).on('scroll',function(){
        let $top=$(window).scrollTop()+$('#louti').outerHeight();
        if($top>$('#notice').offset().top && $top<$('#flowmain').offset().top-$('#louti').outerHeight()){
            $('#louti').show()
        }else {
            $('#louti').hide()
        }
        
        $('.louceng').each(function(index,element){
            let $loucengtop=$('.louceng').eq(index).offset().top+$('#louti').outerHeight();
          if( $loucengtop> $top){
            $('#louti ul li').removeClass('active');
            $('#louti ul li').eq(index).addClass('active');
            return false;
          }
        })
    })
   
}(jQuery)