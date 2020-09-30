(function( $ ){
	
	const NAME = 'vg-sidebar';
	const DATA_KEY = 'vg.sidebar';
	
	const CLASS_SIDEBAR_SHOW = 'show';
	
	let afterOpen = $.noop,
		beforeOpen = $.noop;
	
	let afterClose = $.noop,
		beforeClose = $.noop;
	
	let afterAjaxLoad = $.noop,
		beforeAjaxLoad = $.noop;
	
	let params = {
		target: '',
		placement: 'right',
		ajax: {
			target: '',
			route: '',
			method: 'get'
		}
	};
	
	let methods = {
		show : function(options) {
			let settings = $.extend(params, options);
			
			console.log(settings);
			
			return this;
		},
		hide : function(callback) {
		
		}
	};
	
	$.fn.vgSidebar = (method) => {
		if (methods[method]) {
			return methods[method].apply(this, arguments);
		} else if ( typeof method === 'object' || !method ) {
			return methods.show.apply(this, arguments);
		} else {
			$.error( 'Метод с именем ' +  method + ' не существует ' );
		}
	}
	
})( jQuery );
