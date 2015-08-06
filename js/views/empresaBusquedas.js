var Backbone              = require('backbone'),
    $                     = require('jquery'),
    EmpresaBusquedaVista  = require('../views/empresaBusqueda');
    Plantilla             = require('../templates/resultados-personal-busqueda.hbs');

//Personal.Views.EmpresaBusquedas 
module.exports = Backbone.View.extend({
  el: $('#resultados_generales'),
  template: Plantilla,

  initialize: function () {
    this.listenTo(this.collection, "add", this.addOne, this);
    this.listenTo(this.collection, "reset", this.limpiarTodo, this);
  },

  render: function () {
    this.collection.forEach(this.addOne, this);
  },
  addOne: function (empresa) {
    console.log("Se agrego nueva busqueda");
    var busquedaView = new EmpresaBusquedaVista({ model: empresa }); 
    this.$el.append(busquedaView.render().el);
  },
   limpiarTodo:function(){
    console.log("limpiando resultados");
     this.$el.empty();
  }
  
});

