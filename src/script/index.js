;!function($){
     class render{
          constructor(){
            this.TVmainright=$('.TVmainright')
          }
          init() {
            $.ajax({
                url: 'http://10.31.152.12/changhong/php/changhong.php',
                dataType: 'json'
            }).done((data) => {
                let $strhtml = '<ul>';
                $.each(data, function (index, value) {
                    $strhtml += `
                        <li>
                            <a href="details.html?sid=${value.sid}">
                            <img src="${value.picurl}" alt="">
                            <a href="">${value.title1}</a>
                            <p>${value.title2}</p>
                            <h2>￥${value.price}</h2>
                            </a>
                        </li>
                    `;
                });
                $strhtml += '</ul>';
                this.TVmainright.html($strhtml);
            });
        }
     }
     new render().init()
}(jQuery)