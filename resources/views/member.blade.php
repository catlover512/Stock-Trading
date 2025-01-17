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

                        <div class="member-center-block" id="mainWrap">
                            <div id="Title" class="member-center-title">
                                <h1>Thông tin tài khoản</h1>
                            </div>
                            <div id="editList">
                                <form class="member_form" action="/ajax/edit" method="POST">
                                    <div id="typeAccount">
                                        <h2>Đăng nhập tài khoản</h2>
                                        <input type="text" disabled="" value="catlover512">
                                    </div>

                                    <div id="memName">
                                        <h2>Họ tên thành viên</h2>
                                        <input type="text" disabled="" value="việt">
                                    </div>

                                    <div id="memCell">
                                        <h2>Điện thoại di động</h2>
                                        <div class="input-relative">
                                            <input type="text" disabled="" value="843*****127">
                                            <span class="verification"><span id="valid"
                                                    class="label label-danger">Unverify</span></span>
                                        </div>
                                    </div>

                                    <div id="password">
                                        <h2>Thay đổi mật khẩu</h2>
                                        <input name="password" type="password" maxlength="20" required=""
                                            placeholder="Thay đổi mật khẩu">
                                    </div>

                                    <div id="check">
                                        <h2>Xác nhận lại mật khẩu</h2>
                                        <input name="password_confirm" maxlength="20" type="password" required=""
                                            placeholder="Xác nhận lại mật khẩu">
                                    </div>

                                    <div id="saveChange">
                                        <button type="button" class="submit btn-store btn"
                                            data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Gia công...">
                                            <span>Xác nhận</span>
                                        </button>
                                    </div>
                                </form>

                                <div id="warning">
                                    <strong>Ghi chú:<br>Trong trường hợp bất khả kháng, bạn cần thay đổi thông tin, vui
                                        lòng liên hệ
                                        với
                                        nhân viên Dịch vụ khách hàng! </strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <script>
                $(function () {
                    $('.member_form').find('.submit').onClick(function (data) {
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
        </main>


    </div>

@include('footer')