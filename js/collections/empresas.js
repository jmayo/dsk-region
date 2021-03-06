var Backbone      = require('backbone'),
    empresaModelo = require('../models/empresa');
       
//Personal.Collections.Empresas 

module.exports = Backbone.Collection.extend({
  initialize: function(){
  		this.valor = null;
  		this.pk = null;
  }, 
  valor : function(valor){
      this.valor  = valor;
  },
  pk : function(pk){
      this.pk  = pk;
  },
  url : function(){
    var direccion = window.ruta + 'empresa/';

  	if(this.pk!== undefined && this.pk!== null){
   	  direccion = direccion + this.pk + '/';
    }
    if(this.valor!== undefined && this.valor!== null){
   	  direccion = direccion + 'buscar/' + this.valor + '/';
    } 
   return direccion;
  },
  
  model: empresaModelo,
});
