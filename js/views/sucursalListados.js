var Backbone                = require('backbone'),
    $                     = require('jquery'),
    SucursalDescripcionVista = require('../views/sucursalDescripcion');


//Personal.Views.SucursalListados 
module.exports = Backbone.View.extend({
  el: $('#sucursal_listado'),
 // template: Handlebars.compile($("#resultados-empresa-sucursal-listado-template").html()),

  initialize: function () {
    this.listenTo(this.collection, "add", this.addOne, this);
    this.listenTo(this.collection, "reset", this.limpiarTodo, this);
  },

  render: function () {
    this.collection.forEach(this.addOne, this);
  },
  addOne: function (sucursal) {
    this.DescripcionView = new SucursalDescripcionVista({ model: sucursal }); 
    if(sucursal.get("id")==="-1"){
      this.$el.prepend(this.DescripcionView.render().el);  
    }
    else{
      this.$el.append(this.DescripcionView.render().el);
    }
  },
   limpiarTodo:function(){
    console.log("limpiando resultados");
     this.$el.empty();
  },
  
});
