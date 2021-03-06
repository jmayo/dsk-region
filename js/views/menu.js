var Backbone = require('backbone'),
    $           = require('jquery');

//Personal.Views.Menu

module.exports = Backbone.View.extend({
  events :{
     "click .personal": "opcion_personal",
     "click .empresas": "opcion_empresa",
     "click .movimientos": "opcion_movimientos",
     "click .catalogosli": "opcion_catalogos",
     "click .incidencias": "opcion_incidencias",
     "click .conempresapersona": "opcion_consulta_empresa_personas", 
     "click .conincidencias": "opcion_consulta_incidencias",    
     "click .cerrar_sesion": "opcion_cerrarsesion",
     "click .uniformes": "opcion_uniformes",
     "click .uniformesreporte": "opcion_uniformes_reporte",
      
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
   opcion_incidencias: function(){
      Backbone.app.navigate("Incidencias", {trigger: true,replace: false});
   },
   opcion_consulta_empresa_personas: function(){
      Backbone.app.navigate("ConsultaEmpPerso", {trigger: true,replace: false});
   },
   opcion_consulta_incidencias: function(){
      Backbone.app.navigate("ConsultaIncidencias", {trigger: true,replace: false});
   },
   opcion_uniformes: function(){
      Backbone.app.navigate("Uniformes", {trigger: true,replace: false});
   },
  opcion_uniformes_reporte: function(){
      Backbone.app.navigate("UniformesReporte", {trigger: true,replace: false});
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
      $('.incidencias_personal').hide();
      $('.consulta_empresa_personal').hide();
      $('#personal_uniformes').hide();
      $('#personal_reporte_uniformes').hide();


   }
}); 