var Backbone   = require('backbone'),
    Plantilla  = require('../templates/resultados-empresa-padre.hbs')       
    app        = Backbone.app;

//Personal.Views.EmpresaDescripcion

module.exports = Backbone.View.extend({
  tagName: 'a',
  className: 'lnk_servicio',
  template: Plantilla,
   attributes: { href: '#' },
  initialize: function () {
     //   this.listenTo(this.model, "change", this.cambio, this);
  },
  events:{
    "mousedown ": "seleccionado",
    "click .agregar_servicio": "nuevoServicio",
  },
  cambio: function(){
    console.log("cambio el modelo");
    this.render();
  },
  render: function () {
    var descripcion = this.model.toJSON();
    var html = this.template(descripcion);
   // html = html + '<div class="agregar_servicio"><a href="#"></a></div>';
    this.$el.html(html);
   // $('#sucursal_padre').append('<div class="agregar_servicio">+<a href="#"></a></div>');
    return this;
  },
  seleccionado: function(){
    window.Personal.menu="empresa";
    $('#bloque_sucursal').hide();
    $('#bloque_empresa').show();
    Backbone.app.EmpresaMapa.zoom(12);
   // console.log(this.model.get('nombre'));
   // Personal.app.navigate("Personal/buscar/" + this.model.get('matricula'), {trigger: true});
  },
  nuevoServicio: function(){
    console.log("un nuevo servicio se agregara");
  },
});



