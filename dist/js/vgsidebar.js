"use strict";

class VGSidebar {
  constructor($btn) {
    var arg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.sidebar = null;
    this.button = null;
    this.target = null;
    this.settings = {
      content_over: true,
      hash: false,
      ajax: {
        target: '',
        route: ''
      }
    };
    this.classes = {
      body: 'vg-sidebar-open',
      open: 'open',
      btn: 'vg-sidebar-active'
    };
    this.init($btn, arg);
  }

  init($btn, arg, callback) {
    if (typeof $btn === 'string') {
      this.target = $btn;
    } else {
      this.target = $btn.dataset.target || $btn.href;
    }

    if (this.target.indexOf('#') !== -1) {
      this.target = this.target.split('#')[1];
    }

    if (this.target) {
      var _this = this;

      this.sidebar = document.getElementById(_this.target);
      this.button = $btn;
      this.settings = Object.assign(_this.settings, arg);

      if (document.body.classList.contains(_this.classes.body) && !_this.sidebar.classList.contains('open')) {
        this.close(callback, true);
      }

      if (callback) {
        if (typeof callback === 'function') callback(_this);
      }
    }
  }

  open(callback) {
    if (!this.sidebar) return false;

    var _this = this;

    if (callback && 'beforeOpen' in callback) {
      if (typeof callback.beforeOpen === 'function') callback.beforeOpen(_this);
    }

    _this.sidebar.classList.add('open');

    if (_this.button && typeof _this.button !== 'string') _this.button.classList.add(_this.classes.btn);
    document.body.classList.add(_this.classes.body);

    if (_this.settings.hash) {
      var hash = _this.sidebar.id;

      if (hash) {
        window.history.pushState(null, 'sidebar open', '#sidebar-open-' + hash);
      }

      window.addEventListener("popstate", function (e) {
        _this.close();
      }, false);
    }

    if (_this.settings.content_over) {
      document.body.style.paddingRight = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
    }

    if (_this.settings.ajax.route && _this.settings.ajax.target) {
      var $content = document.getElementById(_this.settings.ajax.target);

      if ($content) {
        var request = new XMLHttpRequest();
        request.open('get', _this.settings.ajax.route, true);

        request.onload = function () {
          var data = JSON.parse(request.responseText);
          setData(data);
        };

        request.send();
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

    if (callback && 'afterOpen' in callback) {
      if (typeof callback.afterOpen === 'function') callback.afterOpen(_this);
    }
  }

  close(callback) {
    var closeAll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (!this.sidebar) return false;

    var _this = this;

    if (callback && 'beforeClose' in callback) {
      if (typeof callback.beforeClose === 'function') callback.beforeClose(_this);
    }

    if (closeAll) {
      var $sidebars = document.querySelectorAll('.vg-sidebar.open');

      if ($sidebars && $sidebars.length) {
        document.body.classList.remove(_this.classes.body);

        for (var $sidebar of $sidebars) {
          $sidebar.classList.remove('open');
        }

        var $buttons = document.querySelectorAll('.' + _this.classes.btn);

        for (var $btn of $buttons) {
          $btn.classList.remove(_this.classes.btn);
        }

        if (location.hash) {
          history.pushState("", document.title, window.location.pathname + window.location.search);
        }
      }
    } else {
      _this.sidebar.classList.remove('open');

      if (_this.button && typeof _this.button !== 'string') _this.button.classList.remove(_this.classes.btn);
      document.body.classList.remove(_this.classes.body);

      if (location.hash) {
        history.pushState("", document.title, window.location.pathname + window.location.search);
      }

      if (_this.settings.content_over) {
        document.body.style.paddingRight = '';
        document.body.style.overflow = '';
      }
    }

    if (callback && 'afterClose' in callback) {
      if (typeof callback.afterClose === 'function') callback.afterClose(_this);
    }
  }

}

if (window.location.hash) {
  var target = window.location.hash.replace('#sidebar-open-', '');

  if (document.getElementById(target)) {
    var sidebar = new VGSidebar(target);
    sidebar.open();
  }
}

var $vg_sidebar_toggle = document.querySelectorAll('[data-toggle="vg-sidebar"]');

for (var $btn of $vg_sidebar_toggle) {
  $btn.onclick = function (e) {
    var button = this;
    var params = {
      content_over: button.dataset.over || true,
      hash: button.dataset.hash || false,
      ajax: {
        target: button.dataset.ajaxTarget || '',
        route: button.dataset.ajaxRoute || ''
      }
    };
    var sidebar = new VGSidebar(button, params);

    if (document.body.classList.contains('vg-sidebar-open')) {
      sidebar.close();
    } else {
      sidebar.open();
    }

    return false;
  };
}
