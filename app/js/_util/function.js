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
			}
			else if (isObject(pVal) && isObject(oVal)) {
				prev[key] = mergeDeepObject(pVal, oVal);
			}
			else {
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
			obj[name] = v.value
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

	return true
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
}

export {mergeDeepObject, getDataAttributes, isJsonString, isObject, isEmptyObj, eventHandler}
