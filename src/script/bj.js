;!function($){
    class bj{
        constructor(){
          this.li=$('.bannerleft .firsrUl li');
          this.ul=$('.bannerright ul');
        }
        init(){
            let _this = this;
            this.li.hover(function(){
                _this.ul.eq($(this).index()).css('display', 'block');
            },function(){
                _this.ul.eq($(this).index()).css('display', 'none');
            }) 
        }
    }
    new bj().init()
}(jQuery);