var Backbone               = require('backbone'),
    _                       =require('underscore'),
    PersoActEmpresas       = require('../collections/personal_activo_empresas'),
    $                     = require('jquery'),
    SucursalDetalleVista   = require('../views/sucursalDetalle'),
    popup                  = require('../popup');

//Personal.Views.CajaOperaciones 
module.exports = Backbone.View.extend({
     events: {
	   "click .nuevo": "nuevo", 
      "click .guardar": "guardar",
      "click .eliminar": "eliminar",
      "change #incidencia_fecha_ini": "cambioFecha",
      "change #incidencia_fecha_fin": "cambioFecha",
   },
    el: $('.caja_acciones'),

    initialize: function (){
    
   },
   cambioFecha: function(){
    if(Backbone.app.menu==='consulta_incidencias'){
      Backbone.app.cons_incidencias();
      console.log("cambio la fecha");
    }
   },
   nuevo: function(){
      console.log("nuevo registro");
      if(Backbone.app.menu==="personal"){
         Backbone.app.navigate("Personas/nuevo/", {trigger: true, replace: true});
       }
      else if(Backbone.app.menu==="empresa" || Backbone.app.menu==="sucursal"){
         Backbone.app.menu="empresa";
         Backbone.app.navigate("Empresas/nuevo/", {trigger: true, replace: true});
       }
      
   },
   eliminar: function(){
       if(Backbone.app.menu ==="personal"){
          popup.valor = null;
          //popup.operacion = Backbone.app.PersonalDetalle.eliminar;
          //popup.mostrarMensaje();
          //Backbone.app.PersonalDetalle.eliminar();
       }
       if(Backbone.app.menu ==="movimiento"){
          popup.valor = null;
           $("#popup_confirmacion").text("Desea eliminar la asignación");
          popup.operacion = Backbone.app.PersonalMovimiento.eliminar;
          popup.mostrarMensaje();
         // Backbone.app.PersonalMovimiento.eliminar();
       }
        if(Backbone.app.menu ==="sucursal"){
          var suc = new SucursalDetalleVista();
          valor = $('#sucursal_id').text();
           $("#popup_confirmacion").text("Desea eliminar la sucursal");
          popup.valor = valor;
          popup.operacion = suc.eliminar;
          popup.mostrarMensaje();
          //suc.eliminar($('#sucursal_id').text());
       }
   },
  guardar: function(){
    console.log("guardando");
    if(Backbone.app.menu==="personal"){
      Backbone.app.PersonalDetalle.guardar();
      console.log("guardando personal");
    }
    if(Backbone.app.menu==="empresa"){
      Backbone.app.EmpresaDetalle.guardar();
      console.log("guardando personal");
    }
    if(Backbone.app.menu==="sucursal"){
      var sucursal = new SucursalDetalleVista();
      sucursal.guardar();

      console.log("guardando sucursal");
    }
    if(Backbone.app.menu ==="movimiento"){
      Backbone.app.PersonalMovimiento.guardar();
      console.log("guardando movimiento");      
    }
    if(Backbone.app.menu ==="catalogo"){
      Backbone.app.CatalogoDetVista.guardar();
      console.log("catalogos guardados");
    }
    if(Backbone.app.menu =="consulta_incidencias"){
      console.log("vamos a pasar los datos a excell");
      console.log(Backbone.app.Incidencias.toJSON());
      columnas =["fecha","sucursal","incidencia","matricula","paterno","materno","nombre","puesto","datos_cubre"];
      this.JSONToCSVConvertor(Backbone.app.Incidencias.toJSON(), "Mi reporte", true,columnas);
    }
    if(Backbone.app.menu =="uniformes"){
      Backbone.app.UniformeBasico.guardar();
      console.log("guardar uniformes");
     }
  },
  JSONToCSVConvertor: function (JSONData, ReportTitle, ShowLabel,columnas) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = 'sep=;\r\n';    
    //Set Report title in first row or line
    
    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        
        //This loop will extract the label from 1st index of on array
        for(x=0; x<columnas.length; x++){
           row += columnas[x] + ';';
          //row += arrData[0][columnas[x]] + ',';
        }
       

        //for (var index in arrData[0]) {
            
            //Now convert each value to string and comma-seprated
          //  row += index + ',';
        //}

       // row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";

        for(col=0; col<columnas.length; col++){
          valor =  arrData[i][columnas[col]];
          if(typeof valor === 'string'){
             valor = valor.replace(/[\r\n]/g, '')
          }
           row += valor + ';';
         // row += arrData[i][columnas[col]] + ';';
          //row += arrData[i][columnas[col]].replace(/[\r\n]/g, '') + ';';
        }
        
        //2nd loop will extract each column and convert it in string comma-seprated
        //for (var index in arrData[i]) {
          //  row += '"' + arrData[i][index] + '",';
       // }
       console.log(row);
        //row.slice(0, row.length - 1);
        
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    var fileName = "MyReport_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=UTF-8,' + escape(CSV);
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
},

});
