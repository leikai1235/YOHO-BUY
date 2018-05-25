define(["jquery","lazyload","getCartLocal"],function ($,lazyload,getCartLocal) {
    $(function () {
        //图片懒加载插件
        $("img.lazy").lazyload({
            effect: "fadeIn", threshold: 180
        });

        //设置图片特效
        $(".img-shadow-box .lazy").hover(function () {
            $(this).css("opacity", "0.8");
        }, function () {
            $(this).css("opacity", "1");
        });

        //关闭二维码盒子
        $(".code-down-box i").on("click", function () {
            $(".code-down-box").hide();
        });

        //返回顶部效果
        let height = $(window).height();
        let floatRight = $(".right-floating-layer");
        $(window).on("scroll", function () {

            if ($(window).scrollTop() >= height) {
                floatRight.removeClass("hide");
            } else {
                floatRight.addClass("hide");
            }
        });
        $(".return-top").on("click", function () {
            $('body,html').animate({scrollTop: 0}, 100);
            return false;
        });

        //导航移入显示
        $(".yoho-header .nav-wrapper .third-nav-wrapper").hide();
        $(".sub-nav-list").on("mouseover",".contain-third",function () {
            $(this).find(".third-nav-wrapper").show()
        }).on("mouseout",".contain-third",function () {
            $(this).find(".third-nav-wrapper").hide()
        });

        // //购物车显示
        // $(".go-cart").hover(function () {
        //     $(".mini-cart-wrapper").show();
        // },function () {
        //     $(".mini-cart-wrapper").hide();
        // });

        //判断是否登录
        if(localStorage.getItem("isLogin")){
            $("#loginBox").hide();

            let num = 0;

            let cartArr = getCartLocal.carArray;

            for(let item of cartArr){
                num += item.num;
            }

            $(".goods-num-tip").removeClass("hide").text(num);
        }


    });

    //关闭登录状态
    window.onunload = function () {
        if(!localStorage.getItem("isLogin"))return;
        if(localStorage.getItem("isRemember"))return;
        localStorage.removeItem('isLogin');
    };

});



