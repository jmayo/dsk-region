var Backbone = require('backbone'),
    $        = require('jquery');
     
//Personal.Views.Body 
module.exports = Backbone.View.extend({
  events :{
     "mousemove":"iniciarConteo",
  },

  el: $('body'),
  initialize: function () {
    localStorage.setItem("tiempo",0);
    var timeoutID;
    this.startTimer();
  		//window.routers.base.on('router:root' , this.inicio());
  		//Personal.app.on("route:root", this.inicio());
   },
  
   InicializarTiempo: function(){
      this.addEventListener("mousemove", resetTimer, false);
      this.addEventListener("mousedown", resetTimer, false);
      this.addEventListener("keypress", resetTimer, false);
      this.addEventListener("DOMMouseScroll", resetTimer, false);
      this.addEventListener("mousewheel", resetTimer, false);
      this.addEventListener("touchmove", resetTimer, false);
      this.addEventListener("MSPointerMove", resetTimer, false);
   
    //  this.startTimer();
  },
  startTimer: function() {
    	// wait 2 seconds before calling goInactive
    	this.timeoutID = window.setTimeout(this.goInactive, 900000);
  },
  goActive: function() {
    // do something
         
    this.startTimer();
},
  iniciarConteo: function(){
  	//console.log("Estas moviendo el mouse");

    window.clearTimeout(this.timeoutID);
 
    this.goActive();
  },
  goInactive: function(){
      alert('La sesion caduco');
     localStorage.clear();
      $('.login').css("visibility", "visible");
      $(".li_menu").css("visibility", "hidden");
      $('.caja_acciones').hide();
  }
}); 