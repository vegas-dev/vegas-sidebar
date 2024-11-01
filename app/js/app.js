import {
	eventHandler,
	getDataAttributes,
	isEmptyObj,
	isJsonString,
	isObject,
	mergeDeepObject
} from "./_util/function";

const EVENT_KEY_HIDE = 'vg.sidebar.hide';
const EVENT_KEY_HIDDEN   = 'vg.sidebar.hidden';
const EVENT_KEY_SHOW  = 'vg.sidebar.show';
const EVENT_KEY_SHOWN  = 'vg.sidebar.shown';
const EVENT_KEY_LOADED  = 'vg.sidebar.loaded';


/**
 * Установка параметров
 * Параметры дата атрибутов в приоритете
 */
let setParams = function (element, params, arg) {
	let mParams = mergeDeepObject(params, arg, getDataAttributes(element, true));

	if (isObject(mParams) && !isEmptyObj(mParams)) {
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
		if (isJsonString(value)) {
			value = JSON.parse(value);
			setDataParams(value);
		} else if (isObject(value) && !isEmptyObj(value)) {
			mParams = mergeDeepObject(mParams, value)
		}
	}

	function setAttrParams(datum, params, value) {

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
	keyboard: true,
	ajax: {
		route: '',
		target: ''
	}
}

let _isShown = false;

class VGSidebar {
	constructor(element, arg = {}) {
		this.element = null;
		this.cross = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"' +
		'\t viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">' +
		'<path d="M89.7,10.3L89.7,10.3c-1-1-2.6-1-3.5,0L50,46.5L13.9,10.3c-1-1-2.6-1-3.5,0l0,0c-1,1-1,2.6,0,3.5L46.5,50L10.3,86.1' +
		'\tc-1,1-1,2.6,0,3.5h0c1,1,2.6,1,3.5,0L50,53.5l36.1,36.1c1,1,2.6,1,3.5,0l0,0c1-1,1-2.6,0-3.5L53.5,50l36.1-36.1' +
		'\tC90.6,12.9,90.6,11.3,89.7,10.3z"/>' +
		'</svg>';

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
	}

	toggle() {
		return _isShown ? this.hide() : this.show();
	}

	show() {
		const _this = this;

		if (_isShown) return;
		_isShown = true;

		eventHandler.on(_this.element, EVENT_KEY_SHOW);

		_this._backdrop();
		_this._overflow();
		_this.element.classList.add('show');

		setTimeout(() => {
			if (_this.settings.ajax.route && _this.settings.ajax.target) _this._route();
			eventHandler.on(_this.element, EVENT_KEY_SHOWN);
		}, 50);

		_this._addEventListener();
	}

	hide() {
		const _this = this;

		if (!_isShown) return;
		_isShown = false;

		eventHandler.on(_this.element, EVENT_KEY_HIDE);

		_this._backdrop();
		_this._overflow();
		_this.element.classList.remove('show');

		setTimeout(() => {
			eventHandler.on(_this.element, EVENT_KEY_HIDDEN);
		}, 50)
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
				backdrop.classList.add('fade')
			}, 50)
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
			document.body.style.paddingRight = getWidth() + 'px';
			document.body.style.overflow = 'hidden';
		}

		function getWidth() {
			const documentWidth = document.documentElement.clientWidth
			return Math.abs(window.innerWidth - documentWidth)
		}
	}

	_addEventListener() {
		const _this = this;

		let backdrop = document.querySelector('.vg-sidebar-backdrop');
		if (backdrop) {
			backdrop.onclick = function () {
				_this.hide();

				return false;
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
			}
		});

		if (_this.settings.keyboard) {
			document.onkeyup = function(e) {
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
			request.onload = function() {
				setData(request.responseText);
				eventHandler.on(_this.element, EVENT_KEY_LOADED);
			};
			request.send();
		}

		const setData = (data) => {
			$content.innerHTML = data;
		};
	}
}

[...document.querySelectorAll('[data-vg-toggle="sidebar"]')].forEach(function (btn) {
	btn.onclick = function () {
		let arg = getDataAttributes(btn, true),
			target = arg.target || btn.getAttribute('href') || null;

		delete arg['target'];
		delete arg['toggle'];

		if (target && typeof target === 'string') {
			target = target.slice(1);

			let sidebar = new VGSidebar(target, arg);
			sidebar.toggle();
		}

		return false;
	}
});

export default VGSidebar;
