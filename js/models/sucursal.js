var Backbone = require('backbone'),
    ValidacionModelo = require('../models/validacion');

//Personal.Models.sucursal 
module.exports= Backbone.Model.extend({
  initialize: function(){
  		this.valor = null;
  		this.pk = null;
      this.camposValidar();
  },
 valor : function(valor){
      this.valor  = valor;
  },
  pk : function(pk){
      this.pk  = pk;
  },
  url : function(){
   var direccion = window.ruta + 'sucursal/';
   if(this.pk!== undefined && this.pk!== null){
      if(this.pk!=="-1"){
   	    return direccion = direccion + this.pk + '/';
      }
   } 
   if(this.valor!== undefined && this.valor!== null){
   	  direccion = direccion + 'buscar/' + this.valor + '/';
   } 
   return direccion;
  },
  busqueda: function(){
     Backbone.app.navigate("Sucursal/buscar/" + this.get('cve_sucursal'), {trigger: true});
  },
  defaults : function(){
       this.fecha_actual = new  funcionGenerica().fechaActual();
    return{  
    	"id": "",
    	"cve_empresa": "",
    	"cve_sucursal": "",
    	"nombre": "",
    	"calle": "",
    	"numero": "",
    	"colonia": "",
    	"cp": "",
    	"cdu_estado": "0140000",
    	"cdu_municipio": "0150000",
    	"ciudad": "",
    	"telefono": "",
    	"cdu_estatus": "0240000",
    	"fecha_alta":this.fecha_actual,
    	"fecha_baja":"01/01/1900",
    	"latitud" : "19.4425",
        "longitud" : "-99.1330",
    }
  },
   camposValidar: function(){
      var vali = new ValidacionModelo();
      vali.Campo('cve_empresa',1,10,vali.Numeros());
      vali.Campo('cve_sucursal',1,10,vali.Numeros());
      vali.Campo('nombre',1,150,vali.Generico());
      vali.Campo('calle',1,100,vali.Generico());
      vali.Campo('numero',1,10,vali.AlfaNumerico()); 
      vali.Campo('colonia',1,100,vali.AlfaNumerico()); 
      vali.Campo('cp',1,10,vali.Numeros()); 
      vali.Campo('ciudad',1,100,vali.AlfaNumerico()); 
      vali.Campo('telefono',1,10,vali.AlfaNumerico()); 
      vali.Campo('fecha_alta',1,10,vali.Fecha());
      vali.Campo('fecha_baja',1,10,vali.Fecha());
      vali.Campo('latitud',0,10,vali.Decimales());
      vali.Campo('longitud',0,10,vali.Decimales()); 
      this.listado = vali.Listado();
  },
  validation: function() {
      return this.listado;  
  }
});