@include('head')
<!-- Body -->

<body>
    <!-- Header -->
    <div class="container">
        <main class="main">
            <link rel="stylesheet" href="css/sacem/stylelogin.css">
            <div class="login" data-aos="fade-up" data-aos-duration="800">
                <div class="main-w3l">
                    <a class="logo-w3" href="index.html">
                        <img src="img/sacem/logo-login.png">
                    </a>
                    <div class="w3layouts-main">
                        <h2>Đăng nhập thành viên</h2>
                        <form class="login_form" action="/ajax/login" method="POST">
                            <input class="inputAccount base-login-block-item-input" placeholder="Nhập tài khoản"
                                name="account" type="text" required="">
                            <input class="inputPassword base-login-block-item-input" placeholder="Nhập mật khẩu"
                                name="password" type="password" required="">
                            <button class="submit btn-login" type="button"
                                data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Gia công..."><span>Đăng
                                    nhập</span></button>
                        </form>

                        <div class="link-block">
                            <a href="" target="_black">Quên mật khẩu</a>
                            <a href="register">Đăng ký ngay</a>
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