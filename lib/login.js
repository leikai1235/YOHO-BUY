define(['jquery'], function ($) {

    $(function () {
        //切换手机还是电脑密码登录
        $(".switch-login-type").click(function () {
            let icon = $(this).find("#device-bg");
            if (icon.hasClass("type-mobile-bg")) {
                icon.removeClass("type-mobile-bg").addClass("type-desktop-bg")
            } else {
                icon.removeClass("type-desktop-bg").addClass("type-mobile-bg")
            }
            $(this).find(".type-tip").toggleClass("hide");
            $(".desktop-login").toggleClass("hide");
            $(".mobile-login").toggleClass("hide");
        });
        //切换二维码移动动画效果
        $("#qrcode-hover").hover(function () {
            $("#qrcode-container").animate({"left": "0"}, 1000);
            setTimeout(function () {
                $(".qrcode-helper").removeClass("hide");
            }, 900);

        }, function () {
            $("#qrcode-container").animate({"left": "65px"}, 1000);
            setTimeout(function () {
                $(".qrcode-helper").addClass("hide");
            }, 900);

        });

        $(".remember-me").click(function () {
            $(this).toggleClass("checked")
        });

        //用户名或者密码不能为空
        $("#account1").blur(function () {
            if ($(this).val() === "") {
                $(this).siblings(".err-tip").removeClass("hide").find("em").text("请输入账户名");
                $(this).addClass("error");
            } else {
                $(this).siblings(".err-tip").addClass("hide").find("em").text("");
                $(this).removeClass("error");
            }
        });
        $("#password").blur(function () {
            if ($(this).val() === "") {
                $(this).siblings(".err-tip").removeClass("hide").find("em").text("请输入密码");
                $(this).addClass("error");
            } else {
                $(this).siblings(".err-tip").addClass("hide").find("em").text("");
                $(this).removeClass("error");
            }
        });

        $("#country-code").click(function () {
            $("#country-list").toggle("slow");
        });


        let user_remorte = localStorage.getItem("tel");
        let pass_remorte = localStorage.getItem("pwd");

        //登录逻辑
        $("#login-btn").on("click", function () {
            if ($("#account1").val() !== user_remorte) {
                $("#account1").siblings(".err-tip").removeClass("hide").find("em").text("账户名错误");
            }
            if ($("#password").val() !== pass_remorte) {
                $("#password").siblings(".err-tip").removeClass("hide").find("em").text("密码错误");
            }
            else {

                if ($(".remember-me").hasClass("checked")) {
                    localStorage.setItem("isRemember", true);
                }
                localStorage.setItem("isLogin", true);
                alert("登陆成功");
                window.location.href = "../index.html";
            }
        })

    });

});