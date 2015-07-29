var Backbone   = require('backbone'),
    $          = require('jquery'),
    Handlebars = require('handlebars'),
    app        =  Backbone.app;
    plantilla = require("../templates/resultados-personal-busqueda.hbs");

//Personal.Views.PersonalBusqueda 
module.exports= Backbone.View.extend({
  events : {
     "mousedown ": "seleccionado",
   },
  tagName: 'div',
  className: 'resultado_ind',
  template: plantilla,
  //template: Handlebars.compile(plantilla),

  initialize: function () {
  },

  render: function () {
    var busqueda = this.model.toJSON();
    var html = this.template( busqueda);
    this.$el.html(html);
    return this;
  },
  seleccionado: function(){
    console.log(this.model.get('nombre'));
    Backbone.app.navigate("Personal/buscar/" + this.model.get('matricula'), {trigger: true});
  }
});



