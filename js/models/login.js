Personal.Models.login = Backbone.Model.extend({
  url : function(){
    return  window.ruta +  'api-token-auth/';
  },
});
