define(['jquery'], function ($) {

    $(function () {
        //修改国家和地区
        $("#region").on("change", function () {
            $("#country-code").text($(this).val());
        });

        let telFlag = false;
        let pwdFlag = false;
        //验证手机号
        $('#phone-num').blur(function () {
            if ($(this).val() === "") {
                $("#err-tip").removeClass("hide").css({"top": "20%", "left": "57%"}).find("span").text("请输入手机号码");
                $(this).css('border', '1px solid red');
                return false;
            }
            let reg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
            if (!reg.test($(this).val())) {
                $("#err-tip").removeClass("hide").css({
                    "top": "20%",
                    "left": "57%"
                }).find("span").text("手机号码格式不正确,请重新输入");
                $(this).css('border', '1px solid red');
                return false;
            } else {
                $("#err-tip").addClass("hide");
                $(this).css('border', '1px solid #dbdbdb');
                telFlag = true;
                if (telFlag && pwdFlag) {
                    $("#register-btn").css("background", "#ff1901").removeClass("disable").removeAttr("disabled");
                }
                return true;
            }
        });

        // 验证密码
        let reg1 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
        let reg2 = /^(?![^a-zA-Z]+$)(?!\D+$).{8,15}$/;
        $('#pwd')
            .blur(function () {
                if ($(this).val() === "") {
                    $("#err-tip").removeClass("hide").css({
                        "top": "278px",
                        "left": "57%"
                    }).find("span").text("请输入密码");
                    $(this).css('border', '1px solid red');
                    return false;
                }
                if (!reg1.test($(this).val())) {
                    $("#err-tip").removeClass("hide").css({
                        "top": "278px",
                        "left": "57%"
                    }).find("span").text("密码须字母和数字组合");
                    $(this).css('border', '1px solid red');
                    return false;
                }
                if (!reg2.test($(this).val())) {
                    $("#err-tip").removeClass("hide").css({
                        "top": "278px",
                        "left": "57%"
                    }).find("span").text("密码只支持6-20位字符");
                    $(this).css('border', '1px solid red');
                    return false;
                }
                $("#err-tip,#pwd-tips").addClass("hide");
                $(this).css('border', '1px solid #dbdbdb');
                pwdFlag = true;
                if (telFlag && pwdFlag) {
                    $("#register-btn").css("background", "#ff1901").removeClass("disable").removeAttr("disabled");
                }
                return true;
            })
            .focus(function () {
                $("#pwd-tips").removeClass("hide");
            })
            .keyup(function () {
                let mediumRegex = /^[0-9A-Za-z]{6,20}$/;
                let strongRegex = /^(?=.{6,20})([0-9A-Za-z]*[^0-9A-Za-z][0-9A-Za-z]*){2,}$/;
                if (mediumRegex.test($(this).val()) === false) {
                    $('.low').css({'background': 'red', 'color': '#fff'});
                } else if (strongRegex.test($(this).val())) {
                    $('.low,.mid,.high').css({'background': '#3ee392', 'color': '#fff'});
                } else if (mediumRegex.test($(this).val())) {
                    $('.low,.mid').css({'background': 'yellow', 'color': '#fff'});
                } else {
                    $('.low').css({'background': 'red', 'color': '#fff'});
                }
            });


        function setLocal(tel, pwd) {

            if (!localStorage.getItem("userList")) {
                let userobj = [{
                    "tel": tel,
                    "pwd": pwd
                }];
                let userString = JSON.stringify(userobj);
                localStorage.setItem("userList", userString);
            } else {

                let userString = localStorage.getItem("userList");
                let userArray = JSON.parse(userString);
                //判定当前号码是否存在;
                let hasId = false;
                for (let i = 0; i < userArray.length; i++) {
                    if (userArray[i].tel === tel) {
                        hasId = true;
                        alert("号码已被注册过了!");
                        break;
                        return 0;
                    }
                }
                //如果当前的电话号码不存在;
                if (!hasId) {
                    userArray.push({
                        "tel": tel,
                        "pwd": pwd
                    })
                }
                //把操作好的数据放入cookie之中;
                userString = JSON.stringify(userArray);
                localStorage.setItem("userList", userString);
            }
            alert("注册成功");
            let timer = setTimeout(function () {
                window.location.href = "login.html";
            }, 1000);

        }

        //注册逻辑
        $("#register-btn").on("click", function () {
            // let tel = $("#phone-num").val();
            // let pwd = $("#pwd").val();
            // localStorage.setItem("tel", tel);
            // localStorage.setItem("pwd", pwd);
            // if (localStorage.getItem("tel") && localStorage.getItem("pwd")) {
            //     let timer = setTimeout(function () {
            //         window.location.href = "login.html";
            //     }, 1000);
            // }
            //local之中取到购物车之中的内容;
            let tel = $("#phone-num").val();
            let pwd = $("#pwd").val();
            setLocal(tel, pwd);
        });


    })

});