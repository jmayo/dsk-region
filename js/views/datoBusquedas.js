var Backbone          = require('backbone'),
    DatoBusquedaVista = require('../views/datoBusqueda');
    
//Personal.Views.DatoBusquedas 
module.exports = Backbone.View.extend({
  template: null,
   el:  $('#resultados_sucursal_movimiento'),

    events : {
     "keyup #resultados_sucursal_movimiento": "cambiar",
   },
  initialize: function (opciones) {
    this.setElement(opciones.el);
    this.template =opciones.template;
    this.listenTo(this.collection, "add", this.addOne, this);
    this.listenTo(this.collection, "reset", this.limpiarTodo, this);
    this.id = 1;
  },

  render: function () {
    this.collection.forEach(this.addOne, this);
  },
  addOne: function (modelo) {
    this.id = this.id + 1;
    modelo.otraConsulta = this.otraConsulta;

    var busquedaView = new DatoBusquedaVista({ model: modelo, template:  this.template, id: this.id}); 
    this.$el.append(busquedaView.render().el);
  },
   limpiarTodo:function(){
    this.id =0;
    console.log("limpiando resultados");
     this.$el.empty();
  },
   cambiar: function(){
    console.log("cambiar");
  },
   otraConsulta: function(valor){
    this.otraConsulta = valor
  },
});

//   $('#resultados_sucursal_movimiento').scrollTop($this.index() * $this.outerHeight());