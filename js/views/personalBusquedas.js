Personal.Views.PersonalBusquedas = Backbone.View.extend({
  el: $('#resultados_generales'),
  template: Handlebars.compile($("#resultados-personal-busqueda-template").html()),

  initialize: function () {
    this.listenTo(this.collection, "add", this.addOne, this);
    this.listenTo(this.collection, "reset", this.limpiarTodo, this);
  },

  render: function () {
    this.collection.forEach(this.addOne, this);
  },
  addOne: function (perso) {
    console.log("Se agrego nueva busqueda");
    var busquedaView = new Personal.Views.PersonalBusqueda({ model: perso }); 
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
