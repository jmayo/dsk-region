Personal.Views.SucursalDescripcion = Backbone.View.extend({
  tagName: 'div',
  className: 'div_servicio',
  template: Handlebars.compile($("#resultados-empresa-sucursal-listado-template").html()),

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
    $('#bloque_empresa').hide();
    $('#bloque_sucursal').show();
    console.log(this.model.get("id"));
    this.SucursalModelo = new Personal.Models.sucursal();
    this.SucursalModelo.pk = this.model.get("id");
    this.SucursalDetalle = new Personal.Views.SucursalDetalle({model: this.SucursalModelo});
    this.SucursalModelo.fetch();
   // console.log(this.model.get('nombre'));
   // Personal.app.navigate("Personal/buscar/" + this.model.get('matricula'), {trigger: true});
  }
});



