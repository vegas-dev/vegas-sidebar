$(document).ready(function () {
	let $button = $('[data-toggle="vg-sidebar"]');
	if($button.length) {
		$button.click(function () {
			let target = $(this).data('target'),
				params = {
					ajax: {
						target: $(this).data('ajax-target') || '',
						route: $(this).data('ajax-route') || ''
					}
				};

			let sidebar = new VGSidebar(target, params);
			sidebar.open();

			return false;
		});
	}
});