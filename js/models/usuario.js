var Backbone = require('backbone');

//Usuario.Models 
module.exports= Backbone.Model.extend({
  url : function(){
    return  window.ruta +  'permiso_administrador/usuario/';
  },
});