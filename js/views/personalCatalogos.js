Personal.Views.PersonalCatalogos = Backbone.View.extend({
  
  template: Handlebars.compile($("#personal-catalogos-template").html()),
  
  initialize: function () {
    this.listenTo(this.collection, "add", this.addOne, this);
  },

  render: function () {

    
    //var edo_civ = this.collection.where({catalogos: "1"});
    //this.el = $("#perso_estado_civil");
    //edo_civ.forEach(this.addOne, this);
  },
 
  addOne: function (catalogo) {
    var catalogoView = new Personal.Views.PersonalCatalogo({ model: catalogo }); 
    var id_cat= catalogoView.model.get('catalogos');
    this.AgregarOpcion(catalogoView,id_cat);
  },
  AgregarOpcion: function(catalogoView,id_catalogo){
      if(id_catalogo=="1"){
        $("#perso_estado_civil").append(catalogoView.render().el);
      }
      if(id_catalogo=="2"){
        $("#perso_escolaridad").append(catalogoView.render().el);
     }
  },  
});
