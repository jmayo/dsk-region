var Backbone                = require('backbone'),
    $                     = require('jquery'),
    CatalogoDetalleVista = require('../views/catalogoDetalleDescripcion');


//Personal.Views.SucursalListados 
module.exports = Backbone.View.extend({
  el: $('#catalogo_detalle_lista'),
 // template: Handlebars.compile($("#resultados-empresa-sucursal-listado-template").html()),

  initialize: function () {
    this.listenTo(this.collection, "add", this.addOne, this);
    this.listenTo(this.collection, "reset", this.limpiarTodo, this);
  },

  render: function () {
    this.collection.forEach(this.addOne, this);
  },
  addOne: function (catalogoDet) {     
  	if(catalogoDet.get("cdu_catalogo")!==""){
  		   catalogoDet.set({ico: "fa-remove",clase:"eliminar_renglon"});
  	}
    var busquedaView = new CatalogoDetalleVista({ model: catalogoDet }); 
    this.$el.append(busquedaView.render().el);
  },
   limpiarTodo:function(){
    console.log("limpiando resultados");
     this.$el.empty();
  }
  
});
