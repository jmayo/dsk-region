Personal.Models.catalogo = Backbone.Model.extend({
 claves : function(claves){
      this.claves  = claves;
  },
  url : function(){
    return  window.ruta +  'catalogos_detalle/' + this.claves + '/';
  },
});