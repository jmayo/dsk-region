Personal.Models.catalogo = Backbone.Model.extend({
 claves : function(claves){
      this.claves  = claves;
  },
  url : function(){
   return 'http://192.168.0.14:8000/catalogos_detalle/' + this.claves + '/';
  },
});