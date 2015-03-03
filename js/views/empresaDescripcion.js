Personal.Views.EmpresaDescripcion = Backbone.View.extend({
  tagName: 'div',
  className: 'div_empresa',
  template: Handlebars.compile($("#resultados-empresa-padre-template").html()),

  initialize: function () {

  },
  events:{
    "mousedown ": "seleccionado",
  },
  render: function () {
    var descripcion = this.model.toJSON();
    var html = this.template(descripcion);
    this.$el.html(html);
    return this;
  },
  seleccionado: function(){
    $('#bloque_sucursal').hide();
    $('#bloque_empresa').show();
   // console.log(this.model.get('nombre'));
   // Personal.app.navigate("Personal/buscar/" + this.model.get('matricula'), {trigger: true});
  }
});



