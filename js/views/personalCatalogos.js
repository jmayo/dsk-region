Personal.Views.PersonalCatalogos = Backbone.View.extend({
  el: $('.select_bloque_combo'),
  template: Handlebars.compile($("#personal-catalogos-template").html()),

  initialize: function () {
    this.listenTo(this.collection, "add", this.addOne, this);
  },

  render: function () {
    this.collection.forEach(this.addOne, this);
  },
 
  addOne: function (catalogo) {
    console.log("Se agrego nuevo catalogo");
    var catalogoView = new Personal.Views.PersonalCatalogo({ model: catalogo }); 
    this.$el.append(catalogoView.render().el);
  }
});
