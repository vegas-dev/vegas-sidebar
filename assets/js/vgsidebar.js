class VGSidebar {
	constructor(target, arg = {}) {
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
					route: ''
				}
			}, arg);
		}
	}

	open() {
		if (!this.sidebar) return false;
		let _this = this;

		_this.sidebar.classList.add('open');

		if (_this.settings.hash) {
			let hash = this.sidebar.id;

			if (hash) {
				window.history.pushState(null, 'sidebar open', '#sidebar-open-' + hash);
			}

			window.addEventListener("popstate",function(e){
				_this.close();
			},false);
		}

		if (_this.settings.content_over) {
			document.body.style.paddingRight = window.innerWidth - document.documentElement.clientWidth;
			document.body.style.overflow = 'hidden';
		}

		if (_this.settings.ajax.route && _this.settings.ajax.target) {
			let $content = document.getElementById(_this.settings.ajax.target);

			if ($content) {
				let request = new XMLHttpRequest();
				request.open('get', _this.settings.ajax.route, true);
				request.onload = function () {
					let data = JSON.parse(request.responseText);

					setData(data);
				};
				request.send();
			}

			const setData = (data) => {
				$content.innerHTML = data;
			}
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
		}

		let _close = _this.sidebar.querySelectorAll('[data-dismiss="vg-sidebar"]');
		for (let el of _close) {
			el.onclick = function () {
				_this.close();
				return false;
			}
		}
	}

	close() {
		if (!this.sidebar) return false;
		this.sidebar.classList.remove('open');

		if (location.hash) {
			history.pushState("", document.title, window.location.pathname
				+ window.location.search);
		}

		if (this.settings.content_over) {
			document.body.style.paddingRight = '';
			document.body.style.overflow = '';
		}
	}
}

if(window.location.hash) {
	let target = window.location.hash.replace('#sidebar-open-', '');

	if (document.getElementById(target)) {
		let sidebar = new VGSidebar(target);

		if (sidebar.settings.hash) {
			sidebar.open();
		}
	}
}

let $vg_sidebar_toggle = document.querySelectorAll('[data-toggle="vg-sidebar"]');
for (let $btn of $vg_sidebar_toggle) {
	$btn.onclick = function (e) {
		let button = e.target,
			target = button.dataset.target || button.href || null;

		if (!target) {
			button = button.closest('[data-toggle="vg-sidebar"]');
			target = button.dataset.target || button.href || null;
		}

		if (target) {
			let params = {
				content_over: button.dataset.over || true,
				hash: button.dataset.hash || false,
				ajax: {
					target: button.dataset.ajaxTarget || '',
					route: button.dataset.ajaxRoute || ''
				}
			};

			let sidebar = new VGSidebar(target, params);
			sidebar.open();
		}

		return false;
	};
}