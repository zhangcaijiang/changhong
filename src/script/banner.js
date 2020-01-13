
    class Lunbo {
        constructor() {
            this.news=document.querySelector('#bannercontainer');
            this.btns = document.querySelectorAll('.btnlist li');
            this.pics = document.querySelectorAll('.piclist li');
            this.arrowright = document.querySelector('#right');
            this.arrowleft = document.querySelector('#left');
            this.index = 0;//存储索引。
            this.timer=null;
        }

        init() {
            //按钮点击事件
            for (let i = 0; i < this.btns.length; i++) {
                this.btns[i].onmouseover = () =>{
                    //利用索引思维
                    this.index = i;//索引存储下来了
                    this.tabswitch();
                }
            };
            //左右箭头的事件
            this.arrowright.onclick = () =>{
                this.rightclick();
            };

            this.arrowleft.onclick = ()=> {
                this.leftclick();
            };

            //自动轮播
            this.autoplay();

            //news添加鼠标移入和移出的事件
            this.news.onmouseover=()=>{
                clearInterval(this.timer);
            }

            this.news.onmouseout=()=>{
                this.autoplay();
            }
        }

        tabswitch() {
            for (let j = 0; j < this.btns.length; j++) {
                this.btns[j].className = '';
                //this.pics[j].style.opacity = 0;
                bufferMove(this.pics[j],{opacity:0});
            }
            this.btns[this.index].className = 'active';
            //this.pics[this.index].style.opacity = 1;
            bufferMove(this.pics[this.index],{opacity:100});
        }

        leftclick() {
            this.index--;
            if (this.index < 0) {
                this.index = this.btns.length - 1;
            }
            this.tabswitch();
        }

        rightclick() {
            this.index++;
            if (this.index > this.btns.length - 1) {
                this.index = 0;
            }
            this.tabswitch();
        }

        autoplay(){
            this.timer=setInterval(()=>{
                //每隔2s自动点击右键。
                this.arrowright.onclick();
            },4000);
        }
    }
    new Lunbo().init();
