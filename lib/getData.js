define(["jquery"], function ($) {

    function getData() {
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
        return data;
    }

    return {
        getData: getData()
    }

});