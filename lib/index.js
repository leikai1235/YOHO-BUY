

define(['jquery', 'swiper','gpBanner'], function ($,Swiper,gpBanner) {

    // some code here

    $(function () {
        //轮播图插件;
        $(".slide-container")
            .gpBanner(".slide-wrapper ul:first", {
                navigation: {
                    nextEl: '.slide-switch .next',
                    prevEl: '.slide-switch .prev',
                },
                pagination: {
                    el: ".thumb-pagination ul:first"
                },
                direction: "fade",
                loop: true
            });
    });

    //小轮播图
    new Swiper('.swiper-container', {
        slidesPerView: 3,
        spaceBetween: 8,
        slidesPerGroup: 3,
        loop: false,
        loopFillGroupWithBlank: true,
        navigation: {
            nextEl: '.img-brand-switch .next',
            prevEl: '.img-brand-switch .prev',
        },
        autoplay: true
    });


});