Personal.Views.EmpresaBusquedas = Backbone.View.extend({
  el: $('#resultados_generales'),
  template: Handlebars.compile($("#resultados-empresa-busqueda-template").html()),

  initialize: function () {
    this.listenTo(this.collection, "add", this.addOne, this);
    this.listenTo(this.collection, "reset", this.limpiarTodo, this);
  },

  render: function () {
    this.collection.forEach(this.addOne, this);
  },
  addOne: function (empresa) {
    console.log("Se agrego nueva busqueda");
    var busquedaView = new Personal.Views.EmpresaBusqueda({ model: empresa }); 
    this.$el.append(busquedaView.render().el);
  },
   limpiarTodo:function(){
    console.log("limpiando resultados");
     this.$el.empty();
  }
  
});
