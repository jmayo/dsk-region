Personal.Views.DatoBusquedas = Backbone.View.extend({
  template: null,
  initialize: function (opciones) {
    this.setElement(opciones.el);
    this.template =opciones.template;
    this.listenTo(this.collection, "add", this.addOne, this);
    this.listenTo(this.collection, "reset", this.limpiarTodo, this);
  },

  render: function () {
    this.collection.forEach(this.addOne, this);
  },
  addOne: function (modelo) {
    console.log("Se agrego nueva busqueda generica");
    var busquedaView = new Personal.Views.DatoBusqueda({ model: modelo, template:  this.template}); 
    this.$el.append(busquedaView.render().el);
  },
   limpiarTodo:function(){
    console.log("limpiando resultados");
     this.$el.empty();
  }
  
});
