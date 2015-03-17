Personal.Views.SucursalListados = Backbone.View.extend({
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
    var busquedaView = new Personal.Views.SucursalDescripcion({ model: sucursal }); 
    if(sucursal.get("id")==="-1"){
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
