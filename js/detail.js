$(function () {

    //放大镜切换
    $(".thumb-wrap").on("mouseover", ".thumb", function () {
        $(this).addClass("active").siblings().removeClass("active");
        $("#img-show").attr("src", $(this).attr("data-shower"));
        $("#big").attr("src", $(this).attr("data-shower"));
    });


    //放大镜
    new Magnifier({
        small_ele: "#min-img",
        focus_ele: ".magnifier.move-object",
        big_ele: "#max"
    });

    //评论区大图显示
    $(".comment-detail").on("click", ".img-thumb", function () {
        $(this).toggleClass("active");
        $(this).siblings(".img-detail").toggle();
    });

    //评论tab切换
    $(".comment-tabs").on("click", "h2", function () {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        let index = $(this).index();
        $(".judge-content>div").eq(index).removeClass("m-hide").show().siblings().addClass("m-hide");
    });

    //下部轮播图
    $(".swiper-container").hover(function () {
        $(".img-brand-switch").toggle();
    });
    let swiper = new Swiper('.swiper-container', {
        slidesPerView: 5,
        spaceBetween: 8,
        slidesPerGroup: 5,
        loop: false,
        loopFillGroupWithBlank: true,
        navigation: {
            nextEl: '.img-brand-switch .next',
            prevEl: '.img-brand-switch .next'
        }
    });

    //点赞
    $(".common-zan .zan-content span").on("click","i",function () {
        if($(this).hasClass("getzan")) return 0;
        $(this).addClass("getzan");
        console.log($(this).siblings(".likeNum"));

        //点赞数量+1
        $(this).siblings("likeNum").text(parseInt($(this).siblings(".likeNum").text())+1);

    });

    //选择颜色尺码
    $(".colors.pull-left").on("click","li",function () {
        $(this).addClass("focus").siblings().removeClass("focus");
    });

    $("#sizes ul").on("click","li",function () {
        $(this).addClass("focus").siblings().removeClass("focus");
    })
});