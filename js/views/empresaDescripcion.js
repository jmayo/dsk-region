Personal.Views.EmpresaDescripcion = Backbone.View.extend({
  tagName: 'div',
  className: 'div_empresa',
  template: Handlebars.compile($("#resultados-empresa-padre-template").html()),

  initialize: function () {

  },
  events:{
    "mousedown ": "seleccionado",
    "click .agregar_servicio": "nuevoServicio",
  },
  render: function () {
    var descripcion = this.model.toJSON();
    var html = this.template(descripcion);
   // html = html + '<div class="agregar_servicio">+<a href="#"></a></div>';
    this.$el.html(html);
   // $('#sucursal_padre').append('<div class="agregar_servicio">+<a href="#"></a></div>');
    return this;
  },
  seleccionado: function(){
    window.Personal.menu="empresa";
    $('#bloque_sucursal').hide();
    $('#bloque_empresa').show();
    Personal.app.EmpresaMapa.zoom(12);
   // console.log(this.model.get('nombre'));
   // Personal.app.navigate("Personal/buscar/" + this.model.get('matricula'), {trigger: true});
  },
  nuevoServicio: function(){
    console.log("un nuevo servicio se agregara");
  },
});



