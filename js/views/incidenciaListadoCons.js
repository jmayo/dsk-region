var $ = require("jquery");
require("jquery-ui-browserify");
var Backbone                = require('backbone'),
    _                  = require('underscore');

module.exports = Backbone.View.extend({
  el: $('#personal_consulta_incidencias_lista'),
  tagName: "tr",
  template     : null, 
  initialize: function () {
    $("#incidencia_fecha_ini, #incidencia_fecha_fin").datepicker({dateFormat:"dd/mm/yy"});
   //this.listenTo(this.collection, "add", this.render, this);
        
    this.listenTo(this.collection, "sort", this.llenado, this);
    this.listenTo(this.collection, "reset", this.limpiarTodo, this);
  },
  llenado: function(){
    this.collection.forEach(this.render, this);
  },
  render: function (tarea) {  
    var idFecha = tarea.get('fecha').replace(/[^\w\s]/gi, '');

    var idTablaEmpleados = 'tabincideperso_fecha' + idFecha;
    fecha = tarea.get('fecha');
    //var fecha =  new Date(tarea.get('fecha'));
    //fecha = fecha.toLocaleFormat('%d/%m/%Y');
    
    fecha = fecha.substring(8) + '/' +  fecha.substring(5,7) + '/' +  fecha.substring(0,4);

    var tituloFecha ="titulo_fecha_incide" + idFecha;
    var tituloFechaServicio = tituloFecha + "_" + tarea.get('id_sucursal');
    var tituloFechaServicioPersona = tituloFechaServicio + "_" + tarea.get('matricula');
     if($("#cabecero_listado_incidencias").length === 0){
        $(this.el).append('<tr id="cabecero_listado_incidencias"><td>Faltas/Cubrefaltas</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    }

    if($("#" + tituloFecha).length === 0){
       $(this.el).append('<div id='+ tituloFecha +'></div>')
       var datosFecha  = '<tr><td>' + fecha + '</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
        $("#" + tituloFecha).append(datosFecha);

        //$("#" + tituloFecha).prepend('<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
      
    }

    if(this.$("#" + tituloFechaServicio).length === 0){ 
        $("#" + tituloFecha).append('<div id='+ tituloFechaServicio +'></div>')
        
      //  var titulofaltacb ='<tr><td></td><td></td><td>Falta</td><td></td><td></td><td>Cubrefalta</td><td></td><td></td></tr>';
        var datosServicio  = '<tr><td></td><td>'+ tarea.get('sucursal') +'</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';   
        $("#" + tituloFechaServicio).append(datosServicio);
     }
    
   if(this.$("#" + tituloFechaServicioPersona).length === 0){ 
        
      //  var titulofaltacb ='<tr><td></td><td></td><td>Falta</td><td></td><td></td><td>Cubrefalta</td><td></td><td></td></tr>';
        var nombre = tarea.get('paterno') + ' ' + tarea.get('materno') + ' ' + tarea.get('nombre');
        var matricula = "(" + tarea.get('matricula') + ") ";
        var puesto = tarea.get('puesto');
        var incidencia = tarea.get('incidencia') 
        var datosPersona  = '<tr id='+tituloFechaServicioPersona+' ><td></td><td>'+ incidencia +'</td><td>'+  matricula +nombre+'</td><td>'+ puesto+'</td><td></td><td></td><td></td><td></td></tr>';   
        $("#" + tituloFechaServicio).append(datosPersona);
     }
  


   },
  limpiarTodo:function(){
    console.log("limpiando resultados");
     this.$el.empty();
  },  
});
