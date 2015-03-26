Personal.Models.empresa = Backbone.Model.extend({
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
  camposValidar: function(){
      var vali = new Personal.Models.validacion();
      vali.Campo('cve_empresa',1,10,vali.Numeros());
      vali.Campo('razon_social',1,150,vali.Generico());
      vali.Campo('rfc',1,13,vali.RFC());
      vali.Campo('calle',1,100,vali.Generico());
      vali.Campo('numero',1,10,vali.AlfaNumerico()); 
      vali.Campo('colonia',1,100,vali.AlfaNumerico()); 
      vali.Campo('cp',1,10,vali.Numeros()); 
      vali.Campo('ciudad',1,100,vali.AlfaNumerico()); 
      vali.Campo('telefono1',1,10,vali.AlfaNumerico()); 
      vali.Campo('telefono2',0,10,vali.AlfaNumerico()); 
      vali.Campo('fecha_alta',1,10,vali.Fecha());
      this.listado = vali.Listado();
  },
  validation: function() {
      return this.listado;  
  }
});
