define(["jquery","getCartLocal"], function ($,getCartLocal) {

    $(function () {
        //请求数据

        let totalNum = 0;
        let totalPrice = 0;
        let subTotalPrice = 0;



        //得到购物车的数据
        function getCar() {


            renderPage(getCartLocal.carArray);
        }

        //通过id在json数组中找到对应id的 对象，并返回这个对象;
        function fromIdToItem(id, json) {
            // console.log(id,json);
            for (let i = 0; i < json.length; i++) {
                if (json[i].id === id) {
                    return json[i]
                }
            }
        }

        //渲染页面
        function renderPage(data) {

            if (data === "") {
                $(".shop-cart-empty").removeClass("hide");
                return 0;
            }

            $("#pool-box").html("");

            totalNum = 0;
            totalPrice = 0;
            subTotalPrice = 0;

            for (let i = 0; i < data.length; i++) {

                totalNum += parseInt(data[i].num);

                subTotalPrice = parseInt(data[i].num) * parseInt(data[i].price.trim().split("¥")[1]);

                totalPrice += subTotalPrice;


                let template = "";
                if (data[i].num === 1 || data[i].num === "1") {
                    template = `  <div class="promotion-pool" data-id ="${data[i].id}">
                        <div class="cart-table">
                            <ul class="table table-group">
                                <li class="pre-sell-box tr active">
                                    <div class="pay-pro td " style="width: 368px;">
                                        <i class="cart-item-check iconfont cart-item-checked"
                                           checked></i>
                                        <a class="pay-pro-icon"
                                           data-role="item-img"
                                           href="detail.html?id=${data[i].id}" target="_blank">
                                            <img src="${data[i].img[0]}?imageMogr2/thumbnail/64x88/background/d2hpdGU&#x3D;/position/center/quality/90">
                                        </a>
                                        <p class="pay-pro-info">
                                            <a href="detail.html?id=${data[i].id}" target="_blank"
                                               data-role="item-title">
                                                ${data[i].name}
                                            </a>

                                        </p>
                                    </div>
                                    <div class="product-price td " style="width:148px;">
                                        <p class="p-product-price"> ${data[i].price}</p>
                                    </div>
                                    <div style="width:128px;" class="adjust-cart-num td">
                                        <div class="cart-num-cont">
                                            <span class="minus cart-num-btn
                                                        disabled">
                                                <i class="iconfont icon-minus"></i>
                                            </span>
                                            <input type="text" value="${data[i].num}" readonly="readonly"/>
                                            <span class="plus cart-num-btn "><i class="iconfont icon-plus"></i></span>
                                        </div>

                                        <p class="tip-message "></p>
                                    </div>
                                    <div style="width:160px;" class="sub-total red td">
                                        ￥${subTotalPrice}
                                    </div>
                                    <div style="width:100px;" class="cart-operation td">
                                        <span class="cart-del-btn" data-role="cart-del-btn">删除</span>
                                        <span class="cart-col-btn" data-role="cart-mov2fav-btn">移入收藏</span>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>`;
                }
                else {
                    template = `  <div class="promotion-pool"  data-id ="${data[i].id}">
                        <div class="cart-table">
                            <ul class="table table-group">
                                <li class="pre-sell-box tr active">
                                    <div class="pay-pro td " style="width: 368px;">
                                        <i class="cart-item-check iconfont cart-item-checked"
                                           checked></i>
                                        <a class="pay-pro-icon"
                                           data-role="item-img"
                                           href="detail.html?id=${data[i].id}" target="_blank">
                                            <img src="${data[i].img[0]}?imageMogr2/thumbnail/64x88/background/d2hpdGU&#x3D;/position/center/quality/90">
                                        </a>
                                        <p class="pay-pro-info">
                                            <a href="detail.html?id=${data[i].id}" target="_blank"
                                               data-role="item-title">
                                                ${data[i].name}
                                            </a>

                                        </p>
                                    </div>
                                    <div class="product-price td " style="width:148px;">
                                        <p class="p-product-price"> ${data[i].price}</p>
                                    </div>
                                    <div style="width:128px;" class="adjust-cart-num td">
                                        <div class="cart-num-cont">
                                            <span class="minus cart-num-btn
                                                        ">
                                                <i class="iconfont icon-minus"></i>
                                            </span>
                                            <input type="text" value="${data[i].num}" readonly="readonly"/>
                                            <span class="plus cart-num-btn "><i class="iconfont icon-plus"></i></span>
                                        </div>

                                        <p class="tip-message "></p>
                                    </div>
                                    <div style="width:160px;" class="sub-total red td">
                                        ￥${subTotalPrice}
                                    </div>
                                    <div style="width:100px;" class="cart-operation td">
                                        <span class="cart-del-btn" data-role="cart-del-btn">删除</span>
                                        <span class="cart-col-btn" data-role="cart-mov2fav-btn">移入收藏</span>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>`;
                }

                $("#pool-box").append(template);
            }

            $(".select-num .ins").text(totalNum);
            $(".price-sum .sum strong").text("￥ " + totalPrice)
        }


        getCar();

        //加入购物车
        function addCar(num, id) {
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
                        goodsArray[i].num = num;
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
                //把操作好的数据放入local之中;
                goodsString = JSON.stringify(goodsArray);
                localStorage.setItem("carList", goodsString);

            }
        }

        //加入购物车以后渲染数据
        function changeNum(obj) {

            totalNum = 0;
            totalPrice = 0;
            subTotalPrice = 0;

            let price = obj.parents(".pre-sell-box").find(".p-product-price").text();
            price = parseInt(price.trim().split("¥")[1]);
            subTotalPrice = obj.val() * price;
            obj.parents(".pre-sell-box").find(".sub-total").text("￥" + subTotalPrice);

            let data = getLocal();
            for (let i = 0; i < data.length; i++) {
                totalNum += parseInt(data[i].num);
                subTotalPrice = parseInt(data[i].num) * parseInt(data[i].price.trim().split("¥")[1]);
                totalPrice += subTotalPrice;
            }

            $(".select-num .ins").text(totalNum);
            $(".price-sum .sum strong").text("￥ " + totalPrice)
        }


        //改变购物车的数量
        $(".cart-num-cont input").on(
            {
                "click": function () {
                    if ($(this).prop("readonly") === true) {
                        $(this).prop("readonly", false);
                    }
                },
                "blur": function () {
                    $(this).attr("value", $(this).val());
                    let id = $(this).parents(".promotion-pool").attr("data-id");
                    addCar($(this).val(), id);
                    changeNum($(this));
                    $(this).prop("readonly", true);

                    if ($(this).val() === "1") {
                        $(this).siblings(".minus").addClass("disabled");
                    } else {
                        $(this).siblings(".minus").removeClass("disabled");
                    }

                }
            });

        //购物车数量加减
        $(".minus").on("click", function () {
            let num = $(this).siblings("input").val();
            if (num <= 1) {
                $(this).addClass("disabled");
                return 0;
            }
            --num;
            $(this).siblings("input").val(num);
            let id = $(this).parents(".promotion-pool").attr("data-id");
            addCar(num, id);
            changeNum($(this).siblings("input"));
        });
        $(".plus").on("click", function () {
            let num = $(this).siblings("input").val();
            if (num >= 1) {
                $(this).siblings(".minus").removeClass("disabled");
            }
            ++num;
            $(this).siblings("input").val(num);
            let id = $(this).parents(".promotion-pool").attr("data-id");
            addCar(num, id);
            changeNum($(this).siblings("input"));
        });

        //全选
        $(".left .cart-item-check,.fixed-option .cart-item-check").click(function () {

            if (!$(this).hasClass("cart-item-checked")) {
                $(".cart-item-check").addClass("cart-item-checked");
                changeNum($(".cart-num-cont input"));
            } else {
                $(".cart-item-check").removeClass("cart-item-checked");

                $(".select-num .ins").text("￥0");
                $(".price-sum .sum strong").text("￥0");
            }
        });

        //单选
        $(".promotion-pool").on("click", ".cart-item-check", function () {
            $(this).toggleClass("cart-item-checked");
            if (!$(this).hasClass("cart-item-checked")) {

                let num = parseInt($(this).parents(".promotion-pool").find(".cart-num-cont input").val());

                let subTotal = parseInt( $(this).parents(".promotion-pool").find(".sub-total").text().trim().split("￥")[1] );

                $(".select-num .ins").text(parseInt($(".select-num .ins").text() -num ));

                let total = parseInt( $(".price-sum .sum strong").text().trim().split("￥")[1].trim() );


                $(".price-sum .sum strong").text("￥ "+ (total-subTotal));


            } else {
                changeNum($(".cart-num-cont input"))
            }
        })

    });

});