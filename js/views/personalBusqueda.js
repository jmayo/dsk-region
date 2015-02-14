Personal.Views.PersonalBusqueda = Backbone.View.extend({
  events : {
     "mousedown ": "seleccionado",
   },
  tagName: 'div',
  className: 'resultado_ind',
  template: Handlebars.compile($("#resultados-personal-busqueda-template").html()),

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
    Personal.app.navigate("Personal/buscar/" + this.model.get('matricula'), {trigger: true});
  }
});



