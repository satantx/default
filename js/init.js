(function ($) {

   $.Constants = {
      DATA_CONTROLLER_ATTR: 'controller',
      INSTALLED_CLASS: 'is-install',
      AJAX_BEFORE_EVENT: 'ajaxSend'
   };

})(jQuery);

/**
 * Initialize
 */
jQuery(function ($) {
   var CONST = $.Constants;
   var AJAX_BEFORE_EVENT = CONST.AJAX_BEFORE_EVENT;

   $.Doc = $(document);
   $.Win = $(window);
   $.Body = $('body');

   $.Doc.Install();
   $.Doc.on(AJAX_BEFORE_EVENT, function (event, contents) {
      $(contents).Install();
   });
});

/**
 * Install
 * Установка дата-контроллеров
 */
(function ($) {

   var CONST = $.Constants;
   var INSTALLED_CLASS = CONST.INSTALLED_CLASS;
   var DATA_CONTROLLER_ATTR = CONST.DATA_CONTROLLER_ATTR;

   $.fn.Install = function () {
      return this.each(function () {
         $(this).find('[data-' + DATA_CONTROLLER_ATTR + ']:not(.' + INSTALLED_CLASS + ')').Instantiate().addClass(INSTALLED_CLASS);
      });
   };

})(jQuery);

/**
 * Автоинициализация дата-контроллеров
 */
(function ($) {

   var CONST = $.Constants;
   var DATA_CONTROLLER_ATTR = CONST.DATA_CONTROLLER_ATTR;

   $.fn.Instantiate = function () {
      return this.each(function () {
         var $self = $(this);
         var $controller = $self.attr('data-' + DATA_CONTROLLER_ATTR);
         if ($self[$controller]) {
            var params = $self.data();
            delete params[DATA_CONTROLLER_ATTR];
            $self[$controller](params);
         }
      });
   };

})(jQuery);