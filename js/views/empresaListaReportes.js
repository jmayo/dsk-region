var Backbone              = require('backbone'),
    $                     = require('jquery'),
    EmpresaDetalleLista   = require('../views/empresaListadoReporte'),
    Plantilla             = require('../templates/empresa-listado-reportes.hbs');
//Personal.Views.PersonalBusquedas 
module.exports= Backbone.View.extend({
  el: $('#bloque_empresa_reporte'),
  template: Plantilla,

  initialize: function () {
    this.listenTo(this.collection, "add", this.addOne, this);
    this.listenTo(this.collection, "reset", this.limpiarTodo, this);
  },

  render: function () {
  	console.log("vamos a recorrer")
    this.collection.forEach(this.addOne, this);
  },
  addOne: function (empresa) {
    console.log("Se agrego nueva empresa al reporte");
    var busquedaView = new EmpresaDetalleLista({ model: empresa }); 
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
