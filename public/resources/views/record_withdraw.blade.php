@include('head')
<!-- Body -->

<body>
    <!-- Header -->
    <div class="container">
        @include('header')


        <main class="main">
            <script src="js/6603bd9dd4.js"></script>
            <script src="js/sacem/slideToggle.js"></script>
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
                                <h1>Lịch sử nạp rút</h1>
                            </div>
                            <div class="display-flex record">
                                @include('menu-record')
                                <table class="tg text-block">
                                    <tbody>
                                        <tr>
                                            <th class="tg-mx2v" width="300">
                                                <h3>Ngày đặt hàng</h3>
                                            </th>
                                            <th class="tg-mx2v" width="500">
                                                <h3>Chi tiết</h3>
                                            </th>
                                            <th class="tg-mx2v" width="100">
                                                <h3>Số tiền</h3>
                                            </th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>

    </div>

@include('footer')