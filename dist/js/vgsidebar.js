"use strict";

class VGSidebar {
  constructor(target) {
    var arg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.sidebar = null;
    this.init(target, arg);
  }

  init(target, arg) {
    if (target) {
      this.sidebar = document.getElementById(target);
      this.settings = Object.assign({
        content_over: true,
        hash: false,
        ajax: {
          target: '',
          route: '',
          method: 'get',
          variables: {}
        }
      }, arg);
    }
  }

  open() {
    if (!this.sidebar) return false;

    var _this = this;

    _this.sidebar.classList.add('open');

    if (_this.settings.hash) {
      window.history.pushState({}, 'sidebar open', '#sidebar-open');
    }

    if (_this.settings.content_over) {
      document.body.style.paddingRight = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
    }

    if (_this.settings.ajax.route && _this.settings.ajax.target) {
      var $content = document.getElementById(_this.settings.ajax.target);

      if ($content) {
        var request = new XMLHttpRequest();
        request.open(_this.settings.ajax.method, _this.settings.ajax.route, true);

        request.onload = function () {
          var data = JSON.parse(request.responseText);
          setData(data);
        };

        request.send(null);
      }

      var setData = data => {
        $content.innerHTML = data;
      };
    }

    document.onclick = function (e) {
      if (e.target === _this.sidebar) {
        _this.close();

        return false;
      }
    };

    document.onkeyup = function (e) {
      if (e.key === "Escape") {
        _this.close();
      }

      return false;
    };

    var _close = _this.sidebar.querySelectorAll('[data-dismiss="vg-sidebar"]');

    for (var el of _close) {
      el.onclick = function () {
        _this.close();

        return false;
      };
    }
  }

  close() {
    if (!this.sidebar) return false;
    this.sidebar.classList.remove('open');

    if (_this.settings.hash) {
      window.history.back();
    }

    if (this.settings.content_over) {
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
    }
  }

}
