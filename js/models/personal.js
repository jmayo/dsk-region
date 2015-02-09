Personal.Models.personal = Backbone.Model.extend({
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
   var direccion = window.ruta + 'personal/';
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
        "id" : "",
        "matricula": "",
        "paterno": "", 
        "materno":"", 
        "nombre":"", 
        "rfc": "", 
        "curp": "", 
        "cuip": "", 
        "fec_nacimiento":"01/01/1900", 
        "cdu_estado_nac": "0140000", 
        "cdu_municipio_nac": "0150000", 
        "cdu_estado_civil" : "0010000",
        "cdu_escolaridad": "0020000", 
        "cdu_religion": "0160000", 
        "cdu_seguridad_social": "0170000", 
        "id_seguridad_social": "", 
        "portacion": false,
  },
});