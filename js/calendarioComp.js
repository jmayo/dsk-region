  $    = require('jquery');
  

var calendario ={


initialize: function(){
	$(document).ready(function(){
	    
		var calendarPicker1 = $("#dsel1").calendarPicker({
			monthNames:["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
			dayNames: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
			//callback:function(cal) {
		 	// $("#wtf").html("Fecha: " + cal.currentDate.toLocaleDateString("es-ES", {weekday: "long", year: "numeric", month: "long", day: "numeric"}));
			//}
		});
	
		var calendarPicker2 = $("#dsel2").calendarPicker({
			monthNames:["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
			dayNames: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
			years:2,
			months:4,
			days:5,
			showDayArrows:false,
		//	callback:function(cal) {
		  //	$("#wtf").html("Fecha: " + cal.currentDate.toLocaleDateString("es-ES", {weekday: "long", year: "numeric", month: "long", day: "numeric"}));
		//	}
		});
	});
}
};

module.exports = calendario;
