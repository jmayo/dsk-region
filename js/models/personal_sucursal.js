var Backbone = require('backbone'),
    ValidacionModelo = require('./validacion');

 
module.exports = Backbone.Model.extend({
  initialize: function(){
      this.id_personal = null;
      this.id_sucursal = null;
  	  this.pk = null;
      this.camposValidar();
      this.eliminar = false;
      this.fechaAsignacion = null;
  },
 id_personal : function(id_personal){
      this.id_personal  = id_personal;
  },
  id_sucursal : function(id_sucursal){
      this.id_sucursal  = id_sucursal;
  },
  pk : function(pk){
      this.pk  = pk;
  },
  url : function(){
   var direccion = window.ruta + 'personal/';
   if(this.fechaAsignacion!== undefined && this.fechaAsignacion!== null){
      return direccion = window.ruta  + 'personal_sucursales/' + this.id_personal + '/fecha/' +this.fechaAsignacion + '/';
   }

   if(this.eliminar === false ){
     if(this.pk!== undefined && this.pk!== null){
        if(this.pk!=="-1"){
     	    return direccion = direccion + this.pk + '/';
        }
     } 
    
     if(this.id_personal!== undefined && this.id_personal!== null){
     	 return direccion + this.id_personal + '/sucursal/activa/';
     } 

     if(this.pk==="-1"){
       return window.ruta + 'personal_sucursales/';
     }     
  }
  else{
      return window.ruta + 'personal_sucursales/asignacion/'+ this.pk + '/';
  }

   return direccion;
  },
  defaults : function(){ 
     var now  = new Date();
     var dia  =  "" + now.getDate(); 
     if (dia.length == 1) { dia = "0" + dia; };
     var mes  =  "" + (now.getMonth() + 1); 
     if (mes.length == 1) { mes = "0" + mes; };
     var anio = now.getFullYear();
     this.fecha_actual =  dia + '/' + mes + '/' + anio; 
     

    return {
    "id": "",
    "id_personal": "",
    "id_sucursal": "",
    "cdu_motivo": "0250000",
    "cdu_turno": "0260000",
    "cdu_puesto": "0270000",
    "cdu_rango": "0280000",
    "sueldo": "0.0",
    "fecha_inicial": this.fecha_actual ,
    "fecha_final": "01/01/1900",
    "motivo": "",
     }
  },
   camposValidar: function(){
      var vali = new ValidacionModelo();
      vali.Campo('sueldo',1,10,vali.Decimales());
      vali.Campo('fecha_inicial',1,10,vali.Fecha()); 
      this.listado = vali.Listado();
  },
  validation: function() {
      return this.listado;  
  }
});
