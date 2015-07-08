var Backbone = require('backbone');

//Personal.Models.login 
module.exports= Backbone.Model.extend({
  url : function(){
    return  window.ruta +  'api-token-auth/';
  },
});
