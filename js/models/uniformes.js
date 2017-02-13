var Backbone = require('backbone'),
ValidacionModelo = require('../models/validacion');
 
//Personal.Models.uniformes 
module.exports= Backbone.Model.extend({
  initialize: function(){
  	this.pk = null;
  	this.personal = null;
  	this.anio = null;
  	this.periodo = null;   
    this.operacion = null;
    this.mes = null;
    this.buscarPeriodo = null;
  },
  pk : function(pk){
      this.pk  = pk;
  },
  personal : function(personal){
      this.personal  = personal;
  },
  anio : function(anio){
      this.anio  = anio;
  },
   mes : function(mes){
      this.mes  = mes;
  },
  periodo : function(periodo){
      this.periodo  = periodo;
  },
  operacion : function(operacion){
    this.operacion = operacion;
  },
  buscarPeriodo : function(buscarPeriodo){
    this.buscarPeriodo = buscarPeriodo;
  },
  
  url : function(){
   var direccion = window.ruta + 'uniforme/';
   if(this.operacion==="guardar"){
    return  direccion;
   }
   var parametros = {pk:this.pk,id_personal:this.personal,anio:this.anio,mes:this.mes,periodo:this.periodo};

    var delimitador ='?'
    var param_ruta =''
	for(key in parametros){
		if(parametros[key]!== undefined && parametros[key]!== null){
			param_ruta =  param_ruta + delimitador + key + "=" + parametros[key]
			if(delimitador==='?'){
				delimitador = "&"
			}   
		}
	}
    if(this.buscarPeriodo === true){
      param_ruta = 'periodo/' + param_ruta;
    }
    if(param_ruta!=='' && this.buscarPeriodo != true){
    	param_ruta = 'personal/' + param_ruta;
    }

   if(delimitador==='&'){
     // if(Backbone.app.operacion==='buscar' && this.pk!==""){
   	    direccion = direccion + param_ruta;
      //}
   } 

   return direccion;
  },  
});


       