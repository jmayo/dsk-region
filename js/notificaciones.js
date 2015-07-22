var    $               = require('jquery');

module.exports = $(function() {

	var myMessages = ['info','warning','error','success'];

	function hideAllMessages(){
		var messagesHeights = new Array(); // this array will store height for each
		for (i=0; i<myMessages.length; i++){
			messagesHeights[i] = $('.' + myMessages[i]).outerHeight(); // fill array
			$('.' + myMessages[i]).css('top', -messagesHeights[i]); //move element outside viewport
		}
	}

	function showMessage(type){
		$('.'+ type +'-trigger').click(function(){
			hideAllMessages();
			$('.'+type).animate({top:"0"}, 500);
		});
	}

	$(document).ready(function(){
		// Initially, hide them all
		hideAllMessages();
		// Show message
		for(var i=0;i<myMessages.length;i++){
			showMessage(myMessages[i]);
		}
		// When message is clicked, hide it
		$('.message').click(function(){
			$(this).animate({top: -$(this).outerHeight()}, 500);
		});
	});

	//
	$.fn.notify = function(settings_overwrite){
		settings = {
					placement:"top",
					default_class: ".message",
					delay:0
					};
		$.extend(settings, settings_overwrite);
		$(settings.default_class).each(function(){$(this).hide();});
		$(this).show().css(settings.placement, -$(this).outerHeight());
		obj = $(this);
		if(settings.placement == "bottom"){
			setTimeout(function(){obj.animate({bottom:"0"}, 500)},settings.delay);
		}
		else{
			setTimeout(function(){obj.animate({top:"0"}, 500)},settings.delay);
		}
	}

	/** begin notification alerts
	esta no funciona-------------------------------------**/
	// $(document).ready(function ($) {
	// 	$('.message').on('click', (function () {
	// 		$(this).fadeTo('slow', 0, function() {
	// 			$(this).slideUp("slow", function() {
	// 				$(this).remove();
	// 			});
	// 		});
	// 	}));
	// });


	// al click del boton ó link
	$(document).ready(function(){
		$("a.info_trigger").click(function(){
			$("#notify_info").notify();
			//window.setTimeout(autoclose,5000);
			return false;
		});
		$("a.warning_trigger").click(function(){
			$("#notify_warning").notify();
			//window.setTimeout(autoclose,5000);
			return false;
		});
		$("a.error_trigger").click(function(){
			$("#notify_error").notify();
			//window.setTimeout(autoclose,5000);
			return false;
		});
		$("a.success_trigger").click(function(){
			$("#notify_success").notify();
			//window.setTimeout(autoclose,5000);
			return false;
		});
	});

	function autoclose() {
	  $("#notify_info").fadeOut("slow");
	  $("#notify_warning").fadeOut("slow");
	  $("#notify_error").fadeOut("slow");
	  $("#notify_success").fadeOut("slow");
	}
});
