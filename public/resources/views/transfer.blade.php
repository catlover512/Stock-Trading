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
                                <h1>Chuyển Giao Tài Sản</h1>
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
                                    <form class="transfer_form" action="/ajax/transfer" method="POST">
                                        <div class="out">
                                            <h2>Chuyển ra ngoài</h2>
                                            <select name="src_id" id="gameSelect">

                                                <option value="1">Ví điện tử</option>

                                                <option value="34">Trái phiếu điện tử</option>

                                            </select>
                                        </div>

                                        <div class="in">
                                            <h2>Chuyển vào</h2>
                                            <select name="tar_id" id="gameSelect">

                                                <option value="1">Ví điện tử</option>

                                                <option value="34">Trái phiếu điện tử</option>

                                            </select>
                                        </div>

                                        <div class="insert">
                                            <!-- <form class="gameForm3"> -->
                                            <h2>Nhập số tiền</h2>
                                            <input name="total" type="text">
                                            <!-- </form> -->
                                        </div>

                                        <div id="saveChange">
                                            <button type="button" class="submit btn-store btn"
                                                data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Gia công...">
                                                <span>Gửi</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div id="warning">
                                <strong>Ghi chú:
                                    <br>
                                    1. Để tăng tốc dịch vụ của bạn, hãy chắc chắn đóng trò chơi của bạn trước khi đăng
                                    ký Chuyển Giao Tài Sản tín dụng.
                                    <br>
                                    2. Nếu không có phòng trò chơi bạn muốn chuyển, vui lòng liên hệ với Dịch vụ khách
                                    hàng trực tuyến.
                                    <br>
                                    3. Nếu việc chuyển điểm chậm do yếu tố mạng, hãy kiên nhẫn.
                                    <br>
                                    4. Hành động chuyển quá thường xuyên, hệ thống sẽ tự động lọc ra.
                                </strong>
                            </div>
                        </section>
                    </div>
                </div>
            </div>



            <script>
                $(function () {
                    $('.transfer_form').find('.submit').onClick(function (data) {
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
                                getCredit(true);
                            });
                        }
                        $(this).button('reset');
                    }, function () {
                        $(this).button('loading');
                    });
                });
            </script>
        </main>


        
    </div>
@include('footer')