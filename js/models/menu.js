var Backbone = require('backbone');

//Personal.Models.catalogo 
module.exports = Backbone.Model.extend({
 Opcion : function(opcion){
      this.Opcion  = opcion;
  },
  url : function(){
    return  window.ruta + this.Opcion + '/menu/';
  },
});