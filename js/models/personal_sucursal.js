Personal.Models.personalsucursal = Backbone.Model.extend({
  initialize: function(){
      this.id_personal = null;
  	  this.pk = null;
      this.camposValidar();
  },
 id_personal : function(id_personal){
      this.id_personal  = id_personal;
  },
  pk : function(pk){
      this.pk  = pk;
  },
  url : function(){
   var direccion = window.ruta + 'personal/';
  
   if(this.pk!== undefined && this.pk!== null){
      if(this.pk!=="-1"){
   	    return direccion = direccion + this.pk + '/';
      }
   } 
  
   if(this.id_personal!== undefined && this.id_personal!== null){
   	 return direccion + this.id_personal + '/sucursal/activa';
   } 

   if(this.pk==="-1"){
     return window.ruta + 'personal_sucursales/';
   }

   return direccion;
  },
  defaults : {
  "id": "",
  "id_personal": "",
  "id_sucursal": "",
  "cdu_motivo": "0250000",
  "cdu_turno": "0260000",
  "cdu_puesto": "0270000",
  "cdu_rango": "0280000",
  "sueldo": "0.0",
  "fecha_inicial": "01/01/1900",
  "fecha_final": "01/01/1900",
  "motivo": "",
  },
   camposValidar: function(){
      var vali = new Personal.Models.validacion();
      vali.Campo('sueldo',1,10,vali.Decimales());
      vali.Campo('fecha_inicial',1,10,vali.Fecha()); 
      this.listado = vali.Listado();
  },
  validation: function() {
      return this.listado;  
  }
});
