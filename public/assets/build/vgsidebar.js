var vg;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/js/_util/function.js":
/*!**********************************!*\
  !*** ./app/js/_util/function.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eventHandler: () => (/* binding */ eventHandler),
/* harmony export */   getDataAttributes: () => (/* binding */ getDataAttributes),
/* harmony export */   isEmptyObj: () => (/* binding */ isEmptyObj),
/* harmony export */   isJsonString: () => (/* binding */ isJsonString),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   mergeDeepObject: () => (/* binding */ mergeDeepObject)
/* harmony export */ });
/**
 * Глубокое объединение объектов
 * @param objects
 * @returns {*}
 */
function mergeDeepObject(...objects) {
  const isObject = obj => obj && typeof obj === 'object';
  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach(key => {
      const pVal = prev[key];
      const oVal = obj[key];
      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeDeepObject(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });
    return prev;
  }, {});
}
function getDataAttributes(node, isRemoveDataName = false) {
  if (!node) return false;
  let obj = {},
    arr = [].filter.call(node.attributes, function (at) {
      return /^data-/.test(at.name);
    });
  if (arr.length) {
    arr.forEach(function (v) {
      let name = v.name;
      if (isRemoveDataName) {
        if (name.indexOf('vg') === -1) {
          name = name.slice(5);
        } else {
          name = name.slice(8);
        }
      }
      obj[name] = v.value;
    });
  }
  return obj;
}

/**
 * isJsonString
 * @param str
 * @returns {boolean}
 */
function isJsonString(str) {
  try {
    str = JSON.parse(str);
  } catch (e) {
    return false;
  }
  return str;
}

/**
 * Если что-нибудь в объекте
 * @param obj
 * @returns {boolean}
 */
function isEmptyObj(obj) {
  for (let prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }
  return true;
}

/**
 * isObject
 * @param obj
 * @returns {boolean}
 */
const isObject = obj => obj && typeof obj === 'object';

/**
 * EVENTS
 * @type {{on: eventHandler.on}}
 * Как это работает?
 * Вызов функции: eventHandler.on('элемент который нужно тригернуть', 'как тригернуть элемент');
 */
const eventHandler = {
  on: function (element, event, detail = {}) {
    const eventSuccess = new CustomEvent(event, {
      bubbles: true,
      detail: detail
    });
    element.dispatchEvent(eventSuccess);
  }
};


/***/ }),

/***/ "./app/js/app.js":
/*!***********************!*\
  !*** ./app/js/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_util/function */ "./app/js/_util/function.js");

const EVENT_KEY_HIDE = 'vg.sidebar.hide';
const EVENT_KEY_HIDDEN = 'vg.sidebar.hidden';
const EVENT_KEY_SHOW = 'vg.sidebar.show';
const EVENT_KEY_SHOWN = 'vg.sidebar.shown';

/**
 * Установка параметров
 * Параметры дата атрибутов в приоритете
 */
let setParams = function (element, params, arg) {
  let mParams = (0,_util_function__WEBPACK_IMPORTED_MODULE_0__.mergeDeepObject)(params, arg, (0,_util_function__WEBPACK_IMPORTED_MODULE_0__.getDataAttributes)(element, true));
  if ((0,_util_function__WEBPACK_IMPORTED_MODULE_0__.isObject)(mParams) && !(0,_util_function__WEBPACK_IMPORTED_MODULE_0__.isEmptyObj)(mParams)) {
    for (const datum in mParams) {
      let value = mParams[datum];
      if (value === 'null') value = null;
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      if (datum !== 'params') {
        if (!(datum in params)) {
          let p = datum.split('-');
          if (p[1] in params[p[0]]) {
            params[p[0]][p[1]] = value;
          }
          delete mParams[datum];
        } else {
          mParams[datum] = value;
        }
      } else {
        setDataParams(value);
        delete mParams[datum];
      }
    }
  }
  function setDataParams(value) {
    if ((0,_util_function__WEBPACK_IMPORTED_MODULE_0__.isJsonString)(value)) {
      value = JSON.parse(value);
      setDataParams(value);
    } else if ((0,_util_function__WEBPACK_IMPORTED_MODULE_0__.isObject)(value) && !(0,_util_function__WEBPACK_IMPORTED_MODULE_0__.isEmptyObj)(value)) {
      mParams = (0,_util_function__WEBPACK_IMPORTED_MODULE_0__.mergeDeepObject)(mParams, value);
    }
  }
  function setAttrParams(datum, params, value) {}
  return mParams;
};

