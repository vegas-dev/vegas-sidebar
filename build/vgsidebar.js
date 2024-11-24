var vg;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/js/_util/base-module.js":
/*!*************************************!*\
  !*** ./app/js/_util/base-module.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _manipulator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./manipulator */ "./app/js/_util/manipulator.js");

class BaseModule {
  constructor() {
    this._element = null;
    this._params = {};
  }
  get element() {
    return this._element;
  }
  set element(el) {
    this._element = _manipulator__WEBPACK_IMPORTED_MODULE_0__.Manipulator.find(el);
  }
  get params() {
    return this._params;
  }
  set params(params) {
    if (!(0,_manipulator__WEBPACK_IMPORTED_MODULE_0__.isEmptyObj)(params)) {
      let attrs = _manipulator__WEBPACK_IMPORTED_MODULE_0__.Manipulator.getDataAttributes(this.element);
      this._params = (0,_manipulator__WEBPACK_IMPORTED_MODULE_0__.mergeDeepObject)(params, attrs);
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BaseModule);

/***/ }),

/***/ "./app/js/_util/manipulator.js":
/*!*************************************!*\
  !*** ./app/js/_util/manipulator.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Manipulator: () => (/* binding */ Manipulator),
/* harmony export */   eventHandler: () => (/* binding */ eventHandler),
/* harmony export */   isEmptyObj: () => (/* binding */ isEmptyObj),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   mergeDeepObject: () => (/* binding */ mergeDeepObject),
/* harmony export */   normalizeData: () => (/* binding */ normalizeData),
/* harmony export */   removeElementArray: () => (/* binding */ removeElementArray)
/* harmony export */ });
/**
 * Удаляем элементы с массива
 * @param arr
 * @param el
 */
function removeElementArray(arr, el) {
  return arr.filter(function (item) {
    return !el.includes(item);
  });
}

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
function isObject(obj) {
  return obj && typeof obj === 'object';
}

/**
 * Приводим в порядок типы данных
 * @param value
 * @returns {any}
 */
function normalizeData(value) {
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  if (value === Number(value).toString()) {
    return Number(value);
  }
  if (value === '' || value === 'null') {
    return null;
  }
  if (typeof value !== 'string') {
    return value;
  }
  try {
    return JSON.parse(decodeURIComponent(value));
  } catch {
    return value;
  }
}

/**
 * Манипуляции с элементом
 */
const Manipulator = {
  getDataAttributes(element, isRemoveDataName = true, isRemovePrefix = true) {
    if (!element) {
      return {};
    }
    const attributes = {},
      arr = [].filter.call(element.attributes, function (at) {
        return /^data-/.test(at.name);
      });
    if (arr.length) {
      arr.forEach(function (v) {
        let name = v.name,
          prefix = 'vg-';
        if (isRemoveDataName) name = name.slice(5);
        if (isRemovePrefix && name.indexOf(prefix) !== -1) name = name.slice(3);
        attributes[name] = normalizeData(v.value);
      });
    }
    return attributes;
  },
  getAttribute: function (element, nameAttribute) {
    if (!element) {
      return '';
    }
    return element.getAttribute(nameAttribute);
  },
  find: function (el) {
    if (!el) {
      throw new Error('Товарищ! Первый параметр не должен быть пустым!');
    } else {
      if (typeof el === 'string') {
        let elm = document.querySelector(el);
        if (elm) return elm;else throw new Error('Ахпер! Не удалось найти элемент');
      } else if (typeof el === 'object') {
        return el;
      } else {
        throw new Error('КЭП! Какая-то дичь к нам залетела');
      }
    }
  }
};

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
/* harmony import */ var _util_base_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_util/base-module */ "./app/js/_util/base-module.js");
/* harmony import */ var _util_manipulator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_util/manipulator */ "./app/js/_util/manipulator.js");


const EVENT_KEY_HIDE = 'vg.sidebar.hide';
const EVENT_KEY_HIDDEN = 'vg.sidebar.hidden';
const EVENT_KEY_SHOW = 'vg.sidebar.show';
const EVENT_KEY_SHOWN = 'vg.sidebar.shown';
const EVENT_KEY_LOADED = 'vg.sidebar.loaded';
let _isShown = false,
  _cross = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"' + '\t viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">' + '<path d="M89.7,10.3L89.7,10.3c-1-1-2.6-1-3.5,0L50,46.5L13.9,10.3c-1-1-2.6-1-3.5,0l0,0c-1,1-1,2.6,0,3.5L46.5,50L10.3,86.1' + '\tc-1,1-1,2.6,0,3.5h0c1,1,2.6,1,3.5,0L50,53.5l36.1,36.1c1,1,2.6,1,3.5,0l0,0c1-1,1-2.6,0-3.5L53.5,50l36.1-36.1' + '\tC90.6,12.9,90.6,11.3,89.7,10.3z"/>' + '</svg>';
