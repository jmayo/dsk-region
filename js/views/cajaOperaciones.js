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
      if(Backbone.app.menu==="personal"){
         Backbone.app.navigate("Personas/nuevo/", {trigger: true, replace: true});
       }
      else if(Backbone.app.menu==="empresa" || Backbone.app.menu==="sucursal"){
         Backbone.app.navigate("Empresas/nuevo/", {trigger: true, replace: true});
       }
      
   },
  guardar: function(){
    console.log("guardando");
    debugger;

    if(Backbone.app.menu==="personal"){
      Backbone.app.PersonalDetalle.guardar();
      console.log("guardando personal");
    }
    if(Backbone.app.menu==="empresa"){
      Backbone.app.EmpresaDetalle.guardar();
      console.log("guardando personal");
    }
    if(Backbone.app.menu==="sucursal"){
      var sucursal = new SucursalDetalleVista();
      sucursal.guardar();

      console.log("guardando sucursal");
    }
    if(Backbone.app.menu ==="movimiento"){
      Backbone.app.PersonalMovimiento.guardar();
      console.log("guardando movimiento");      
    }

  },

});
