/**
 * @name vegas sidebar
 * @copyright by vegas s.
 * @date: 27.10.2018
 * @version  1.0
 *
 */

window.vegasSidebar = {
	open: function (self) {
		var $self = $(self),
			target = $self.data('target');

		var $container = $(target);

		$container.addClass('show');

		return false;
	},
	close: function (self) {
		var $self = $(self);
		var $container = $self.closest('.vg-sidebar');

		$container.removeClass('show');
	}
};