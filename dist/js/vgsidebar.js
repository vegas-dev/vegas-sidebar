"use strict";

(function ($) {
  var NAME = 'vgsidebar';
  var CLASS_NAME = 'vg-sidebar';
  var MAIN_CONTAINER = 'body';
  var afterOpen = $.noop,
      beforeOpen = $.noop;
  var afterClose = $.noop,
      beforeClose = $.noop;
  var afterAjaxLoad = $.noop,
      beforeAjaxLoad = $.noop;
  var settings = {},
      methods = {
    open: function open(options, callback) {
      settings = $.extend($.fn[NAME].defaults, options);

      if (settings.target && $(settings.target).length) {
        var $self = $(settings.target),
            width_scrollbar = window.innerWidth - document.documentElement.clientWidth;
        $self.addClass('open');
        $self.trigger('sidebar-open');
        $(MAIN_CONTAINER).addClass(CLASS_NAME + '-open');

        if (settings.content_over) {
          $(MAIN_CONTAINER).css({
            'padding-right': width_scrollbar,
            'overflow': 'hidden'
          });
        }

        $(document).on('mouseup.' + NAME, function (e) {
          var container = $('.' + CLASS_NAME);

          if (container.has(e.target).length === 0) {
            $.fn[NAME]('close');
          }

          return false;
        });
        $('[data-dismiss="vg-sidebar"]').on('click.' + NAME, function () {
          $.fn.vgsidebar('close');
          return false;
        });
        return this;
      } else {
        $.error('Sidebar not found');
      }
    },
    close: function close(callback) {
      if (settings.target && $(settings.target).length) {
        var $self = $(settings.target);
        $self.removeClass('open');
        $self.trigger('sidebar-close');

        if (settings.content_over) {
          $(MAIN_CONTAINER).removeClass(CLASS_NAME + '-open').css({
            'padding-right': '',
            'overflow': ''
          });
        }

        if (settings.content_overlay) {
          var $overlay = $(MAIN_CONTAINER).find('.' + CLASS_NAME + '-overlay');
          $overlay.removeClass('show');
          setTimeout(() => {
            $overlay.remove();
          }, 400);
        }

        return this;
      } else {
        $.error('Sidebar not found');
      }
    }
  };

  $.fn[NAME] = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.open.apply(this, arguments);
    } else {
      $.error('Method "' + method + '" not found');
    }
  };

  $.fn[NAME].defaults = {
    target: '',
    placement: 'right',
    content_over: true,
    ajax: {
      target: '',
      route: '',
      method: 'get',
      variables: {}
    }
  };
})(jQuery);

$(document).ready(function () {
  $(document).on('click', '[data-toggle="vg-sidebar"]', function () {
    var $self = $(this),
        data = $self.data(),
        params = {
      target: data.target || $self.attr('href')
    };
    params = $.extend(data, params);
    $.fn.vgsidebar('open', params);
    return false;
  });
});
