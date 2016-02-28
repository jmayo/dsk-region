var Backbone                = require('backbone'),
    $                       = require('jquery'),
   jQuery                  = require('jquery'),  
    Plantilla               = require('../templates/incidencias-personal.hbs'),
    app                     = Backbone.app,
    Calendario              = require('../calendarioComp'); 
   
    // CalendarPick = require('../jquery.calendarPicker'),
    // jQueryMouseWheel = require('../jquery.mousewheel'),
    // Calendario = require('../calendario');

//Personal.Views.EmpresaDetalle 
module.exports = Backbone.View.extend({

  el: $('#incidencias_personal'),
 // className: 'ul_bloque',
  tagName: 'article',
  template: Plantilla,

  render: function () {
   console.log("buscando en el render de incidencias");
   var html = this.template();
   this.$el.html(html);
   Calendario.initialize();

  },

});

