@include('head')

<!-- Body -->

<body>
    <!-- Header -->
    <div class="container">
        @include('header')


        <main class="main">
            <script src="js/6603bd9dd4.js"></script>
            <style>
                .main {
                    background: #fff url(img/sacem/block-1-bg.jpg) no-repeat fixed center / cover;
                }
            </style>

            <div class="member-center">
                <div class="wrap">
                    <div class="member-block">
                        @include('menu-member')
                        <section id="mainWrap" class="member-center-block">
                            <div id="Title" class="member-center-title">
                                <h1>Nạp tiền</h1>
                            </div>

                            <div class="display-flex">
                                <table class="tg">
                                    <tbody>
                                        <tr>
                                            <th class="tg-mx2v" colspan="11" width="200">
                                                <h3>Phòng trò chơi</h3>
                                            </th>
                                            <th class="tg-mx2v getCredit" colspan="2" style="min-width:100px;">
                                                <div class="credit">
                                                    <h3>Số tiền</h3><i class="fa fresh-btn" aria-hidden="true"></i>
                                                </div>
                                            </th>
                                        </tr>

                                        <tr>
                                            <td class="tg-hx5v" colspan="11" width="300">
                                                <h4><b att-id="1">Ví điện tử</b></h4>
                                            </td>
                                            <td class="tg-hx5v getCredit-js" colspan="2" width="100">
                                                <h4 name="Wallet">0</h4>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td class="tg-hx5v" colspan="11" width="300">
                                                <h4><b att-id="34">Trái phiếu điện tử</b></h4>
                                            </td>
                                            <td class="tg-hx5v getCredit-js" colspan="2" width="100">
                                                <h4 name="VVGame2">0</h4>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>

                                <div id="choosesolu" class="text-block">
                                    <form action="/ajax/store" method="POST" class="store_form">
                                        <div class="input-block">
                                            <h2>Phương thức giá trị được lưu trữ</h2>
                                            <div class="sumitonly-text">
                                                <p>
                                                    Hãy chú ý đến các hạn chế sau:
                                                    <br>

                                                    Biên lai công ty 　 : 100000-10000000000

                                                </p>
                                                <!-- <p>Giá trị tối thiểu được lưu trữ là 500.000 VND và Giá trị lưu trữ tối đa là 100.000.000 VND</p> -->
                                            </div>
                                            <select id="store-options" name="src_id" style="display: block;">

                                                <option value="1" data="" extratarmethod="">Ví điện tử</option>
                                                <!-- <input type="radio" name="src_id" value="1" data-target="0" data-note="　 : 100000-10000000000" -->
                                                <!-- style="width:20px;">Biên lai công ty -->

                                            </select>
                                            <select name="tar_method[bankcode]" id="bank-options"
                                                style="display: none;">
                                            </select>
                                        </div>
                                        <div class="input-block">
                                            <h2 for="amount">Nhập số tiền</h2>
                                            <input type="text" id="amount" name="total" valuex="1001">
                                        </div>
                                        <input type="hidden" id="tar_id" name="tar_id" value="1">
                                        <div id="saveChange">
                                            <button type="button" class="submit btn-store btn">
                                                <span>Giá trị lưu trữ</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div id="warning" class="warning">
                                <p>
                                    LƯU Ý : LẦN ĐẦU THAM GIA KHÁCH HÀNG RÚT ÍT NHẤT 100.000 ĐỒNG :
                                </p>
                                <ol>
                                    <li>
                                        Mỗi phiên giao dịch với số tiền cược tối thiểu là 100.000VND. Bạn nên xem xét rõ
                                        mã lệnh trước khi bắt đầu đặt cược.
                                    </li>
                                    <li>
                                        Rút tiền trực tiếp bạn vui lòng sử dụng thông tin tài khoản chính chủ cùng khớp
                                        với thông tin tài khoản đầu tư cũng như tài khoản ngân hàng. Tuyệt đối không sử
                                        dụng hoặc mượn thông tin của người khác có thể bị đóng băng tài khoản vĩnh viễn.
                                    </li>
                                    <li>
                                        Nhắc nhở bạn sau khi thanh toán hoàn tất vui lòng giữ đúng đơn hàng đã thanh
                                        toán, nếu có vấn đề nạp rút vui lòng liên hệ với dịch vụ chăm sóc khách hàng
                                        trực tiếp để được hỗ trợ nhanh nhất.
                                    </li>
                                </ol>

                            </div>
                        </section>
                    </div>
                </div>
            </div>



            <script>
                var onStoreChange = function () {
                    bankCode = $('#store-options :selected').attr("data");
                    if (typeof (bankCode) != 'undefined') {
                        bcs = null;
                        if (bankCode.length > 0) {
                            bcs = bankCode.split(";");
                        }
                        setupBankOptions(bcs);

                        extraTarMethod = $('#store-options :selected').attr("extratarmethod");

                        setuoExtraTarMethod(extraTarMethod.split(';'));
                    }
                };

                var setupBankOptions = function (bankCodes) {
                    //setupBankOptions(bcs);
                    $("#bank-options").find('option').remove();
                    if (bankCodes == null) {
                        $("#bank-options").hide();
                    } else {
                        $("#bank-options").show();
                        bankCodes.forEach(
                            function (e) {
                                bc = e.split(",");
                                $("#bank-options").append(new Option(bc[1], bc[0]));
                            }

                        );

                    }
                }

                var setuoExtraTarMethod = function (tarMethods) {
                    $(".extraTarMethod").remove();
                    console.log(tarMethods);
                    if (tarMethods) {
                        tarMethods.forEach(function (e) {
                            if (e.length > 1) {
                                e = e.split(",");
                                element = "<input type='text' class='extraTarMethod' name=\"tar_method[" + e[0] +
                                    "]\" placeholder=\"" +
                                    e[1] + "\">";
                                $("#bank-options").after(element);
                            }
                        });
                    }

                }



                $(function () {
                    onStoreChange();
                    $("#store-options").change(function () {
                        onStoreChange();
                    });

                    $('.store_form').find('.submit').onClick(function (data) {
                        if (data.code) {
                            // fail
                            swal({
                                title: data.text,
                                html: true,
                                customClass: 'swalPopup'
                            });
                        } else {
                            swal({
                                title: data.text,
                                html: true,
                                customClass: 'swalPopup'
                            }, function () {
                                if (data.html) {
                                    // credit card redirect
                                    window.open('/raw/' + data.html, '_blank');
                                } else {
                                    window.location = 'record_store';
                                }
                            });
                        }
                        $(this).button('reset');
                    }, function () {
                        $(this).button('loading');
                    });
                });
            </script>
            <script>
                jQuery.fn.extend({
                    feeTest: function () {

                        $(this).each(function () {

                            $('form').find('[name=src_id]').on('click', function () {
                                $('form').find('[name=total]').trigger('input');
                            })
                        });
                    }
                });
                $('[name=total]').feeTest();
                $('label').find('[name=src_id]').on('click', function () {
                    note = $(this).attr('data-note');
                    $(this).closest('span').find('p').text(note).prepend(($(this).val() == 5) ?
                        '<a class="label label-warning small" style="left: 15px" href="/card"><i class="fa fa-plus-circle" aria-hidden="true"></i> 綁定信用卡</a> ' :
                        '').show();
                }).eq(0).trigger('click');
                $('select[name=src_id]').change(function () {
                    note = $(this).find('option:selected').attr('data-note');
                    $(this).closest('.c_store').find('p').text(note).prepend(($(this).val() == 5) ?
                        '<a class="label label-warning small" style="left: 15px" href="/card"><i class="fa fa-plus-circle" aria-hidden="true"></i> 綁定信用卡</a> ' :
                        '').show();
                }).trigger('change');
            </script>
        </main>

    </div>
@include('footer')