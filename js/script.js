$(function () {

    var doc = $(document),
        layer = $('body');

    // slider init
    function initSliders(sliderSelector, sliderOptions) {
        $(sliderSelector).owlCarousel($.extend({
            items: 1,
            nav: true,
            dots: true,
            loop: false,
            margin: 30
        }, sliderOptions));
    }

    initSliders('.demo', {
        items: 3,
        responsive: {
            0: {items: 1},
            500: {items: 2},
            768: {items: 3},
        }
    });

    // Modal
    (function () {
        var scrollbarWidth = parseInt(window.innerWidth) - parseInt(document.documentElement.clientWidth);
        layer.append('<style>body.overlay-modal {margin-right: ' + scrollbarWidth + 'px; overflow: hidden;}</style>');
    }());

    $('.js-modal').on('click', function (e) {
        if ($(e.target).closest('.js-modal-main').length === 0) close_modal();
    });

    $('[data-modal]').on('click', function () {
        var el = $(this), name = el.data('modal');
        open_modal(name);
        return false;
    });

    $('.js-modal-close').on('click', function () {
        close_modal();
        return false;
    });

    function open_modal(name) {
        close_modal();
        layer.addClass('overlay-modal');
        $('#' + name).addClass('show-modal');
    }

    function close_modal() {
        layer.removeClass('overlay-modal');
        $('.show-modal').removeClass('show-modal');
    }
    
    // Tabs
    $('.js-tabs').each(function () {
        var el = $(this),
            link = el.data('link') || 'tab',
            item = $('.' + link + '-item', el),
            pane = $('.' + link + '-pane', el);
        
        index_pane(0);
        
        item.on('click', function () {
            var index = $(this).index();
            index_pane(index);
        });

        function index_pane(index) {
            pane.eq(index).add(item.eq(index)).addClass('active').siblings().removeClass('active');
        } 
    });

    // AppPopup
    var elements = $('[data-selected]'),
        showclass = 'show-popup';

    $('[data-select]').on('click', function () {
        var select = $(this).data('select'),
            el = $('[data-selected="' + select + '"]');

        if (el.is($('.' + showclass))) {
            elements.removeClass(showclass);
        } else {
            elements.removeClass(showclass);
            el.addClass(showclass);
        }
        return false;
    });

    doc.on('click', function (e) {
        if ($(e.target).closest('.' + showclass).length === 0) elements.removeClass(showclass);
    });
    
    // Mask
    $('.js-mask').each(function () {
        var el = this;
        var maskOptions = {
            mask: '{+7} 000 000-00-00',
            lazy: false,
            placeholderChar: '_'
        };
        var mask = new IMask(el, maskOptions);
    });

});

// notify
(function ($) {
    var notify_timer,
        body = $.Body || $('body');

    function notify(text, time = 2000) {
        clearTimeout(notify_timer);
        $('.notify').remove();
        var el = $('<div class="notify">' + text + '</div>').hide();
        body.append(el);
        el.stop().fadeIn(200);

        notify_timer = setTimeout(function () {
            el.stop().fadeOut(200);
            clearTimeout(notify_timer);
        }, time);
    }

    $.notify = notify;

})(jQuery);

window.notify = window.notify || jQuery.notify;