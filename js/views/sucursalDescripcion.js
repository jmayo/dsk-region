Personal.Views.SucursalDescripcion = Backbone.View.extend({
  tagName: 'a',
  className: 'lnk_servicio',
  template: Handlebars.compile($("#resultados-empresa-sucursal-listado-template").html()),
  attributes: { href: '#' },
  initialize: function () {
     this.listenTo(this.model, "change", this.render, this);
  },
  events:{
    "mousedown ": "seleccionado",
  },
  render: function () {
    var descripcion = this.model.toJSON();
    var html = this.template(descripcion);
    if(this.model.get("id")==="-1"){
      html = html + '<div class="agregar_servicio"><a href="#"></a></div>';
    }
    this.$el.html(html);
    //Personal.app.EmpresaMapa.mostrarMapa(this.model.get("latitud"),this.model.get("longitud"));
    
    if (!$('#bloque_mapa_sucursal').is(':visible')) {   
        $("#bloque_mapa_sucursal").show();
        Personal.app.EmpresaMapa.mostrarMapa(this.model.get("latitud"),this.model.get("longitud"));
    }  
    if(this.model.get("id")!=="-1"){
        Personal.app.EmpresaMapa.marcar(this.model.get("id"),this.model.get("latitud"),this.model.get("longitud"));
    }
    return this;
  },
  seleccionado: function(){
    window.Personal.menu="sucursal";
    $('#bloque_empresa').hide();
    $('#bloque_sucursal').show();
 
    if(this.model.get("id")==="-1"){
      this.SucursalDetalle = new Personal.Views.SucursalDetalle({model: this.model});
      this.SucursalDetalle.llenado();
      Personal.app.EmpresaMapa.posicionar(this.model.get("latitud"),this.model.get("longitud"));
    }
    else{  
      this.SucursalModelo = new Personal.Models.sucursal();
      this.SucursalModelo.pk = this.model.get("id");
      this.SucursalDetalle = new Personal.Views.SucursalDetalle({model: this.SucursalModelo});
      this.SucursalModelo.fetch();
      Personal.app.EmpresaMapa.posicionar(this.model.get("latitud"),this.model.get("longitud"));
    }
  }
});



