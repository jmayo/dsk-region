var Backbone        = require('backbone');
    ValidacionVista = require('./validacion')
    funcionGenerica = require('../funcionesGenericas')

//Personal.Models.empresa 
module.exports = Backbone.Model.extend({
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
   var direccion = window.ruta + 'empresa/';
   if(this.pk!== undefined && this.pk!== null){
      if(Backbone.app.operacion==='buscar' && this.pk!==""){
   	    direccion = direccion + this.pk + '/';
      }
   } 
   if(this.valor!== undefined && this.valor!== null){
   	  direccion = direccion + 'buscar/' + this.valor + '/';
   } 
   return direccion;
  },
  defaults : function(){
      this.fecha_actual = new  funcionGenerica().fecha18Years();
       this.fecha_actual = new  funcionGenerica().fechaActual();
 
       return {
      	"id": "",
      	"cve_empresa": "",
      	"razon_social": "",
      	"rfc": "",
      	"calle": "",
      	"numero": "",
        "numero_int": "",
      	"colonia": "",
      	"cp": "",
      	"cdu_estado": "0140015",
      	"cdu_municipio": "0150737",
      	"telefono1": "",
      	"telefono2": "",
      	"cdu_giro": "0180000",
      	"cdu_rubro": "0190000",
      	"fecha_alta": this.fecha_actual ,
        "latitud" : "99.1696",
        "longitud" :  "19.5225",
      }
},
  camposValidar: function(){
      var vali = new ValidacionVista();
      vali.Campo('cve_empresa',1,10,vali.Numeros());
      vali.Campo('razon_social',1,150,vali.Generico());
      vali.Campo('rfc',1,13,vali.RFC());
      vali.Campo('calle',1,100,vali.Generico());
      vali.Campo('numero',1,10,vali.AlfaNumerico()); 
      vali.Campo('numero_int',0,10,vali.AlfaNumerico()); 
      vali.Campo('colonia',1,100,vali.AlfaNumerico()); 
      vali.Campo('cp',1,10,vali.Numeros()); 
      vali.Campo('telefono1',1,10,vali.AlfaNumerico()); 
      vali.Campo('telefono2',0,10,vali.AlfaNumerico()); 
      vali.Campo('fecha_alta',1,10,vali.Fecha());
      this.listado = vali.Listado();
  },
  validation: function() {
      return this.listado;  
  }
});
