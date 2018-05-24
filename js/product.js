$(function () {

    //商品分类列表显示
    $(".product-list-nav h3").on("click", function () {
        $(this).siblings("ul").toggle("normal");
    });
    //请求数据
    let data = "";
    $.ajax({
        url: "../data/data.json",
        type: "GET",
        cache: false,
        async: false,
        dataType: "json",
        success: function (res) {
            data = res;
        },
        error: function (err) {
            console.log(err)
        }
    });
    //字符串模版
    let rest = `<div class="block-next-page">
                    <a href="#" rel="nofollow">
                        <img src="//img10.static.yhbimg.com/product/2014/01/15/11/01fa01614784f6239760f1b749663016f1.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90"
                             alt="">
                    </a>
                </div>
                <div class="good-item-wrapper" style="display: none; width: 310px; left: 469px; top: 1362px;">
                    <div class="good-info-main"></div>
                    <div class="good-select-color"></div>
                </div>`;


    $(".pager").pagination({
        pageCount: data.pages,
        totalData: data.total,
        coping: true,
        homePage: '首页',
        endPage: '末页',
        showData: 39,
        nextContent: '下页',
        prevContent: '上页',
        mode: 'fixed',
    })
        .on("click", "a", function () {

            let ind = parseInt($(".pager .active").text());
            if ($(this).hasClass("next") && ind < parseInt(data.pages)) {

                renderPage(++ind);

            } else if ($(this).hasClass("prev") && ind > 1) {

                renderPage(--ind);

            } else if (!$(this).hasClass("prev") && !$(this).hasClass("next")) {

                renderPage($(this).attr("data-page"));

            }


        });

    $(".block-next-page").on("click", function () {
        let ind = parseInt($(".pager .active").text());
        renderPage(++ind);
    });

    function renderPage(index) {
        console.log(index)
        index = typeof index === "string" ? index : JSON.stringify(index);
        $(".goods-container").html("");
        for (let i = 0; i < 39; i++) {

            let name = data.data[index][i].name;
            let img = data.data[index][i].img[0];
            let price = data.data[index][i].price;
            let brand = data.data[index][i].brand;
            let id = data.data[index][i].id;

            let goodInfo = `
                <div class="good-info" data-id="${id}">
                    <div class="tag-container clearfix">
                    </div>
                    <div class="good-detail-img">
                        <a class="good-thumb" href="detail.html?id=${id}"
                           title="
                           ${name}
                         " target="_blank">
                            <img class="lazy"
                                 data-original="${img}?imageMogr2/thumbnail/280x382/background/d2hpdGU=/position/center/quality/80"
                                 alt="${name}"
                                 src="${img}?imageMogr2/thumbnail/280x382/background/d2hpdGU=/position/center/quality/80"
                                 style="display: block;">
                        </a>
                    </div>
                    <div class="good-detail-text ">
                        <a href="detail.html?id=${id}" target="_blank">${name}</a>
                        <p class="brand">
                            <a href="product.html">${brand}</a>
                        </p>
                        <p class="price ">
                        <span class="sale-price prime-cost">
                            ${price}
                        </span>
                        </p>
                    </div>
                </div>`;
            $(".goods-container").append(goodInfo);
        }
        $(".goods-container").append(rest);

    }

    renderPage(1);

    $(".all-count").text("共" + data.total + "个结果");

    $(".foot-pager .total").text("共" + data.total + "件商品")
});