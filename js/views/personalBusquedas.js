Personal.Views.PersonalBusquedas = Backbone.View.extend({

  template: Handlebars.compile($("#resultados-busqueda-template").html()),

  initialize: function () {
    //this.Escuchar();
    this.listenTo(this.collection, "add", this.addOne, this);
    this.listenTo(this.collection, "change", this.addOne1, this);
  },

  render: function () {
    this.collection.forEach(this.addOne, this);
  },
  addOne: function (perso) {
    console.log("Se agrego nueva busqueda");
    //var personalView = new Personal.Views.PersonalBusqueda({ model: perso }); 
   // this.$el.append(personalView.render().el);
  },
  addOne1: function (perso) {
    console.log("Cambio la busqueda");
    //var personalView = new Personal.Views.PersonalBusqueda({ model: perso }); 
   // this.$el.append(personalView.render().el);
  },
});
