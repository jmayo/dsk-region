var Backbone               = require('backbone'),
    $                     = require('jquery'),
    SucursalDetalleVista   = require('../views/sucursalDetalle');
 
//Personal.Views.CajaOperaciones 
module.exports = Backbone.View.extend({
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
         Backbone.app.navigate("Personas/nuevo/", {trigger: true, replace: true});
       }
      else if(window.Personal.menu==="empresa" || window.Personal.menu==="sucursal"){
         Backbone.app.navigate("Empresas/nuevo/", {trigger: true, replace: true});
       }
      
   },
  guardar: function(){
    console.log("guardando");
    
    if(window.Personal.menu==="personal"){
      Backbone.app.PersonalDetalle.guardar();
      console.log("guardando personal");
    }
    if(window.Personal.menu==="empresa"){
      Backbone.app.EmpresaDetalle.guardar();
      console.log("guardando personal");
    }
    if(window.Personal.menu==="sucursal"){
      var sucursal = new SucursalDetalleVista();
      sucursal.guardar();

      console.log("guardando sucursal");
    }
    if(window.Personal.menu ==="movimiento"){
      Backbone.app.PersonalMovimiento.guardar();
      console.log("guardando movimiento");      
    }

  },

});