class VGSidebar extends _util_base_module__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(element, arg = {}) {
    super();
    this.paramsDefault = {
      backdrop: true,
      overflow: true,
      keyboard: true,
      ajax: {
        route: '',
        target: ''
      }
    };
    this.element = element;
    let mParams = (0,_util_manipulator__WEBPACK_IMPORTED_MODULE_1__.mergeDeepObject)(arg, this.paramsDefault);
    if ((0,_util_manipulator__WEBPACK_IMPORTED_MODULE_1__.isObject)(mParams) && !(0,_util_manipulator__WEBPACK_IMPORTED_MODULE_1__.isEmptyObj)(mParams)) {
      for (const datum in mParams) {
        let value = (0,_util_manipulator__WEBPACK_IMPORTED_MODULE_1__.normalizeData)(mParams[datum]);
        if (datum !== 'params') {
          if (!(datum in this.paramsDefault)) {
            let p = datum.split('-');
            if (p[1] in this.paramsDefault[p[0]]) {
              this.paramsDefault[p[0]][p[1]] = value;
            }
            delete mParams[datum];
          } else {
            mParams[datum] = value;
          }
        } else {
          mParams = (0,_util_manipulator__WEBPACK_IMPORTED_MODULE_1__.mergeDeepObject)(mParams, value);
          delete mParams[datum];
        }
      }
    }
    this.params = mParams;
    this.init();
  }
  init() {
    const _this = this;
    let cross = _this.element.querySelector('.vg-sidebar-close');
    if (cross) {
      let svg = cross.querySelector('svg');
      if (!svg) cross.insertAdjacentHTML('beforeend', _cross);
    }
    this.element.vgSidebar = this;
  }
  toggle() {
    return _isShown ? this.hide() : this.show();
  }
  show() {
    const _this = this;
    if (_isShown) return;
    _isShown = true;
    _util_manipulator__WEBPACK_IMPORTED_MODULE_1__.eventHandler.on(_this.element, EVENT_KEY_SHOW);
    _this._backdrop();
    _this._overflow();
    _this.element.classList.add('show');
    setTimeout(() => {
      if (_this.params.ajax.route && _this.params.ajax.target) _this._route();
      _util_manipulator__WEBPACK_IMPORTED_MODULE_1__.eventHandler.on(_this.element, EVENT_KEY_SHOWN);
    }, 50);
    _this._addEventListener();
  }
  hide() {
    const _this = this;
    if (!_isShown) return;
    _isShown = false;
    _util_manipulator__WEBPACK_IMPORTED_MODULE_1__.eventHandler.on(_this.element, EVENT_KEY_HIDE);
    _this._backdrop();
    _this._overflow();
    _this.element.classList.remove('show');
    setTimeout(() => {
      _util_manipulator__WEBPACK_IMPORTED_MODULE_1__.eventHandler.on(_this.element, EVENT_KEY_HIDDEN);
    }, 50);
  }
  static getInstance(target) {
    if (typeof target === 'string') target = document.querySelector(target);
    return target?.vgSidebar;
  }
  static makeInit(btn) {
    btn.addEventListener('click', () => {
      let arg = _util_manipulator__WEBPACK_IMPORTED_MODULE_1__.Manipulator.getDataAttributes(btn),
        target = arg.target || btn.getAttribute('href') || null;
      if (target && typeof target === 'string') {
        delete arg['target'];
        delete arg['toggle'];
        let sidebar = new VGSidebar(target, arg);
        sidebar.toggle();
      }
      return false;
    });
  }
  _backdrop() {
    let _this = this,
      backdrop = document.querySelector('.vg-sidebar-backdrop');
    if (!_this.params.backdrop) return;
    if (backdrop) {
      backdrop.remove();
    } else {
      backdrop = document.createElement('div');
      backdrop.classList.add('vg-sidebar-backdrop');
      document.body.append(backdrop);
      setTimeout(() => {
        backdrop.classList.add('fade');
      }, 50);
    }
  }
  _overflow() {
    const _this = this;
    if (!_this.params.overflow) {
      return;
    }
    if (!_isShown) {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    } else {
      document.body.style.paddingRight = getWidth() + 'px';
      document.body.style.overflow = 'hidden';
    }
    function getWidth() {
      const documentWidth = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - documentWidth);
    }
  }
  _addEventListener() {
    const _this = this;
    let backdrop = document.querySelector('.vg-sidebar-backdrop');
    if (backdrop) {
      backdrop.onclick = function () {
        _this.hide();
        return false;
      };
    }
    [...document.querySelectorAll('[data-vg-dismiss="sidebar"]')].forEach(function (cross) {
      cross.onclick = function () {
        let target = cross.dataset.vgTarget || cross.closest('.vg-sidebar') || null;
        if (target) {
          VGSidebar.getInstance(target).hide();
        }
        return false;
      };
    });
    if (_this.params.keyboard) {
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
    let $content = document.querySelector(_this.params.ajax.target);
    if ($content) {
      let request = new XMLHttpRequest();
      request.open("get", _this.params.ajax.route, true);
      request.onload = function () {
        setData(request.responseText);
        _util_manipulator__WEBPACK_IMPORTED_MODULE_1__.eventHandler.on(_this.element, EVENT_KEY_LOADED);
      };
      request.send();
    }
    const setData = data => {
      $content.innerHTML = data;
    };
  }
}
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


