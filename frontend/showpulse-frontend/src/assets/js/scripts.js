$(function () {

    // init feather icons
    feather.replace();

    // init tooltip & popovers
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    //page scroll
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 20
        }, 1000);
        event.preventDefault();
    });

    // slick slider
    $('.slick-about').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: false
    });

    //toggle scroll menu
    var scrollTop = 0;
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        //adjust menu background
        if (scroll > 80) {
            if (scroll > scrollTop) {
                $('.smart-scroll').addClass('scrolling').removeClass('up');
            } else {
                $('.smart-scroll').addClass('up');
            }
        } else {
            // remove if scroll = scrollTop
            $('.smart-scroll').removeClass('scrolling').removeClass('up');
        }

        scrollTop = scroll;

        // adjust scroll to top
        if (scroll >= 600) {
            $('.scroll-top').addClass('active');
        } else {
            $('.scroll-top').removeClass('active');
        }
        return false;
    });

    // scroll top top
    $('.scroll-top').click(function () {
        $('html, body').stop().animate({
            scrollTop: 0
        }, 1000);
    });

    $(function () {
        $('#btn-get-started').click(function (event) {
            event.stopPropagation(); // Prevent the click event from propagating to the body
            $('#login-popup').addClass('slide-down').css({
                'z-index': '9999',
                'display': 'flex'
            });
        });
    
        $(document).on('click', function (event) {
            if ($(event.target).is('#login-popup') && $('#login-popup').is(':visible')) {
                $('#login-popup').addClass('slide-up'); // Add slide-up class for smoother transition
                setTimeout(function () {
                    $('#login-popup').css({
                        'z-index': '', // Restore the original z-index value
                        'display': 'none'
                    }).removeClass('slide-down slide-up');
                }, 300); // Wait for transition to complete before hiding
            }
        });
    });
    
    function openSearch() {
    document.getElementById("myOverlay").style.display = "block";
  }
  
    function closeSearch() {
    document.getElementById("myOverlay").style.display = "none";
  }

   

    
});
