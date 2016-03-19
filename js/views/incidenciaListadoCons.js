var Backbone                = require('backbone'),
    $                     = require('jquery')
  //  SucursalDescripcionVista = require('../views/sucursalDescripcion');


//Personal.Views.SucursalListados 
module.exports = Backbone.View.extend({
  events : {
     "mousedown .incidencia_fecha_ini": "cambioFecha",
     "mousedown #incidencia_fecha_fin": "cambioFecha",
   },
  el: $('#personal_consulta_incidencias_lista'),
 // template: Handlebars.compile($("#resultados-empresa-sucursal-listado-template").html()),

  initialize: function () {
    $("#incidencia_fecha_ini, #incidencia_fecha_fin").datepicker({dateFormat:"dd/mm/yy"});
   this.listenTo(this.collection, "add", this.render, this);
    //this.listenTo(this.collection, "changed", this.render, this);
    this.listenTo(this.collection, "reset", this.limpiarTodo, this);
  },
  cambioFecha: function(){
    console.log("cambio la fecha");
  },
  render: function (tarea) {    
    console.log(tarea.toJSON())
    var idFecha = tarea.get('fecha').replace(/[^\w\s]/gi, '');
    var idTablaEmpleados = 'tabincideperso_fecha' + idFecha;

    if($("#titulo_fecha_incide").length === 0){
        var tituloFecha  = '<tr id=titulo_fecha_incide><td>Fecha</td><td></td></tr>'
        this.$el.append(tituloFecha);
    }
    if( $("#incidencia" + idFecha).length === 0) {
       var datosFecha   = '<tr id=incidencia' + idFecha + '><td contenteditable=true>'+ tarea.get('fecha')+ '</td></tr>';
       this.$el.append(datosFecha);
       //this.$el.attr('id', el_id_empresa).addClass('tabla_titulo_empresa').append('<br/> <h3>' + this.model.get('id_sucursal__cve_empresa__razon_social') +'</h3>');
    }
    if( $("#tabincideperso_fecha" + idFecha ).length === 0 && $("#incidencia" + idFecha).length>0) {
        var tituloTablaEmpleados= '<td><table id=' + idTablaEmpleados + ' class="tabla_empleados_sucursal"><tr><td>Id Empleado</td><td>Nombre(s)</td><td>Incidencia</td></tr></table></td>';
        this.$("#incidencia" + idFecha).append(tituloTablaEmpleados);
    }
     if( $("#" + idTablaEmpleados).length > 0) {
         var datosPersona = tarea.get('id_personal');
         var nombreCompleto =datosPersona.paterno + ' ' + datosPersona.materno + ' ' + datosPersona.nombre
         var matricula = datosPersona.matricula
         var incidencia =tarea.get('cdu_concepto_incidencia');
         var tipo_incide = incidencia.descripcion1;

         var datosPersonas = '<tr><td contenteditable=true>'+ matricula +'</td><td contenteditable=true>'+ nombreCompleto +'</td><td contenteditable=true>' + tipo_incide +'</td></tr>';
         this.$("#"+ idTablaEmpleados).append(datosPersonas);
     }
    
   // this.addOne(tarea);

   //<tr>
    //          <td contenteditable='true'>12/12/2015</td>
  },
  addOne: function (incidencia) {
    // console.log(incidencia.toJSON());
     
    //this.DescripcionView = new SucursalDescripcionVista({ model: sucursal }); 
    //7if(sucursal.get("id")==="-1"){
    //  this.$el.prepend(this.DescripcionView.render().el);  
    //}
    //else{
    //  this.$el.append(this.DescripcionView.render().el);
   // }
  },
   limpiarTodo:function(){
    console.log("limpiando resultados");
     this.$el.empty();
  },
  // render: function () {
  //   console.log("haciendo el render");
  //  var detalle = this.model.toJSON();
  //  var html = this.template(detalle);
  //  var el_id_empresa="reporte_empresa_cve_" + detalle.id_sucursal__cve_empresa;
  //  var el_id_sucursal="reporte_sucursal_cve_" + detalle.id_sucursal__id;
  //  var tabla_sucursal ="tabla_sucursal_cve_" + detalle.id_sucursal__id;
  //  var el_id_empleado="reporte_empleado_cve_" + detalle.id_personal__matricula;
  
  //   if( $("#" + el_id_empresa).length === 0) {
  //       this.$el.attr('id', el_id_empresa).addClass('tabla_titulo_empresa').append('<br/> <h3>' + this.model.get('id_sucursal__cve_empresa__razon_social') +'</h3>');
  //       return this;
  //   }
  
  //  if( $("#" + el_id_sucursal).length === 0)  {
  //      var html_tabla_sucursal ='<div id="'+ el_id_sucursal + '" class="lista_empleados_sucursal"><table class="tabla_empleados_sucursal" id="' + tabla_sucursal + '"><tr><td>Mat</td><td>Nombre(s)</td><td>Puesto</td><td>Motivo</td></tr></table></div>'
  //     $("#" + el_id_empresa).append('<h4>' + this.model.get('id_sucursal__nombre') + '</h4> ' + html_tabla_sucursal );
  //     return this;
  //  }

  // if ( ($("#" + el_id_empleado).length == 0 )  && ($("#" + tabla_sucursal).length > 0 ))  {
  //   var cve_empl= this.model.get('id_personal__matricula');
  //   var nombre =this.model.get('id_personal__paterno') + ' ' + this.model.get('id_personal__materno') +' '+ this.model.get('id_personal__nombre');
  //   var puesto =this.model.get('cdu_puesto__descripcion1') + ' ' + this.model.get('cdu_rango__descripcion1') + ' ' + this.model.get('cdu_turno__descripcion1');
  //   var motivoAsignacion =this.model.get('cdu_motivo__descripcion1'); 
  //     $("#" + tabla_sucursal).append('<tr id="' +  el_id_empleado +'"> <td contenteditable="true">' + cve_empl + '</td> <td contenteditable="true">' + nombre +'</td><td contenteditable="true">' + puesto +'</td> <td contenteditable="true">' + motivoAsignacion +'</td></tr>')
  //     return this; 
  // }


  //  return this


  // },
  
});
