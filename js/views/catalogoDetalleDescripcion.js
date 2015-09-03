var Backbone              = require('backbone'),
    $                     = require('jquery'),
    Plantilla             = require('../templates/catalogos-detalle.hbs'),
    app                   = Backbone.app;

//Personal.Views.SucursalDescripcion
module.exports = Backbone.View.extend({
  tagName: 'tr',
  className: '',
  template: Plantilla,
  initialize: function () {
     this.listenTo(this.model, "change", this.render, this);
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
    // Backbone.app.menu="sucursal";
    // $('#bloque_empresa').hide();
    // $('#bloque_sucursal').show();
 
    // if(this.model.get("id")==="-1"){
    //   var a= Backbone.app.EmpresaModelo.toJSON();
    //   this.model.set({"nombre": a.razon_social,"calle":a.calle,"numero":a.numero,"colonia":a.colonia,  "cp":a.cp, "cdu_estado":a.cdu_estado,"cdu_municipio":a.cdu_municipio ,"telefono": "telefono1"});
    
    //   this.SucursalDetalle = new SucursalDetalleVista({model: this.model});
    //   this.SucursalDetalle.llenado();
    //   Backbone.app.EmpresaMapa.posicionar(this.model.get("latitud"),this.model.get("longitud"));
    // }
    // else{  
    //   this.SucursalModelo = new Sucursal();
    //   this.SucursalModelo.pk = this.model.get("id");
    //   this.SucursalDetalle = new SucursalDetalleVista({model: this.SucursalModelo});
    //   this.SucursalModelo.fetch({ headers: {'Authorization' :localStorage.token}});
    //   Backbone.app.EmpresaMapa.posicionar(this.model.get("latitud"),this.model.get("longitud"));
    // }
  }
});



