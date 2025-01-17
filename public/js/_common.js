jQuery.fn.extend({
    onClick: function (func, beforeFunc) {
        beforeFunc = beforeFunc || function () {};

        var tar = this;

        //press enter while focus ont the form triggers click event of submit btn.
        jQuery(tar)
            .closest("form")
            .keypress(function (event) {
                if (event.which == 13) {
                    jQuery(this).find(".submit").trigger("click");
                    return false;
                }
            });

        jQuery(tar).click(function () {
            var form = jQuery(this).closest("form");

            beforeFunc.call(tar);

            jQuery
                .ajax({
                    method: form.attr("method"),
                    url: form.attr("action"),
                    data: form.serialize(),
                })
                .done(function (data) {
                    func.call(tar, data);
                });
            return false;
        });
    },
});

function getCredit(force) {
    jQuery(".getCredit-js")
        .find("[name]")
        .empty()
        .append('<img class="loading" src="/img/_common/loading.gif">');

    jQuery
        .ajax({
            method: "POST",
            url: "ajax/get_credit",
            data: {},
        })
        .done(function (re) {
            switch (re.code) {
                case 0:
                    // update credit table
                    for (var key in re.data) {
                        jQuery(document)
                            .find("[name=" + key + "]")
                            .text(re.data[key]);
                    }
                    break;
            }
        });
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

function webSocket(auth) {
    var wsServer = auth;
    var websocket = new WebSocket(wsServer);
    var event = ["unread", "logout"];
    var interval = setInterval(function () {
        for (var i in event) {
            websocket.send(
                JSON.stringify({ type: event[i], lang: getCookie("lang") })
            );
        }
    }, 5000);
    websocket.onmessage = function (e) {
        var data = JSON.parse(e.data);

        switch (data.type) {
            case "logout":
                jQuery.get("/logout");
                message = "帳號已從別的位置登入";
                if (data.message != undefined) message = data.message;
                if (typeof logoutMessage != "undefined")
                    message = logoutMessage;
                swal(
                    {
                        title: message,
                        customClass: "swalPopup",
                    },
                    function () {
                        location = "/logout";
                    }
                );
                break;
            case "unread":
                jQuery(".getUnread-js").text(
                    parseInt(data.data) ? data.data : ""
                );
                break;
        }
    };

    websocket.onclose = function (e) {
        console.log("Disconnected");
        clearInterval(interval);
        setTimeout(function () {
            webSocket(auth);
        }, 3000);
    };
}

jQuery(function () {
    var auth = jQuery("#auth").val();

    if (auth) {
        webSocket(auth);
    }

    jQuery(".login_form")
        .find(".submit")
        .onClick(function (data) {
            if (data.code) {
                swal({ title: data.text, customClass: "swalPopup" });
            } else {
                location.reload();
            }
        });

    jQuery(".fresh-btn")
        .click(function () {
            if (auth) {
                getCredit(true);
                return false;
            }
        })
        .click();

    jQuery(".auth").click(function () {
        if (!auth) {
            swal({
                title: "請先登入會員！",
                customClass: "swalPopup",
            });
            return false;
        }
    });
    if (!(typeof phone_check !== "undefined")) phone_check = false;
    if (phone_check) {
        console.log("start change to phone check mode");
        jQuery('[name="phone"]').attr("id", "phone_check");
        jQuery('[name="phone"]').removeAttr("name");
        jQuery('[name="phone"]').attr("disabled", "true");
        jQuery("#phone_check").after(
            '<input id="phone" name="phone" type="hidden">'
        );
        // jQuery('#phone_check').after('<button id="phone_btn" class="btn1">OK</button>');
        jQuery("#phone_check").bind("click", function () {
            swal(
                {
                    title: phoneTitle,
                    text: phoneText,
                    type: "input",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    disableButtonsOnConfirm: true,
                    confirmLoadingButtonColor: "#DD6B55",
                },
                function (inputValue) {
                    jQuery
                        .ajax({
                            method: "POST",
                            url: "ajax/send_code_before_register",
                            data: { phone: inputValue },
                        })
                        .done(function (re) {
                            wrongCounter = 0;
                            // console.error(re);
                            if (!re.code) {
                                swal(
                                    {
                                        title: phoneTitle,
                                        text: re.text,
                                        type: "input",
                                        showCancelButton: true,
                                        closeOnConfirm: false,
                                        disableButtonsOnConfirm: true,
                                        confirmLoadingButtonColor: "#DD6B55",
                                    },
                                    function (numbers) {
                                        if (numbers == re.num) {
                                            //rewrite to input
                                            jQuery('[name="phone"]').val(
                                                inputValue
                                            );
                                            jQuery("#phone_check").val(
                                                inputValue
                                            );
                                            swal(success);
                                        } else {
                                            // console.log(numbers);
                                            wrongCounter++;
                                            if (wrongCounter >= 3) {
                                                swal(failed);
                                            }
                                        }
                                    }
                                );
                            } else {
                                swal(re.text);
                            }
                            // switch(re.code){
                            // 	case 0:
                            // 		// update credit table
                            // 		// for(var key in re.data){
                            // 			// jQuery(document).find('[name=' + key + ']').text(re.data[key]);
                            // 		}
                            // 		break;

                            // }
                        });
                    // setTimeout(function() {
                    //   swal('Ajax request finished!'+inputValue);
                    // }, 2000);
                }
            );
            //ajax area
            console.log("send ajax");
        });
    }
});
function compressImage(base64) {
    const canvas = document.createElement("canvas");
    const img = document.createElement("img");

    return new Promise((resolve, reject) => {
        img.onload = function () {
            let width = img.width;
            let height = img.height;
            const maxHeight = 200;
            const maxWidth = 200;

            if (width > height) {
                if (width > maxWidth) {
                    height = Math.round((height *= maxWidth / width));
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = Math.round((width *= maxHeight / height));
                    height = maxHeight;
                }
            }
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            resolve(canvas.toDataURL("image/jpeg", 0.7));
        };
        img.onerror = function (err) {
            reject(err);
        };
        img.src = base64;
    });
}

var reader = new FileReader(),
    img = new Image();

// 选择的文件对象
var file = null;

// 缩放图片需要的canvas
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");

img.onload = function () {
    // 图片原始尺寸
    var originWidth = this.width;
    var originHeight = this.height;
    // 最大尺寸限制
    var maxWidth = 400,
        maxHeight = 400;
    // 目标尺寸
    var targetWidth = originWidth,
        targetHeight = originHeight;
    // 图片尺寸超过400x400的限制
    if (originWidth > maxWidth || originHeight > maxHeight) {
        if (originWidth / originHeight > maxWidth / maxHeight) {
            // 更宽，按照宽度限定尺寸
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
        } else {
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
        }
    }

    // canvas对图片进行缩放
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    // 清除画布
    context.clearRect(0, 0, targetWidth, targetHeight);
    // 图片压缩
    context.drawImage(img, 0, 0, targetWidth, targetHeight);
    // canvas转为blob并上传
    canvas.toBlob(function (blob) {
        // 图片ajax上传
        var xhr = new XMLHttpRequest();
        // 文件上传成功
        xhr.onreadystatechange = function () {
            if (xhr.status == 200) {
                // xhr.responseText就是返回的数据
            }
        };
        // 开始上传
        xhr.open("POST", "ajax/uploadBase64", true);
        xhr.send(blob);
    }, file.type || "image/png");
};

// 文件base64化，以便获知图片原始尺寸
reader.onload = function (e) {
    img.src = e.target.result;
};

jQuery.fn.extend({
    uploadfile: function (init) {
        var tar = this;
        var url = init.url;
        var col = init.col || "col-sm-6";

        var bar = jQuery(
            '<div class="p" style="background-color: aquamarine; height: 3px; width: 0px; margin: 1px"></div>'
        );
        var ctl = jQuery('<input type="file" multiple>');

        jQuery(tar).before(bar);
        jQuery(tar).before(ctl);

        jQuery(ctl).change(function (e) {
            // file = event.target.files[0];
            // // 选择的文件是图片
            // if (file.type.indexOf("image") == 0) {
            // 	reader.readAsDataURL(file);
            // }

            var upload = this;
            var data = new FormData();
            var files = jQuery(this).get(0).files;

            for (var i in files) {
                data.append(i, files[i]);
            }
            data.append("method", "upload");

            jQuery.ajax({
                url: url,
                type: "POST",
                data: data,
                processData: false, // Don't process the files
                contentType: false, // Set content type to false as jQuery will tell the server its a query string request
                success: function (re) {
                    var add = JSON.parse(re);
                    var val = jQuery(tar).val() || "[]";
                    var arr = JSON.parse(val);
                    for (var i in add) {
                        arr.push(add[i]);
                    }

                    // clear selected files, render gallery
                    jQuery(upload).val("");
                    jQuery(tar).val(JSON.stringify(arr)).trigger("preset");
                },
                error: function () {
                    console.log("err: ajax file upload");
                },
                xhr: function () {
                    var xhr = jQuery.ajaxSettings.xhr();
                    // set the onprogress event handler
                    xhr.upload.onprogress = function (evt) {
                        jQuery(bar).animate(
                            { width: (evt.loaded / evt.total) * 100 + "%" },
                            100
                        );
                    };
                    // set the onload event handler
                    xhr.upload.onload = function () {
                        jQuery(bar).stop().animate({ width: "0%" }, 10);
                    };
                    return xhr;
                },
            });
            return false;
        });

        jQuery(tar).on("preset", function () {
            var val = jQuery(this).val() || "[]";
            var arr = JSON.parse(val);
            var tpl = 100;

            jQuery(this).siblings("div.gallery").remove();

            // init
            if (!arr.length) return;

            var gallery = jQuery(
                '<div class="gallery"><style>.icon-set{ white-space: nowrap; text-overflow: ellipsis; overflow: hidden; position: absolute; bottom: 20px; width: 100%; padding: 5px; background-color: rgba(0,0,0,0.8); color: white} .icon-set a{color: white}</style></div>'
            );

            jQuery(this).after(gallery);

            // bind form reset event
            jQuery(gallery)
                .closest("form")
                .on("reset", function () {
                    jQuery(gallery).remove();
                });

            var html = "";
            for (var i in arr) {
                arr[i]["ext"] = (
                    arr[i]["name"].split(".")[1] || "na"
                ).toLowerCase();

                var dl =
                    '<a href="' +
                    arr[i]["url"] +
                    '" download="' +
                    arr[i]["name"] +
                    '" target="_blank"><span class="glyphicon glyphicon-download-alt"></span></a>';
                var rm =
                    ' | <a href="#" class="delete"><span class="glyphicon glyphicon-trash"></span></a> ';

                html +=
                    '<div style="position: relative; float: left; margin: 10px;"><a class="thumbnail" href="#"><span style="position: absolute; top: 0px; right: 6px; color: black; font-size: 11px;">.' +
                    arr[i]["ext"] +
                    '</span><table style="width: ' +
                    tpl +
                    "px; height: " +
                    tpl +
                    'px;"><tr><td style="padding: 0; text-align: center"><img src="' +
                    arr[i]["url"] +
                    '" class="img-responsive" style="max-width: ' +
                    tpl +
                    "px; max-height: " +
                    tpl +
                    'px; margin: 0 auto;"/></td></tr></table></a>         <div class="icon-set" title="' +
                    arr[i]["name"] +
                    '">' +
                    dl +
                    rm +
                    arr[i]["name"] +
                    "</div></div>";
            }

            // start loading
            jQuery(gallery).append(html);

            jQuery(gallery)
                .find(".thumbnail")
                .each(function (i) {
                    jQuery(this).imgEvent(jQuery(tar));

                    jQuery(this)
                        .find("img")
                        .on("load", function () {})
                        .on("error", function () {
                            jQuery(this)
                                .addClass("hidden")
                                .after(
                                    '<span class="glyphicon glyphicon-duplicate" style="position: relative; color: brown; font-size: 45px"></span>'
                                );
                        });
                });
        });
    },
    // delete event
    imgEvent: function (input) {
        var tar = this;
        var img = jQuery(tar).find("img");

        jQuery(tar)
            .siblings(".icon-set")
            .find(".delete")
            .click(function () {
                var url = jQuery(img).attr("src");

                var arr = JSON.parse(jQuery(input).val());
                for (var i in arr) {
                    if (arr[i]["url"] == url) {
                        arr.splice(i, 1);
                        break;
                    }
                }

                jQuery(input).val(JSON.stringify(arr));
                jQuery(tar).parent("div").remove();
            });
        return this;
    },
});

var myUser = new MyUser();

var initGame;

var reTryLoginTimes = 0;

var GROUP_ID = 5;

var roomNameList = MessageType.getRoomNameList();

var isUsePayRateOffset = false;

function webSocket(auth) {
    var webUser = new WebUser();
    // webUser.onError = onError;

    var isLoginFail = false;
    webUser.onMessage = function (e) {
        //if(e.GetClassName != 'GetRoomInfoResponse' && e.GetClassName != 'GetBinaryPriceInfoResponse')
        //	console.log(e);
        switch (e.GetClassName) {
            case "LoginResponse":
            case "GameLoginResponse":
                if (e.is_success) {
                    reTryLoginTimes = 0;

                    var name =
                        typeof e.nick_name == "undefined" ||
                        e.nick_name == null ||
                        e.nick_name.length == 0
                            ? e.account
                            : e.nick_name;
                    $("#user-account").text(name);

                    myUser.setBalance(e.balance);
                    $("#wallet").text(myUser.getViewBalance());

                    initGame.setWebUser(webUser);

                    var request = new GetUserRoomDataListRequest();
                    request.group_id = GROUP_ID;
                    webUser.send(request);
                } else {
                    isLoginFail = true;
                    showReLoginWindow();
                }
                break;
            case "UpdateUserBalanceResponse":
                myUser.setBalance(e.balance);
                $("#wallet").text(myUser.getViewBalance());
                break;
            case "GetUserRoomDataListResponse":
                let template = $(".choices")[0].outerHTML;
                $topList = $(".choice-section");
                $topList.children(":visible").remove();
                $rightList = $("#right_roomList");
                $rightList.empty();
                $historyList = $("#history_roomList");
                $historyList.empty();
                $rightList.change(function () {
                    let room_id = $(this).val();
                    location.replace("?auth=" + auth + "&game=" + room_id);
                });
                for (let i = 0; i < e.room_data_list.length; i++) {
                    const data = e.room_data_list[i];

                    let gotoFun = function () {
                        if (initGame.game == data.room_id) return;
                        location.replace(
                            "?auth=" + auth + "&game=" + data.room_id
                        );
                    };
                    $newChoice = $(template);
                    $list_item = $newChoice.children(".list-item");
                    $list_item.attr("id", "choices_" + data.room_id);
                    $list_item.attr("game", data.room_id);
                    $list_item.click(gotoFun);
                    $list_item
                        .children(".list-item-name")
                        .text(getLangRoomName(data.room_id, data.room_name));

                    if (data.room_id == initGame.game) {
                        $list_item.addClass("active");
                    }
                    $newChoice.show();
                    $topList.append($newChoice);

                    $list_item = $(
                        "<option value='" +
                            data.room_id +
                            "'>" +
                            getLangRoomName(data.room_id, data.room_name) +
                            "</option>"
                    );
                    //$list_item.click(gotoFun);
                    if (data.room_id == initGame.game) {
                        $list_item.attr("selected", true);
                    }
                    $rightList.append($list_item);

                    $list_item = $(
                        "<option value='" +
                            data.room_id +
                            "'>" +
                            getLangRoomName(data.room_id, data.room_name) +
                            "</option>"
                    );
                    $historyList.append($list_item);

                    if (data.room_id == initGame.game) {
                        initGame.afterGetRoomData(data);
                    }
                }

                /** Sperate two kinds of market */
                $topList2 = $(".choice-section2");
                $topList2.children(":visible").remove();

                $topList.children().each(function (index) {
                    // console.log($(this).children().attr('game'))
                    if ($(this).children().attr("game") >= 710) {
                        $topList2.append(this);
                        $topList.remove(this);
                    }
                });

                $(".loading").fadeOut(1000);

                // $('.owl-carousel').owlCarousel({
                //     loop:false,
                //     margin:1,
                //     nav:true,
                //     navContainer: '#customNav',
                //     dots: false,
                //     responsive:{
                //         0:{
                //             items:2
                //         },
                // 		390:{
                //             items:2
                //         },
                //         640:{
                //             items:3
                //         },
                //         920:{
                //             items:4
                //         },
                //         1100:{
                //             items:5
                //         },
                //         1330:{
                //             items:6
                //         },
                //         1500:{
                //             items:7
                //         }
                //     }
                // })

                /*
				var request = new GetBinaryPriceInfoRequest();
					request.room_id = initGame.game;
					request.count = 60;
					webUser.send(request);
				*/
                break;
            case "OutOfConnectCountLimitResponse":
                isLoginFail = true;
                showOutOfConnectCountWindow();
                break;

            default:
                initGame.onMessage(e);
                break;
        }
    };

    webUser.onClose = function (e) {
        myUser.isJoinRoom = false;
        console.log("Disconnected " + reTryLoginTimes);
        //clearInterval(interval);
        if (!isLoginFail) {
            if (reTryLoginTimes < 5)
                setTimeout(function () {
                    webSocket(auth);
                }, 3000);
            else showReLoginWindow();
            reTryLoginTimes++;
        }
    };

    var request = new LoginRequest();
    request.login_type_id = 3;
    request.msg_params = [auth];
    webUser.open(cf_game_url, request);

    webUser.onOpen = function () {
        console.log("Connected");
    };

    return webUser;
}

$(function () {
    var room_id = $.urlParam("game");
    initGame = new init_game(room_id);

    var auth = $.urlParam("auth");

    if (auth) {
        webSocket(auth);
    }
    setTimeout(function () {
        $("#history_roomList option").each(function () {
            $thisObj = $(this);
            if ($thisObj.val() == initGame.game) {
                $thisObj.attr("selected", true);
            } else {
                $thisObj.attr("selected", false);
            }
        });
        $("#history_form [name=stock-number]").val("");
        $("#history_form [name=start]").datepicker("setDate", "today");
        $("#history_form [name=end]").datepicker("setDate", "today");
        $("#bettingrecord").click();
    }, 1000);
    setInterval("$('#bettingrecord').click();", 30000);
});

var sideLogTemplate = $(".side-log-item")[0].outerHTML;
// $('.side-log-item').remove();

var getAllTradeBySelf = function (roomName) {
    appearRate = 0.1;
    maxCount = 3;
    minCount = 1;
    betBase = 100;
    maxBet = 50;
    minBet = 1;
    // console.log("random start");
    if (!$(".record-half2").length) return;
    if (appearRate >= Math.random()) {
        // console.log("success phase 1");
        let count =
            Math.floor(Math.random() * (maxCount - minCount)) + minCount;
        // console.log("count "+ count);
        for (i = 1; i <= count; i++) {
            let bet =
                (Math.floor(Math.random() * (maxBet - minBet)) + minBet) *
                betBase;
            let type = Math.floor(Math.random() * 7) + 1;
            // console.log("type "+ type);

            var today = new Date();
            today.setDate(today.getSeconds() - 5);

            // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var obj = new Object();
            obj.time = today;
            obj.roomName = roomName;
            obj.type = type;
            obj.bet = bet;

            appendLogForStock_k($(".record-half2"), obj);
        }
    }
};
var appendLogForStock_k = function (target, obj) {
    // console.log(target)
    resultText = [
        MessageType.getText("rise"), //"高標",
        MessageType.getText("fall"), //"低標",
        MessageType.getText("odd"), //"奇數",
        MessageType.getText("even"), //"偶數",
        MessageType.getText("up"), //"漲",
        MessageType.getText("down"), //"跌",
        MessageType.getText("not_same"), //"非平盤"
        MessageType.getText("up_before"), //"漲 (前一局)"
        MessageType.getText("down_before"), //"跌 (前一局)"
    ];
    resultList = [
        "result_high",
        "result_low",
        "result_odd",
        "result_even",
        "result_up",
        "result_down",
        "result_no_even",
        "result_up",
        "result_down",
    ];
    var time = new Date(obj.time);
    timeStr =
        time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    $newBet = new $(sideLogTemplate);
    $newBet
        .children(".list-bet")
        .children(".list-bet-time")
        .children(".bet-time")
        .html(timeStr);
    $newBet
        .children(".list-bet")
        .children(".list-bet-stat")
        .children(".list-bet-type")
        .children(".bet-type")
        .html(getLangRoomName(obj.roomName, obj.roomName));
    $newBet
        .children(".list-bet")
        .children(".list-bet-stat")
        .children(".list-bet-updown")
        .children(".bet-number")
        .html(resultText[obj.type - 1]);
    $newBet
        .children(".list-bet")
        .children(".list-bet-stat")
        .children(".list-bet-updown")
        .children(".bet-number")
        .addClass(resultList[obj.type - 1]);
    $newBet
        .children(".list-bet")
        .children(".list-bet-stat")
        .children(".list-bet-price")
        .children(".bet-price")
        .html(Number(obj.bet));
    // console.log($newBet)
    $(target).append($newBet);
    nowLength = $(target).children().length;
    if (nowLength > 10) {
        for (j = 1; j <= nowLength - 10; j++) {
            // console.log(nowLength)
            $(target).children()[1].remove();
        }
    }
};

var showReLoginWindow = function () {
    showMessageBox(
        MessageType.getText("relogin_message"),
        "",
        { showCancel: false },
        function () {
            setTimeout(function () {
                showReLoginWindow();
            }, 500);
        }
    );
};

var showOutOfConnectCountWindow = function () {
    showMessageBox(
        MessageType.getText("exceed_max_connetion"),
        "",
        { showCancel: false },
        function () {
            setTimeout(function () {
                window.close();
            }, 500);
        }
    );
};

var showInvalidWindow = function (msg) {
    showMessageBox(msg, "", { showCancel: false });
};

var setBetButtonEnable = function (isEnable) {
    if (isEnable) {
        $(".btn-buy").removeAttr("disabled");
    } else {
        $(".btn-buy").attr("disabled", true);
    }
};

var showWaitWindow = function () {
    showMessageBox(MessageType.getText("betting"), "", {
        showConfirm: false,
        showCancel: false,
    });
};

function showMessageBox(
    title = "",
    content = "",
    param,
    confirmCallback = null,
    cancelCallback = null
) {
    var o = $.extend(
        {
            showConfirm: true,
            showCancel: true,
            afterConfirmHide: true,
        },
        param || {}
    );

    if (o.showConfirm) {
        $("#lightBoxAlert .btn-confirm")
            .off()
            .click(function () {
                if (o.afterConfirmHide) hideMessageBox();

                if (confirmCallback) confirmCallback();
            })
            .show();
    } else {
        $("#lightBoxAlert .btn-confirm").hide();
    }

    // if(o.showCancel)
    // {
    // 	$('#lightBoxAlert .btn-cancel').off().click(function(){
    // 		if(cancelCallback)
    // 			cancelCallback();
    // 	}).show();
    // } else {
    // 	$('#lightBoxAlert .btn-cancel').hide();
    // }

    $("#lightBoxAlert .lightBox-header").text(title);
    $("#lightBoxAlert .lightBox-message").html("<p>" + content + "</p>");
    lightBox("#lightBoxAlert");
}
function hideMessageBox() {
    lightBoxClose();
}

var init_game = function (game) {
    game = parseInt(game);
    this.game = game;

    msgBuffTime = 2;

    this.buffSeconds = 999999;
    this.preDrawTime = 0;
    this.nextDrawTime = 0;
    this.initDrawContent;
    this.closeTime = 0;
    this.lastSeconds = 0;

    //資料更新狀態
    isPriceInfoInit = false;
    prePriceArray = {};

    var roomsIsOpen = {};
    var isOpen = 0; //0 等待初始化 1正常開啟 -1即將關閉 -2已關閉

    var webUser;
    this.setWebUser = function (u) {
        webUser = u;

        var request = new JoinRoomRequest();
        request.room_id = game;
        webUser.send(request);
    };

    var currentDrawLotteryId;
    var betPatternDataList;
    var invalidMsg = "";

    this.onMessage = function (e) {
        if (e.GetClassName == "UpdateUserBalanceResponse") {
            myUser.setBalance(e.balance);
            $("#wallet").text(myUser.getViewBalance());
        } else if (
            e.GetClassName == "GetRoomInfoResponse" ||
            e.GetClassName == "JoinRoomResponse"
        ) {
            if (e.GetClassName == "JoinRoomResponse") {
                if (e.is_success == false) {
                    showMessageBox(
                        ErrorType.getText(e.error_id),
                        "",
                        { showCancel: false },
                        function () {
                            window.close();
                        }
                    );
                    return;
                }

                if (kline_switch) {
                    var klineRequest = new GetKlineHistoryRequest();
                    klineRequest.room_id = game;
                    webUser.send(klineRequest);
                }

                myUser.isJoinRoom = true;
                betPatternDataList = new BetPatternDataList(
                    e.bet_pattern_data_list
                );

                // var draw_lottery_log_list = [{draw_lottery_num:e.before_draw_lottery_num, draw_lottery_content:e.before_draw_lottery_content}];
                // addNewHistoryDrawLotteryLog(draw_lottery_log_list);
                // refreshDrawLotteryView(e.before_draw_lottery_num);

                this.buffSeconds = e.buffer_seconds;
                this.preDrawTime =
                    Math.floor(e.before_draw_lottery_server_time / 1000) * 1000;
                this.initDrawContent = e.before_draw_lottery_content;
                afterJoinRoom();
            } else {
                //開市判斷
                if (!e.is_wait_draw_lottery) {
                    //還沒初始化 就去要歷史資料
                    if (isOpen == 0) {
                        var request = new GetBinaryPriceInfoRequest();
                        request.room_id = initGame.game;
                        request.count = 60;
                        webUser.send(request);
                    }
                    //遊戲開始
                    isOpen = 1;
                } else {
                    //一進遊戲就休市
                    if (isOpen == 0) {
                        isOpen = -2;
                        isPriceInfoInit = true;
                    }
                }

                if (e.other_room_state_list)
                    for (var i = 0; i < e.other_room_state_list.length; i++) {
                        var room_state = e.other_room_state_list[i];
                        roomsIsOpen[room_state.room_id] =
                            !room_state.is_wait_draw_lottery;
                    }

                if (isUsePayRateOffset) {
                    betPatternDataList.bet_pattern_data_list =
                        e.bet_pattern_data_list;
                    afterJoinRoom();

                    let bet_rates = "";
                    $("#Game_form input[type=radio]:checked").each(function () {
                        if (bet_rates.length > 0) bet_rates += ",";

                        let content = getBetText(this.id, null, null);
                        bet_rates += content[1];
                    });
                    $("#lightBoxConfirm_bet_rates").text(bet_rates);
                }
            }

            //沒設定或參數為空視為有效 下注按鈕切換成可以使用
            if (
                typeof e.invalid == "undefined" ||
                e.invalid == null ||
                e.invalid == ""
            ) {
                if (invalidMsg.length > 0) {
                    invalidMsg = "";
                    setBetButtonEnable(true);
                }
            }
            //如果參數有值為無效, Client無效訊息為空就顯示訊息
            else if (invalidMsg.length == 0) {
                invalidMsg = e.invalid;
                showInvalidWindow(invalidMsg);
                setBetButtonEnable(false);
            }

            currentDrawLotteryId = e.draw_lottery_id;

            $("#gameid").text(e.draw_lottery_num);

            let last_seconds = parseInt(e.last_seconds) - this.buffSeconds;
            var s = last_seconds;
            var ss = s % 60;
            s = Math.floor(s / 60);
            var mm = s % 60;
            var hh = Math.floor(s / 60);
            ss = ss > 9 ? ss : "0" + ss;
            mm = mm > 9 ? mm : "0" + mm;
            hh = hh > 9 ? hh : "0" + hh;

            $("#countdown").text(hh + ":" + mm + ":" + ss);
            $("#countdown").attr("last_seconds", last_seconds);

            let server_time = new Date(e.server_time);
            $("#now_datetime").text(server_time.format("yyyy/MM/dd HH:mm:ss"));

            //是否開啟遮蔽
            if (isOpen == -2) {
                $(".game_cover").fadeIn().show();
            } else {
                $(".game_cover").fadeOut(1000, function () {
                    $(this).hide();
                });
            }
            /*
			if(e.is_wait_draw_lottery && e.last_seconds == 0)
				$('.game_cover').fadeIn().show();
			else
				$('.game_cover').fadeOut(1000, function(){$(this).hide()});
			*/
            //Chart控制內容
            if (e.GetClassName == "GetRoomInfoResponse" && exchangeChart) {
                //設定StartLine & StopLine
                if (isOpen == 1) {
                    var serverTime = Math.floor(e.server_time / 1000);
                    var stopTime = serverTime + e.last_seconds + msgBuffTime;
                    var startTime = stopTime - this.buffSeconds;
                    var startTimestamp = startTime * 1000;
                    if (startTimestamp > exchangeChart.startTime) {
                        exchangeChart.setStopTime(stopTime * 1000);
                        exchangeChart.setStartTime(startTime * 1000);
                    }
                } else if (isOpen == -1) {
                    //移除START 和 STOP
                    exchangeChart.setStopTime(0);
                    exchangeChart.setStartTime(0);
                }

                if (isOpen == -2) {
                    //已休市 不需調整GameLine
                } else if (e.wait_draw_lottery_list) {
                    if (e.is_wait_draw_lottery) {
                        isOpen = -1;
                    }

                    //找出最大倒數秒數(最新期的開獎)
                    var drawTime = Math.max.apply(
                        Math,
                        e.wait_draw_lottery_list.map(function (d) {
                            return d.last_draw_lottery_seconds;
                        })
                    );
                    var drawTimestamp = 0;
                    var now = Math.floor(e.server_time / 1000);

                    drawTimestamp = (now + drawTime) * 1000;
                    //誤差正負一秒 不插新線(防止誤差抖動)
                    if (
                        drawTimestamp >= exchangeChart.gameTime - 1000 &&
                        drawTimestamp <= exchangeChart.gameTime + 1000
                    )
                        drawTimestamp = exchangeChart.gameTime;

                    if (drawTimestamp != exchangeChart.gameTime) {
                        exchangeChart.setGameTime(drawTimestamp);
                        this.nextDrawTime = drawTimestamp;
                    }
                    exchangeChart.setGameLabel(
                        MessageType.getText("current_settlement") +
                            drawTime +
                            MessageType.getText("sec")
                    );
                }
                //沒有等待開獎訊息
                else {
                    //ROOM不是開啟狀態
                    if (isOpen == -1) {
                        //console.log("即將關閉 ===> 關閉");
                        //isOpen = -2;
                        //開始休市表演
                    }
                }

                exchangeChart.setLastSeconds(e.last_seconds);
            }
        } else if (e.GetClassName == "GetBinaryPriceInfoResponse") {
            var serverTime = Math.floor(e.server_time / 1000);
            for (var i = 0; i < e.room_binary_price_list.length; i++) {
                var room_id = e.room_binary_price_list[i].room_id;
                var price_list = e.room_binary_price_list[i].binary_price_list;

                //更新歷史資料
                if (room_id == game) {
                    if (price_list)
                        for (var j = 0; j < price_list.length; j++) {
                            var timestamp = (serverTime - j) * 1000;
                            var price = price_list[j];
                            if (line_switch || bar_switch) {
                                if (
                                    this.initDrawContent &&
                                    timestamp == this.preDrawTime
                                ) {
                                    //如果還沒設定gameLine 將GameLine設定為上期開獎時間與資料
                                    if (exchangeChart.gameTime == 0) {
                                        exchangeChart.setGameLabel(
                                            MessageType.getText(
                                                "current_settlement"
                                            ) + this.initDrawContent
                                        );
                                        exchangeChart.setGameTime(
                                            this.preDrawTime
                                        );
                                    }
                                    price = this.initDrawContent;
                                    this.initDrawContent = null;
                                }

                                //if(this.nextDrawTime != timestamp){//是否等待開獎資料

                                if (
                                    isOpen != -2 &&
                                    !(
                                        isOpen == -1 &&
                                        timestamp > exchangeChart.gameTime
                                    )
                                ) {
                                    exchangeChart.addNewData({
                                        time: timestamp,
                                        value: price,
                                    });
                                }
                                //}
                            }
                            if (kline_switch) {
                                addKlineData({ time: timestamp, value: price });
                            }
                            $("#lightBoxConfirm_price").text(price_list[j]);
                        }
                }

                var rs = roomsIsOpen[room_id];
                //更新TopList
                //如果ROOM不是開啟狀態
                if (rs == null) {
                    continue;
                } else if (!rs) {
                    switchRoom(room_id, false);
                } else if (
                    e.room_binary_price_list[i].binary_price_list &&
                    e.room_binary_price_list[i].binary_price_list[0]
                ) {
                    switchRoom(room_id, true);

                    var prePrice = prePriceArray[room_id]
                        ? prePriceArray[room_id]
                        : 0;
                    var price =
                        e.room_binary_price_list[i].binary_price_list[0];
                    var price_end = price.slice(-2);
                    var price_front = price.substr(0, price.length - 2);
                    var endObj = $(
                        "#choices_" + room_id + " .list-item-price span.l"
                    )
                        .html(price_end)
                        .prop("outerHTML");
                    $("#choices_" + room_id + " .list-item-price .price").html(
                        price_front + endObj
                    );

                    var diffPercent = 0;
                    if (prePrice > 0) {
                        diff = price - prePrice;
                        //console.log("prePrice = " + prePrice + " price = " + price + " diff = " +diff);
                        diffPercent = (diff * 100).toFixed(4);
                        $("#choices_" + room_id + " .list-item-updown")
                            .removeClass("up")
                            .removeClass("down")
                            .addClass(diff < 0 ? "down" : "up");
                        $(
                            "#choices_" + room_id + " .list-item-updown .number"
                        ).html(diffPercent + "%");
                    }
                    //console.log(diffPercent);
                    prePriceArray[room_id] = price;
                    getAllTradeBySelf(room_id);
                }
            }

            isPriceInfoInit = true;
        } else if (e.GetClassName == "DrawLotteryResponse") {
            cacheTodayBetHistoryList = null; // 開獎就清除所有 cache
            if (exchangeChart) {
                exchangeChart.addNewData(
                    { time: this.nextDrawTime, value: e.draw_lottery_content },
                    true
                );
                exchangeChart.setGameLabel(
                    MessageType.getText("current_settlement") +
                        e.draw_lottery_content
                );
            }
            if (isOpen == -1) isOpen = -2;

            addDrawLotteryHistory(e);

            // var draw_lottery_log_list = [{draw_lottery_num:e.draw_lottery_num, draw_lottery_content:e.draw_lottery_content}];
            // addNewHistoryDrawLotteryLog(draw_lottery_log_list);
            // refreshDrawLotteryView(e.draw_lottery_num);
        } else if (e.GetClassName == "UserBetResponse") {
            myUser.setBalance(e.balance);
            $("#wallet").text(myUser.getViewBalance());

            if (e.is_success) {
                lightBox("#lightBoxSuccess");
                $("form").trigger("reset");

                if (cacheTodayBetHistoryList) {
                    for (
                        let index = 0;
                        index < cacheTodayBetHistoryList.length;
                        index++
                    ) {
                        const element = cacheTodayBetHistoryList[index];
                        if (element.room_id == game) {
                            cacheTodayBetHistoryList[index] = null; // 清除這個房間的 cache
                            break;
                        }
                    }
                }
            } else {
                var text = String.format(
                    ErrorType.getText(e.error_id),
                    e.error_param
                );
                showMessageBox(MessageType.getText("bet_failed"), text, {
                    showCancel: false,
                });
            }
        } else if (e.GetClassName == "GetDrawLotteryHistoryResponse") {
            if (e.is_success) {
                onGetDrawLotteryHistorResponse(e.draw_lottery_log_list);
            }
            // if(e.is_success)
            // {
            // 	if(e.draw_lottery_log_list)
            // 	{
            // 		addNewHistoryDrawLotteryLog(e.draw_lottery_log_list);
            // 		if(downloadHistoryDrawLotteryLogFinishCallback){
            // 			downloadHistoryDrawLotteryLogFinishCallback();
            // 		}
            // 	} else {
            // 		if(downloadHistoryDrawLotteryLogFinishCallback){
            // 			downloadHistoryDrawLotteryLogFinishCallback();
            // 		}
            // 	}
            // }
        } else if (e.GetClassName == "GetBetHistoryResponse") {
            onDownloadBetHistoryResponse(e);
        } else if (e.GetClassName == "GetKlineHistoryResponse") {
            addKlineHistory(JSON.parse(e.kline_history_list));
            // console.log("GetKlineHistoryResponse", e);
            // console.log(JSON.parse(e.kline_history_list));
        }
    };

    setInterval(function () {
        if (myUser.isJoinRoom) {
            var request = new GetRoomInfoRequest();
            request.room_id = game;
            webUser.send(request);

            if (isPriceInfoInit) {
                var request = new GetBinaryPriceInfoRequest();
                request.group_id = GROUP_ID;
                request.count = 1;
                webUser.send(request);
            }
        }
    }, 1000);

    this.afterGetRoomData = function (room) {
        $("#lightBoxConfirm_game").text(
            getLangRoomName(room.room_id, room.room_name)
        );
        $("#lightBoxSuccess_game").text(
            getLangRoomName(room.room_id, room.room_name)
        );
    };

    function afterJoinRoom() {
        $("#Game_form input[type=radio]").each(function () {
            let bet = $(this).attr("bet_value").split("_");
            let payRate = betPatternDataList.getPayRate(bet[0], -1);

            if (isUsePayRateOffset) {
                let payRateOffset = betPatternDataList.getPayRateOffset(
                    bet[0],
                    -1
                );
                if (bet[1] == 2) payRateOffset *= -1;
                payRate = parseFloat(
                    (
                        parseFloat(payRate * 100) +
                        parseFloat(payRateOffset * 100)
                    ).toFixed(2)
                );
            } else {
                payRate = payRate * 100;
            }

            $input = $(this);
            $input
                .parent()
                .children("[for=" + $input.attr("id") + "]")
                .children(".bet1")
                .text(payRate + "%");
        });

        if (!drawLotteryHistoryList) {
            // 下載 100 筆開獎記錄
            var request = new GetDrawLotteryHistoryRequest();
            request.room_id = game;
            request.count = 100;
            webUser.send(request);
        }
    }

    function getBetMoney() {
        let bet_money = $("#amount-input").val();
        bet_money = parseInt(bet_money);
        if (!bet_money || bet_money < 0) bet_money = 0;
        return bet_money;
    }

    $("#lightBoxConfirm .btn-cancel").bind("click", function () {
        $("#Game_form").trigger("reset");
    });

    $("#lightBoxConfirm .btn-confirm").bind("click", function () {
        let bet_money = getBetMoney();

        let bet_data_list = [];
        $("#Game_form input[type=radio]:checked").each(function () {
            let bet = $(this).attr("bet_value").split("_");

            let betData = new BetData();
            betData.bet_pattern_id = parseInt(bet[0]);
            betData.bet_balance = bet_money;
            betData.bet_pattern_content = bet[1];
            bet_data_list.push(betData);
        });

        if (checkBetFormSumit(bet_data_list)) {
            var request = new UserBetRequest();
            request.room_id = game;
            request.draw_lottery_id = currentDrawLotteryId;
            request.bet_data_list = bet_data_list;
            webUser.send(request);

            showWaitWindow();
        }
    });

    $("[type=radio]").bind("click", function () {
        $(this).prop("checked", true);

        $("#btn_submit").submit();
    });

    $("#Game_form").submit(function (event, src) {
        let bet_patterns = "",
            bet_rates = "",
            bet_count = 0;
        $("#Game_form input[type=radio]:checked").each(function () {
            if (bet_patterns.length > 0) bet_patterns += ",";
            if (bet_rates.length > 0) bet_rates += ",";

            let content = getBetText(this.id, null, null);
            bet_patterns += content[0];
            bet_rates += content[1];

            bet_count++;
        });

        $("#lightBoxConfirm_bet_patterns").text(bet_patterns);
        $("#lightBoxConfirm_bet_rates").text(bet_rates);
        $("#lightBoxConfirm_bet_balance").text(getBetMoney());

        $("#lightBoxSuccess_bet_patterns").text(bet_patterns);
        $("#lightBoxSuccess_bet_balance").text(getBetMoney() * bet_count);

        lightBox("#lightBoxConfirm");
        return false;
    });

    $("#Game_form").on("reset", function () {
        $("#Game_form input[type=radio]").val(0);
    });

    // 歷史紀錄
    var cacheTodayBetHistoryList = null;

    $("#openbettingrecord").bind("click", function () {
        $("#history_roomList option").each(function () {
            $thisObj = $(this);
            if ($thisObj.val() == game) {
                $thisObj.attr("selected", true);
            } else {
                $thisObj.attr("selected", false);
            }
        });
        $("#history_form [name=stock-number]").val("");
        $("#history_form [name=start]").datepicker("setDate", "today");
        $("#history_form [name=end]").datepicker("setDate", "today");

        cleanBetHistoryPage();
    });
    $("#bettingrecord").bind("click", function () {
        let room_id = $("#history_roomList").val();
        let draw_lottery_num = $("#history_form [name=stock-number]").val();
        let start = new Date(
            $("#history_form [name=start]").val() + "T00:00:00"
        ).getTime();
        let end = new Date(
            $("#history_form [name=end]").val() + "T23:59:59"
        ).getTime();

        downloadBetHistory(room_id, 1, draw_lottery_num, start, end);
    });

    function cleanBetHistoryPage() {
        $("#bet_history_table").html("");
        $("#bet_history_pages").html("");
    }

    function getBetHistoryCache(room_id, draw_lottery_num, startDay, endDay) {
        let currentCache = null;
        for (let index = 0; index < cacheTodayBetHistoryList.length; index++) {
            const element = cacheTodayBetHistoryList[index];
            if (!cacheTodayBetHistoryList[index]) continue;
            if (element.room_id == room_id) {
                if (draw_lottery_num) {
                    if (
                        element.draw_lottery_num &&
                        element.draw_lottery_num == draw_lottery_num
                    ) {
                        currentCache = element;
                        break;
                    }
                } else if (element.start == startDay && element.end == endDay) {
                    currentCache = element;
                    break;
                }
            }
        }
        return currentCache;
    }

    function downloadBetHistory(room_id, page, draw_lottery_num, start, end) {
        if (!Number.isInteger(start) || !Number.isInteger(end)) return;
        room_id = parseInt(room_id);

        cleanBetHistoryPage();

        if (cacheTodayBetHistoryList) {
            let startDay = new Date(start).format("yyyy-MM-dd");
            let endDay = new Date(end).format("yyyy-MM-dd");
            let currentCache = getBetHistoryCache(
                room_id,
                draw_lottery_num,
                startDay,
                endDay
            );
            if (currentCache && currentCache.cache[page]) {
                onDownloadBetHistoryResponse(currentCache.cache[page]);
                return;
            }
        }

        var request = new GetBetHistoryRequest();
        request.room_id = room_id;
        request.page = page;

        request.draw_lottery_num = draw_lottery_num;
        request.from_date = start;
        request.to_date = end;

        if (request.draw_lottery_num || (request.from_date && request.to_date))
            webUser.send(request);
    }

    function onDownloadBetHistoryResponse(e) {
        if (!e.is_success) return;

        if (e.page <= 0) e.page = 1;

        let room_id = $("#history_roomList").val();
        let draw_lottery_num = e.draw_lottery_num;
        let start = new Date(e.from_date).format("yyyy-MM-dd");
        let end = new Date(e.to_date).format("yyyy-MM-dd");

        if (!cacheTodayBetHistoryList) cacheTodayBetHistoryList = [];
        let currentCache = getBetHistoryCache(
            room_id,
            draw_lottery_num,
            start,
            end
        );
        if (!currentCache) {
            currentCache = { room_id: room_id, cache: [] };
            if (draw_lottery_num) {
                currentCache.draw_lottery_num = draw_lottery_num;
            } else {
                currentCache.start = start;
                currentCache.end = end;
            }
            cacheTodayBetHistoryList.push(currentCache);
        }
        currentCache.cache[e.page] = e;

        if (!e.bet_log_data_list) {
            $("#bet_history_table").html(MessageType.getText("no_data"));
            return;
        }

        let table_body = "";
        //for stock_k
        if ($(".record-half").length) {
            $(".record-half .list-bet").remove();
        }
        for (let i = 0; i < e.bet_log_data_list.length; i++) {
            const element = e.bet_log_data_list[i];
            const bet_log_row = element.bet_log_row;

            let bet_time = new Date(bet_log_row.bet_time).format(
                "yyyy-MM-dd HH:mm:ss"
            );
            let bet_content = bet_log_row.bet_pattern_content.split(";");
            let payout_ratio = bet_log_row.payout_ratio.split(";");
            let result = bet_log_row.result
                ? bet_log_row.result.split(";")
                : null;
            let note = bet_log_row.note ? JSON.parse(bet_log_row.note) : null;
            let binary_price = note
                ? note[0]
                    ? note[0]["binary_price"]
                    : note["binary_price"]
                : "--";
            let result_text =
                note && note.length > 1
                    ? note[1]["draw_lottery_content"]
                    : "--";
            //let bet_p_text = getPatternText(bet_log_row.bet_pattern_id);

            if (bet_log_row.bet_pattern_id == 91) {
                binary_price =
                    note &&
                    note.length > 1 &&
                    typeof note[1]["before_draw_lottery_content"] != "undefined"
                        ? note[1]["before_draw_lottery_content"]
                        : "--";
            }

            var invalid =
                note == null ||
                note[1] == null ||
                typeof note[1]["event"] == "undefined" ||
                note[1]["event"] == null ||
                note[1]["event"] == ""
                    ? ""
                    : note[1]["event"] == "DrawLottery Invalid"
                    ? "&emsp;&emsp;" + MessageType.getText("invalid")
                    : "";

            for (
                let j = element.from_index;
                j < element.from_index + element.get_count;
                j++
            ) {
                let bet_c_text = getBetText(
                    null,
                    bet_log_row.bet_pattern_id,
                    bet_content[j]
                );
                let bet_result_class = result
                    ? parseInt(result[j]) > 0
                        ? "bet_result_plus"
                        : "bet_result_minus"
                    : "bet_result_none";

                table_body +=
                    '<table class="table-bet mode1">\
								<thead><tr><th>' +
                    MessageType.getText("bet_num") +
                    "</th><th>" +
                    bet_log_row.bet_num +
                    "</th></tr></thead>\
								<thead><tr><th>" +
                    MessageType.getText("trade_time") +
                    "</th><th>" +
                    bet_time +
                    "</th></tr></thead>\
								<thead><tr><th>" +
                    MessageType.getText("draw_lottery_num") +
                    "</th><th>" +
                    bet_log_row.draw_lottery_num +
                    invalid +
                    "</th></tr></thead>\
								<thead><tr><th>" +
                    MessageType.getText("content") +
                    "</th><th>" +
                    bet_c_text[0] +
                    "</th></tr></thead>\
								<thead><tr><th>" +
                    MessageType.getText("pay_rate") +
                    "</th><th>" +
                    payout_ratio[j] +
                    "</th></tr></thead>\
								<thead><tr><th>" +
                    MessageType.getText("rate") +
                    "</th><th>" +
                    binary_price +
                    "</th></tr></thead>\
								<thead><tr><th>" +
                    MessageType.getText("result") +
                    "</th><th>" +
                    result_text +
                    "</th></tr></thead>\
								<thead><tr><th>" +
                    MessageType.getText("amount") +
                    "</th><th>" +
                    bet_log_row.bet_balance +
                    "</th></tr></thead>\
								<thead><tr><th>" +
                    MessageType.getText("my_result") +
                    '</th><th class="' +
                    bet_result_class +
                    '">' +
                    (result ? result[j] : "--") +
                    "</th></tr></thead>\
								</table>";

                if ($(".record-half").length) {
                    var obj = new Object();
                    obj.time = bet_log_row.bet_time;
                    obj.roomName = e.room_id;

                    bet_contentz = bet_content[j].split(",");
                    switch (bet_log_row.bet_pattern_id) {
                        case 44:
                            if (bet_contentz[0] == 1) obj.type = 5;
                            else obj.type = 6;
                            break;
                        case 45:
                            if (bet_contentz[0] == 1) obj.type = 1;
                            else obj.type = 2;
                            break;
                        case 46:
                            if (bet_contentz[0] == 1) obj.type = 3;
                            else obj.type = 4;
                            break;
                        case 47:
                            obj.type = 7;
                            break;
                        case 91:
                            if (bet_contentz[0] == 1) obj.type = 8;
                            else obj.type = 9;
                            break;
                    }
                    // obj.type = bet_log_row.bet_pattern_id;
                    obj.bet = result;
                    appendLogForStock_k($(".record-half"), obj);
                    // console.error(obj);
                    // console.error(bet_log_row.bet_pattern_id, bet_content[j]);
                }
            }
        }
        $("#bet_history_table").html($(table_body));

        $("#bet_history_pages").pagination({
            items: e.total_page,
            itemsOnPage: 1,
            prevText: "«",
            nextText: "»",
            ellipsePageSet: false,
            currentPage: e.page,
            listStyle: "pagination",
            hrefTextPrefix: "javascript:void(",
            hrefTextSuffix: ")",
            onPageClick: function (pageNumber, event) {
                if (event && event.type == "click") {
                    downloadBetHistory(
                        room_id,
                        pageNumber,
                        e.draw_lottery_num,
                        e.from_date,
                        e.to_date
                    );
                }
            },
        });
    }

    function checkBetFormSumit(bet_data_list) {
        var msg;

        if (!myUser.isJoinRoom) msg = MessageType.getText("network_fail");

        var last_seconds = $("#countdown").attr("last_seconds");
        if (!msg && last_seconds <= 0) msg = ErrorType.getText(30003);

        var bet_count = bet_data_list.length;
        if (!msg && bet_count == 0) msg = ErrorType.getText(30007);

        if (!msg) {
            var all_bet_money = 0;
            for (let i = 0; i < bet_data_list.length; i++) {
                const betData = bet_data_list[i];

                var betBalanceLimit = betPatternDataList.getBetBalanceLimit(
                    betData.bet_pattern_id
                );
                if (
                    betBalanceLimit.min >= 0 &&
                    betData.bet_balance < betBalanceLimit.min
                )
                    msg = ErrorType.getText(30100);
                else if (
                    betBalanceLimit.max >= 0 &&
                    betData.bet_balance > betBalanceLimit.min
                )
                    msg = ErrorType.getText(30101);

                if (msg) break;
                all_bet_money += betData.bet_balance;
            }
            if (!msg && all_bet_money <= 0) msg = ErrorType.getText(30006);

            if (!msg && all_bet_money > myUser.getBalance())
                msg = ErrorType.getText(30004);
        }

        if (msg) {
            setTimeout(function () {
                $("#lightBoxError .lightBox-content > p").text(msg);
                lightBox("#lightBoxError");
            }, 300);

            return false;
        }
        return true;
    }
};

function getBetText(id, bet_pattern_id, bet_content) {
    if (id) {
        $input = $("#" + id);
    } else if (bet_pattern_id == 47) {
        $input = $("#Game_form [bet_value=" + bet_pattern_id + "_" + 0 + "]");
    } else {
        bet_content = bet_content.split(",");
        $input = $(
            "#Game_form [bet_value=" +
                bet_pattern_id +
                "_" +
                bet_content[0] +
                "]"
        );
    }

    $label = $input.parent().children("[for=" + $input.attr("id") + "]");
    let rate = $label.children(".bet1").text();
    let content = $label.text().replace(rate, "");
    return [content, rate];
}

function switchRoom(room_id, is_open) {
    if (is_open) {
        $("#choices_" + room_id + " .list-item-price").show();
        $("#choices_" + room_id + " .list-item-updown").show();
        $("#choices_" + room_id + " .list-item-close").hide();
    } else {
        $("#choices_" + room_id + " .list-item-price").hide();
        $("#choices_" + room_id + " .list-item-updown").hide();
        $("#choices_" + room_id + " .list-item-close").show();
    }
}

function getLangRoomName(room_id, original_name) {
    if (typeof lang == "undefined") {
        return original_name;
    }
    if (typeof roomNameList[room_id] == "undefined") {
        return original_name;
    }
    // if (typeof roomNameList == "undefined") {
    // return original_name;
    // }
    // if (typeof roomNameList[nowLang] == "undefined") {
    // return original_name;
    // }
    // if (typeof roomNameList[nowLang][room_id] == "undefined") {
    // return original_name;
    // }
    return roomNameList[room_id];
}

var drawLotteryHistoryList;
var hasGetDrawHistoryList = false;
var lastDraw;
function onGetDrawLotteryHistorResponse(draw_lottery_log_list) {
    hasGetDrawHistoryList = true;
    // 下載完成前就收到開獎結果的訊息
    if (tempDrawLotteryHistoryList)
        while ((temp = tempDrawLotteryHistoryList.pop())) {
            draw_lottery_log_list.push(temp);
        }
    tempDrawLotteryHistoryList = null;

    if (
        typeof draw_lottery_log_list == "undefined" ||
        draw_lottery_log_list == null ||
        draw_lottery_log_list.length <= 1
    ) {
        tempDrawLotteryHistoryList = draw_lottery_log_list;
        refreshDrawHistoryCountUI();
        return;
    }

    drawLotteryHistoryList = new DrawLotteryHistoryList(draw_lottery_log_list, {
        max_draw_history_list_count: $(".innerResult-item").length,
        get_buySell_fun: getBuySell,
    });

    refreshDrawHistoryListUI();
    refreshDrawHistoryCountUI();
}

var tempDrawLotteryHistoryList = null;
function addDrawLotteryHistory(e) {
    if (drawLotteryHistoryList) {
        var newLogObj = drawLotteryHistoryList.addHistory(e);

        refreshDrawHistoryListUI();
        refreshDrawHistoryCountUI();
    } else {
        if (tempDrawLotteryHistoryList == null) tempDrawLotteryHistoryList = [];
        tempDrawLotteryHistoryList.push(e);

        if (tempDrawLotteryHistoryList.length >= 2 && hasGetDrawHistoryList) {
            onGetDrawLotteryHistorResponse([]);
        }
    }
}

function getBuySell(lo) {
    return lo.content > lo.pre_content
        ? 1
        : lo.content < lo.pre_content
        ? 2
        : 3;
}

function refreshDrawHistoryListUI() {
    $uis = $("#result_item .innerResult-item");
    count = $uis.length;

    for (i = 0; i < count; i++) {
        if (i >= drawLotteryHistoryList.getHistoryListCount()) break;
        draw = drawLotteryHistoryList.getHistory(i);
        buyOrSell = draw.lotteryList[0].buySell;

        $uis.eq(i).removeClass("color-buy");
        $uis.eq(i).removeClass("color-sell");
        $uis.eq(i).removeClass("color-same");

        $uis.eq(i).addClass(
            buyOrSell == 1
                ? "color-buy"
                : buyOrSell == 2
                ? "color-sell"
                : "color-same"
        );
    }
}

function refreshDrawHistoryCountUI() {
    $("#tag-buy-amount").text($("#result_item .color-buy").length);
    $("#tag-sell-amount").text($("#result_item .color-sell").length);
}
