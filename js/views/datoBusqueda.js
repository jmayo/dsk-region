var Backbone    = require('backbone');

//Personal.Views.DatoBusqueda 
module.exports = Backbone.View.extend({
  events : {
     "mousedown ": "seleccionado",
     "keyup": "cambiar",
   },
  tagName: 'div',
  className: 'resultado_ind',
  template: null,
  attributes: { tabindex: 1 },

  rutas: function(rutas){
    this.rutas = ruta;
  },
  initialize: function (opciones) {
    this.template = opciones.template;
    this.attributes.tabindex =  opciones.id ;
    this.id = "opcion_busqueda_" + opciones.id;
   // debugger;
  },
  render: function () {
    var busqueda = this.model.toJSON();
    var html = this.template( busqueda);
    this.$el.html(html);
    return this;
  },
  seleccionado: function(){
    debugger;
    this.model.busqueda();
  },
  cambiar: function(){
    console.log("cambiar");
  },
});

