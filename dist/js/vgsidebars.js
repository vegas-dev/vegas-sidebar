"use strict";

(function ($) {
  var NAME = 'vg-sidebar';
  var DATA_KEY = 'vg.sidebar';
  var CLASS_SIDEBAR_SHOW = 'show';
  var afterOpen = $.noop,
      beforeOpen = $.noop;
  var afterClose = $.noop,
      beforeClose = $.noop;
  var afterAjaxLoad = $.noop,
      beforeAjaxLoad = $.noop;
  var params = {
    target: '',
    placement: 'right',
    ajax: {
      target: '',
      route: '',
      method: 'get'
    }
  };
  var methods = {
    show: function show(options) {
      var settings = $.extend(params, options);
      console.log(settings);
      return this;
    },
    hide: function hide(callback) {}
  };

  $.fn.vgSidebar = method => {
    if (methods[method]) {
      return methods[method].apply(this, arguments);
    } else if (typeof method === 'object' || !method) {
      return methods.show.apply(this, arguments);
    } else {
      $.error('Метод с именем ' + method + ' не существует ');
    }
  };
})(jQuery);
