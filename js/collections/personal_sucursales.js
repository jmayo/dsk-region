Personal.Collections.PersonalSucursales = Backbone.Collection.extend({
  initialize: function(){
  		this.id_personal = null;
  },
  id_personal : function(id_personal){
          this.id_personal  = id_personal;
  },
  url : function(){
    var direccion = window.ruta + 'personal/';
   if(this.id_personal!== undefined && this.id_personal!== null){
   	  direccion = direccion + this.id_personal + '/sucursal/activa';
   } 
   return direccion;
  },
  
  model: Personal.Models.personalsucursal,
});
