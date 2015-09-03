var Backbone              = require('backbone'),
    $                     = require('jquery'),
    Catalogo              = require('../models/catalogoLista'),
    Plantilla             = require('../templates/catalogos-basico.hbs'),
    app                   = Backbone.app;

//Personal.Views.SucursalDescripcion
module.exports = Backbone.View.extend({
  tagName: 'a',
  className: 'lnk_catalogo',
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
    this.$el.html(html);
    return this;
  },
  seleccionado: function(){
    Backbone.app.CatalogosDet.claves=this.model.id;
    Backbone.app.CatalogosDet.reset()
    Backbone.app.CatalogosDet.add({id:"",descripcion1:"a",descripcion2:"b",monto1:"1.0",monto2:"2.0",ico: "fa-check",clase:"guardar_renglon"});
    Backbone.app.CatalogosDet.fetch();
    var titulo = '<tr><td>Descripción 1</td><td>Descripción 2</td> <td>Monto 1</td><td>Monto 2</td><td></td></tr>';
    //var editable ='<tr><td contenteditable="true"></td><td contenteditable="true"></td><td contenteditable="true"></td><td contenteditable="true"></td><td><a class="guardar_renglon" href="#"><i class="fa fa-check fa-2x"></i></a></td></tr>' 
   // $('#catalogo_detalle_lista').prepend(editable);
    $('#catalogo_detalle_lista').prepend(titulo);
  }
});



