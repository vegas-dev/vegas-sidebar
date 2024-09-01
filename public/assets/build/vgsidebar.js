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
/* harmony export */   checkMobileOrTablet: () => (/* binding */ checkMobileOrTablet),
/* harmony export */   findContainer: () => (/* binding */ findContainer),
/* harmony export */   findContainerAll: () => (/* binding */ findContainerAll),
/* harmony export */   getDataAttributes: () => (/* binding */ getDataAttributes),
/* harmony export */   getWindowResize: () => (/* binding */ getWindowResize),
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

/**
 * checkMobileOrTablet
 * Проверяем устройство пользователя
 * @returns {boolean}
 */
function checkMobileOrTablet() {
  let check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.slice(0, 4))) {
      check = true;
    }
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

/**
 * Изменения рабочего окна
 */
function getWindowResize(callback) {
  window.onresize = function (event) {
    if (typeof callback === "function") return callback(event);
    return false;
  };
}
function findContainer(target, $container = null) {
  if (!target) return false;
  if ($container) {
    return $container.querySelector(target);
  } else {
    return document.querySelector(target);
  }
}
function findContainerAll(target, $container = null) {
  if (!target) return false;
  if ($container) {
    return $container.querySelectorAll(target);
  } else {
    return document.querySelectorAll(target);
  }
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
  let mParams = (0,_util_function__WEBPACK_IMPORTED_MODULE_0__.mergeDeepObject)(params, arg),
    data = (0,_util_function__WEBPACK_IMPORTED_MODULE_0__.getDataAttributes)(element, true);
  if ((0,_util_function__WEBPACK_IMPORTED_MODULE_0__.isObject)(data) && !(0,_util_function__WEBPACK_IMPORTED_MODULE_0__.isEmptyObj)(data)) {
    for (const datum in data) {
      let value = data[datum];
      if (value === 'null') value = null;
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      if (datum !== 'params') {
        switch (datum) {
          default:
            mParams[datum] = value;
            break;
        }
      } else {
        if ((0,_util_function__WEBPACK_IMPORTED_MODULE_0__.isJsonString)(value)) {
          value = JSON.parse(value);
          mParams = (0,_util_function__WEBPACK_IMPORTED_MODULE_0__.mergeDeepObject)(mParams, value);
        } else if ((0,_util_function__WEBPACK_IMPORTED_MODULE_0__.isObject)(value) && !(0,_util_function__WEBPACK_IMPORTED_MODULE_0__.isEmptyObj)(value)) {
          mParams = (0,_util_function__WEBPACK_IMPORTED_MODULE_0__.mergeDeepObject)(mParams, value);
        }
      }
    }
  }
  return mParams;
};

/**
 * Параметры по умолчанию
 * @type {{keyboard: boolean, overflow: boolean, backdrop: boolean, width: number, placement: string}}
 */
