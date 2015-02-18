Personal.Models.empresa = Backbone.Model.extend({
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
      if(window.Personal.operacion==='buscar' && this.pk!==""){
   	    direccion = direccion + this.pk + '/';
      }
   } 
   if(this.valor!== undefined && this.valor!== null){
   	  direccion = direccion + 'buscar/' + this.valor + '/';
   } 
   return direccion;
  },
  defaults : {
	"id": "",
	"cve_empresa": "",
	"razon_social": "",
	"rfc": "",
	"calle": "",
	"numero": "",
	"colonia": "",
	"cp": "",
	"cdu_estado": "0140000",
	"cdu_municipio": "0150000",
	"ciudad": "",
	"telefono1": "",
	"telefono2": "",
	"cdu_giro": "0180000",
	"cdu_rubro": "0190000",
	"fecha_alta":"01/01/1900",
  "latitud" : "99.1696",
  "longitud" :  "19.5225",
  },
});
