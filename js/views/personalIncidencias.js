var Backbone                = require('backbone'),
    $                       = require('jquery');
    $.ui                    = require('jquery-ui'),
    PlantillaMostrar        = require('../templates/mostrar-caja-incidencia.hbs'),
    PlantillaSeleccionar    = require('../templates/mostrar-seleccion-incidencia.hbs'),
    app                     = Backbone.app,
    Calendario              = require('../calendarioComp'),
    Incidencia              = require('../models/incidencia');
   
    // CalendarPick = require('../jquery.calendarPicker'),
    // jQueryMouseWheel = require('../jquery.mousewheel'),
    // Calendario = require('../calendario');

//Personal.Views.personalIncidencias 
module.exports = Backbone.View.extend({

  el: $('#personal_incidencia_mostrar'),
 // className: 'ul_bloque',
  tagName: 'article',
  template: Plantilla,
  events:{
     'click [type="checkbox"]': 'nuevaIncidencia',
     'click #incidencia-eliminar': 'eliminarIncidencia',
  },
   initialize: function () {
    this.listenTo(this.model, "add", this.render, this);
    this.listenTo(this.model, "change", this.render, this);
    this.listenTo(this.model, "reset", this.limpiar, this);
   // $("#dsel1").datepicker({
    //     onSelect: function(dateText) {
    //        console.log("Selected date: " + dateText + "; input's current value: " + this.value);
    //     }
    // });

  },
  nuevaIncidencia: function(){
      console.log(Backbone.app.PersoCubreIncidenciasBasicoModelo.toJSON());
      if($('#incidencia-seleccion-falta').is( ":checked" )){
        console.log("Es una falta");
        this.nuevo("0300001");
        return;    
      }
      // if($('#incidencia-seleccion-cubrefalta').is( ":checked" )){
      //   console.log("Es una cubrefalta");
      //   this.nuevo("0300002"); 
      //   return;
      // }
  },
  eliminarIncidencia: function(event){    
     var self = this;
     //var incidencia_modelo = new Incidencia(Backbone.app.IncidenciaModelo);
     var incidencia_modelo = new Incidencia({id:self.model.attributes[0].id });
     incidencia_modelo.eliminar = true;
     incidencia_modelo.id = this.model.attributes[0].id;
     incidencia_modelo.destroy({
          headers: {'Authorization' :localStorage.token},
          success: function(model,response) {
            //self.actualizarModelo();
            //self.render();
             self.model.clear();
             $("#notify_success").text("La incidencia se elimino correctamente");
          },
          error: function(model,response, options) {
            $("#notify_error").text(response.responseJSON); 
            console.log("error");
          },
     });
   },  
  render: function () {
   console.log("buscando incidencias para esa fecha");
    
   var detalle = this.model.toJSON();
   //detalle[0].cdu_concepto_incidencia
   //0300001
   if(Object.keys(detalle).length>0){
       this.template = PlantillaMostrar;
       var det1 = detalle[0];
       var id_perso1 = det1.id_personal
       var id_perso2 = 0

       var detalle_incide ={}
       detalle_incide['cdu_incidencia'] = det1['cdu_concepto_incidencia']
       detalle_incide['cubre_o_falta'] = ''
       detalle_incide['titulo'] ="Falta"

       if(Object.keys(detalle).length>1){
          var det2 = detalle[1];
          id_perso2 =det2.id_personal
          if(id_perso2 === this.model.id_personal){
              detalle_incide['cdu_incidencia'] = det2['cdu_concepto_incidencia']
          }
          else{
              detalle_incide['cubre_o_falta'] = det2['id_personal__nombre'] + ' ' + det2['id_personal__paterno'] + ' ' + det2['id_personal__materno']
          }
       }

       if(id_perso1 !== this.model.id_personal){
              detalle_incide['cubre_o_falta'] = det1['id_personal__nombre'] + ' ' + det1['id_personal__paterno'] + ' ' + det1['id_personal__materno']
       }
      

       var html = this.template(detalle_incide);
       this.$el.html(html);
   }
   else
   {
      var detalle_incide ={}
      detalle_incide['titulo'] ="Falta";

     if(Backbone.app.PersoCubreIncidenciasBasicoModelo.id>0){
          detalle_incide['titulo'] ="Falta con Cubrefalta"
       }

      this.template = PlantillaSeleccionar;
      var html = this.template(detalle_incide);
      this.$el.html(html);
   }
     //this.template = PlantillaMostrar;
  },
   limpiarTodo:function(){
     this.$el.empty();
  },
  nuevo: function(cdu_incidencia){
      var nueva_incidenca = new Incidencia();
      nueva_incidenca.cubre = 0;
      if(Backbone.app.PersoCubreIncidenciasBasicoModelo.id>0){
          nueva_incidenca.cubre = Backbone.app.PersoCubreIncidenciasBasicoModelo.id
       }


      var id_perso = this.model.id_personal;
      var nueva_fecha = $("#dsel1")[0].value;
      nueva_fecha = nueva_fecha.replace(/[-]/g,'/');

      nueva_incidenca.set({id_personal: id_perso,
                          cdu_concepto_incidencia: cdu_incidencia,
                          fecha: nueva_fecha,
                          observaciones:""
                        });
      this.guardar(nueva_incidenca);
      console.log(nueva_incidenca.toJSON());
  },
  guardar: function(catalogo){
          var self = this;
          catalogo.nuevo = true;
          console.log("guardando");  
          catalogo.save(null,{
            headers: {'Authorization' :localStorage.token},
            type: 'POST',
            success: function(model,response) {
               self.actualizarModelo();
               $("#notify_success").text("La asignación se guardo correctamente");
            },
             error: function(model,response, options) {
                 $("#notify_error").text(response.responseText);
                 $("#notify_error").notify();
             },
          });
  },
  actualizarModelo: function(){
    var self = this;
    this.model.fetch({headers: {'Authorization' :localStorage.token},reset: true,
                success: function(valor){
                  if( Object.keys(self.model.attributes).length === 0){
                        self.render();
                    }
                },
  });
  },
});