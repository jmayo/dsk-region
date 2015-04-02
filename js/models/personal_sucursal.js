Personal.Models.personalsucursal = Backbone.Model.extend({
  initialize: function(){
      this.id_personal = null;
  	  this.pk = null;
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
   	  direccion = direccion + 'personal/' + this.valor + '/sucursal/activa';
   } 
   return direccion;
  },
  
});