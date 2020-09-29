"use strict";

(function ($) {
  var NAME = 'vg-sidebar';
  var DATA_KEY = 'vg.sidebar';
  var CLASS_SIDEBAR_SHOW = 'show';
  var params = {
    target: '',
    placement: 'right',
    ajax: false
  };
  var methods = {
    show: function show(options) {
      var settings = $.extend(params, options);
      console.log(settings);
      return this;
    },
    hide: function hide() {}
  };

  $.fn.vgSidebar = method => {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.show.apply(this, arguments);
    } else {
      $.error('Метод с именем ' + method + ' не существует ');
    }
  };
})(jQuery);
