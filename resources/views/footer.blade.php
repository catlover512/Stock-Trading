 <!-- Footer -->
 <footer>
    <div class="ftimg">
        <img src="img/sacem/ft1.jpg">
        <img src="img/sacem/ft2.jpg">
        <img src="img/sacem/ft3.jpg">
        <img src="img/sacem/ft4.jpg">
        <img src="img/sacem/ft5.jpg">
        <img src="img/sacem/ft6.jpg">
        <img src="img/sacem/ft7.jpg">
        <img src="img/sacem/ft8.jpg">
        <img src="img/sacem/ft9.jpg">
        <img src="img/sacem/ft10.jpg">
        <img src="img/sacem/ft11.jpg">
    </div>
    <div class="inner">
        <p>© 2020 LuxSEVN All Rights Reserved</p>
    </div>
</footer>



<style>
.ftimg {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 20px auto;
    width: 80%;
}

.ftimg img {
    height: 50px;
    margin: 10px;
    border-radius: 10px;
}

@media screen and (max-width:768px) {
    .ftimg {
        width: 100%;
    }

    .ftimg img {
        height: 35px;
        margin: 5px;
    }
}
</style>




<!-- Custom-JavaScript-File-Links -->

<!-- Default-JavaScript -->
<!-- Bootstrap-JavaScript -->
<script type="text/javascript" src="js/sacem/bootstrap.min.js"></script>

<!-- Resopnsive-Slider-JavaScript -->
<script src="js/sacem/responsiveslides.min.js"></script>


<!-- Tab-JavaScript -->
<script src="js/sacem/cbpFWTabs.js"></script>
<script>
    (function () {
        [].slice.call(document.querySelectorAll('.tabs')).forEach(function (el) {
            new CBPFWTabs(el); // Đảm bảo đây là đoạn mã cuối cùng của hàm forEach
        }); // Đóng dấu ngoặc của forEach
    })(); // Đóng dấu ngoặc của IIFE
</script>

<!-- Stats-Number-Scroller-Animation-JavaScript -->
<script src="js/sacem/waypoints.min.js"></script>
<script src="js/sacem/counterup.min.js"></script>

<script>
AOS.init();
</script>
<!-- //Stats-Number-Scroller-Animation-JavaScript -->

<!-- Popup-Box-JavaScript -->
<script src="js/sacem/jquery.chocolat.js"></script>
<script type="text/javascript">
$(function () {
    $('.w3portfolioaits-item a').Chocolat();
});
</script>
<!-- //Popup-Box-JavaScript -->

<!-- Smooth-Scrolling-JavaScript -->
<script type="text/javascript">
jQuery(document).ready(function ($) {
    $(".scroll").click(function (event) {
        event.preventDefault();

        $('html,body').animate({
            scrollTop: $(this.hash).offset().top
        }, 1000);
    });
});

if (!isIndex) {
    $(".scroll").click(function () {
        location.href = '/';
    });
}
</script>



<!-- //Custom-JavaScript-File-Links -->

<script src="js/sacem/jquery.dropotron.min.js"></script>
<script src="js/sacem/jquery.scrollex.min.js"></script>
<script src="js/sacem/browser.min.js"></script>
<script src="js/sacem/breakpoints.min.js"></script>
<script src="js/sacem/util.js"></script>
<script src="js/sacem/main.js"></script>
<script>
$(function () {
    $('.menu-icon').click(function () {
        $('.nav-block').slideToggle().toggleClass('show');
    })
});
</script>

</body>

<script>
$(document).ready(function () {


var auth = jQuery('#auth').val();
var win_width = jQuery(window).width();

jQuery('.register_form .submit').onClick(function (data) {
    if (data.code) {
        // fail
        swal({
            title: data.text,

            html: true,
            customClass: 'swalPopup'
        });
        // reload
        jQuery('.captcha').trigger('click');

    } else {
        swal({
            title: data.text,
            html: true,
            customClass: 'swalPopup'
        }, function () {
            location.reload();
        });
    }
    // jQuery(this).button('reset');
    jQuery(this).prop('disabled', false);
}, function () {
    // jQuery(this).button('loading');
    jQuery(this).prop('disabled', true);
});

jQuery('.captcha').click(function () {
    jQuery(this).find('img').attr('src', 'captcha/?rand=' + Math.random());
});
setTimeout(function () {
    jQuery('.captcha').click();
}, 2000);


gName = {
    1: "Ví điện tử",
    9: "Sharon Real",
    22: "AV SLOT",
    25: "Bàn xoay",
    27: "Texas Hold'em",
    28: "BinaryExternal",
    30: "Vé số",
    33: "VV Lottery",
    34: "Trái phiếu điện tử",
};
var options = $('[name="src_id"] option, [name="tar_id"] option');
$(options).each(function (index) {
    $(this).text(gName[$(this).val()]);
});

var bNames = $('b[att-id]');
$(bNames).each(function (index) {
    $(this).html(gName[$(this).attr("att-id")]);
});
var tdNames = $('td[att-id]');
$(tdNames).each(function (index) {
    $(this).html(gName[$(this).attr("att-id")]);
});
var liNames = $('li div[att-id]');
$(liNames).each(function (index) {
    $(this).html(gName[$(this).attr("att-id")]);
});
updateOnline();
setInterval("updateOnline()", 5000);

});
</script>



</html>