/**
 * Параметры по умолчанию
 * @type {{keyboard: boolean, overflow: boolean, backdrop: boolean, width: number, placement: string}}
 */
const defaultSettings = {
  backdrop: true,
  overflow: true,
  keyboard: true,
  ajax: {
    route: '',
    target: ''
  }
};
let _isShown = false;
class VGSidebar {
  constructor(element, arg = {}) {
    this.element = null;
    this.cross = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"' + '\t viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">' + '<path d="M89.7,10.3L89.7,10.3c-1-1-2.6-1-3.5,0L50,46.5L13.9,10.3c-1-1-2.6-1-3.5,0l0,0c-1,1-1,2.6,0,3.5L46.5,50L10.3,86.1' + '\tc-1,1-1,2.6,0,3.5h0c1,1,2.6,1,3.5,0L50,53.5l36.1,36.1c1,1,2.6,1,3.5,0l0,0c1-1,1-2.6,0-3.5L53.5,50l36.1-36.1' + '\tC90.6,12.9,90.6,11.3,89.7,10.3z"/>' + '</svg>';
    if (!element) {
      console.error('Первый параметр не должен быть пустым');
      return false;
    } else {
      if (typeof element === 'string') {
        let $element = document.getElementById(element);
        if ($element) {
          this.element = $element;
        } else {
          console.error('В строке должен быть идентификатор боковой панели');
        }
      } else {
        this.element = element;
      }
      if (this.element) {
        this.settings = setParams(this.element, defaultSettings, arg);
        this.init();
      }
    }
  }
  init() {
    const _this = this;
    let cross = _this.element.querySelector('.vg-sidebar-close');
    if (cross) {
      let svg = cross.querySelector('svg');
      if (!svg) cross.insertAdjacentHTML('beforeend', _this.cross);
    }
    _this.toggle();
    _this._addEventListener();
  }
  toggle() {
    return _isShown ? this.hide() : this.show();
  }
  show() {
    const _this = this;
    if (_isShown) return;
    _isShown = true;
    _util_function__WEBPACK_IMPORTED_MODULE_0__.eventHandler.on(_this.element, EVENT_KEY_SHOW);
    _this._backdrop();
    _this._overflow();
    _this.element.classList.add('show');
    setTimeout(() => {
      if (_this.settings.ajax.route && _this.settings.ajax.target) _this._route();
      _util_function__WEBPACK_IMPORTED_MODULE_0__.eventHandler.on(_this.element, EVENT_KEY_SHOWN);
    }, 50);
  }
  hide() {
    const _this = this;
    if (!_isShown) return;
    _isShown = false;
    _util_function__WEBPACK_IMPORTED_MODULE_0__.eventHandler.on(_this.element, EVENT_KEY_HIDE);
    _this._backdrop();
    _this._overflow();
    _this.element.classList.remove('show');
    setTimeout(() => {
      _util_function__WEBPACK_IMPORTED_MODULE_0__.eventHandler.on(_this.element, EVENT_KEY_HIDDEN);
    }, 50);
  }
  static getInstance(target, arg = {}) {
    return new VGSidebar(target, arg);
  }
  _backdrop() {
    let _this = this,
      backdrop = document.querySelector('.vg-sidebar-backdrop');
    if (!_this.settings.backdrop) return;
    if (backdrop) {
      backdrop.remove();
    } else {
      backdrop = document.createElement('div');
      backdrop.classList.add('vg-sidebar-backdrop');
      document.body.append(backdrop);
      setTimeout(() => {
        backdrop.classList.add('fade');
      }, 100);
    }
  }
  _overflow() {
    const _this = this;
    if (!_this.settings.overflow) {
      return;
    }
    if (!_isShown) {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    } else {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = getWidth() + 'px';
    }
    function getWidth() {
      const documentWidth = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - documentWidth);
    }
  }
  _addEventListener() {
    const _this = this;
    if (_isShown) {
      let backdrop = document.querySelector('.vg-sidebar-backdrop');
      if (backdrop) {
        backdrop.onclick = function () {
          _this.hide();
          return false;
        };
      }
    }
    [...document.querySelectorAll('[data-vg-dismiss="sidebar"]')].forEach(function (cross) {
      cross.onclick = function () {
        let target = cross.dataset.vgTarget || cross.closest('.vg-sidebar').id || null;
        if (target) {
          if (target.indexOf('#') !== -1) target = target.slice(1);
          VGSidebar.getInstance(target).hide();
        }
        return false;
      };
    });
    if (_this.settings.keyboard) {
      document.onkeyup = function (e) {
        if (e.key === "Escape") {
          _this.hide();
        }
        return false;
      };
    }
  }
  _route() {
    const _this = this;
    let $content = document.querySelector(_this.settings.ajax.target);
    if ($content) {
      let request = new XMLHttpRequest();
      request.open("get", _this.settings.ajax.route, true);
      request.onload = function () {
        setData(request.responseText);
      };
      request.send();
    }
    const setData = data => {
      $content.innerHTML = data;
    };
  }
}
[...document.querySelectorAll('[data-vg-toggle="sidebar"]')].forEach(function (btn) {
  btn.onclick = function () {
    let arg = (0,_util_function__WEBPACK_IMPORTED_MODULE_0__.getDataAttributes)(btn, true),
      target = arg.target || btn.getAttribute('href') || null;
    delete arg['target'];
    delete arg['toggle'];
    if (target && typeof target === 'string') {
      target = target.slice(1);
      new VGSidebar(target, arg);
    }
    return false;
  };
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VGSidebar);

/***/ }),

