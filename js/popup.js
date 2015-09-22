
var    $               = require('jquery');

var popup ={

    valor: function(valor){
    	this.valor = valor;
    },

	initialize: function(){
		var self = this;
	    $('.cd-popup').on('click', function(event){
		if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
			event.preventDefault();
			$(this).removeClass('is-visible');
		}
		});

		$('.cd-buttons').on('click', function(event){
			event.preventDefault();
			if(self.valor!== undefined && self.valor !== null)
			{
				self.operacion(self.valor);
			}
			else{
				self.operacion();
			}
			$('.cd-popup').removeClass('is-visible');
		});

		$(document).keyup(function(event){
    	if(event.which=='27'){
    		$('.cd-popup').removeClass('is-visible');
	    }
    	});

	},

	mostrarMensaje: function(){
		$('.cd-popup').addClass('is-visible');
	},
// 	function mostrarMensaje(){
// 		$('.cd-popup').addClass('is-visible');
// 	}
// //jQuery(document).ready(function($){
// 	//open popup
// 	$('.cd-popup-trigger').on('click', function(event){
// 		event.preventDefault();
// 		$('.cd-popup').addClass('is-visible');
// 	});
	// initialize: function () {
	// //close popup
	// $('.cd-popup').on('click', function(event){
	// 	if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
	// 		event.preventDefault();
	// 		$(this).removeClass('is-visible');
	// 	}
	// });
	// $('.cd-buttons').on('click', function(event){
	// 		event.preventDefault();
	// 		console.log("aceptaste")
	// 		$('.cd-popup').removeClass('is-visible');
	// });


	// //close popup when clicking the esc keyboard button
	// $(document).keyup(function(event){
 //    	if(event.which=='27'){
 //    		$('.cd-popup').removeClass('is-visible');
	//     }
 //    });
};

module.exports = popup;
