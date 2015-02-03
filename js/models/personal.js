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
   var direccion = 'http://192.168.0.14:8000/personal/';
   if(this.pk!== undefined && this.pk!== null){
   	  direccion = direccion + this.pk + '/';
   } 
   if(this.valor!== undefined && this.valor!== null){
   	  direccion = direccion + 'buscar/' + this.valor + '/';
   } 
   return direccion;
  },
});
