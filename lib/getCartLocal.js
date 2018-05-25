define(["jquery","getData"], function ($,getData) {

    let data = getData.getData;

    function getLocal() {
        //local之中取到购物车之中的内容;
        let carListString = localStorage.getItem("carList");
        let carListArray = JSON.parse(carListString);
        if (carListString === null) {
            $(".shop-cart-empty").removeClass("hide");
            $(".cart-title,.cart-fixed-submit").addClass("hide");
            return 0;
        }
        let carArray = [];
        for (let i = 0; i < carListArray.length; i++) {
            // console.log(carListArray[i].id)
            let itemId = carListArray[i].id;//购物车中商品的id;
            //获取对应的数据对象
            let itmeobj = fromIdToItem(itemId, data.data["1"]);
            //向结构中放入商品数量;
            itmeobj.num = carListArray[i].num;
            carArray.push(itmeobj);
        }
        return carArray;
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

    return {
        carArray: getLocal()
    }

});