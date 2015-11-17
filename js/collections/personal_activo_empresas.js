var Backbone      = require('backbone');
//var PersoActEmpresaModelo = require('../models/personal_activo_empresa');

module.exports = Backbone.Collection.extend({
  initialize: function(){
  		this.id_empresas = null;
  },
  id_empresas : function(id_empresas){
          this.id_empresas  = id_empresas;
  },
  url : function(){
    var direccion = window.ruta + 'personal_sucursales/activos/empresa/';
   if(this.id_empresas!== undefined && this.id_empresas!== null){
   	  direccion = direccion + this.id_empresas + '/';
   } 
   return direccion;
  },
  
  //model: PersoActEmpresaModelo,
});
