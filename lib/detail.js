define(['jquery', 'Magnifier'], function ($, Magnifier) {

    $(function () {
        let data = "";
        let id = getQueryString("id");

        function getData() {
            $.ajax({
                url: "../data/data.json",
                type: "GET",
                cache: false,
                async: false,
                dataType: "json",
                success: function (res) {
                    for (let item of res.data["1"]) {
                        if (item["id"] === id) {
                            data = item;
                            return;
                        }
                    }
                },
                error: function (err) {
                    console.log(err)
                }
            });
        }

        getData();


        function renderPage() {

            $(".pull-right.infos .name").text(data["name"]);
            $(".market-price .price").text(data["price"]);

            let color_template = "";
            let size_template = "";
            let img_template = "";
            for (let i = 0; i < data["color"].length; i++) {
                color_template += `<li class="pull-left"  data-color="黑色">
                                    <img src="${data["img"][i]}?imageMogr2/thumbnail/25x32/background/d2hpdGU=/position/center/quality/80">
                                    <span class="color-name">${data["color"][i]}</span>
                                </li>`;
            }
            $(".colors").html(color_template).find("li").first().addClass("focus");
            for (let i = 0; i < data["size"].length; i++) {
                size_template += `<li>${data["size"][i]}</li>`;
            }

            $(".size").html(size_template).find("li").first().addClass("focus");
            for (let i = 0; i < data["img"].length; i++) {
                img_template += `<img class="thumb" src="${data["img"][i]}?imageMogr2/thumbnail/75x100/background/d2hpdGU=/position/center/quality/80" alt="${data["name"]}" data-shower="${data["img"][i]}?imageMogr2/thumbnail/420x560/background/d2hpdGU=/position/center/quality/80" data-origin="${data["img"][i]}?imageMogr2/thumbnail/750x1000/background/d2hpdGU=/position/center/quality/80">`;
            }

            $(".thumb-wrap").html(img_template).find("img").first().addClass("active");
            $("#img-show").attr("src", data["img"][0]);
            $("#big").attr("src", data["img"][0]);
        }

        renderPage();


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
        $(".common-zan .zan-content span").on("click", "i", function () {
            if ($(this).hasClass("getzan")) return 0;
            $(this).addClass("getzan");
            console.log($(this).siblings(".likeNum"));

            //点赞数量+1
            $(this).siblings("likeNum").text(parseInt($(this).siblings(".likeNum").text()) + 1);

        });

        //选择颜色尺码
        $(".colors.pull-left").on("click", "li", function () {
            $(this).addClass("focus").siblings().removeClass("focus");
        });

        $("#sizes ul").on("click", "li", function () {
            $(this).addClass("focus").siblings().removeClass("focus");
        });


        //获取url的参数值
        function getQueryString(name) {

            let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');

            let r = window.location.search.substr(1).match(reg);

            if (r != null) {

                return unescape(r[2]);

            }

            return null;

        }

        //获取要加到购物车的值
        let num = parseInt($("#num").text());
        $("#minus-num").on("click", function () {
            if (num <= 1) {
                $("#minus-num").addClass("dis");
                $(".bundle").removeClass("hide");
                return 0;
            } else {
                --num;
                $("#num").text(num);
            }
        });
        $("#plus-num").on("click", function () {
            ++num;
            $("#num").text(num);
            if (num > 1) {
                $(".bundle").addClass("hide");
            }
        });

        //加入购物车
        function addCar() {
            num = parseInt(num);
            //this指向点击的button;
            let goodsId = id;
            // 第一次; => 建立对应的json结构;
            if (!localStorage.getItem("carList")) {
                //第一次;
                let goodsObj = [
                    {
                        "id": goodsId,
                        "num": num
                    }
                ];
                let goodsString = JSON.stringify(goodsObj);

                localStorage.setItem("carList", goodsString)

            } else {
                //对数据进行辨别操作;

                let goodsString = localStorage.getItem("carList");
                // console.log(goodsString)
                let goodsArray = JSON.parse(goodsString);
                //判定当前id是否存在;

                let hasId = false;

                for (let i = 0; i < goodsArray.length; i++) {
                    if (goodsArray[i].id === goodsId) {
                        goodsArray[i].num += num;
                        //商品数量递增;
                        hasId = true;
                        break;
                    }
                }

                //如果id不存在;
                if (!hasId) {
                    goodsArray.push({
                        "id": goodsId,
                        "num": num
                    })
                }
                //把操作好的数据放入cookie之中;
                goodsString = JSON.stringify(goodsArray);
                localStorage.setItem("carList", goodsString);


                $(".go-cart .iconfont").css({"color": "red"}, "normal", "500");
                $(".goods-num-tip").removeClass("hide").text(parseInt($(".goods-num-tip").text()) + num);

            }
        }

        $("#add-to-cart").on("click", addCar);


    });

});