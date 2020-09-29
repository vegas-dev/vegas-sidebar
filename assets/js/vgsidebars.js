(function ($) {
	"use strict";
	
	$.fn.vegasSidebars = function (options) {
		options = $.extend({

		}, arguments[0] || {});

		
		return this;
	};
	
	$(document).ready(function () {
		$('[data-toggle=vg-sidebar]').vegasSidebars();
	});
});