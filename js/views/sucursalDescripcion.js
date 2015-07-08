var Backbone              = require('backbone'),
    $                     = require('jquery'),
    Sucursal              = require('../models/sucursal'),
    SucursalDetalleVista  = require('../views/sucursalDetalle'),
    PersonalSucursal      = require('../models/personal_sucursal'),
    Plantilla             = require('../templates/resultados-empresa-sucursal-listado.hbs'),
    app                   = Backbone.app;

//Personal.Views.SucursalDescripcion
module.exports = Backbone.View.extend({
  tagName: 'a',
  className: 'lnk_servicio',
  template: Plantilla,
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
        Backbone.app.EmpresaMapa.mostrarMapa(this.model.get("latitud"),this.model.get("longitud"));
    }  
    if(this.model.get("id")!=="-1"){
        Backbone.app.EmpresaMapa.marcar(this.model.get("id"),this.model.get("latitud"),this.model.get("longitud"));
    }
    return this;
  },
  seleccionado: function(){
    window.Personal.menu="sucursal";
    $('#bloque_empresa').hide();
    $('#bloque_sucursal').show();
 
    if(this.model.get("id")==="-1"){
      this.SucursalDetalle = new SucursalDetalleVista({model: this.model});
      this.SucursalDetalle.llenado();
      Backbone.app.EmpresaMapa.posicionar(this.model.get("latitud"),this.model.get("longitud"));
    }
    else{  
      this.SucursalModelo = new Sucursal();
      this.SucursalModelo.pk = this.model.get("id");
      this.SucursalDetalle = new SucursalDetalleVista({model: this.SucursalModelo});
      this.SucursalModelo.fetch();
      Backbone.app.EmpresaMapa.posicionar(this.model.get("latitud"),this.model.get("longitud"));
    }
  }
});



