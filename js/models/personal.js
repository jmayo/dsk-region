Personal.Models.personal = Backbone.Model.extend({
 valor : function(valor){
      this.valor  = valor;
  },
  url : function(){
   var direccion = 'http://192.168.0.14:8000/personal/';
   if(this.valor!== undefined){
   	  direccion = direccion + this.valor + '/';
   } 
   return direccion;
  },
});