/***/ "./app/scss/app.scss":
/*!***************************!*\
  !*** ./app/scss/app.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VGSidebar: () => (/* reexport safe */ _app_js_app__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _app_scss_app_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/scss/app.scss */ "./app/scss/app.scss");
/* harmony import */ var _app_js_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/js/app */ "./app/js/app.js");



vg = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmdzaWRlYmFyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3hHQTtBQVNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBSUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7O0FDOVJBOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3ZnLy4vYXBwL2pzL191dGlsL2Z1bmN0aW9uLmpzIiwid2VicGFjazovL3ZnLy4vYXBwL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly92Zy8uL2FwcC9zY3NzL2FwcC5zY3NzIiwid2VicGFjazovL3ZnL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3ZnL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly92Zy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3ZnL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdmcvLi9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog0JPQu9GD0LHQvtC60L7QtSDQvtCx0YrQtdC00LjQvdC10L3QuNC1INC+0LHRitC10LrRgtC+0LJcclxuICogQHBhcmFtIG9iamVjdHNcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5mdW5jdGlvbiBtZXJnZURlZXBPYmplY3QoLi4ub2JqZWN0cykge1xyXG5cdGNvbnN0IGlzT2JqZWN0ID0gb2JqID0+IG9iaiAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JztcclxuXHJcblx0cmV0dXJuIG9iamVjdHMucmVkdWNlKChwcmV2LCBvYmopID0+IHtcclxuXHRcdE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xyXG5cdFx0XHRjb25zdCBwVmFsID0gcHJldltrZXldO1xyXG5cdFx0XHRjb25zdCBvVmFsID0gb2JqW2tleV07XHJcblxyXG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShwVmFsKSAmJiBBcnJheS5pc0FycmF5KG9WYWwpKSB7XHJcblx0XHRcdFx0cHJldltrZXldID0gcFZhbC5jb25jYXQoLi4ub1ZhbCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAoaXNPYmplY3QocFZhbCkgJiYgaXNPYmplY3Qob1ZhbCkpIHtcclxuXHRcdFx0XHRwcmV2W2tleV0gPSBtZXJnZURlZXBPYmplY3QocFZhbCwgb1ZhbCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0cHJldltrZXldID0gb1ZhbDtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHByZXY7XHJcblx0fSwge30pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREYXRhQXR0cmlidXRlcyhub2RlLCBpc1JlbW92ZURhdGFOYW1lID0gZmFsc2UpIHtcclxuXHRpZiAoIW5vZGUpIHJldHVybiBmYWxzZTtcclxuXHJcblx0bGV0IG9iaiA9IHt9LFxyXG5cdFx0YXJyID0gW10uZmlsdGVyLmNhbGwobm9kZS5hdHRyaWJ1dGVzLCBmdW5jdGlvbiAoYXQpIHtcclxuXHRcdFx0cmV0dXJuIC9eZGF0YS0vLnRlc3QoYXQubmFtZSk7XHJcblx0XHR9KTtcclxuXHJcblx0aWYgKGFyci5sZW5ndGgpIHtcclxuXHRcdGFyci5mb3JFYWNoKGZ1bmN0aW9uICh2KSB7XHJcblx0XHRcdGxldCBuYW1lID0gdi5uYW1lO1xyXG5cdFx0XHRpZiAoaXNSZW1vdmVEYXRhTmFtZSkge1xyXG5cdFx0XHRcdGlmIChuYW1lLmluZGV4T2YoJ3ZnJykgPT09IC0xKSB7XHJcblx0XHRcdFx0XHRuYW1lID0gbmFtZS5zbGljZSg1KTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0bmFtZSA9IG5hbWUuc2xpY2UoOCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdG9ialtuYW1lXSA9IHYudmFsdWVcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIG9iajtcclxufVxyXG5cclxuLyoqXHJcbiAqIGlzSnNvblN0cmluZ1xyXG4gKiBAcGFyYW0gc3RyXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZnVuY3Rpb24gaXNKc29uU3RyaW5nKHN0cikge1xyXG5cdHRyeSB7XHJcblx0XHRzdHIgPSBKU09OLnBhcnNlKHN0cik7XHJcblx0fSBjYXRjaCAoZSkge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHRyZXR1cm4gc3RyO1xyXG59XHJcblxyXG4vKipcclxuICog0JXRgdC70Lgg0YfRgtC+LdC90LjQsdGD0LTRjCDQsiDQvtCx0YrQtdC60YLQtVxyXG4gKiBAcGFyYW0gb2JqXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZnVuY3Rpb24gaXNFbXB0eU9iaihvYmopIHtcclxuXHRmb3IgKGxldCBwcm9wIGluIG9iaikge1xyXG5cdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiB0cnVlXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBpc09iamVjdFxyXG4gKiBAcGFyYW0gb2JqXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuY29uc3QgaXNPYmplY3QgPSBvYmogPT4gb2JqICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnO1xyXG5cclxuLyoqXHJcbiAqIEVWRU5UU1xyXG4gKiBAdHlwZSB7e29uOiBldmVudEhhbmRsZXIub259fVxyXG4gKiDQmtCw0Log0Y3RgtC+INGA0LDQsdC+0YLQsNC10YI/XHJcbiAqINCS0YvQt9C+0LIg0YTRg9C90LrRhtC40Lg6IGV2ZW50SGFuZGxlci5vbign0Y3Qu9C10LzQtdC90YIg0LrQvtGC0L7RgNGL0Lkg0L3Rg9C20L3QviDRgtGA0LjQs9C10YDQvdGD0YLRjCcsICfQutCw0Log0YLRgNC40LPQtdGA0L3Rg9GC0Ywg0Y3Qu9C10LzQtdC90YInKTtcclxuICovXHJcbmNvbnN0IGV2ZW50SGFuZGxlciA9IHtcclxuXHRvbjogZnVuY3Rpb24gKGVsZW1lbnQsIGV2ZW50LCBkZXRhaWwgPSB7fSkge1xyXG5cdFx0Y29uc3QgZXZlbnRTdWNjZXNzID0gbmV3IEN1c3RvbUV2ZW50KGV2ZW50LCB7XHJcblx0XHRcdGJ1YmJsZXM6IHRydWUsXHJcblx0XHRcdGRldGFpbDogZGV0YWlsXHJcblx0XHR9KTtcclxuXHJcblx0XHRlbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnRTdWNjZXNzKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCB7bWVyZ2VEZWVwT2JqZWN0LCBnZXREYXRhQXR0cmlidXRlcywgaXNKc29uU3RyaW5nLCBpc09iamVjdCwgaXNFbXB0eU9iaiwgZXZlbnRIYW5kbGVyfVxyXG4iLCJpbXBvcnQge1xyXG5cdGV2ZW50SGFuZGxlcixcclxuXHRnZXREYXRhQXR0cmlidXRlcyxcclxuXHRpc0VtcHR5T2JqLFxyXG5cdGlzSnNvblN0cmluZyxcclxuXHRpc09iamVjdCxcclxuXHRtZXJnZURlZXBPYmplY3RcclxufSBmcm9tIFwiLi9fdXRpbC9mdW5jdGlvblwiO1xyXG5cclxuY29uc3QgRVZFTlRfS0VZX0hJREUgPSAndmcuc2lkZWJhci5oaWRlJztcclxuY29uc3QgRVZFTlRfS0VZX0hJRERFTiAgID0gJ3ZnLnNpZGViYXIuaGlkZGVuJztcclxuY29uc3QgRVZFTlRfS0VZX1NIT1cgID0gJ3ZnLnNpZGViYXIuc2hvdyc7XHJcbmNvbnN0IEVWRU5UX0tFWV9TSE9XTiAgPSAndmcuc2lkZWJhci5zaG93bic7XHJcblxyXG4vKipcclxuICog0KPRgdGC0LDQvdC+0LLQutCwINC/0LDRgNCw0LzQtdGC0YDQvtCyXHJcbiAqINCf0LDRgNCw0LzQtdGC0YDRiyDQtNCw0YLQsCDQsNGC0YDQuNCx0YPRgtC+0LIg0LIg0L/RgNC40L7RgNC40YLQtdGC0LVcclxuICovXHJcbmxldCBzZXRQYXJhbXMgPSBmdW5jdGlvbiAoZWxlbWVudCwgcGFyYW1zLCBhcmcpIHtcclxuXHRsZXQgbVBhcmFtcyA9IG1lcmdlRGVlcE9iamVjdChwYXJhbXMsIGFyZywgZ2V0RGF0YUF0dHJpYnV0ZXMoZWxlbWVudCwgdHJ1ZSkpO1xyXG5cclxuXHRpZiAoaXNPYmplY3QobVBhcmFtcykgJiYgIWlzRW1wdHlPYmoobVBhcmFtcykpIHtcclxuXHRcdGZvciAoY29uc3QgZGF0dW0gaW4gbVBhcmFtcykge1xyXG5cdFx0XHRsZXQgdmFsdWUgPSBtUGFyYW1zW2RhdHVtXTtcclxuXHJcblx0XHRcdGlmICh2YWx1ZSA9PT0gJ251bGwnKSB2YWx1ZSA9IG51bGw7XHJcblx0XHRcdGlmICh2YWx1ZSA9PT0gJ3RydWUnKSB2YWx1ZSA9IHRydWU7XHJcblx0XHRcdGlmICh2YWx1ZSA9PT0gJ2ZhbHNlJykgdmFsdWUgPSBmYWxzZTtcclxuXHJcblx0XHRcdGlmIChkYXR1bSAhPT0gJ3BhcmFtcycpIHtcclxuXHRcdFx0XHRpZiAoIShkYXR1bSBpbiBwYXJhbXMpKSB7XHJcblx0XHRcdFx0XHRsZXQgcCA9IGRhdHVtLnNwbGl0KCctJyk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKHBbMV0gaW4gcGFyYW1zW3BbMF1dKSB7XHJcblx0XHRcdFx0XHRcdHBhcmFtc1twWzBdXVtwWzFdXSA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGRlbGV0ZSBtUGFyYW1zW2RhdHVtXTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0bVBhcmFtc1tkYXR1bV0gPSB2YWx1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0c2V0RGF0YVBhcmFtcyh2YWx1ZSk7XHJcblx0XHRcdFx0ZGVsZXRlIG1QYXJhbXNbZGF0dW1dO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBzZXREYXRhUGFyYW1zKHZhbHVlKSB7XHJcblx0XHRpZiAoaXNKc29uU3RyaW5nKHZhbHVlKSkge1xyXG5cdFx0XHR2YWx1ZSA9IEpTT04ucGFyc2UodmFsdWUpO1xyXG5cdFx0XHRzZXREYXRhUGFyYW1zKHZhbHVlKTtcclxuXHRcdH0gZWxzZSBpZiAoaXNPYmplY3QodmFsdWUpICYmICFpc0VtcHR5T2JqKHZhbHVlKSkge1xyXG5cdFx0XHRtUGFyYW1zID0gbWVyZ2VEZWVwT2JqZWN0KG1QYXJhbXMsIHZhbHVlKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gc2V0QXR0clBhcmFtcyhkYXR1bSwgcGFyYW1zLCB2YWx1ZSkge1xyXG5cclxuXHR9XHJcblxyXG5cdHJldHVybiBtUGFyYW1zO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqINCf0LDRgNCw0LzQtdGC0YDRiyDQv9C+INGD0LzQvtC70YfQsNC90LjRjlxyXG4gKiBAdHlwZSB7e2tleWJvYXJkOiBib29sZWFuLCBvdmVyZmxvdzogYm9vbGVhbiwgYmFja2Ryb3A6IGJvb2xlYW4sIHdpZHRoOiBudW1iZXIsIHBsYWNlbWVudDogc3RyaW5nfX1cclxuICovXHJcbmNvbnN0IGRlZmF1bHRTZXR0aW5ncyA9IHtcclxuXHRiYWNrZHJvcDogdHJ1ZSxcclxuXHRvdmVyZmxvdzogdHJ1ZSxcclxuXHRrZXlib2FyZDogdHJ1ZSxcclxuXHRhamF4OiB7XHJcblx0XHRyb3V0ZTogJycsXHJcblx0XHR0YXJnZXQ6ICcnXHJcblx0fVxyXG59XHJcblxyXG5sZXQgX2lzU2hvd24gPSBmYWxzZTtcclxuXHJcbmNsYXNzIFZHU2lkZWJhciB7XHJcblx0Y29uc3RydWN0b3IoZWxlbWVudCwgYXJnID0ge30pIHtcclxuXHRcdHRoaXMuZWxlbWVudCA9IG51bGw7XHJcblx0XHR0aGlzLmNyb3NzID0gJzxzdmcgdmVyc2lvbj1cIjEuMVwiIGlkPVwiTGF5ZXJfMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4PVwiMHB4XCIgeT1cIjBweFwiJyArXHJcblx0XHQnXFx0IHZpZXdCb3g9XCIwIDAgMTAwIDEwMFwiIHN0eWxlPVwiZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDAgMTAwO1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+JyArXHJcblx0XHQnPHBhdGggZD1cIk04OS43LDEwLjNMODkuNywxMC4zYy0xLTEtMi42LTEtMy41LDBMNTAsNDYuNUwxMy45LDEwLjNjLTEtMS0yLjYtMS0zLjUsMGwwLDBjLTEsMS0xLDIuNiwwLDMuNUw0Ni41LDUwTDEwLjMsODYuMScgK1xyXG5cdFx0J1xcdGMtMSwxLTEsMi42LDAsMy41aDBjMSwxLDIuNiwxLDMuNSwwTDUwLDUzLjVsMzYuMSwzNi4xYzEsMSwyLjYsMSwzLjUsMGwwLDBjMS0xLDEtMi42LDAtMy41TDUzLjUsNTBsMzYuMS0zNi4xJyArXHJcblx0XHQnXFx0QzkwLjYsMTIuOSw5MC42LDExLjMsODkuNywxMC4zelwiLz4nICtcclxuXHRcdCc8L3N2Zz4nO1xyXG5cclxuXHRcdGlmICghZWxlbWVudCkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCfQn9C10YDQstGL0Lkg0L/QsNGA0LDQvNC10YLRgCDQvdC1INC00L7Qu9C20LXQvSDQsdGL0YLRjCDQv9GD0YHRgtGL0LwnKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdGxldCAkZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnQpO1xyXG5cdFx0XHRcdGlmICgkZWxlbWVudCkge1xyXG5cdFx0XHRcdFx0dGhpcy5lbGVtZW50ID0gJGVsZW1lbnQ7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ9CSINGB0YLRgNC+0LrQtSDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0LjQtNC10L3RgtC40YTQuNC60LDRgtC+0YAg0LHQvtC60L7QstC+0Lkg0L/QsNC90LXQu9C4Jyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0aGlzLmVsZW1lbnQpIHtcclxuXHRcdFx0XHR0aGlzLnNldHRpbmdzID0gc2V0UGFyYW1zKHRoaXMuZWxlbWVudCwgZGVmYXVsdFNldHRpbmdzLCBhcmcpO1xyXG5cdFx0XHRcdHRoaXMuaW5pdCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRpbml0KCkge1xyXG5cdFx0Y29uc3QgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRcdGxldCBjcm9zcyA9IF90aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignLnZnLXNpZGViYXItY2xvc2UnKTtcclxuXHRcdGlmIChjcm9zcykge1xyXG5cdFx0XHRsZXQgc3ZnID0gY3Jvc3MucXVlcnlTZWxlY3Rvcignc3ZnJyk7XHJcblx0XHRcdGlmICghc3ZnKSBjcm9zcy5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIF90aGlzLmNyb3NzKTtcclxuXHRcdH1cclxuXHJcblx0XHRfdGhpcy50b2dnbGUoKTtcclxuXHRcdF90aGlzLl9hZGRFdmVudExpc3RlbmVyKCk7XHJcblx0fVxyXG5cclxuXHR0b2dnbGUoKSB7XHJcblx0XHRyZXR1cm4gX2lzU2hvd24gPyB0aGlzLmhpZGUoKSA6IHRoaXMuc2hvdygpO1xyXG5cdH1cclxuXHJcblx0c2hvdygpIHtcclxuXHRcdGNvbnN0IF90aGlzID0gdGhpcztcclxuXHJcblx0XHRpZiAoX2lzU2hvd24pIHJldHVybjtcclxuXHRcdF9pc1Nob3duID0gdHJ1ZTtcclxuXHJcblx0XHRldmVudEhhbmRsZXIub24oX3RoaXMuZWxlbWVudCwgRVZFTlRfS0VZX1NIT1cpO1xyXG5cclxuXHRcdF90aGlzLl9iYWNrZHJvcCgpO1xyXG5cdFx0X3RoaXMuX292ZXJmbG93KCk7XHJcblx0XHRfdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuXHJcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0aWYgKF90aGlzLnNldHRpbmdzLmFqYXgucm91dGUgJiYgX3RoaXMuc2V0dGluZ3MuYWpheC50YXJnZXQpIF90aGlzLl9yb3V0ZSgpO1xyXG5cclxuXHRcdFx0ZXZlbnRIYW5kbGVyLm9uKF90aGlzLmVsZW1lbnQsIEVWRU5UX0tFWV9TSE9XTik7XHJcblx0XHR9LCA1MClcclxuXHR9XHJcblxyXG5cdGhpZGUoKSB7XHJcblx0XHRjb25zdCBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdFx0aWYgKCFfaXNTaG93bikgcmV0dXJuO1xyXG5cdFx0X2lzU2hvd24gPSBmYWxzZTtcclxuXHJcblx0XHRldmVudEhhbmRsZXIub24oX3RoaXMuZWxlbWVudCwgRVZFTlRfS0VZX0hJREUpO1xyXG5cclxuXHRcdF90aGlzLl9iYWNrZHJvcCgpO1xyXG5cdFx0X3RoaXMuX292ZXJmbG93KCk7XHJcblx0XHRfdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuXHJcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0ZXZlbnRIYW5kbGVyLm9uKF90aGlzLmVsZW1lbnQsIEVWRU5UX0tFWV9ISURERU4pO1xyXG5cdFx0fSwgNTApXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0SW5zdGFuY2UodGFyZ2V0LCBhcmcgPSB7fSkge1xyXG5cdFx0cmV0dXJuIG5ldyBWR1NpZGViYXIodGFyZ2V0LCBhcmcpO1xyXG5cdH1cclxuXHJcblx0X2JhY2tkcm9wKCkge1xyXG5cdFx0bGV0IF90aGlzID0gdGhpcyxcclxuXHRcdFx0YmFja2Ryb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmctc2lkZWJhci1iYWNrZHJvcCcpO1xyXG5cclxuXHRcdGlmICghX3RoaXMuc2V0dGluZ3MuYmFja2Ryb3ApIHJldHVybjtcclxuXHJcblx0XHRpZiAoYmFja2Ryb3ApIHtcclxuXHRcdFx0YmFja2Ryb3AucmVtb3ZlKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRiYWNrZHJvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdFx0XHRiYWNrZHJvcC5jbGFzc0xpc3QuYWRkKCd2Zy1zaWRlYmFyLWJhY2tkcm9wJyk7XHJcblxyXG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZChiYWNrZHJvcCk7XHJcblxyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRiYWNrZHJvcC5jbGFzc0xpc3QuYWRkKCdmYWRlJylcclxuXHRcdFx0fSwgMTAwKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0X292ZXJmbG93KCkge1xyXG5cdFx0Y29uc3QgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRcdGlmICghX3RoaXMuc2V0dGluZ3Mub3ZlcmZsb3cpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghX2lzU2hvd24pIHtcclxuXHRcdFx0ZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9ICcnO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9IGdldFdpZHRoKCkgKyAncHgnO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGdldFdpZHRoKCkge1xyXG5cdFx0XHRjb25zdCBkb2N1bWVudFdpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoXHJcblx0XHRcdHJldHVybiBNYXRoLmFicyh3aW5kb3cuaW5uZXJXaWR0aCAtIGRvY3VtZW50V2lkdGgpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRfYWRkRXZlbnRMaXN0ZW5lcigpIHtcclxuXHRcdGNvbnN0IF90aGlzID0gdGhpcztcclxuXHJcblx0XHRpZiAoX2lzU2hvd24pIHtcclxuXHRcdFx0bGV0IGJhY2tkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZnLXNpZGViYXItYmFja2Ryb3AnKTtcclxuXHJcblx0XHRcdGlmIChiYWNrZHJvcCkge1xyXG5cdFx0XHRcdGJhY2tkcm9wLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRfdGhpcy5oaWRlKCk7XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS12Zy1kaXNtaXNzPVwic2lkZWJhclwiXScpXS5mb3JFYWNoKGZ1bmN0aW9uIChjcm9zcykge1xyXG5cdFx0XHRjcm9zcy5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdGxldCB0YXJnZXQgPSBjcm9zcy5kYXRhc2V0LnZnVGFyZ2V0IHx8IGNyb3NzLmNsb3Nlc3QoJy52Zy1zaWRlYmFyJykuaWQgfHwgbnVsbDtcclxuXHJcblx0XHRcdFx0aWYgKHRhcmdldCkge1xyXG5cdFx0XHRcdFx0aWYgKHRhcmdldC5pbmRleE9mKCcjJykgIT09IC0xKSB0YXJnZXQgPSB0YXJnZXQuc2xpY2UoMSk7XHJcblx0XHRcdFx0XHRWR1NpZGViYXIuZ2V0SW5zdGFuY2UodGFyZ2V0KS5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmIChfdGhpcy5zZXR0aW5ncy5rZXlib2FyZCkge1xyXG5cdFx0XHRkb2N1bWVudC5vbmtleXVwID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdGlmIChlLmtleSA9PT0gXCJFc2NhcGVcIikge1xyXG5cdFx0XHRcdFx0X3RoaXMuaGlkZSgpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0X3JvdXRlKCkge1xyXG5cdFx0Y29uc3QgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRcdGxldCAkY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoX3RoaXMuc2V0dGluZ3MuYWpheC50YXJnZXQpO1xyXG5cdFx0aWYgKCRjb250ZW50KSB7XHJcblx0XHRcdGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblx0XHRcdHJlcXVlc3Qub3BlbihcImdldFwiLCBfdGhpcy5zZXR0aW5ncy5hamF4LnJvdXRlLCB0cnVlKTtcclxuXHRcdFx0cmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRzZXREYXRhKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcclxuXHRcdFx0fTtcclxuXHRcdFx0cmVxdWVzdC5zZW5kKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3Qgc2V0RGF0YSA9IChkYXRhKSA9PiB7XHJcblx0XHRcdCRjb250ZW50LmlubmVySFRNTCA9IGRhdGE7XHJcblx0XHR9O1xyXG5cdH1cclxufVxyXG5cclxuWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXZnLXRvZ2dsZT1cInNpZGViYXJcIl0nKV0uZm9yRWFjaChmdW5jdGlvbiAoYnRuKSB7XHJcblx0YnRuLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRsZXQgYXJnID0gZ2V0RGF0YUF0dHJpYnV0ZXMoYnRuLCB0cnVlKSxcclxuXHRcdFx0dGFyZ2V0ID0gYXJnLnRhcmdldCB8fCBidG4uZ2V0QXR0cmlidXRlKCdocmVmJykgfHwgbnVsbDtcclxuXHJcblx0XHRkZWxldGUgYXJnWyd0YXJnZXQnXTtcclxuXHRcdGRlbGV0ZSBhcmdbJ3RvZ2dsZSddO1xyXG5cclxuXHRcdGlmICh0YXJnZXQgJiYgdHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGFyZ2V0ID0gdGFyZ2V0LnNsaWNlKDEpO1xyXG5cclxuXHRcdFx0bmV3IFZHU2lkZWJhcih0YXJnZXQsIGFyZylcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZHU2lkZWJhcjtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL2FwcC9zY3NzL2FwcC5zY3NzXCI7XHJcbmltcG9ydCBWR1NpZGViYXIgZnJvbSBcIi4vYXBwL2pzL2FwcFwiO1xyXG5cclxuZXhwb3J0IHtcclxuXHRWR1NpZGViYXJcclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=