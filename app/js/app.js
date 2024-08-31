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

class VGSidebar {
	constructor(element, arg) {
		this.element = null;
		this._isShown = false;

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

		console.log('toggle', _this._isShown)

		_this.toggle();
	}

	toggle() {
		return this._isShown ? this.hide() : this.show();
	}

	show() {
		const _this = this;

		if (_this._isShown) return;
		_this._isShown = true;

		console.log('show')
	}

	hide() {
		const _this = this;

		if (!this._isShown) return;
		_this._isShown = false;

		console.log('hide')
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
