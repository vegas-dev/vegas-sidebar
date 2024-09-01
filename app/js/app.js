import {
	checkMobileOrTablet,
	findContainer, findContainerAll,
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

/**
 * Установка параметров
 * Параметры дата атрибутов в приоритете
 */
let setParams = function (element, params, arg) {
	let mParams = mergeDeepObject(params, arg),
		data = getDataAttributes(element, true);

	if (isObject(data) && !isEmptyObj(data)) {
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
				if (isJsonString(value)) {
					value = JSON.parse(value);
					mParams = mergeDeepObject(mParams, value)
				} else if (isObject(value) && !isEmptyObj(value)) {
					mParams = mergeDeepObject(mParams, value)
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
}

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
				backdrop.classList.add('fade')
			}, 100)
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
			const documentWidth = document.documentElement.clientWidth
			return Math.abs(window.innerWidth - documentWidth)
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
				}
			}
		}
	}
}

[...document.querySelectorAll('[data-vg-toggle="sidebar"]')].forEach(function (btn) {
	btn.onclick = function () {
		let arg = getDataAttributes(btn, true),
			target = arg.target || btn.getAttribute('href') || null;

		if (target && typeof target === 'string') {
			target = target.slice(1);

			new VGSidebar(target, arg)
		}
	}
});

export default VGSidebar;
