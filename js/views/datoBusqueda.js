Personal.Views.DatoBusqueda = Backbone.View.extend({
  events : {
     "mousedown ": "seleccionado",
   },
  tagName: 'div',
  className: 'resultado_ind',
  template: null,

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
    Personal.app.navigate("Personal/buscar/" + this.model.get('matricula'), {trigger: true});
//    Personal.app.navigate("Personal/" + this.model.get('id') + "/sucursal/activa" , {trigger: true});
  }
});

