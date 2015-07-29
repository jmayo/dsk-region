var Backbone              = require('backbone'),
    $                     = require('jquery'),
    PersonalCatalogoVista = require('../views/personalCatalogo'),
    Plantilla             = require('../templates/personal-catalogos.hbs');

//Personal.Views.PersonalCatalogos 
module.exports = Backbone.View.extend({
  
  template: Plantilla,
  
  initialize: function (attrs) {
      this.options = attrs;
      //this.listenTo(this.collection, "add", this.addOne, this);
  },

  render: function () {
       var id_select = this.options.id_select;
        $(id_select).empty();
       this.collection.forEach(this.addOne, this);
  },
 
  addOne: function (catalogo) {
    var seleccionado = false;
    var catalogoView = new PersonalCatalogoVista({ model: catalogo , seleccionado:this.options.cdu_seleccionado }); 
    var id_cat= catalogoView.model.get('catalogos');
    this.AgregarOpcion(catalogoView,id_cat);
  },
  AgregarOpcion: function(catalogoView,id_catalogo){
     var id_select = this.options.id_select;
     $(id_select).append(catalogoView.render().el);
  },  
});
