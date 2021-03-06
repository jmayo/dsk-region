var Backbone                = require('backbone'),
    $                     = require('jquery'),
    CatalogoDescripcionVista = require('../views/catalogoDescripcion');


//Personal.Views.SucursalListados 
module.exports = Backbone.View.extend({
  el: $('#catalogo_lista'),
 // template: Handlebars.compile($("#resultados-empresa-sucursal-listado-template").html()),

  initialize: function () {
    this.listenTo(this.collection, "add", this.addOne, this);
    this.listenTo(this.collection, "reset", this.limpiarTodo, this);
  },

  render: function () {
    this.collection.forEach(this.addOne, this);
  },
  addOne: function (catalogo) {
    var busquedaView = new CatalogoDescripcionVista({ model: catalogo }); 
   
    if(catalogo.get("id")==="-1"){
      this.$el.prepend(busquedaView.render().el);  
    }
    else{
      this.$el.append(busquedaView.render().el);
    }
  },
   limpiarTodo:function(){
    console.log("limpiando resultados");
     this.$el.empty();
  }
  
});
