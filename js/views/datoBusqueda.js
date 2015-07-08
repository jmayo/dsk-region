var Backbone    = require('backbone');

//Personal.Views.DatoBusqueda 
module.exports = Backbone.View.extend({
  events : {
     "mousedown ": "seleccionado",
   },
  tagName: 'div',
  className: 'resultado_ind',
  template: null,
  rutas: function(rutas){
    this.rutas = ruta;
  },
  initialize: function (opciones) {
    this.template = opciones.template;
  },
  render: function () {
    var busqueda = this.model.toJSON();
    var html = this.template( busqueda);
    this.$el.html(html);
    return this;
  },
  seleccionado: function(){
    console.log(this.model.get('sueldo'));
    this.model.busqueda();
  }
});

