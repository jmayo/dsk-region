var Backbone          = require('backbone'),
    plantilla = require("../templates/resultados-empresa-busqueda.hbs");

//Personal.Views.EmpresaBusqueda 
module.exports = Backbone.View.extend({
  events : {
     "mousedown ": "seleccionado",
   },
  tagName: 'div',
  className: 'resultado_ind',
  template: plantilla,

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
    Backbone.app.navigate("Empresa/buscar/" + this.model.get('cve_empresa'), {trigger: true});
  }
});

