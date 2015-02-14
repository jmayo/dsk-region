Personal.Views.EmpresaBusqueda = Backbone.View.extend({
  events : {
     "mousedown ": "seleccionado",
   },
  tagName: 'div',
  className: 'resultado_ind',
  template: Handlebars.compile($("#resultados-empresa-busqueda-template").html()),

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
    Personal.app.navigate("Empresa/buscar/" + this.model.get('cve_empresa'), {trigger: true});
  }
});

