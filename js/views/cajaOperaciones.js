Personal.Views.CajaOperaciones = Backbone.View.extend({
     events: {
	   "click .nuevo": "nuevo",
       "click .guardar": "guardar",
   },
    el: $('.caja_acciones'),

    initialize: function (){
   },
   nuevo: function(){
      console.log("nuevo registro");
      Personal.app.navigate("Personas/nuevo/", {trigger: true, replace: true});
   },
  guardar: function(){
    console.log("guardando");
    
    if(window.Personal.menu="personal"){
      Personal.app.PersonalDetalle.guardar();
      console.log("guardando personal");
    }
  },

});