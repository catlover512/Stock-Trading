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

                        <div id="mainWrap" class="member-center-block">
                            <div id="Title" class="member-center-title">
                                <h1>Rút tiền</h1>
                            </div>
                            <div id="withdrawList">
                                <form class="bank_form " method="post" action="/ajax/bank">
                                    <div id="bankName">
                                        <h2>Tên ngân hàng</h2>
                                        <select name="bank_id">

                                            <option value="128">(001)Vietcom Bank</option>

                                            <option value="129">(002)Exim Bank</option>

                                            <option value="130">(003)Vietin Bank</option>

                                            <option value="131">(004)SacomBank</option>

                                            <option value="132">(005)VP Bank</option>

                                            <option value="133">(006)Techcom</option>

                                            <option value="134">(007)BIDV Bank</option>

                                            <option value="135">(008)MB Bank</option>

                                            <option value="136">(009)KienLong Bank</option>

                                            <option value="137">(010)HD Bank</option>

                                            <option value="138">(011)SHB Bank</option>

                                            <option value="139">(012)SCB Bank</option>

                                            <option value="140">(013)ACB Bank</option>

                                            <option value="141">(014)AB Bank</option>

                                            <option value="142">(015)Agri Bank</option>

                                            <option value="143">(016)Bac A Bank</option>

                                            <option value="144">(017)BaoViet Bank</option>

                                            <option value="145">(018)DONGA Bank</option>

                                            <option value="146">(019)GP Bank</option>

                                            <option value="147">(020)INDOVINA Bank</option>

                                            <option value="148">(021)LienViet Post Bank</option>

                                            <option value="149">(022)MSB</option>

                                            <option value="150">(023)Nam A Bank</option>

                                            <option value="151">(024)Navi Bank</option>

                                            <option value="152">(025)NCB</option>

                                            <option value="153">(026)OCB (PHUONG DONG)</option>

                                            <option value="154">(027)PG Bank</option>

                                            <option value="155">(028)PVCOM Bank</option>

                                            <option value="156">(029)SaiGon Bank</option>

                                            <option value="157">(030)SeA Bank</option>

                                            <option value="158">(031)ShinHan Bank</option>

                                            <option value="159">(032)Tien Phong Bank</option>

                                            <option value="160">(033)United Overseas Bank</option>

                                            <option value="161">(034)VIB Bank</option>

                                            <option value="162">(035)VietABank</option>

                                            <option value="1089">(040)WOORI BANK VIETNAM</option>

                                        </select>
                                    </div>
                                    <div id="bankAccount">
                                        <h2>Tài khoản</h2>
                                        <input name="account_no" type="text">
                                    </div>
                                    <div id="accountName">
                                        <h2>Tên tài khoản</h2>
                                        <input name="account_name" type="text">
                                    </div>


                                    <h2>Tải lên tập tin</h2>


                                    <div class="p"
                                        style="background-color: aquamarine; height: 3px; width: 0px; margin: 1px">
                                    </div><input type="file" multiple=""
                                        style="background: transparent; border:none; box-shadow:none;">
                                    <p style="margin-top:4px;font-size: 0.75rem;">
                                        Vui lòng chụp ảnh hoặc tải trực tiếp thông tin tài khoản chính xác rõ ràng để
                                        tránh trường hợp thông tin cá nhân không hợp lệ.
                                    </p>

                                    <h2></h2>
                                    <div class="bankexample">
                                        <!-- <img src="img/bankexample.jpg" alt=""> -->
                                    </div>


                                    <div id="saveChange">
                                        <button type="button" class="submit btn-store btn"
                                            data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Gia công...">
                                            <span>Xác nhận</span>
                                        </button>
                                    </div>
                                    <div id="warning">
                                        <strong>CÂN NHẮC TRƯỚC KHI THIẾT LẬP LỆNH RÚT : <br>
                                            1. Sau khi thành viên điền tất cả các thông tin cá nhân đầu tiên sẽ không
                                            thay đổi hoặc sửa lại thông tin xin chú ý .
                                            <br>
                                            2. Để ngăn chặn kẻ xấu đăng nhập và đánh cắp tài khoản đầu tư của bạn vui
                                            lòng không cung cấp bất kì thông tin cá nhân cho người khác.
                                            <br>
                                            3. Nếu có nhu cầu thay đổi thông tin về tài khoản đầu tư bạn vui lòng liên
                                            hệ với Dịch Vụ Chăm Sóc Khách Hàng để được hỗ trợ.
                                            <br>
                                            4. Nếu bạn sử dụng tài khoản đầu tư vào mục đích bất chính, gian lận, rửa
                                            tiền. Sàn có quyền xem xét về tài khoản của bạn có thể sẽ đóng băng vĩnh
                                            viễn không cần thông báo.
                                        </strong>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <script>
                $(function () {
                    $('#file').uploadfile({
                        url: '/ajax/upload'
                    });
                    $('.bank_form').find('.submit').onClick(function (data) {
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
                                location.reload();
                            });
                        }
                        $(this).find('.submit').button('reset');
                    }, function () {
                        $(this).find('.submit').button('loading');
                    });
                });
            </script>
            <script>
                $(function () {
                    $('[type="file"]').attr("style", "background: transparent; border:none; box-shadow:none;");
                });
            </script>
        </main>

    </div>

@include('footer')