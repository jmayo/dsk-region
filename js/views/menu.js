var Backbone = require('backbone'),
    $           = require('jquery'), 
    app      =  Backbone.app;

//Personal.Views.Menu

module.exports = Backbone.View.extend({
  events :{
     "click .personal": "opcion_personal",
     "click .empresas": "opcion_empresa",
     "click .movimientos": "opcion_movimientos",
  },

  el: $('.menu'),
  initialize: function () {
    localStorage.setItem("tiempo",0);
  		//window.routers.base.on('router:root' , this.inicio());
  		//Personal.app.on("route:root", this.inicio());
   },
   opcion_personal: function(){
      Backbone.app.navigate("Personal", {trigger: true,replace: false});
   },
   opcion_empresa: function(){
      Backbone.app.navigate("Empresa", {trigger: true,replace: false});
   },
   opcion_movimientos: function(){
      Backbone.app.navigate("Movimiento", {trigger: true,replace: false});
   },
}); 