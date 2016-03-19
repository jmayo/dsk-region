var Backbone               = require('backbone'),
    _                       =require('underscore'),
    PersoActEmpresas       = require('../collections/personal_activo_empresas'),
    $                     = require('jquery'),
    SucursalDetalleVista   = require('../views/sucursalDetalle'),
    popup                  = require('../popup');

//Personal.Views.CajaOperaciones 
module.exports = Backbone.View.extend({
     events: {
	   "click .nuevo": "nuevo", 
      "click .guardar": "guardar",
      "click .eliminar": "eliminar",
      "change #incidencia_fecha_ini": "cambioFecha",
      "change #incidencia_fecha_fin": "cambioFecha",
   },
    el: $('.caja_acciones'),

    initialize: function (){
    
   },
   cambioFecha: function(){
    if(Backbone.app.menu==='consulta_incidencias'){
      Backbone.app.cons_incidencias();
      console.log("cambio la fecha");
    }
   },
   nuevo: function(){
      console.log("nuevo registro");
      if(Backbone.app.menu==="personal"){
         Backbone.app.navigate("Personas/nuevo/", {trigger: true, replace: true});
       }
      else if(Backbone.app.menu==="empresa" || Backbone.app.menu==="sucursal"){
         Backbone.app.menu="empresa";
         Backbone.app.navigate("Empresas/nuevo/", {trigger: true, replace: true});
       }
      
   },
   eliminar: function(){
       if(Backbone.app.menu ==="personal"){
          popup.valor = null;
          //popup.operacion = Backbone.app.PersonalDetalle.eliminar;
          //popup.mostrarMensaje();
          //Backbone.app.PersonalDetalle.eliminar();
       }
       if(Backbone.app.menu ==="movimiento"){
          popup.valor = null;
           $("#popup_confirmacion").text("Desea eliminar la asignación");
          popup.operacion = Backbone.app.PersonalMovimiento.eliminar;
          popup.mostrarMensaje();
         // Backbone.app.PersonalMovimiento.eliminar();
       }
        if(Backbone.app.menu ==="sucursal"){
          var suc = new SucursalDetalleVista();
          valor = $('#sucursal_id').text();
           $("#popup_confirmacion").text("Desea eliminar la sucursal");
          popup.valor = valor;
          popup.operacion = suc.eliminar;
          popup.mostrarMensaje();
          //suc.eliminar($('#sucursal_id').text());
       }
   },
  guardar: function(){
    console.log("guardando");
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
    if(Backbone.app.menu ==="catalogo"){
      Backbone.app.CatalogoDetVista.guardar();
      console.log("catalogos guardados");
    }
  },

});
