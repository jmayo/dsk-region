var Backbone = require('backbone'),
    ValidacionModelo = require('../models/validacion');
 
//Personal.Models.personal 
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
   var direccion = window.ruta + 'personal/';
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
  busqueda: function(){
//     var now = new Date();
// var dt = new Date(now.getYear(), now.getMonth(), now.getDay());
// console.log(now.getFullYear())
// month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
// day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
     Backbone.app.navigate("Personal/buscar/" + this.get('matricula'), {trigger: true});
  },

  defaults : function() {
      this.fecha_actual = new  funcionGenerica().fechaActual();
      this.fec_18 = new funcionGenerica().fecha18Years();
        return{
        "id" : "",
        "matricula": "",
        "paterno": "", 
        "materno":"", 
        "nombre":"", 
        "rfc": "", 
        "curp": "", 
        "cuip": "", 
        "fec_nacimiento":this.fec_18, 
        "cdu_estado_nac": "0140015", 
        "cdu_municipio_nac": "0150737", 
        "cdu_estado_civil" : "0010000",
        "cdu_escolaridad": "0020000", 
        "cdu_seguridad_social": "0170001", 
        "id_seguridad_social": "", 
        "telefono": "",
        "portacion": false,
        "cdu_tipo_alta": "0200000", 
        "fec_alta": this.fecha_actual , 
        "condicionada": false, 
        "condiciones_alta": "", 
        "cdu_tipo_empleado": "0210001", 
        "calle_dom": "", 
        "numero_dom": "", 
        "colonia_dom": "", 
        "cp_dom": "", 
        "cdu_estado_dom": "0140015", 
        "cdu_municipio_dom": "0150737", 
        "imagen": "",
      };
  },
  camposValidar: function(){
      var vali = new ValidacionModelo();
      vali.Campo('matricula',4,10,vali.Numeros());
      vali.Campo('paterno',1,20,vali.AlfaNumerico());
      vali.Campo('materno',1,20,vali.AlfaNumerico());
      vali.Campo('nombre',1,20,vali.AlfaNumerico());
      vali.Campo('rfc',1,13,vali.RFC());
      vali.Campo('curp',1,18,vali.CURP());
      vali.Campo('cuip',0,30,vali.CUIP());
      vali.Campo('fec_nacimiento',1,10,vali.Fecha());
      vali.Campo('fec_alta',1,10,vali.Fecha());
      vali.Campo('id_seguridad_social',0,20,vali.AlfaNumerico());
      vali.Campo('telefono',0,50,vali.Generico());
      vali.Campo('condiciones_alta',1,150,vali.AlfaNumerico()); 
      vali.Campo('calle_dom',1,100,vali.AlfaNumerico());
      vali.Campo('numero_dom',1,100,vali.AlfaNumerico());
      vali.Campo('colonia_dom',1,100,vali.AlfaNumerico()); 
      vali.Campo('cp_dom',1,10,vali.Numeros()); 
      vali.Campo('sueldo',1,10,vali.Decimales());
      this.listado = vali.Listado();
  },
  validation: function() {
      return this.listado;  
  }
});


       