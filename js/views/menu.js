Personal.Views.Menu = Backbone.View.extend({
  events :{
     "click .personal": "opcion_personal",
     "click .empresas": "opcion_empresa",
  },

  el: $('.menu'),
  initialize: function () {
  		//window.routers.base.on('router:root' , this.inicio());
  		//Personal.app.on("route:root", this.inicio());
   },
   opcion_personal: function(){
      Personal.app.navigate("Personal", {trigger: true,replace: false});
   },
   opcion_empresa: function(){
      Personal.app.navigate("Empresa", {trigger: true,replace: false});
   },
});