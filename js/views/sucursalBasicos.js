var Backbone  = require('backbone');
   // Plantilla = require('../templates/sucursal-datos_basicos.hbs');
  
//Personal.Views.SucursalBasico
module.exports = Backbone.View.extend({
  //el: $('#sucursal_datos_basicos'),
  className: 'ul_bloque',
  tagName: 'ul',
  template:null,
  //template: Plantilla,
  
  initialize: function (opciones) {
    this.template = opciones.template;
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
  },
  });
