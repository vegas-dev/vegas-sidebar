(function($){
	const NAME = 'vgsidebar';
	const CLASS_NAME = 'vg-sidebar';
	const MAIN_CONTAINER = 'body';

	let settings = {},
		methods = {
			open : (options, callback) => {
				settings = $.extend($.fn[NAME].defaults, options);

				if (settings.target && $(settings.target).length) {
					let $self = $(settings.target),
						width_scrollbar = window.innerWidth - document.documentElement.clientWidth;

					$self.addClass('open').addClass(settings.placement);
					$(MAIN_CONTAINER).addClass(CLASS_NAME + '-open');

					if (settings.content_over) {
						$(MAIN_CONTAINER).css({
							'padding-right': width_scrollbar,
							'overflow': 'hidden'
						})
					}

					if (settings.content_overlay) {
						$(MAIN_CONTAINER).append('<div class="' + CLASS_NAME +'-overlay show"><div class="overlay"></div></div>');
					}

					return this;
				} else {
					$.error('Боковая панель не найдена');
				}
			},
			close : (callback) => {
				if (settings.target && $(settings.target).length) {
					let $self = $(settings.target);

					$self.removeClass('open');

					if (settings.content_over) {
						$(MAIN_CONTAINER).removeClass(CLASS_NAME + '-open').css({
							'padding-right': '',
							'overflow': ''
						});
					}

					if (settings.content_overlay) {
						let $overlay = $(MAIN_CONTAINER).find('.' + CLASS_NAME + '-overlay');

						$overlay.removeClass('show');

						setTimeout(() => {
							$overlay.remove();
						}, 400);
					}
				} else {
					$.error('Боковая панель не найдена');
				}
			}
		};

	$.fn[NAME] = function (method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.open.apply(this, arguments);
		} else {
			$.error('Метод "' + method + '" не найден');
		}
	};

	$.fn[NAME].defaults = {
		target: '',
		placement: 'right',
		content_over: true,
		content_overlay: true,
		ajax: {
			target: '',
			route: '',
			method: 'get',
			variables: {}
		}
	};

})( jQuery );

// Автоматический вызов плагина
$(document).ready(function () {
	$('[data-toggle="vg-sidebar"]').click(function () {
		let $self = $(this),
			data = $self.data(),
			params = {
				target: data.target || $self.attr('href')
			};

		params = $.extend(data, params);

		$.fn.vgsidebar('open', params);

		return false;
	});

	$(document).mouseup(function (e) {
		let container = $('.vg-sidebar');
		if (container.has(e.target).length === 0) {
			$.fn.vgsidebar('close');
		}
	});
});
