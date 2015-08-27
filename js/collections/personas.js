var Backbone      = require('backbone'),
  PersonalModelo = require('../models/personal');


//Personal.Collections.Personas
module.exports = Backbone.Collection.extend({
  initialize: function(){
  		this.valor = null;
  		this.pk = null;
      this.id_sucursal = null;
  }, 
  valor : function(valor){
      this.valor  = valor;
  },
  pk : function(pk){
      this.pk  = pk;
  },
  id_sucursal : function(id_sucursal){
      this.id_sucursal  = id_sucursal;
  },
  url : function(){
     // http://localhost:8001/sucursal/1/personal/activo/ 
   var direccion = window.ruta + 'sucursal/';
   if(this.id_sucursal!== undefined && this.id_sucursal!== null){
      return direccion + this.id_sucursal + '/personal/activo/';
   }

   direccion = window.ruta + 'personal/';

  	if(this.pk!== undefined && this.pk!== null){
   	  direccion = direccion + this.pk + '/';
    }
    if(this.valor!== undefined && this.valor!== null){
   	  direccion = direccion + 'buscar/' + this.valor + '/';
    } 
   return direccion;
  },
  
  model: PersonalModelo,
});
