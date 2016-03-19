var Backbone      = require('backbone'),
    incidenciaModelo = require('../models/incidencia');
       
//Personal.Collections.Empresas 

module.exports = Backbone.Collection.extend({
  initialize: function(){
  		this.pk = null;
  		this.fecha_ini = null;
  		this.fecha_fin = null;
  }, 
  fecha_ini : function(fecha_ini){
      this.fecha_ini  = fecha_ini;
  },
  fecha_fin : function(fecha_fin){
      this.fecha_fin  = fecha_fin;
  },
  pk : function(pk){
      this.pk  = pk;
  },
  url : function(){
    var direccion = window.ruta + 'incidencias/consulta/' 
    direccion = direccion + encodeURI('?fecha_ini=' + this.fecha_ini + '&' + 'fecha_fin=' + this.fecha_fin);
    return direccion;
    //if(this.fecha_ini!== undefined && this.fecha_ini!== null  && this.fecha_fin!== undefined && this.fecha_fin!== null){
   	direccion= direccion +'fecha_ini=' + this.fecha_ini + '&' + 'fecha_fin=' + this.fecha_fin;   
   return direccion;
  },
  
  model: incidenciaModelo,
});
