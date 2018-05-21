/* 
    //需求驱动;

    1.传入轮播图父级;
    .gp6-banner-wrapper; => 选择器 字符串;
    2.配置参数;
    {
        direction:slide|fade|scroll, //动画模式;
        loop: true,   //是否自动循环;

        //如果 可选参数;
        pagination:{
            el:".gp6-banner-pagination"选择器
        }

        // 如果 可选参数
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    }
*/

// 1. 初始化组件;
// 2. 渲染元素;
// 3. 做所有的动画功能;
// 4. 下标处理;
;+function ($) {
    $.fn.gpBanner = function (banner_selector, options) {
        //单例模式构造函数;
        // var banner = $.extend(this,{
        //     init:function(){
        //     }
        // })
        //每次操作都要独立;
        new Banner(banner_selector, options, this);
    };

    function Banner(banner_selector, options, base_ele) {
        this.init(banner_selector, options, base_ele);
    }

    Banner.prototype = {
        constructor: Banner,
        init: function (banner_selector, options, base_ele) {
            //当前显示的内容;
            this.index = 0;
            // 主体元素选择;
            this.bannerWrapper = $(banner_selector);
            //动画模式;
            this.direction = options.direction ? options.direction : "fade";
            //具体元素获取;
            this.bannerItem = this.bannerWrapper.children("li");
            //this.bannerItem.size() == this.bannerItem.length
            this.bannerNum = this.bannerItem.length;
            //判定是否有pagination传入;
            //在选择器中直接进行参数判断;
            this.pagination = $(options.pagination ? options.pagination.el : "");
            if (this.pagination.length !== 0) {
                this.paginationItem = this.pagination.children("li");
                this.paginationItem.on("mouseover.changeIndex", {"turn": "toIndex"}, $.proxy(this.change_index, this));
                this.paginationItem.on("mouseover.animation", $.proxy(this.animation, this));

            }

            //按钮元素获取 => 按钮元素获取有风险所以加以判断;
            if (typeof options.navigation === "object") {
                this.btnPrev = $(options.navigation.prevEl);
                this.btnNext = $(options.navigation.nextEl);
                //on 中间参数 添加一个对象默认为当前事件对象中的data属性;
                this.btnPrev
                    .on("click.changeIndex", {turn: "prev"}, $.proxy(this.change_index, this))
                    .on("click.animation", $.proxy(this.animation, this));
                this.btnNext
                    .on("click", {turn: "next"}, $.proxy(this.change_index, this))
                    .on("click", $.proxy(this.animation, this))
            }

        },
        change_index: function (event) {
            // console.log(1);
            //改变 index;
            let turnList = {
                "prev": function () {
                    this.prev = this.index;
                    if (this.index === 0) {
                        this.index = this.bannerNum - 1;
                    } else {
                        this.index--;
                    }
                }.bind(this),
                "next": function () {
                    this.prev = this.index;
                    if (this.index === this.bannerNum - 1) {
                        this.index = 0;
                    } else {
                        this.index++;
                    }
                }.bind(this),
                "toIndex": function () {
                    this.prev = this.index;
                    this.index = $(event.currentTarget).index();
                }.bind(this)
            };
            if (!(typeof turnList[event.data.turn] === "function")) return 0;
            turnList[event.data.turn]();
        },
        animation: function (event) {
            // console.log(event.data.ani)
            if (this.prev === this.index) return;

            let animationList = {
                "slide": function () {
                    animationList.slideFadeInit();
                    this.bannerItem.eq(this.index)
                        .addClass("active")
                        .css({
                            display: "none"
                        })
                        .slideDown()
                        .siblings()
                        .removeClass("active");
                }.bind(this),
                "fade": function () {
                    animationList.slideFadeInit();
                    this.bannerItem.eq(this.index)
                        .addClass("active")
                        .css({
                            display: "none"
                        })
                        .fadeIn()
                        .siblings()
                        .removeClass("active");
                }.bind(this),
                "scroll": function () {
                    //初始化;
                    this.bannerItem
                        .css({
                            zIndex: 0
                        })
                        .eq(this.prev)
                        .css({
                            zIndex: 2
                        })
                        .end()
                        .eq(this.index)
                        .css({
                            zIndex: 2
                        });
                    //判定从左到右 还是从右到左;
                    if (this.prev > this.index) {
                        //左;
                        this.bannerItem.eq(this.prev)
                            .animate({
                                left: this.bannerItem.outerWidth() + 8
                            })
                            .end()
                            .eq(this.index)
                            .css({
                                left: -this.bannerItem.outerWidth() + 8
                            })
                            .animate({
                                left: 0
                            })
                    } else {
                        //右;
                        this.bannerItem.eq(this.prev)
                            .animate({
                                left: -this.bannerItem.width() + 8
                            })
                            .end()
                            .eq(this.index)
                            .css({
                                left: this.bannerItem.width() + 8
                            })
                            .animate({
                                left: 0
                            })
                    }
                }.bind(this),
                "slideFadeInit": function () {
                    this.bannerItem.eq(this.prev)
                        .css({
                            zIndex: 1
                        })
                        .siblings()
                        .css({
                            zIndex: ""
                        })
                }.bind(this)
            };
            animationList[this.direction]();
            this.pagination.children("li").eq(this.index)
                .addClass("focus")
                .siblings()
                .removeClass("focus")
        }
    }

}(jQuery);


