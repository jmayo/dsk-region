var Backbone                = require('backbone'),
    $                       = require('jquery'),
    Plantilla               = require('../templates/empresa-listado-reportes.hbs'),
    app                     = Backbone.app;

//Personal.Views.EmpresaDetalle 
module.exports = Backbone.View.extend({

//fa fa-close fa-1x
  className: 'empresa_scroll',
  tagName: 'div',
  template: Plantilla,

  initialize: function () {
   this.listenTo(this.model, "change", this.llenado, this);
   this.listenTo(this.model, "remove", this.quitarVista, this);
  },
  events:{
    "mousedown .x_empresa": "eliminar",
  },
  eliminar: function(){
    Backbone.app.EmpresaReporte.remove(this.model.get("id"));
  },
  quitarVista: function(){
      console.log("pum me volaron")
      var modeloEmpresas = Backbone.app.PersoActEmpresa.where({id_sucursal__cve_empresa: this.model.id});
      Backbone.app.PersoActEmpresa.remove(modeloEmpresas)
      var el_id_empresa="#reporte_empresa_cve_" + this.model.id;
      $(el_id_empresa).remove();
      this.$el.remove();
  },

  reset: function()
  {
    console.log("valores por defecto");
  },
  llenado: function(){
    console.log("llenando el formulario reportes");
    if(this.model.get("id")!=="-1"){
	    this.render();
    }
  }, 
  render: function () {
   console.log("buscando en el render");
   var detalle = this.model.toJSON();
   var html = this.template(detalle);
   this.$el.html(html);
   
  var id_empresas = this.model.id;
  Backbone.app.PersoActEmpresa.id_empresas = id_empresas;
  Backbone.app.PersoActEmpresa.fetch({headers: {'Authorization' :localStorage.token}});
   
   return this;
	},
});

