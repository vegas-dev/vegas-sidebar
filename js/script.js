$(document).ready(function () {
	$(document).on('click', '.open-sidebar', function () {
		vegasSidebar.open(this);

		return false;
	});
	$(document).on('click', '.close-sidebar, .vg-sidebar', function (e) {
		if (e.target !== this) return;

		vegasSidebar.close(this);

		return false;
	});
});