@include('head')

<!-- Body -->

<body>
    <!-- Header -->
    <div class="container">
        @include('header')
        <main class="main">
            <script src="js/6603bd9dd4.js"></script>


            <!-- 影片 -->
            <!-- banner區 -->

            <div class="banner">

                <!-- =================影片區================= -->
                <div class="banner-text-area index-page index-section">
                    <!-- m-marquee-box -->

                    <div class="text" data-aos="fade-up" data-aos-duration="1000">
                        <img src="img/sacem/logo-2.png" alt="" class="logo-2">
                        <h2 data-aos="fade-down">

                            Nền tảng chiến lược đầu tư đầu tiên của Châu Á
                        </h2>
                        <a href="member.html" class="btn" data-aos="fade-up"><span>Trung tâm thành viên</span></a>
                    </div>
                </div>
                <div class="video" id="video">
                    <div class="area">
                        <ul class="circles">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                </div>

            </div>

            <div class="m-marquee-box">
                <div class="wrap">
                    <div class="marqueeTitle">NEWS</div>
                    <marquee scrollamount="4" style="white-space: nowrap; width: 100%;">

                    </marquee>
                </div>
            </div>

            <section class="section-intro">
                <div class="wrap">
                    <div class="intro-block">
                        <div class="intro-content">
                            <div class="intro-title">
                                <h2>VỐN THỊ TRƯỜNG QUỐC TẾ</h2>
                            </div>
                            <div class="intro-txt">
                                <p>Sở giao dịch chứng khoán Luxembourg (LuxSE) là xương sống của hệ sinh thái tài chính
                                    thịnh vượng của Luxembourg và thị trường vốn quốc tế nói chung. Thông qua lịch sử
                                    phong phú của mình, các cổ đông, hội đồng quản trị và ban quản lý đáng kính cũng như
                                    các khoản đầu tư của công ty, chúng tôi thúc đẩy tăng trưởng toàn diện và đổi mới
                                    trên thị trường vốn toàn cầu.</p>
                                <div class="number-block">
                                    <div class="number" data-aos="fade-up" data-aos-duration="100">
                                        <div class="top">
                                            <h1 class="counter">28,317</h1>
                                            <span>NGƯỜI</span>
                                        </div>
                                        <p>lượng khách hàng</p>
                                    </div>
                                    <div class="number" data-aos="fade-up" data-aos-duration="100">
                                        <div class="top">
                                            <h1 class="counter">129,872</h1>
                                            <span>BÚT</span>
                                        </div>
                                        <p>SỐ LƯỢNG GIAO DỊCH</p>
                                    </div>
                                    <div class="number" data-aos="fade-up" data-aos-duration="100">
                                        <div class="top">
                                            <h1 class="counter">3,927,231</h1>
                                            <span>USD</span>
                                        </div>
                                        <p>GIÁ TRỊ GIAO DỊCH</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div class="widget-market">
                <!-- TradingView Widget BEGIN -->
                <div class="tradingview-widget-container">
                    <div class="tradingview-widget-container__widget"></div>
                    <div class="tradingview-widget-copyright"><a href="https://uk.tradingview.com/markets/"
                            rel="noopener" target="_blank"><span class="blue-text"></span></a></div>
                    <script type="text/javascript"
                        src="https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js" async>
                        {
                            "colorTheme": "light",
                            "dateRange": "12M",
                            "showChart": true,
                            "locale": "uk",
                            "width": "100%",
                            "height": "600",
                            "largeChartUrl": "",
                            "isTransparent": false,
                            "showSymbolLogo": true,
                            "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
                            "plotLineColorFalling": "rgba(41, 98, 255, 1)",
                            "gridLineColor": "rgba(240, 243, 250, 1)",
                            "scaleFontColor": "rgba(120, 123, 134, 1)",
                            "belowLineFillColorGrowing": "rgba(33, 150, 243, 0.12)",
                            "belowLineFillColorFalling": "rgba(33, 150, 243, 0.12)",
                            "symbolActiveColor": "rgba(33, 150, 243, 0.12)",
                            "tabs": [{
                                    "title": "Indices",
                                    "symbols": [{
                                            "s": "FOREXCOM:SPXUSD",
                                            "d": "S&P 500"
                                        },
                                        {
                                            "s": "FOREXCOM:NSXUSD",
                                            "d": "Nasdaq 100"
                                        },
                                        {
                                            "s": "FOREXCOM:DJI",
                                            "d": "Dow 30"
                                        },
                                        {
                                            "s": "INDEX:NKY",
                                            "d": "Nikkei 225"
                                        },
                                        {
                                            "s": "FOREXCOM:UKXGBP",
                                            "d": "UK 100"
                                        }
                                    ],
                                    "originalTitle": "Indices"
                                },
                                {
                                    "title": "Commodities",
                                    "symbols": [{
                                            "s": "CME_MINI:ES1!",
                                            "d": "S&P 500"
                                        },
                                        {
                                            "s": "CME:6E1!",
                                            "d": "Euro"
                                        },
                                        {
                                            "s": "COMEX:GC1!",
                                            "d": "Gold"
                                        },
                                        {
                                            "s": "NYMEX:CL1!",
                                            "d": "Crude Oil"
                                        },
                                        {
                                            "s": "CBOT:ZC1!",
                                            "d": "Corn"
                                        }
                                    ],
                                    "originalTitle": "Commodities"
                                },
                                {
                                    "title": "Bonds",
                                    "symbols": [{
                                            "s": "CME:GE1!",
                                            "d": "Eurodollar"
                                        },
                                        {
                                            "s": "CBOT:ZB1!",
                                            "d": "T-Bond"
                                        },
                                        {
                                            "s": "CBOT:UB1!",
                                            "d": "Ultra T-Bond"
                                        },
                                        {
                                            "s": "EUREX:FGBL1!",
                                            "d": "Euro Bund"
                                        },
                                        {
                                            "s": "EUREX:FGBM1!",
                                            "d": "Euro BOBL"
                                        }
                                    ],
                                    "originalTitle": "Bonds"
                                },
                                {
                                    "title": "Forex",
                                    "symbols": [{
                                            "s": "FX:EURUSD"
                                        },
                                        {
                                            "s": "FX:GBPUSD"
                                        },
                                        {
                                            "s": "FX:USDJPY"
                                        },
                                        {
                                            "s": "FX:USDCHF"
                                        },
                                        {
                                            "s": "FX:USDCAD"
                                        }
                                    ],
                                    "originalTitle": "Forex"
                                }
                            ]
                        }
                    </script>
                </div>
                <!-- TradingView Widget END -->
            </div>

            <div class="section-about">
                <div class="wrap">
                    <div class="about-block">
                        <div class="about-content" data-aos="fade-up" data-aos-duration="500">
                            <h2>MỤC TIÊU VÀ TẦM NHÌN</h2>
                            <p>TRONG NHỮNG NĂM GẦN ĐÂY, NỀN KINH TẾ TRONG VÀ NGOÀI NƯỚC ĐANG RƠI VÀO TÌNH TRẠNG KHỦNG
                                HOẢNG, NỀN
                                TẢNG ĐẦU TƯ CỦA CHÚNG ĐANG HOẠT ĐỘNG HẾT NĂNG SUẤT ĐỂ ĐƯA RA LỢI NHUẬN ỔN ĐỊNH HƠN.
                                NGOÀI VIỆC TẠO
                                RA SỰ PHÁT TRIỂN KINH TẾ ỔN ĐỊNH VÀ AN TOÀN HƠN THÌ CHÚNG TÔI CŨNG MỞ RỘNG HÓA ĐẦU TƯ
                                ĐƠN GIẢN HƠN
                                ĐỂ CÁC NHÀ ĐẦU TƯ DỄ DÀNG ĐẦU TƯ.
                            </p>
                        </div>
                        <div class="about-imgWrap">
                            <div class="about-img">
                                <img src="img/sacem/ab.png">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section class="section-feature">
                <div class="wrap">
                    <div class="feature-block">
                        <div class="feature-title">
                            <h2>Chức năng chính</h2>
                            <img class="line" src="img/sacem/line.png" alt="">

                        </div>
                        <div class="feature-content">
                            <ul>
                                <li>
                                    <div class="feature-ingWrap"><img class="icon" src="img/sacem/icon-1.jpg" alt="">
                                    </div>
                                    <div class="feature-txt">
                                        <h3>CHIẾN LƯỢC ĐẦU TƯ</h3>
                                        <p>Cổ phiếu, trái phiếu, hàng hóa, chiến lược đầu tư nhiều ngoại tệ.</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="feature-ingWrap"><img class="icon" src="img/sacem/icon-2.jpg" alt="">
                                    </div>
                                    <div class="feature-txt">
                                        <h3>ĐẦU TƯ THÔNG MINH</h3>
                                        <p>Máy tính AI cung cấp các khoản đầu tư thông minh, điều chỉnh số dư.</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="feature-ingWrap"><img class="icon" src="img/sacem/icon-3.jpg" alt="">
                                    </div>
                                    <div class="feature-txt">
                                        <h3>TỐI ƯU HÓA DỮ LIỆU</h3>
                                        <p>Cung cấp so sánh dữ liệu kinh tế, chỉ số, vấn đề và dữ liệu ETF.</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="feature-ingWrap"><img class="icon" src="img/sacem/icon-4.jpg" alt="">
                                    </div>
                                    <div class="feature-txt">
                                        <h3>GIÁO DỤC KIẾN ​​THỨC</h3>
                                        <p>Các bài viết về đầu tư tài chính, bao gồm nội dung cơ bản và nâng cao.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section-widget">
                <div class="wrap">
                    <div class="widget-block">
                        <p data-aos="fade-up" data-aos-duration="600">
                            Việc công ty quản lý quỹ đi vào hoạt động sớm không đảm bảo lợi tức đầu tư tối thiểu vào
                            chuỗi quỹ của
                            công ty. sự chú ý và nghĩa vụ của một nhà quản lý giỏi, một tỷ suất lợi nhuận cố định sẽ
                            tuân theo sự
                            gia nhập của nhà đầu tư. Hiệu suất trong quá khứ không đảm bảo cho hiệu suất trong tương
                            lai.
                        </p>
                    </div>
                </div>
            </section>

            <section class="section-join">
                <div class="wrap">
                    <div class="join-block">
                        <div class="join-content">
                            <h2>NỀN TẢNG ĐẦU TƯ THÔNG MINH</h2>
                            <p>
                                NỀN TẢNG ĐẦU TƯ THÔNG MINH LuxSEVN LÀ NỀN TẢNG CÓ CHIẾN LƯỢC ĐẦU TƯ ETF ĐA DẠNG ĐẦU TIÊN
                                ĐƯỢC ÁP
                                DỤNG Ở CHÂU Á, TÀI SẢN TRÊN CỔ PHIẾU VÀ BỐN CẶP TIỀN TỆ ĐƯỢC THẾ GIỚI SỬ DỤNG ƯA CHUỘNG.
                                NỀN TẢNG
                                ĐẦU TƯ THÔNG MINH LuxSEVN ĐẢM BẢO KHÁCH HÀNG VỀ TÀI SẢN AN TOÀN, ỔN ĐỊNH VÀ LỢI NHUẬN.
                            </p>
                            <p>
                                NỀN TẢNG ĐẦU TƯ SACẺM CÓ HƠN HÀNG TRĂM NGÀN NGƯỜ THAM GIA, GIÚP CÁC NHÀ ĐẦU TƯ TRỞ THÀNH
                                NGƯỜI DÙNG
                                TIỀM NĂNG CỦA NỀN TẢNG ĐẦU TƯ NGOẠI HỐI THÔNG MINH. </p>
                        </div>
                        <div class="join-imgWrap">
                            <img class="man" src="img/sacem/man.png" alt="">
                        </div>
                    </div>
                </div>
            </section>





            <script type="text/javascript">
                $("#nav1").bind("click", function() {
                    $('a[href="#section-line-1"]')[0].click();
                });
                $("#nav2").bind("click", function() {
                    $('a[href="#section-line-2"]')[0].click();
                });
                $("#nav3").bind("click", function() {
                    $('a[href="#section-line-3"]')[0].click();
                });
                $("#nav4").bind("click", function() {
                    $('a[href="#section-line-4"]')[0].click();
                });
                var isIndex = true;
            </script>
            <script>
                var counterBase = [28316, 129872, 3927231];
                var counterIncreaseBase = [50, 100, 1000];
                var startDate = 1581075070166;
                console.log("now : " + Date.now());
                console.log("diff dt " + (Date.now() - startDate) / 86400 * 50);
                for (i = 0; i < 3; i++) {
                    console.log(i);
                    console.log($(".counter")[i]);
                    console.log($(Math.floor((Date.now() - startDate) / 86400 * counterIncreaseBase[i])));
                    $($(".counter")[i]).html(counterBase[i] + Math.floor((Date.now() - startDate) / 86400 * counterIncreaseBase[i]));
                    $($(".counter")[i]).html($($(".counter")[i]).html().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                }
            </script>

            <script>
                jQuery(document).ready(function($) {
                    $('.counter').counterUp({
                        delay: 10,
                        time: 8000
                    });
                });
            </script>


            <style>
                .circles {
                    position: absolute;
                    top: -4%;
                    left: 0;
                    right: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }

                .circles li {
                    position: absolute;
                    display: block;
                    list-style: none;
                    width: 20px;
                    height: 20px;
                    background: #adf0ffd4;
                    animation: animate 25s linear infinite;
                    bottom: -150px;
                    border-radius: 50% !important;
                    filter: blur(4px);
                }

                .circles li:nth-child(1) {
                    left: 25%;
                    width: 80px;
                    height: 80px;
                    animation-delay: 0s;
                }


                .circles li:nth-child(2) {
                    left: 10%;
                    width: 20px;
                    height: 20px;
                    animation-delay: 2s;
                    animation-duration: 12s;
                }

                .circles li:nth-child(3) {
                    left: 70%;
                    width: 20px;
                    height: 20px;
                    animation-delay: 4s;
                }

                .circles li:nth-child(4) {
                    left: 40%;
                    width: 60px;
                    height: 60px;
                    animation-delay: 0s;
                    animation-duration: 18s;
                }

                .circles li:nth-child(5) {
                    left: 65%;
                    width: 20px;
                    height: 20px;
                    animation-delay: 0s;
                }

                .circles li:nth-child(6) {
                    left: 75%;
                    width: 110px;
                    height: 110px;
                    animation-delay: 3s;
                }

                .circles li:nth-child(7) {
                    left: 35%;
                    width: 150px;
                    height: 150px;
                    animation-delay: 7s;
                }

                .circles li:nth-child(8) {
                    left: 50%;
                    width: 25px;
                    height: 25px;
                    animation-delay: 15s;
                    animation-duration: 45s;
                }

                .circles li:nth-child(9) {
                    left: 20%;
                    width: 15px;
                    height: 15px;
                    animation-delay: 2s;
                    animation-duration: 35s;
                }

                .circles li:nth-child(10) {
                    left: 85%;
                    width: 150px;
                    height: 150px;
                    animation-delay: 0s;
                    animation-duration: 11s;
                }



                @keyframes animate {

                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                        border-radius: 10%;
                    }

                    100% {
                        transform: translateY(-1000px) rotate(720deg);
                        opacity: 0;
                        border-radius: 70%;
                    }

                }

                /* RWD */
                @media screen and (min-width:1024px) {
                    .circles {
                        position: absolute;
                        top: -2%;
                        left: 0;
                        right: 0;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                    }
                }
            </style>
        </main>


    </div>
    @include('footer')