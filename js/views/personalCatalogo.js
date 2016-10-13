var Backbone              = require('backbone'),
    $                     = require('jquery'),
    Plantilla             = require('../templates/personal-catalogos.hbs');

//Personal.Views.PersonalCatalogo 
module.exports = Backbone.View.extend({
  tagName: 'option',
 // el: $('#personal_basicos'),
  template: Plantilla,
  
  initialize: function (attrs) {
    this.options = attrs;
    this.listenTo(this.model, "remove", this.remover, this);
  },

  render: function () {
    var catalogo = this.model.toJSON();
    var html = this.template(catalogo);
    this.$el.html(html);
    this.el.value = this.model.get('cdu_catalogo');
    if(this.model.get('cdu_catalogo')=== this.options.seleccionado)
    {
      $(this.el).attr("selected","selected");
    }
  
    return this;
  },
  remover: function(){
    console.log("se elimino")
  }
});

