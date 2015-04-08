Personal.Views.DatoBusqueda = Backbone.View.extend({
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
    this.template = Handlebars.compile($(opciones.template).html());
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

