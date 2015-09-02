var Backbone = require('backbone');

//Personal.Models.catalogo 
module.exports = Backbone.Model.extend({
 claves : function(id){
      this.id  = id;
  },
  url : function(){
    return  window.ruta +  'catalogos/editables/';
  },
});