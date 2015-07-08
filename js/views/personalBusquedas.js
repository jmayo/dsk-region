var Backbone              = require('backbone'),
    $                     = require('jquery'),
    PersonalBusquedaVista = require('../views/personalBusqueda'),
    Plantilla             = require('../templates/resultados-personal-busqueda.hbs');

//Personal.Views.PersonalBusquedas 
module.exports= Backbone.View.extend({
  el: $('#resultados_generales'),
  template: Plantilla,

  initialize: function () {
    this.listenTo(this.collection, "add", this.addOne, this);
    this.listenTo(this.collection, "reset", this.limpiarTodo, this);
  },

  render: function () {
    this.collection.forEach(this.addOne, this);
  },
  addOne: function (perso) {
    console.log("Se agrego nueva busqueda");
    var busquedaView = new PersonalBusquedaVista({ model: perso }); 
    this.$el.append(busquedaView.render().el);
  },
   limpiarTodo:function(){
    console.log("limpiando resultados");
     this.$el.empty();
  },
  close: function(){
      this.collection.reset();
      this.collection.unbind();
      this.collection.drop();
      this.unbind();
    }
});