[...document.querySelectorAll('[data-vg-toggle="sidebar"]')].forEach(function (btn) {
  _app_js_app__WEBPACK_IMPORTED_MODULE_1__["default"].makeInit(btn);
});

vg = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmdzaWRlYmFyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsS0E7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7OztBQzNPQTs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFFQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92Zy8uL2FwcC9qcy9fdXRpbC9iYXNlLW1vZHVsZS5qcyIsIndlYnBhY2s6Ly92Zy8uL2FwcC9qcy9fdXRpbC9tYW5pcHVsYXRvci5qcyIsIndlYnBhY2s6Ly92Zy8uL2FwcC9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vdmcvLi9hcHAvc2Nzcy9hcHAuc2NzcyIsIndlYnBhY2s6Ly92Zy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly92Zy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdmcvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly92Zy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3ZnLy4vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc0VtcHR5T2JqLCBNYW5pcHVsYXRvciwgbWVyZ2VEZWVwT2JqZWN0fSBmcm9tIFwiLi9tYW5pcHVsYXRvclwiO1xyXG5cclxuY2xhc3MgQmFzZU1vZHVsZSB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLl9lbGVtZW50ID0gbnVsbDtcclxuXHRcdHRoaXMuX3BhcmFtcyA9IHt9O1xyXG5cdH1cclxuXHJcblx0Z2V0IGVsZW1lbnQoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fZWxlbWVudFxyXG5cdH1cclxuXHJcblx0c2V0IGVsZW1lbnQoZWwpIHtcclxuXHRcdHRoaXMuX2VsZW1lbnQgPSBNYW5pcHVsYXRvci5maW5kKGVsKTtcclxuXHR9XHJcblxyXG5cdGdldCBwYXJhbXMoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fcGFyYW1zXHJcblx0fVxyXG5cclxuXHRzZXQgcGFyYW1zKHBhcmFtcykge1xyXG5cdFx0aWYgKCFpc0VtcHR5T2JqKHBhcmFtcykpIHtcclxuXHRcdFx0bGV0IGF0dHJzID0gTWFuaXB1bGF0b3IuZ2V0RGF0YUF0dHJpYnV0ZXModGhpcy5lbGVtZW50KTtcclxuXHRcdFx0dGhpcy5fcGFyYW1zID0gbWVyZ2VEZWVwT2JqZWN0KHBhcmFtcywgYXR0cnMpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmFzZU1vZHVsZTtcclxuIiwiLyoqXHJcbiAqINCj0LTQsNC70Y/QtdC8INGN0LvQtdC80LXQvdGC0Ysg0YEg0LzQsNGB0YHQuNCy0LBcclxuICogQHBhcmFtIGFyclxyXG4gKiBAcGFyYW0gZWxcclxuICovXHJcbmZ1bmN0aW9uIHJlbW92ZUVsZW1lbnRBcnJheShhcnIsIGVsKSB7XHJcblx0cmV0dXJuIGFyci5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRcdHJldHVybiAhZWwuaW5jbHVkZXMoaXRlbSlcclxuXHR9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqINCT0LvRg9Cx0L7QutC+0LUg0L7QsdGK0LXQtNC40L3QtdC90LjQtSDQvtCx0YrQtdC60YLQvtCyXHJcbiAqIEBwYXJhbSBvYmplY3RzXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuZnVuY3Rpb24gbWVyZ2VEZWVwT2JqZWN0KC4uLm9iamVjdHMpIHtcclxuXHRjb25zdCBpc09iamVjdCA9IG9iaiA9PiBvYmogJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCc7XHJcblxyXG5cdHJldHVybiBvYmplY3RzLnJlZHVjZSgocHJldiwgb2JqKSA9PiB7XHJcblx0XHRPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IHtcclxuXHRcdFx0Y29uc3QgcFZhbCA9IHByZXZba2V5XTtcclxuXHRcdFx0Y29uc3Qgb1ZhbCA9IG9ialtrZXldO1xyXG5cclxuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkocFZhbCkgJiYgQXJyYXkuaXNBcnJheShvVmFsKSkge1xyXG5cdFx0XHRcdHByZXZba2V5XSA9IHBWYWwuY29uY2F0KC4uLm9WYWwpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKGlzT2JqZWN0KHBWYWwpICYmIGlzT2JqZWN0KG9WYWwpKSB7XHJcblx0XHRcdFx0cHJldltrZXldID0gbWVyZ2VEZWVwT2JqZWN0KHBWYWwsIG9WYWwpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHByZXZba2V5XSA9IG9WYWw7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBwcmV2O1xyXG5cdH0sIHt9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqINCV0YHQu9C4INGH0YLQvi3QvdC40LHRg9C00Ywg0LIg0L7QsdGK0LXQutGC0LVcclxuICogQHBhcmFtIG9ialxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmZ1bmN0aW9uIGlzRW1wdHlPYmoob2JqKSB7XHJcblx0Zm9yIChsZXQgcHJvcCBpbiBvYmopIHtcclxuXHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gdHJ1ZVxyXG59XHJcblxyXG4vKipcclxuICogaXNPYmplY3RcclxuICogQHBhcmFtIG9ialxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xyXG5cdHJldHVybiBvYmogJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCdcclxufVxyXG5cclxuLyoqXHJcbiAqINCf0YDQuNCy0L7QtNC40Lwg0LIg0L/QvtGA0Y/QtNC+0Log0YLQuNC/0Ysg0LTQsNC90L3Ri9GFXHJcbiAqIEBwYXJhbSB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7YW55fVxyXG4gKi9cclxuZnVuY3Rpb24gbm9ybWFsaXplRGF0YSh2YWx1ZSkgIHtcclxuXHRpZiAodmFsdWUgPT09ICd0cnVlJykge1xyXG5cdFx0cmV0dXJuIHRydWVcclxuXHR9XHJcblxyXG5cdGlmICh2YWx1ZSA9PT0gJ2ZhbHNlJykge1xyXG5cdFx0cmV0dXJuIGZhbHNlXHJcblx0fVxyXG5cclxuXHRpZiAodmFsdWUgPT09IE51bWJlcih2YWx1ZSkudG9TdHJpbmcoKSkge1xyXG5cdFx0cmV0dXJuIE51bWJlcih2YWx1ZSlcclxuXHR9XHJcblxyXG5cdGlmICh2YWx1ZSA9PT0gJycgfHwgdmFsdWUgPT09ICdudWxsJykge1xyXG5cdFx0cmV0dXJuIG51bGxcclxuXHR9XHJcblxyXG5cdGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XHJcblx0XHRyZXR1cm4gdmFsdWVcclxuXHR9XHJcblxyXG5cdHRyeSB7XHJcblx0XHRyZXR1cm4gSlNPTi5wYXJzZShkZWNvZGVVUklDb21wb25lbnQodmFsdWUpKVxyXG5cdH0gY2F0Y2gge1xyXG5cdFx0cmV0dXJuIHZhbHVlXHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICog0JzQsNC90LjQv9GD0LvRj9GG0LjQuCDRgSDRjdC70LXQvNC10L3RgtC+0LxcclxuICovXHJcbmNvbnN0IE1hbmlwdWxhdG9yID0ge1xyXG5cdGdldERhdGFBdHRyaWJ1dGVzKGVsZW1lbnQsIGlzUmVtb3ZlRGF0YU5hbWUgPSB0cnVlLCBpc1JlbW92ZVByZWZpeCA9IHRydWUpIHtcclxuXHRcdGlmICghZWxlbWVudCkge1xyXG5cdFx0XHRyZXR1cm4ge31cclxuXHRcdH1cclxuXHJcblx0XHRjb25zdCBhdHRyaWJ1dGVzPSB7fSxcclxuXHRcdFx0YXJyID0gW10uZmlsdGVyLmNhbGwoZWxlbWVudC5hdHRyaWJ1dGVzLCBmdW5jdGlvbiAoYXQpIHtcclxuXHRcdFx0XHRyZXR1cm4gL15kYXRhLS8udGVzdChhdC5uYW1lKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0aWYgKGFyci5sZW5ndGgpIHtcclxuXHRcdFx0YXJyLmZvckVhY2goZnVuY3Rpb24gKHYpIHtcclxuXHRcdFx0XHRsZXQgbmFtZSA9IHYubmFtZSwgcHJlZml4ID0gJ3ZnLSc7XHJcblx0XHRcdFx0aWYgKGlzUmVtb3ZlRGF0YU5hbWUpIG5hbWUgPSBuYW1lLnNsaWNlKDUpO1xyXG5cdFx0XHRcdGlmIChpc1JlbW92ZVByZWZpeCAmJiBuYW1lLmluZGV4T2YocHJlZml4KSAhPT0gLTEpIG5hbWUgPSBuYW1lLnNsaWNlKDMpO1xyXG5cclxuXHRcdFx0XHRhdHRyaWJ1dGVzW25hbWVdID0gbm9ybWFsaXplRGF0YSh2LnZhbHVlKVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYXR0cmlidXRlc1xyXG5cdH0sXHJcblxyXG5cdGdldEF0dHJpYnV0ZTogZnVuY3Rpb24gKGVsZW1lbnQsIG5hbWVBdHRyaWJ1dGUpIHtcclxuXHRcdGlmICghZWxlbWVudCkge1xyXG5cdFx0XHRyZXR1cm4gJydcclxuXHRcdH1cclxuXHRcdHJldHVybiBlbGVtZW50LmdldEF0dHJpYnV0ZShuYW1lQXR0cmlidXRlKTtcclxuXHR9LFxyXG5cclxuXHRmaW5kOiBmdW5jdGlvbiAoZWwpIHtcclxuXHRcdGlmICghZWwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCfQotC+0LLQsNGA0LjRiSEg0J/QtdGA0LLRi9C5INC/0LDRgNCw0LzQtdGC0YAg0L3QtSDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0L/Rg9GB0YLRi9C8IScpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBlbCA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHRsZXQgZWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCk7XHJcblx0XHRcdFx0aWYgKGVsbSkgcmV0dXJuIGVsbTtcclxuXHRcdFx0XHRlbHNlIHRocm93IG5ldyBFcnJvcign0JDRhdC/0LXRgCEg0J3QtSDRg9C00LDQu9C+0YHRjCDQvdCw0LnRgtC4INGN0LvQtdC80LXQvdGCJyk7XHJcblx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIGVsID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdHJldHVybiBlbDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ9Ca0K3QnyEg0JrQsNC60LDRjy3RgtC+INC00LjRh9GMINC6INC90LDQvCDQt9Cw0LvQtdGC0LXQu9CwJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFVkVOVFNcclxuICogQHR5cGUge3tvbjogZXZlbnRIYW5kbGVyLm9ufX1cclxuICog0JrQsNC6INGN0YLQviDRgNCw0LHQvtGC0LDQtdGCP1xyXG4gKiDQktGL0LfQvtCyINGE0YPQvdC60YbQuNC4OiBldmVudEhhbmRsZXIub24oJ9GN0LvQtdC80LXQvdGCINC60L7RgtC+0YDRi9C5INC90YPQttC90L4g0YLRgNC40LPQtdGA0L3Rg9GC0YwnLCAn0LrQsNC6INGC0YDQuNCz0LXRgNC90YPRgtGMINGN0LvQtdC80LXQvdGCJyk7XHJcbiAqL1xyXG5jb25zdCBldmVudEhhbmRsZXIgPSB7XHJcblx0b246IGZ1bmN0aW9uIChlbGVtZW50LCBldmVudCwgZGV0YWlsID0ge30pIHtcclxuXHRcdGNvbnN0IGV2ZW50U3VjY2VzcyA9IG5ldyBDdXN0b21FdmVudChldmVudCwge1xyXG5cdFx0XHRidWJibGVzOiB0cnVlLFxyXG5cdFx0XHRkZXRhaWw6IGRldGFpbFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50U3VjY2Vzcyk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQge01hbmlwdWxhdG9yLCBldmVudEhhbmRsZXIsIGlzT2JqZWN0LCBpc0VtcHR5T2JqLCBtZXJnZURlZXBPYmplY3QsIHJlbW92ZUVsZW1lbnRBcnJheSwgbm9ybWFsaXplRGF0YX1cclxuIiwiaW1wb3J0IEJhc2VNb2R1bGUgZnJvbSBcIi4vX3V0aWwvYmFzZS1tb2R1bGVcIjtcclxuaW1wb3J0IHtcclxuXHRldmVudEhhbmRsZXIsXHJcblx0TWFuaXB1bGF0b3IsXHJcblx0bWVyZ2VEZWVwT2JqZWN0LFxyXG5cdGlzT2JqZWN0LCBpc0VtcHR5T2JqLCBub3JtYWxpemVEYXRhXHJcbn0gZnJvbSBcIi4vX3V0aWwvbWFuaXB1bGF0b3JcIjtcclxuXHJcbmNvbnN0IEVWRU5UX0tFWV9ISURFID0gJ3ZnLnNpZGViYXIuaGlkZSc7XHJcbmNvbnN0IEVWRU5UX0tFWV9ISURERU4gPSAndmcuc2lkZWJhci5oaWRkZW4nO1xyXG5jb25zdCBFVkVOVF9LRVlfU0hPVyA9ICd2Zy5zaWRlYmFyLnNob3cnO1xyXG5jb25zdCBFVkVOVF9LRVlfU0hPV04gPSAndmcuc2lkZWJhci5zaG93bic7XHJcbmNvbnN0IEVWRU5UX0tFWV9MT0FERUQgPSAndmcuc2lkZWJhci5sb2FkZWQnO1xyXG5cclxubGV0IF9pc1Nob3duID0gZmFsc2UsXHJcblx0X2Nyb3NzID0gJzxzdmcgdmVyc2lvbj1cIjEuMVwiIGlkPVwiTGF5ZXJfMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4PVwiMHB4XCIgeT1cIjBweFwiJyArXHJcblx0XHQnXFx0IHZpZXdCb3g9XCIwIDAgMTAwIDEwMFwiIHN0eWxlPVwiZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDAgMTAwO1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+JyArXHJcblx0XHQnPHBhdGggZD1cIk04OS43LDEwLjNMODkuNywxMC4zYy0xLTEtMi42LTEtMy41LDBMNTAsNDYuNUwxMy45LDEwLjNjLTEtMS0yLjYtMS0zLjUsMGwwLDBjLTEsMS0xLDIuNiwwLDMuNUw0Ni41LDUwTDEwLjMsODYuMScgK1xyXG5cdFx0J1xcdGMtMSwxLTEsMi42LDAsMy41aDBjMSwxLDIuNiwxLDMuNSwwTDUwLDUzLjVsMzYuMSwzNi4xYzEsMSwyLjYsMSwzLjUsMGwwLDBjMS0xLDEtMi42LDAtMy41TDUzLjUsNTBsMzYuMS0zNi4xJyArXHJcblx0XHQnXFx0QzkwLjYsMTIuOSw5MC42LDExLjMsODkuNywxMC4zelwiLz4nICtcclxuXHRcdCc8L3N2Zz4nO1xyXG5cclxuY2xhc3MgVkdTaWRlYmFyIGV4dGVuZHMgQmFzZU1vZHVsZXtcclxuXHRjb25zdHJ1Y3RvcihlbGVtZW50LCBhcmcgPSB7fSkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMucGFyYW1zRGVmYXVsdCA9IHtcclxuXHRcdFx0YmFja2Ryb3A6IHRydWUsXHJcblx0XHRcdG92ZXJmbG93OiB0cnVlLFxyXG5cdFx0XHRrZXlib2FyZDogdHJ1ZSxcclxuXHRcdFx0YWpheDoge1xyXG5cdFx0XHRcdHJvdXRlOiAnJyxcclxuXHRcdFx0XHR0YXJnZXQ6ICcnXHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0XHR0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG5cclxuXHRcdGxldCBtUGFyYW1zID0gbWVyZ2VEZWVwT2JqZWN0KGFyZywgdGhpcy5wYXJhbXNEZWZhdWx0KTtcclxuXHRcdGlmIChpc09iamVjdChtUGFyYW1zKSAmJiAhaXNFbXB0eU9iaihtUGFyYW1zKSkge1xyXG5cdFx0XHRmb3IgKGNvbnN0IGRhdHVtIGluIG1QYXJhbXMpIHtcclxuXHRcdFx0XHRsZXQgdmFsdWUgPSBub3JtYWxpemVEYXRhKG1QYXJhbXNbZGF0dW1dKTtcclxuXHJcblx0XHRcdFx0aWYgKGRhdHVtICE9PSAncGFyYW1zJykge1xyXG5cdFx0XHRcdFx0aWYgKCEoZGF0dW0gaW4gdGhpcy5wYXJhbXNEZWZhdWx0KSkge1xyXG5cdFx0XHRcdFx0XHRsZXQgcCA9IGRhdHVtLnNwbGl0KCctJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAocFsxXSBpbiB0aGlzLnBhcmFtc0RlZmF1bHRbcFswXV0pIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLnBhcmFtc0RlZmF1bHRbcFswXV1bcFsxXV0gPSB2YWx1ZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0ZGVsZXRlIG1QYXJhbXNbZGF0dW1dO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0bVBhcmFtc1tkYXR1bV0gPSB2YWx1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0bVBhcmFtcyA9IG1lcmdlRGVlcE9iamVjdChtUGFyYW1zLCB2YWx1ZSlcclxuXHRcdFx0XHRcdGRlbGV0ZSBtUGFyYW1zW2RhdHVtXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnBhcmFtcyA9IG1QYXJhbXM7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9XHJcblxyXG5cdGluaXQoKSB7XHJcblx0XHRjb25zdCBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdFx0bGV0IGNyb3NzID0gX3RoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudmctc2lkZWJhci1jbG9zZScpO1xyXG5cdFx0aWYgKGNyb3NzKSB7XHJcblx0XHRcdGxldCBzdmcgPSBjcm9zcy5xdWVyeVNlbGVjdG9yKCdzdmcnKTtcclxuXHRcdFx0aWYgKCFzdmcpIGNyb3NzLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgX2Nyb3NzKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmVsZW1lbnQudmdTaWRlYmFyID0gdGhpcztcclxuXHR9XHJcblxyXG5cdHRvZ2dsZSgpIHtcclxuXHRcdHJldHVybiBfaXNTaG93biA/IHRoaXMuaGlkZSgpIDogdGhpcy5zaG93KCk7XHJcblx0fVxyXG5cclxuXHRzaG93KCkge1xyXG5cdFx0Y29uc3QgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRcdGlmIChfaXNTaG93bikgcmV0dXJuO1xyXG5cdFx0X2lzU2hvd24gPSB0cnVlO1xyXG5cclxuXHRcdGV2ZW50SGFuZGxlci5vbihfdGhpcy5lbGVtZW50LCBFVkVOVF9LRVlfU0hPVyk7XHJcblxyXG5cdFx0X3RoaXMuX2JhY2tkcm9wKCk7XHJcblx0XHRfdGhpcy5fb3ZlcmZsb3coKTtcclxuXHRcdF90aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRpZiAoX3RoaXMucGFyYW1zLmFqYXgucm91dGUgJiYgX3RoaXMucGFyYW1zLmFqYXgudGFyZ2V0KSBfdGhpcy5fcm91dGUoKTtcclxuXHRcdFx0ZXZlbnRIYW5kbGVyLm9uKF90aGlzLmVsZW1lbnQsIEVWRU5UX0tFWV9TSE9XTik7XHJcblx0XHR9LCA1MCk7XHJcblxyXG5cdFx0X3RoaXMuX2FkZEV2ZW50TGlzdGVuZXIoKTtcclxuXHR9XHJcblxyXG5cdGhpZGUoKSB7XHJcblx0XHRjb25zdCBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdFx0aWYgKCFfaXNTaG93bikgcmV0dXJuO1xyXG5cdFx0X2lzU2hvd24gPSBmYWxzZTtcclxuXHJcblx0XHRldmVudEhhbmRsZXIub24oX3RoaXMuZWxlbWVudCwgRVZFTlRfS0VZX0hJREUpO1xyXG5cclxuXHRcdF90aGlzLl9iYWNrZHJvcCgpO1xyXG5cdFx0X3RoaXMuX292ZXJmbG93KCk7XHJcblx0XHRfdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuXHJcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0ZXZlbnRIYW5kbGVyLm9uKF90aGlzLmVsZW1lbnQsIEVWRU5UX0tFWV9ISURERU4pO1xyXG5cdFx0fSwgNTApXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0SW5zdGFuY2UodGFyZ2V0KSB7XHJcblx0XHRpZiAodHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycpIHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxyXG5cdFx0cmV0dXJuIHRhcmdldD8udmdTaWRlYmFyO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIG1ha2VJbml0KGJ0bikge1xyXG5cdFx0YnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG5cdFx0XHRsZXQgYXJnID0gTWFuaXB1bGF0b3IuZ2V0RGF0YUF0dHJpYnV0ZXMoYnRuKSxcclxuXHRcdFx0XHR0YXJnZXQgPSBhcmcudGFyZ2V0IHx8IGJ0bi5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSB8fCBudWxsO1xyXG5cclxuXHRcdFx0aWYgKHRhcmdldCAmJiB0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdGRlbGV0ZSBhcmdbJ3RhcmdldCddO1xyXG5cdFx0XHRcdGRlbGV0ZSBhcmdbJ3RvZ2dsZSddO1xyXG5cclxuXHRcdFx0XHRsZXQgc2lkZWJhciA9IG5ldyBWR1NpZGViYXIodGFyZ2V0LCBhcmcpO1xyXG5cdFx0XHRcdHNpZGViYXIudG9nZ2xlKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0X2JhY2tkcm9wKCkge1xyXG5cdFx0bGV0IF90aGlzID0gdGhpcyxcclxuXHRcdFx0YmFja2Ryb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmctc2lkZWJhci1iYWNrZHJvcCcpO1xyXG5cclxuXHRcdGlmICghX3RoaXMucGFyYW1zLmJhY2tkcm9wKSByZXR1cm47XHJcblxyXG5cdFx0aWYgKGJhY2tkcm9wKSB7XHJcblx0XHRcdGJhY2tkcm9wLnJlbW92ZSgpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0YmFja2Ryb3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRcdFx0YmFja2Ryb3AuY2xhc3NMaXN0LmFkZCgndmctc2lkZWJhci1iYWNrZHJvcCcpO1xyXG5cclxuXHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmQoYmFja2Ryb3ApO1xyXG5cclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0YmFja2Ryb3AuY2xhc3NMaXN0LmFkZCgnZmFkZScpXHJcblx0XHRcdH0sIDUwKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0X292ZXJmbG93KCkge1xyXG5cdFx0Y29uc3QgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRcdGlmICghX3RoaXMucGFyYW1zLm92ZXJmbG93KSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIV9pc1Nob3duKSB7XHJcblx0XHRcdGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcclxuXHRcdFx0ZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPSAnJztcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID0gZ2V0V2lkdGgoKSArICdweCc7XHJcblx0XHRcdGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBnZXRXaWR0aCgpIHtcclxuXHRcdFx0Y29uc3QgZG9jdW1lbnRXaWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxyXG5cdFx0XHRyZXR1cm4gTWF0aC5hYnMod2luZG93LmlubmVyV2lkdGggLSBkb2N1bWVudFdpZHRoKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0X2FkZEV2ZW50TGlzdGVuZXIoKSB7XHJcblx0XHRjb25zdCBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdFx0bGV0IGJhY2tkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZnLXNpZGViYXItYmFja2Ryb3AnKTtcclxuXHRcdGlmIChiYWNrZHJvcCkge1xyXG5cdFx0XHRiYWNrZHJvcC5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdF90aGlzLmhpZGUoKTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Wy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXZnLWRpc21pc3M9XCJzaWRlYmFyXCJdJyldLmZvckVhY2goZnVuY3Rpb24gKGNyb3NzKSB7XHJcblx0XHRcdGNyb3NzLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0bGV0IHRhcmdldCA9IGNyb3NzLmRhdGFzZXQudmdUYXJnZXQgfHwgY3Jvc3MuY2xvc2VzdCgnLnZnLXNpZGViYXInKSB8fCBudWxsO1xyXG5cclxuXHRcdFx0XHRpZiAodGFyZ2V0KSB7XHJcblx0XHRcdFx0XHRWR1NpZGViYXIuZ2V0SW5zdGFuY2UodGFyZ2V0KS5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmIChfdGhpcy5wYXJhbXMua2V5Ym9hcmQpIHtcclxuXHRcdFx0ZG9jdW1lbnQub25rZXl1cCA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0aWYgKGUua2V5ID09PSBcIkVzY2FwZVwiKSB7XHJcblx0XHRcdFx0XHRfdGhpcy5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRfcm91dGUoKSB7XHJcblx0XHRjb25zdCBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdFx0bGV0ICRjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihfdGhpcy5wYXJhbXMuYWpheC50YXJnZXQpO1xyXG5cdFx0aWYgKCRjb250ZW50KSB7XHJcblx0XHRcdGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblx0XHRcdHJlcXVlc3Qub3BlbihcImdldFwiLCBfdGhpcy5wYXJhbXMuYWpheC5yb3V0ZSwgdHJ1ZSk7XHJcblx0XHRcdHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHNldERhdGEocmVxdWVzdC5yZXNwb25zZVRleHQpO1xyXG5cdFx0XHRcdGV2ZW50SGFuZGxlci5vbihfdGhpcy5lbGVtZW50LCBFVkVOVF9LRVlfTE9BREVEKTtcclxuXHRcdFx0fTtcclxuXHRcdFx0cmVxdWVzdC5zZW5kKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3Qgc2V0RGF0YSA9IChkYXRhKSA9PiB7XHJcblx0XHRcdCRjb250ZW50LmlubmVySFRNTCA9IGRhdGE7XHJcblx0XHR9O1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVkdTaWRlYmFyO1xyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vYXBwL3Njc3MvYXBwLnNjc3NcIjtcclxuaW1wb3J0IFZHU2lkZWJhciBmcm9tIFwiLi9hcHAvanMvYXBwXCI7XHJcblxyXG5bLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdmctdG9nZ2xlPVwic2lkZWJhclwiXScpXS5mb3JFYWNoKGZ1bmN0aW9uIChidG4pIHtcclxuXHRWR1NpZGViYXIubWFrZUluaXQoYnRuKTtcclxufSk7XHJcblxyXG5cclxuXHJcbmV4cG9ydCB7XHJcblx0VkdTaWRlYmFyXHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9