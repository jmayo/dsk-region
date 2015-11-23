var Backbone                = require('backbone'),
    $                       = require('jquery'),
    Plantilla               = require('../templates/personalXEmpresa_empresa.hbs'),
    app                     = Backbone.app;

//Personal.Views.EmpresaDetalle 
module.exports = Backbone.View.extend({

//fa fa-close fa-1x
 // className: 'tabla_titulo_empresa1',
  tagName: 'div',
  template: Plantilla,

  initialize: function () {
   this.listenTo(this.model, "change", this.llenado, this);
  },
  llenado: function(){
    if(this.model.get("id")!=="-1"){
	    this.render();
    }
  }, 
  render: function () {
  	console.log("haciendo el render");
   var detalle = this.model.toJSON();
   var html = this.template(detalle);
   var el_id_empresa="reporte_empresa_cve_" + detalle.id_sucursal__cve_empresa;
   var el_id_sucursal="reporte_sucursal_cve_" + detalle.id_sucursal__id;
   var tabla_sucursal ="tabla_sucursal_cve_" + detalle.id_sucursal__id;
   var el_id_empleado="reporte_empleado_cve_" + detalle.id_personal__matricula;
  
    if( $("#" + el_id_empresa).length === 0) {
   			this.$el.attr('id', el_id_empresa).addClass('tabla_titulo_empresa').append('<br/> <h3>' + this.model.get('id_sucursal__cve_empresa__razon_social') +'</h3>');
   	    return this;
	  }
  
   if( $("#" + el_id_sucursal).length === 0)  {
       var html_tabla_sucursal ='<div id="'+ el_id_sucursal + '" class="lista_empleados_sucursal"><table class="tabla_empleados_sucursal" id="' + tabla_sucursal + '"><tr><td>Mat</td><td>Nombre(s)</td><td>Puesto</td></tr></table></div>'
      $("#" + el_id_empresa).append('<h4>' + this.model.get('id_sucursal__nombre') + '</h4> ' + html_tabla_sucursal );
      return this;
   }

  if ( ($("#" + el_id_empleado).length == 0 )  && ($("#" + tabla_sucursal).length > 0 ))  {
    var cve_empl= this.model.get('id_personal__matricula');
    var nombre =this.model.get('id_personal__paterno') + ' ' + this.model.get('id_personal__materno') +' '+ this.model.get('id_personal__nombre');
    var puesto =this.model.get('cdu_puesto__descripcion1') + ' ' + this.model.get('cdu_rango__descripcion1') + ' ' + this.model.get('cdu_turno__descripcion1');

      $("#" + tabla_sucursal).append('<tr id="' +  el_id_empleado +'"> <td contenteditable="true">' + cve_empl + '</td> <td contenteditable="true">' + nombre +'</td><td contenteditable="true">' + puesto +'</td> </tr>')
      return this; 
  }


   return this


	},
});
