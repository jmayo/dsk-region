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
      if(window.Personal.menu==="personal"){
         Personal.app.navigate("Personas/nuevo/", {trigger: true, replace: true});
       }
      else if(window.Personal.menu==="empresa"){
         Personal.app.navigate("Empresas/nuevo/", {trigger: true, replace: true});
       }
      
   },
  guardar: function(){
    console.log("guardando");
    
    if(window.Personal.menu==="personal"){
      Personal.app.PersonalDetalle.guardar();
      console.log("guardando personal");
    }
    if(window.Personal.menu==="empresa"){
      Personal.app.EmpresaDetalle.guardar();
      console.log("guardando personal");
    }
  }
});
