var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
 
  url : function(){
    //return  window.ruta +  'subirf/';
    return 'http://192.168.122.1:8000/personal/subir_imagen/2';
  },
});