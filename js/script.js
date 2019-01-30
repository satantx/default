$(document).ready(function () {

   var doc = $(document),
       layer = $('body');


   // slidera init
   function initSliders(sliderSelector, sliderOptions) {
      $(sliderSelector).owlCarousel($.extend({
         items: 1,
         nav: false,
         dots: false,
         loop: false,
         margin: 30
      }, sliderOptions));
   }

   initSliders('.advantages-slider', {items: 4});

   // tabs
   $('.tabs').each(function () {
      var el = $(this),
          link = el.data('link') || 'tab',
          item = $('.' + link + '-item', el),
          pane = $('.' + link + '-pane', el);
      index_pane(0);
      item.click(function () {
         var index = $(this).index();
         index_pane(index);
      });

      function index_pane(index) {
         pane.eq(index).add(item.eq(index)).addClass('active').siblings().removeClass('active');
      }
   });


   // popup menu
   var elements = $('[data-selected]');
   $('[data-select]').click(function () {
      var select = $(this).data('select'),
          el = $('[data-selected="' + select + '"]');
      if (el.is($('._show'))) {
         elements.removeClass('._show');
      } else {
         elements.removeClass('._show');
         el.addClass('._show');
      }
      ;
      return false;
   });

   doc.click(function (e) {
      if ($(e.target).closest('._show').length == 0) elements.removeClass('._show');
      if ($(e.target).closest('.show-modal').length == 0) $('.show-modal').removeClass('show-modal');
   });


   // modal
   (function () {
      var documentWidth = parseInt(document.documentElement.clientWidth),
          windowsWidth = parseInt(window.innerWidth),
          scrollbarWidth = windowsWidth - documentWidth;
      layer.append('<style>body.overlay-modal {margin-right: ' + scrollbarWidth + 'px; overflow: hidden;}</style>');
   }());

   doc.on('click', '[data-modal]', function () {
      var el = $(this),
          name = el.data('modal');
      layer.addClass('overlay-modal');
      $('#' + name).addClass('show-modal');
      return false;
   });

   doc.on('click', '.js-close', function () {
      layer.removeClass('overlay-modal');
      $('.show-modal').removeClass('show-modal');
      return false;
   });

});

var notify_timer;

function notify(text) {
   clearTimeout(notify_timer);
   $('.notify').remove();
   var el = $('<div class="notify"><p>' + text + '</p></div>').hide();
   $('body').append(el);
   el.stop().fadeIn(200);
   notify_timer = setTimeout(function () {
      el.stop().fadeOut(200);
      clearTimeout(notify_timer);
   }, 2000);
}