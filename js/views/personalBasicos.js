var Backbone  = require('backbone'),
    $         = require('jquery'),
    Plantilla = require('../templates/personal-datos_basicos.hbs');

//Personal.Views.PersonalBasico 
module.exports= Backbone.View.extend({
  el: $('#personal_datos_basicos'),
  className: 'ul_bloque',
  tagName: 'ul',
  template: Plantilla,
    
  initialize: function () {
    this.listenTo(this.model, "change", this.llenado, this);
  },
  llenado: function(){
    console.log("llenando el formulario");
    if(this.model.get("id")!=="-1"){
      this.render();
    }
  }, 
  render: function () {
   this.$el.empty();
   var detalle = this.model.toJSON();
   var html = this.template(detalle);
   this.$el.html(html);
   $('#perso_foto_basica_wait').hide();
  },
  });
