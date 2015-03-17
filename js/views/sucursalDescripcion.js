Personal.Views.SucursalDescripcion = Backbone.View.extend({
  tagName: 'a',
  className: 'lnk_servicio',
  template: Handlebars.compile($("#resultados-empresa-sucursal-listado-template").html()),
  attributes: { href: '#' },
  initialize: function () {
  },
  events:{
    "mousedown ": "seleccionado",
  },
  render: function () {
    var descripcion = this.model.toJSON();
    var html = this.template(descripcion);
    this.$el.html(html);
    //Personal.app.EmpresaMapa.mostrarMapa(this.model.get("latitud"),this.model.get("longitud"));
    
    if (!$('#bloque_mapa_sucursal').is(':visible')) {   
        $("#bloque_mapa_sucursal").show();
        Personal.app.EmpresaMapa.mostrarMapa(this.model.get("latitud"),this.model.get("longitud"));
    }  
        Personal.app.EmpresaMapa.marcar(this.model.get("latitud"),this.model.get("longitud"));

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
    Personal.app.EmpresaMapa.posicionar(this.model.get("latitud"),this.model.get("longitud"));
    
   // console.log(this.model.get('nombre'));
   // Personal.app.navigate("Personal/buscar/" + this.model.get('matricula'), {trigger: true});
  }
});