const defaultSettings = {
  backdrop: true,
  overflow: true,
  keyboard: true
};
let _isShown = false;
class VGSidebar {
  constructor(element, arg) {
    this.element = null;
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
    _this._backdrop();
    _this._overflow();
    _this.element.classList.add('show');
  }
  hide() {
    const _this = this;
    if (!_isShown) return;
    _isShown = false;
    _this._backdrop();
    _this._overflow();
    _this.element.classList.remove('show');
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
    if (_isShown) {
      const _this = this;
      let backdrop = document.querySelector('.vg-sidebar-backdrop');
      if (backdrop) {
        backdrop.onclick = function () {
          _this.hide();
          return false;
        };
      }
    }
  }
}
[...document.querySelectorAll('[data-vg-toggle="sidebar"]')].forEach(function (btn) {
  btn.onclick = function () {
    let arg = (0,_util_function__WEBPACK_IMPORTED_MODULE_0__.getDataAttributes)(btn, true),
      target = arg.target || btn.getAttribute('href') || null;
    if (target && typeof target === 'string') {
      target = target.slice(1);
      new VGSidebar(target, arg);
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmdzaWRlYmFyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNySUE7QUFVQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7OztBQ2pNQTs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92Zy8uL2FwcC9qcy9fdXRpbC9mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly92Zy8uL2FwcC9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vdmcvLi9hcHAvc2Nzcy9hcHAuc2NzcyIsIndlYnBhY2s6Ly92Zy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly92Zy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdmcvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly92Zy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3ZnLy4vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqINCT0LvRg9Cx0L7QutC+0LUg0L7QsdGK0LXQtNC40L3QtdC90LjQtSDQvtCx0YrQtdC60YLQvtCyXHJcbiAqIEBwYXJhbSBvYmplY3RzXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuZnVuY3Rpb24gbWVyZ2VEZWVwT2JqZWN0KC4uLm9iamVjdHMpIHtcclxuXHRjb25zdCBpc09iamVjdCA9IG9iaiA9PiBvYmogJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCc7XHJcblxyXG5cdHJldHVybiBvYmplY3RzLnJlZHVjZSgocHJldiwgb2JqKSA9PiB7XHJcblx0XHRPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IHtcclxuXHRcdFx0Y29uc3QgcFZhbCA9IHByZXZba2V5XTtcclxuXHRcdFx0Y29uc3Qgb1ZhbCA9IG9ialtrZXldO1xyXG5cclxuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkocFZhbCkgJiYgQXJyYXkuaXNBcnJheShvVmFsKSkge1xyXG5cdFx0XHRcdHByZXZba2V5XSA9IHBWYWwuY29uY2F0KC4uLm9WYWwpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKGlzT2JqZWN0KHBWYWwpICYmIGlzT2JqZWN0KG9WYWwpKSB7XHJcblx0XHRcdFx0cHJldltrZXldID0gbWVyZ2VEZWVwT2JqZWN0KHBWYWwsIG9WYWwpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHByZXZba2V5XSA9IG9WYWw7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBwcmV2O1xyXG5cdH0sIHt9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGNoZWNrTW9iaWxlT3JUYWJsZXRcclxuICog0J/RgNC+0LLQtdGA0Y/QtdC8INGD0YHRgtGA0L7QudGB0YLQstC+INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1xyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmZ1bmN0aW9uIGNoZWNrTW9iaWxlT3JUYWJsZXQoKSB7XHJcblx0bGV0IGNoZWNrID0gZmFsc2U7XHJcblx0KGZ1bmN0aW9uKGEpIHtcclxuXHRcdGlmICgvKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxtb2JpbGUuK2ZpcmVmb3h8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXMoNHw2KTB8c3ltYmlhbnx0cmVvfHVwXFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgY2V8eGRhfHhpaW5vfGFuZHJvaWR8aXBhZHxwbGF5Ym9va3xzaWxrL2kudGVzdChhKXx8LzEyMDd8NjMxMHw2NTkwfDNnc298NHRocHw1MFsxLTZdaXw3NzBzfDgwMnN8YSB3YXxhYmFjfGFjKGVyfG9vfHNcXC0pfGFpKGtvfHJuKXxhbChhdnxjYXxjbyl8YW1vaXxhbihleHxueXx5dyl8YXB0dXxhcihjaHxnbyl8YXModGV8dXMpfGF0dHd8YXUoZGl8XFwtbXxyIHxzICl8YXZhbnxiZShja3xsbHxucSl8YmkobGJ8cmQpfGJsKGFjfGF6KXxicihlfHYpd3xidW1ifGJ3XFwtKG58dSl8YzU1XFwvfGNhcGl8Y2N3YXxjZG1cXC18Y2VsbHxjaHRtfGNsZGN8Y21kXFwtfGNvKG1wfG5kKXxjcmF3fGRhKGl0fGxsfG5nKXxkYnRlfGRjXFwtc3xkZXZpfGRpY2F8ZG1vYnxkbyhjfHApb3xkcygxMnxcXC1kKXxlbCg0OXxhaSl8ZW0obDJ8dWwpfGVyKGljfGswKXxlc2w4fGV6KFs0LTddMHxvc3x3YXx6ZSl8ZmV0Y3xmbHkoXFwtfF8pfGcxIHV8ZzU2MHxnZW5lfGdmXFwtNXxnXFwtbW98Z28oXFwud3xvZCl8Z3IoYWR8dW4pfGhhaWV8aGNpdHxoZFxcLShtfHB8dCl8aGVpXFwtfGhpKHB0fHRhKXxocCggaXxpcCl8aHNcXC1jfGh0KGMoXFwtfCB8X3xhfGd8cHxzfHQpfHRwKXxodShhd3x0Yyl8aVxcLSgyMHxnb3xtYSl8aTIzMHxpYWMoIHxcXC18XFwvKXxpYnJvfGlkZWF8aWcwMXxpa29tfGltMWt8aW5ub3xpcGFxfGlyaXN8amEodHx2KWF8amJyb3xqZW11fGppZ3N8a2RkaXxrZWppfGtndCggfFxcLyl8a2xvbnxrcHQgfGt3Y1xcLXxreW8oY3xrKXxsZShub3x4aSl8bGcoIGd8XFwvKGt8bHx1KXw1MHw1NHxcXC1bYS13XSl8bGlid3xseW54fG0xXFwtd3xtM2dhfG01MFxcL3xtYSh0ZXx1aXx4byl8bWMoMDF8MjF8Y2EpfG1cXC1jcnxtZShyY3xyaSl8bWkobzh8b2F8dHMpfG1tZWZ8bW8oMDF8MDJ8Yml8ZGV8ZG98dChcXC18IHxvfHYpfHp6KXxtdCg1MHxwMXx2ICl8bXdicHxteXdhfG4xMFswLTJdfG4yMFsyLTNdfG4zMCgwfDIpfG41MCgwfDJ8NSl8bjcoMCgwfDEpfDEwKXxuZSgoY3xtKVxcLXxvbnx0Znx3Znx3Z3x3dCl8bm9rKDZ8aSl8bnpwaHxvMmltfG9wKHRpfHd2KXxvcmFufG93ZzF8cDgwMHxwYW4oYXxkfHQpfHBkeGd8cGcoMTN8XFwtKFsxLThdfGMpKXxwaGlsfHBpcmV8cGwoYXl8dWMpfHBuXFwtMnxwbyhja3xydHxzZSl8cHJveHxwc2lvfHB0XFwtZ3xxYVxcLWF8cWMoMDd8MTJ8MjF8MzJ8NjB8XFwtWzItN118aVxcLSl8cXRla3xyMzgwfHI2MDB8cmFrc3xyaW05fHJvKHZlfHpvKXxzNTVcXC98c2EoZ2V8bWF8bW18bXN8bnl8dmEpfHNjKDAxfGhcXC18b298cFxcLSl8c2RrXFwvfHNlKGMoXFwtfDB8MSl8NDd8bWN8bmR8cmkpfHNnaFxcLXxzaGFyfHNpZShcXC18bSl8c2tcXC0wfHNsKDQ1fGlkKXxzbShhbHxhcnxiM3xpdHx0NSl8c28oZnR8bnkpfHNwKDAxfGhcXC18dlxcLXx2ICl8c3koMDF8bWIpfHQyKDE4fDUwKXx0NigwMHwxMHwxOCl8dGEoZ3R8bGspfHRjbFxcLXx0ZGdcXC18dGVsKGl8bSl8dGltXFwtfHRcXC1tb3x0byhwbHxzaCl8dHMoNzB8bVxcLXxtM3xtNSl8dHhcXC05fHVwKFxcLmJ8ZzF8c2kpfHV0c3R8djQwMHx2NzUwfHZlcml8dmkocmd8dGUpfHZrKDQwfDVbMC0zXXxcXC12KXx2bTQwfHZvZGF8dnVsY3x2eCg1Mnw1M3w2MHw2MXw3MHw4MHw4MXw4M3w4NXw5OCl8dzNjKFxcLXwgKXx3ZWJjfHdoaXR8d2koZyB8bmN8bncpfHdtbGJ8d29udXx4NzAwfHlhc1xcLXx5b3VyfHpldG98enRlXFwtL2kudGVzdChhLnNsaWNlKDAsNCkpKXtcclxuXHRcdFx0Y2hlY2sgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdH0pKG5hdmlnYXRvci51c2VyQWdlbnR8fG5hdmlnYXRvci52ZW5kb3J8fHdpbmRvdy5vcGVyYSk7XHJcblxyXG5cdHJldHVybiBjaGVjaztcclxufVxyXG5cclxuLyoqXHJcbiAqINCY0LfQvNC10L3QtdC90LjRjyDRgNCw0LHQvtGH0LXQs9C+INC+0LrQvdCwXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRXaW5kb3dSZXNpemUoY2FsbGJhY2spIHtcclxuXHR3aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0aWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gY2FsbGJhY2soZXZlbnQpO1xyXG5cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5kQ29udGFpbmVyKHRhcmdldCwgJGNvbnRhaW5lciA9IG51bGwpIHtcclxuXHRpZiAoIXRhcmdldCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuXHRpZiAoJGNvbnRhaW5lcikge1xyXG5cdFx0cmV0dXJuICRjb250YWluZXIucXVlcnlTZWxlY3Rvcih0YXJnZXQpXHJcblx0fSBlbHNlIHtcclxuXHRcdHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldClcclxuXHR9XHJcbn1cclxuZnVuY3Rpb24gZmluZENvbnRhaW5lckFsbCh0YXJnZXQsICRjb250YWluZXIgPSBudWxsKSB7XHJcblx0aWYgKCF0YXJnZXQpIHJldHVybiBmYWxzZTtcclxuXHJcblx0aWYgKCRjb250YWluZXIpIHtcclxuXHRcdHJldHVybiAkY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwodGFyZ2V0KVxyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0YXJnZXQpXHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREYXRhQXR0cmlidXRlcyhub2RlLCBpc1JlbW92ZURhdGFOYW1lID0gZmFsc2UpIHtcclxuXHRpZiAoIW5vZGUpIHJldHVybiBmYWxzZTtcclxuXHJcblx0bGV0IG9iaiA9IHt9LFxyXG5cdFx0YXJyID0gW10uZmlsdGVyLmNhbGwobm9kZS5hdHRyaWJ1dGVzLCBmdW5jdGlvbiAoYXQpIHtcclxuXHRcdFx0cmV0dXJuIC9eZGF0YS0vLnRlc3QoYXQubmFtZSk7XHJcblx0XHR9KTtcclxuXHJcblx0aWYgKGFyci5sZW5ndGgpIHtcclxuXHRcdGFyci5mb3JFYWNoKGZ1bmN0aW9uICh2KSB7XHJcblx0XHRcdGxldCBuYW1lID0gdi5uYW1lO1xyXG5cdFx0XHRpZiAoaXNSZW1vdmVEYXRhTmFtZSkge1xyXG5cdFx0XHRcdGlmIChuYW1lLmluZGV4T2YoJ3ZnJykgPT09IC0xKSB7XHJcblx0XHRcdFx0XHRuYW1lID0gbmFtZS5zbGljZSg1KTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0bmFtZSA9IG5hbWUuc2xpY2UoOCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdG9ialtuYW1lXSA9IHYudmFsdWVcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIG9iajtcclxufVxyXG5cclxuLyoqXHJcbiAqIGlzSnNvblN0cmluZ1xyXG4gKiBAcGFyYW0gc3RyXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZnVuY3Rpb24gaXNKc29uU3RyaW5nKHN0cikge1xyXG5cdHRyeSB7XHJcblx0XHRzdHIgPSBKU09OLnBhcnNlKHN0cik7XHJcblx0fSBjYXRjaCAoZSkge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHRyZXR1cm4gc3RyO1xyXG59XHJcblxyXG4vKipcclxuICog0JXRgdC70Lgg0YfRgtC+LdC90LjQsdGD0LTRjCDQsiDQvtCx0YrQtdC60YLQtVxyXG4gKiBAcGFyYW0gb2JqXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZnVuY3Rpb24gaXNFbXB0eU9iaihvYmopIHtcclxuXHRmb3IgKGxldCBwcm9wIGluIG9iaikge1xyXG5cdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiB0cnVlXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBpc09iamVjdFxyXG4gKiBAcGFyYW0gb2JqXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuY29uc3QgaXNPYmplY3QgPSBvYmogPT4gb2JqICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnO1xyXG5cclxuZXhwb3J0IHttZXJnZURlZXBPYmplY3QsIGNoZWNrTW9iaWxlT3JUYWJsZXQsIGdldFdpbmRvd1Jlc2l6ZSwgZmluZENvbnRhaW5lckFsbCwgZmluZENvbnRhaW5lciwgZ2V0RGF0YUF0dHJpYnV0ZXMsIGlzSnNvblN0cmluZywgaXNPYmplY3QsIGlzRW1wdHlPYmp9XHJcbiIsImltcG9ydCB7XHJcblx0Y2hlY2tNb2JpbGVPclRhYmxldCxcclxuXHRmaW5kQ29udGFpbmVyLCBmaW5kQ29udGFpbmVyQWxsLFxyXG5cdGdldERhdGFBdHRyaWJ1dGVzLFxyXG5cdGlzRW1wdHlPYmosXHJcblx0aXNKc29uU3RyaW5nLFxyXG5cdGlzT2JqZWN0LFxyXG5cdG1lcmdlRGVlcE9iamVjdFxyXG59IGZyb20gXCIuL191dGlsL2Z1bmN0aW9uXCI7XHJcblxyXG5jb25zdCBFVkVOVF9LRVlfSElERSA9ICd2Zy5zaWRlYmFyLmhpZGUnO1xyXG5jb25zdCBFVkVOVF9LRVlfSElEREVOICAgPSAndmcuc2lkZWJhci5oaWRkZW4nO1xyXG5jb25zdCBFVkVOVF9LRVlfU0hPVyAgPSAndmcuc2lkZWJhci5zaG93JztcclxuY29uc3QgRVZFTlRfS0VZX1NIT1dOICA9ICd2Zy5zaWRlYmFyLnNob3duJztcclxuXHJcbi8qKlxyXG4gKiDQo9GB0YLQsNC90L7QstC60LAg0L/QsNGA0LDQvNC10YLRgNC+0LJcclxuICog0J/QsNGA0LDQvNC10YLRgNGLINC00LDRgtCwINCw0YLRgNC40LHRg9GC0L7QsiDQsiDQv9GA0LjQvtGA0LjRgtC10YLQtVxyXG4gKi9cclxubGV0IHNldFBhcmFtcyA9IGZ1bmN0aW9uIChlbGVtZW50LCBwYXJhbXMsIGFyZykge1xyXG5cdGxldCBtUGFyYW1zID0gbWVyZ2VEZWVwT2JqZWN0KHBhcmFtcywgYXJnKSxcclxuXHRcdGRhdGEgPSBnZXREYXRhQXR0cmlidXRlcyhlbGVtZW50LCB0cnVlKTtcclxuXHJcblx0aWYgKGlzT2JqZWN0KGRhdGEpICYmICFpc0VtcHR5T2JqKGRhdGEpKSB7XHJcblx0XHRmb3IgKGNvbnN0IGRhdHVtIGluIGRhdGEpIHtcclxuXHRcdFx0bGV0IHZhbHVlID0gZGF0YVtkYXR1bV07XHJcblxyXG5cdFx0XHRpZiAodmFsdWUgPT09ICdudWxsJykgdmFsdWUgPSBudWxsO1xyXG5cdFx0XHRpZiAodmFsdWUgPT09ICd0cnVlJykgdmFsdWUgPSB0cnVlO1xyXG5cdFx0XHRpZiAodmFsdWUgPT09ICdmYWxzZScpIHZhbHVlID0gZmFsc2U7XHJcblxyXG5cdFx0XHRpZiAoZGF0dW0gIT09ICdwYXJhbXMnKSB7XHJcblx0XHRcdFx0c3dpdGNoIChkYXR1bSkge1xyXG5cdFx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdFx0bVBhcmFtc1tkYXR1bV0gPSB2YWx1ZTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpZiAoaXNKc29uU3RyaW5nKHZhbHVlKSkge1xyXG5cdFx0XHRcdFx0dmFsdWUgPSBKU09OLnBhcnNlKHZhbHVlKTtcclxuXHRcdFx0XHRcdG1QYXJhbXMgPSBtZXJnZURlZXBPYmplY3QobVBhcmFtcywgdmFsdWUpXHJcblx0XHRcdFx0fSBlbHNlIGlmIChpc09iamVjdCh2YWx1ZSkgJiYgIWlzRW1wdHlPYmoodmFsdWUpKSB7XHJcblx0XHRcdFx0XHRtUGFyYW1zID0gbWVyZ2VEZWVwT2JqZWN0KG1QYXJhbXMsIHZhbHVlKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIG1QYXJhbXM7XHJcbn07XHJcblxyXG4vKipcclxuICog0J/QsNGA0LDQvNC10YLRgNGLINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXHJcbiAqIEB0eXBlIHt7a2V5Ym9hcmQ6IGJvb2xlYW4sIG92ZXJmbG93OiBib29sZWFuLCBiYWNrZHJvcDogYm9vbGVhbiwgd2lkdGg6IG51bWJlciwgcGxhY2VtZW50OiBzdHJpbmd9fVxyXG4gKi9cclxuY29uc3QgZGVmYXVsdFNldHRpbmdzID0ge1xyXG5cdGJhY2tkcm9wOiB0cnVlLFxyXG5cdG92ZXJmbG93OiB0cnVlLFxyXG5cdGtleWJvYXJkOiB0cnVlXHJcbn1cclxuXHJcbmxldCBfaXNTaG93biA9IGZhbHNlO1xyXG5cclxuY2xhc3MgVkdTaWRlYmFyIHtcclxuXHRjb25zdHJ1Y3RvcihlbGVtZW50LCBhcmcpIHtcclxuXHRcdHRoaXMuZWxlbWVudCA9IG51bGw7XHJcblxyXG5cdFx0aWYgKCFlbGVtZW50KSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ9Cf0LXRgNCy0YvQuSDQv9Cw0YDQsNC80LXRgtGAINC90LUg0LTQvtC70LbQtdC9INCx0YvRgtGMINC/0YPRgdGC0YvQvCcpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0bGV0ICRlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudCk7XHJcblx0XHRcdFx0aWYgKCRlbGVtZW50KSB7XHJcblx0XHRcdFx0XHR0aGlzLmVsZW1lbnQgPSAkZWxlbWVudDtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcign0JIg0YHRgtGA0L7QutC1INC00L7Qu9C20LXQvSDQsdGL0YLRjCDQuNC00LXQvdGC0LjRhNC40LrQsNGC0L7RgCDQsdC+0LrQvtCy0L7QuSDQv9Cw0L3QtdC70LgnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHRoaXMuZWxlbWVudCkge1xyXG5cdFx0XHRcdHRoaXMuc2V0dGluZ3MgPSBzZXRQYXJhbXModGhpcy5lbGVtZW50LCBkZWZhdWx0U2V0dGluZ3MsIGFyZyk7XHJcblxyXG5cdFx0XHRcdHRoaXMuaW5pdCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRpbml0KCkge1xyXG5cdFx0Y29uc3QgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRcdF90aGlzLnRvZ2dsZSgpO1xyXG5cdFx0X3RoaXMuX2FkZEV2ZW50TGlzdGVuZXIoKTtcclxuXHR9XHJcblxyXG5cdHRvZ2dsZSgpIHtcclxuXHRcdHJldHVybiBfaXNTaG93biA/IHRoaXMuaGlkZSgpIDogdGhpcy5zaG93KCk7XHJcblx0fVxyXG5cclxuXHRzaG93KCkge1xyXG5cdFx0Y29uc3QgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRcdGlmIChfaXNTaG93bikgcmV0dXJuO1xyXG5cdFx0X2lzU2hvd24gPSB0cnVlO1xyXG5cclxuXHRcdF90aGlzLl9iYWNrZHJvcCgpO1xyXG5cdFx0X3RoaXMuX292ZXJmbG93KCk7XHJcblx0XHRfdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuXHR9XHJcblxyXG5cdGhpZGUoKSB7XHJcblx0XHRjb25zdCBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdFx0aWYgKCFfaXNTaG93bikgcmV0dXJuO1xyXG5cdFx0X2lzU2hvd24gPSBmYWxzZTtcclxuXHJcblx0XHRfdGhpcy5fYmFja2Ryb3AoKTtcclxuXHRcdF90aGlzLl9vdmVyZmxvdygpO1xyXG5cdFx0X3RoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcblx0fVxyXG5cclxuXHRfYmFja2Ryb3AoKSB7XHJcblx0XHRsZXQgX3RoaXMgPSB0aGlzLFxyXG5cdFx0XHRiYWNrZHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52Zy1zaWRlYmFyLWJhY2tkcm9wJyk7XHJcblxyXG5cdFx0aWYgKCFfdGhpcy5zZXR0aW5ncy5iYWNrZHJvcCkgcmV0dXJuO1xyXG5cclxuXHRcdGlmIChiYWNrZHJvcCkge1xyXG5cdFx0XHRiYWNrZHJvcC5yZW1vdmUoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGJhY2tkcm9wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0XHRcdGJhY2tkcm9wLmNsYXNzTGlzdC5hZGQoJ3ZnLXNpZGViYXItYmFja2Ryb3AnKTtcclxuXHJcblx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kKGJhY2tkcm9wKTtcclxuXHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdGJhY2tkcm9wLmNsYXNzTGlzdC5hZGQoJ2ZhZGUnKVxyXG5cdFx0XHR9LCAxMDApXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRfb3ZlcmZsb3coKSB7XHJcblx0XHRjb25zdCBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdFx0aWYgKCFfdGhpcy5zZXR0aW5ncy5vdmVyZmxvdykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFfaXNTaG93bikge1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XHJcblx0XHRcdGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID0gJyc7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcblx0XHRcdGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID0gZ2V0V2lkdGgoKSArICdweCc7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gZ2V0V2lkdGgoKSB7XHJcblx0XHRcdGNvbnN0IGRvY3VtZW50V2lkdGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGhcclxuXHRcdFx0cmV0dXJuIE1hdGguYWJzKHdpbmRvdy5pbm5lcldpZHRoIC0gZG9jdW1lbnRXaWR0aClcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdF9hZGRFdmVudExpc3RlbmVyKCkge1xyXG5cdFx0aWYgKF9pc1Nob3duKSB7XHJcblx0XHRcdGNvbnN0IF90aGlzID0gdGhpcztcclxuXHRcdFx0bGV0IGJhY2tkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZnLXNpZGViYXItYmFja2Ryb3AnKTtcclxuXHJcblx0XHRcdGlmIChiYWNrZHJvcCkge1xyXG5cdFx0XHRcdGJhY2tkcm9wLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRfdGhpcy5oaWRlKCk7XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXZnLXRvZ2dsZT1cInNpZGViYXJcIl0nKV0uZm9yRWFjaChmdW5jdGlvbiAoYnRuKSB7XHJcblx0YnRuLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRsZXQgYXJnID0gZ2V0RGF0YUF0dHJpYnV0ZXMoYnRuLCB0cnVlKSxcclxuXHRcdFx0dGFyZ2V0ID0gYXJnLnRhcmdldCB8fCBidG4uZ2V0QXR0cmlidXRlKCdocmVmJykgfHwgbnVsbDtcclxuXHJcblx0XHRpZiAodGFyZ2V0ICYmIHR5cGVvZiB0YXJnZXQgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRhcmdldCA9IHRhcmdldC5zbGljZSgxKTtcclxuXHJcblx0XHRcdG5ldyBWR1NpZGViYXIodGFyZ2V0LCBhcmcpXHJcblx0XHR9XHJcblx0fVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZHU2lkZWJhcjtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL2FwcC9zY3NzL2FwcC5zY3NzXCI7XHJcbmltcG9ydCBWR1NpZGViYXIgZnJvbSBcIi4vYXBwL2pzL2FwcFwiO1xyXG5cclxuZXhwb3J0IHtcclxuXHRWR1NpZGViYXJcclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=