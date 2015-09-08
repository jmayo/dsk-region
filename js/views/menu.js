var Backbone = require('backbone'),
    $           = require('jquery');

//Personal.Views.Menu

module.exports = Backbone.View.extend({
  events :{
     "click .personal": "opcion_personal",
     "click .empresas": "opcion_empresa",
     "click .movimientos": "opcion_movimientos",
     "click .catalogosli": "opcion_catalogos",
     "click .cerrar_sesion": "opcion_cerrarsesion",
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
   opcion_catalogos: function(){
      Backbone.app.navigate("Catalogo", {trigger: true,replace: false});
   },
   opcion_cerrarsesion: function(){
     //alert('La sesion caduco');
     localStorage.clear();
      $('.login').css("visibility", "visible");
      $(".li_menu").css("visibility", "hidden");
      $('.caja_acciones').hide();
      $('.contenido_personal').hide();
      $('.contenido_empresa').hide();
      $('.contenido_movimientos').hide();
   }
}); 