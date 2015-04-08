Personal.Views.SucursalBasico = Backbone.View.extend({
  el: $('#sucursal_datos_basicos'),
  className: 'ul_bloque',
  tagName: 'ul',
  template: Handlebars.compile($("#sucursal-datos_basicos-template").html()),
    
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
  },
  });
