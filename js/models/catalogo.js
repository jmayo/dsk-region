var Backbone = require('backbone');

//Personal.Models.catalogo 
module.exports = Backbone.Model.extend({
 claves : function(claves){
      this.claves  = claves;
  },
  url : function(){
    return  window.ruta +  'catalogos_detalle/' + this.claves + '/';
  },
});