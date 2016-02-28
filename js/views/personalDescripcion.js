var Backbone              = require('backbone'),
    $                     = require('jquery'),
    Personal              = require('../models/personal'),
    Plantilla             = require('../templates/personal-en-sucursal.hbs'),
    Plantilla2            = require('../templates/personal-en-sucursal-incidencias.hbs'),
    app                   = Backbone.app;

//Personal.Views.PersonalDescripcion
module.exports = Backbone.View.extend({
  tagName: 'tr',
  //className: 'lnk_servicio',
  template: Plantilla,
  //attributes: { href: '#' },
  initialize: function () {
     this.listenTo(this.model, "change", this.render, this);
  },
  events:{
    "mousedown ": "seleccionado",
  },
  render: function () {
    if(  Backbone.app.menu ==='incidencias'){
      this.template = Plantilla2;
    }
    var descripcion = this.model.toJSON();
    var html = "";
 
    //if(this.model.get("id")!=="-1"){
        html = this.template(descripcion);
    //}
    //else{
      //   html = html + '<div class="agregar_sucursal"><a href="#" title="Agregar sucursal"><i class="fa fa-plus-circle fa-2x"></i></a></div>';    
   // }
    
    this.$el.html(html);
    return this;
  },
  seleccionado: function(){
    //this.model.attributes.id_personal.id
     if(  Backbone.app.menu ==='incidencias'){
        Backbone.app.navigate("Personal/buscar/"+ this.model.get('id_personal').matricula, {trigger: true});
     }
    }
});



