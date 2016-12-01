var Backbone                = require('backbone'),
    funcionGenerica         = require('../funcionesGenericas'),
    PersonalCatalogosVista  = require('../views/personalCatalogos'),
    $                       = require('jquery');
    $.ui                    = require('jquery-ui'),
    Uniformes               = require('../collections/uniformes'),
    Plantilla               = require('../templates/uniformes-reportes-periodo.hbs'),
    app                     = Backbone.app;

//Personal.Views.UniformePeriodoReporte 
module.exports = Backbone.View.extend({
   events : {
      "change #uniforme_anio_reporte": function(){ this.cambioConsulta()},
      "change #uniforme_periodo_reporte": function(){this.cambioConsulta()},
   },
   cambioConsulta: function(){
   	this.llenarReporteUniformes();
   	console.log("Cambio el año")
   },
  el: $('#personal_reporte_uniformes'),
  template: Plantilla,
  render: function () {
    var self =this;
   var html = this.template();
   this.$el.html(html);
   this.comboPeriodoAnio();
 },
 comboPeriodoAnio: function(){
    var fecha_actual = new Date();
    var anio = fecha_actual.getFullYear();
    var mes = fecha_actual.getMonth()
    var periodo = mes <6 ? 1 : 2; 
    anios_lista = this.llenarLista(2016,anio + 1);
    this.crearColeccion("#uniforme_anio_reporte",anios_lista);

    periodos_lista = this.llenarLista(1,2);
    this.crearColeccion("#uniforme_periodo_reporte",periodos_lista);
    $("#uniforme_anio_reporte").val(anio);
    $("#uniforme_periodo_reporte").val(periodo).change();
 },

  llenarReporteUniformes: function(){
	  var self = this;
      var DatosReporte = new Uniformes();
      DatosReporte.anio = $("#uniforme_anio_reporte").val();
      DatosReporte.periodo = $("#uniforme_periodo_reporte").val();;
      DatosReporte.fetch(
       {
          headers: {'Authorization' :localStorage.token},
          success: function(data){
          	console.log(data);
          	var id_tabla='#tabla_uniforme_reporte';
           $(id_tabla).empty();
           var titulos ='<tr><td>Matricula</td><td>Nombre(s)</td><td>Fecha Entrega</td>' +
			'<td>Se entrego</td><td>Sucursal Actual</td><td>Sucursal a la fecha de entrega</td></tr>';
		   $(id_tabla).append(titulos);  

		  	 var datos_rep = data.toJSON()
		  	 
		  	 var con_entrega = datos_rep.filter(function(dat){
		  	 		if(dat.ent==="Si"){
		  	 			return dat;
		  	 		}
		  	 });

 			var sin_entrega = datos_rep.filter(function(dat){
		  	 		if(dat.ent==="No"){
		  	 			return dat;
		  	 		}
		  	 });
			var detalle ='<tr><td>******</td><td>ENTREGADOS******</td><td></td><td></td><td></td><td></td></tr>';
		  	 $(id_tabla).append(detalle); 
		  	 self.llenarReporte(id_tabla,con_entrega);

      		var detalle ='<tr><td>******</td><td>POR ENTREGAR******</td><td></td><td></td><td></td><td></td></tr>';
 			$(id_tabla).append(detalle); 
		  	 self.llenarReporte(id_tabla,sin_entrega);
          
         },
         error: function(a,err){
          }
     });
  },
  llenarReporte: function(id_tabla,reporte){
		for(det in reporte){
      		var listado = reporte[det];
      		var matricula = (listado.matricula === null) ? '' : listado.matricula;
      		var nombre = listado.paterno + ' ' + listado.materno + ' ' + listado.nombre;
      		var fecha = (listado.fecha === null) ? '' : listado.fecha.slice(8,10) + '/' + listado.fecha.slice(5,7) + '/' + listado.fecha.slice(0,4);
      		var entregado = (listado.entregado === null) ? '' : listado.entregado;
      		var sucursal_actual =  (listado.sucursal === null) ? '' : listado.sucursal;
      		var sucursal_fecha = (listado.sucursal_fecha === null) ? '' :listado.sucursal_fecha;


      		var detalle ='<tr><td >' + matricula +'</td><td >' + nombre+'</td><td >' + fecha +'</td>' +
		'<td >'+ entregado +'</td><td >'+ sucursal_actual+ '</td><td >'+ sucursal_fecha +'</td></tr>';
 			$(id_tabla).append(detalle); 
          	}
  },
 llenarLista: function(inicial,final){
        var datos_lista =[]
        
        for(x=inicial;x<=final;x++){
            datos_dic = {catalogos:x,cdu_catalogo:x,descripcion1:x}
            datos_lista.push(datos_dic);
        }
        return datos_lista;
 },
 crearColeccion: function(id_selector,listaCatalogo){
       var listado =Backbone.Model.extend();
       var listas = Backbone.Collection.extend({  model: listado});
       var listadoFinal = []
       for(cat in listaCatalogo){
          var nuevo_cat = new listado(listaCatalogo[cat]);
          listadoFinal.push(nuevo_cat);
       }
       var miCatalogo = new listas(listadoFinal);  
       this.llenadoCatalogosCombo(miCatalogo.models,"",id_selector);
 },
 llenadoCatalogosCombo: function(catalogo,cdu_seleccion,id_selector){
      var cat = new Backbone.Collection(catalogo);
     
      var vis = new PersonalCatalogosVista({
        collection: cat,cdu_seleccionado:cdu_seleccion,id_select: id_selector });
      vis.render();

},
 });

