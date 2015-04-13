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
      debugger;
      if(window.Personal.menu==="personal"){
         Personal.app.navigate("Personas/nuevo/", {trigger: true, replace: true});
       }
      else if(window.Personal.menu==="empresa" || window.Personal.menu==="sucursal"){
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
    if(window.Personal.menu==="sucursal"){
      var sucursal = new Personal.Views.SucursalDetalle();
      sucursal.guardar();

      console.log("guardando sucursal");
    }
    if(window.Personal.menu ==="movimiento"){
      Personal.app.PersonalMovimiento.guardar();
      console.log("guardando movimiento");      
    }

  }
});
