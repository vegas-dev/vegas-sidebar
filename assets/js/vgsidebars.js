(function( $ ){
	
	const NAME = 'vg-sidebar';
	const DATA_KEY = 'vg.sidebar';
	
	const CLASS_SIDEBAR_SHOW = 'show';
	
	let params = {
		target: '',
		placement: 'right',
		ajax: false
	};
	
	let methods = {
		show : function(options) {
			let settings = $.extend(params, options);
			
			console.log(settings);
			
			return this;
		},
		hide : function( ) {

		}
	};
	
	$.fn.vgSidebar = (method) => {
		if ( methods[method] ) {
			return methods[method].apply(this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.show.apply( this, arguments );
		} else {
			$.error( 'Метод с именем ' +  method + ' не существует ' );
		}
	}
	
})( jQuery );
