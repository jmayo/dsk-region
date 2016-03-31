var Backbone                = require('backbone'),
    $                     = require('jquery');

module.exports = Backbone.View.extend({
  el: $('#personal_consulta_incidencias_lista'),
  tagName: "tr",
  template     : null, 
  initialize: function () {
    $("#incidencia_fecha_ini, #incidencia_fecha_fin").datepicker({dateFormat:"dd/mm/yy"});
   this.listenTo(this.collection, "add", this.render, this);
    //this.listenTo(this.collection, "changed", this.render, this);
    this.listenTo(this.collection, "reset", this.limpiarTodo, this);
  },
  render: function (tarea) {    
    console.log(tarea.toJSON())
    var idFecha = tarea.get('fecha').replace(/[^\w\s]/gi, '');

    var idTablaEmpleados = 'tabincideperso_fecha' + idFecha;
    var fecha =  new Date(tarea.get('fecha'));
    fecha = fecha.toLocaleFormat('%d/%m/%Y');
    var tituloFecha ="titulo_fecha_incide" + idFecha;
    var tituloFechaServicio = tituloFecha + "_" + tarea.get('id_sucursal');
    var tituloFechaServicioPersona = tituloFechaServicio + "_" + tarea.get('matricula');

    if($("#" + tituloFecha).length === 0){
       var datosFecha  = '<tr id='+ tituloFecha +'><td>' + fecha + '</td><td></td><</tr>';
        $(this.el).append(datosFecha);
    }
  
    if($("#" + tituloFechaServicio).length === 0){
       var datosServicio  = '<tr id=' + tituloFechaServicio +'><td>'+ tarea.get('sucursal') +'</td><td></td></tr>';
       
        this.$("#" + tituloFecha).append(datosServicio);
    }
    

    var nombre = tarea.get('paterno') + ' ' + tarea.get('materno') + ' ' + tarea.get('nombre'); 
    if($("#" + tituloFechaServicioPersona).length === 0){
       var datosPersona  = '<tr id=' + tituloFechaServicioPersona +'><td>'+ nombre +'</td><td>'+ tarea.get('incidencia') + '</td></tr>';      
       this.$("#" + tituloFechaServicio).append(datosPersona);
    }


    // if($("#titulo_fecha_incide").length === 0){
    //     var tituloFecha  = '<tr id=titulo_fecha_incide><td>Fecha</td><td></td></tr>'
    //     $(this.el).append(tituloFecha);
    // }
    //  if( $("#incidencia" + idFecha).length === 0) {
    //     var datosFecha   = '<tr id=incidencia' + idFecha + '><td contenteditable=false>'+ tarea.get('fecha')+ '</td></tr>';
    //    this.$el.append(datosFecha);
    // }
    // if( $("#tabincideperso_fecha" + idFecha ).length === 0 && $("#incidencia" + idFecha).length>0) {
    //     var tituloTablaEmpleados= '<td><table id=' + idTablaEmpleados + ' class="tabla_empleados_sucursal"><tr><td>Matricula</td><td>Nombre(s)</td><td>Incidencia</td></tr></table></td>';
    //     this.$("#incidencia" + idFecha).append(tituloTablaEmpleados);
    // }
    //  if( $("#" + idTablaEmpleados).length > 0) {
    //      var datosPersona = tarea.get('id_personal');
    //      var nombreCompleto =datosPersona.paterno + ' ' + datosPersona.materno + ' ' + datosPersona.nombre
    //      var matricula = datosPersona.matricula
    //      var incidencia =tarea.get('cdu_concepto_incidencia');
    //      var tipo_incide = incidencia.descripcion1;

    //      var datosPersonas = '<tr><td contenteditable=true>'+ matricula +'</td><td contenteditable=false>'+ nombreCompleto +'</td><td contenteditable=false>' + tipo_incide +'</td></tr>';
    //      this.$("#"+ idTablaEmpleados).append(datosPersonas);
    //  }  
   },
  limpiarTodo:function(){
    console.log("limpiando resultados");
     this.$el.empty();
  },  
});
