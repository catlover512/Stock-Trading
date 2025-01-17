@include('head')

<!-- Body -->

<body>
    <!-- Header -->
    <div class="container">
        <main class="main">
            <link rel="stylesheet" href="css/sacem/stylelogin.css?20200520">

            <div class="login aos-init aos-animate" data-aos="fade-up" data-aos-duration="800">
                <div class="main-w3l">
                    <a class="logo-w3" href="index.html">
                        <img src="img/sacem/logo-login.png">
                    </a>
                    <div class="w3layouts-main">
                        <h2>Đăng ký thành viên</h2>
                        <form class="register_form" method="post" action="/ajax/register">
                            <input placeholder="Họ tên" name="name" type="text" required="" maxlength="16">

                            <input placeholder="Tên tài khoản" autocomplete="off" name="account" type="text" required=""
                                maxlength="20">
                            <input placeholder="Nhập mật khẩu" autocomplete="off" name="password" type="password"
                                required="" maxlength="40">
                            <input placeholder="Nhập lại mật khẩu" autocomplete="off" name="password_confirm"
                                type="password" required="" maxlength="40">
                            <input placeholder="Số điện thoại" name="phone" type="text" required="" maxlength="20">
                            <input name="contact_type" type="hidden" value="Zalo">
                            <input placeholder="Số điện thoại Zalo ( bắt buộc )" name="contact" type="text"
                                maxlength="30">
                            <br>
                            <div class="captcha">
                                <img src="captcha/captcha_.png" alt="Đọc Captcha">
                            </div>
                            <input placeholder="Vui lòng điền mã xác minh" name="captcha" type="text"
                                style="background-image: unset;">

                            <div class="checkbox-content">
                                <input type="checkbox" checked="" class="check-box">
                                Xác nhận rằng tôi 18 tuổi và tất cả các hoạt động trên trang web này, nó không mâu thuẫn
                                với
                                luật pháp quản lý của quốc gia nơi tôi sống. tôi cũng chấp nhận tất cả
                                <a href="policy" target="_blank" class="policy-link">các quy tắc và quy định và tuyên bố
                                    quyền riêng tư trong ứng dụng này.</a>
                                <span>
                                    Để bảo vệ quyền của bạn, tên đăng ký / chứng minh nhân dân / tài khoản đã đăng ký
                                    phải là
                                    cùng một người. vui lòng sử dụng số điện thoại di động của bản thân và nhận tin nhắn
                                    văn
                                    bản. nghiêm cấm sử dụng nhiều danh tính để áp dụng cho một số lượng lớn tài khoản,
                                    dẫn đến
                                    thông tin thành viên chồng chéo hoặc mất điểm, có nguy cơ của riêng bạn.
                                </span>
                            </div>

                            <button type="button" class="submit btn-next"
                                data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Gia công...">
                                <span>Đăng ký ngay</span>
                            </button>
                        </form>
                        <div class="link-block">
                            <a href="login">Thành viên hiện có</a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
    <script>
        AOS.init();
    </script>
</body>

</html>