var Backbone                = require('backbone'),
    funcionGenerica         = require('../funcionesGenericas'),
    PersonalCatalogosVista  = require('../views/personalCatalogos'),
    $                       = require('jquery');
    $.ui                    = require('jquery-ui'),
    Catalogos               = require('../collections/catalogos'),
    Plantilla               = require('../templates/uniformes-detalle-periodo.hbs'),
    Uniforme                = require('../models/uniformes'),
    PersonalAsignacion      = require('../models/personal_sucursal'),
    
    generarPDF              = require('../librerias/generarPDF.js'),
    app                     = Backbone.app;

//Personal.Views.EmpresaDetalle 
module.exports = Backbone.View.extend({
  events : {
     "change #uniforme_anio": function(){ this.cambioConsulta()},
     "change #uniforme_periodo": function(){this.cambioConsulta()},
     "change #uniforme_fecha_servicio": function(){this.cambioFechaServicio()},
     "change #uniforme_fecha_entrega": function(){this.cambioFechaEntrega()},
     
     "click #imprimir_uniformes": function(){this.imprimirReporte()}
  },
  cambioFechaEntrega: function(){
      console.log("Cambio fecha de entrega");
      var partes_fecha_entrega = $("#uniforme_fecha_entrega").val().split('/');
      var dia = partes_fecha_entrega[0];
      var mes = partes_fecha_entrega[1];
      var anio = partes_fecha_entrega[2];

      var fecha_entrega = new Date(anio,mes,dia);
      console.log(fecha_entrega);
      //var anio = fecha_actual.getFullYear();
  
      this.BuscarPeriodoUniforme = new Uniforme();
      this.BuscarPeriodoUniforme.clear({silent: true})
      this.UniformeBasicoModelo.mes = mes; 
      this.UniformeBasicoModelo.anio = anio;
      this.UniformeBasicoModelo.buscarPeriodo = true;
    
      this.UniformeBasicoModelo.fetch({headers: {'Authorization' :localStorage.token},
         success: function(data){
            if(Object.keys(data.toJSON()).length===0){
               //$("#esta_entregado").text("");
              // var a=data.toJSON()[0].detalle_uniforme
              // a.length
                //self.limpiarCajas();
            }
            else{
              console.log(data.toJSON());
              var valores = data.toJSON();
              $("#uniforme_anio").val(valores.anio);
              $("#uniforme_periodo").val(valores.periodo).change();
                //var obs = data.toJSON()[0].observaciones;
               
            }
         } ,
         error: function(a,err){
          
         },
       });
  },
  cambioFechaServicio: function(){
    console.log("Cambio la fecha de servicio");
    self = this
    $("#impresion_registro").attr('src', '');
    this.sucursalAsignado();
  },
  sucursalAsignado: function(){
    this.PersoSucursal = new PersonalAsignacion();
    this.PersoSucursal.clear({silent: true})
    this.PersoSucursal.id_personal = this.model.id;
    var partes_fecha_sucursal = $("#uniforme_fecha_servicio").val().split('/');
    this.PersoSucursal.fechaAsignacion = partes_fecha_sucursal[0] + '-' + partes_fecha_sucursal[1] + '-' + partes_fecha_sucursal[2]
    var sucursal_asignado="SIN ASIGNACION"

    this.PersoSucursal.fetch({headers: {'Authorization' :localStorage.token},
       success: function(data){
        if(Object.keys(data.toJSON()).length>0){
           var asig = data.toJSON()[0];
           sucursal_asignado ="(" + asig.id_sucursal.cve_sucursal + ") " + asig.id_sucursal.nombre;
        }
        $("#uniforme_servicio").text(sucursal_asignado);  
       },
       error: function(a,err){
           $("#uniforme_servicio").text(sucursal_asignado)
       },
     });
  },
  imprimirReporte: function(){
    console.log("imprimir reporte de uniforme");
    this.generarPDF();
  },
  el: $('#uniforme_periodo_detalle_mostrar'),
  className: 'ul_bloque',
  tagName: 'ul',
  template: Plantilla,
  cambioConsulta: function(){
    this.limpiarCajas();
    this.marcarUniformesDetalles();
    console.log("Cambio el año")
  },
  initialize: function () { 
    this.listenTo(this.model, "change", this.llenado, this);
  },
  llenado: function(){
    console.log("llenando el formulario de periodo de uniformes detalles");
    Backbone.app.menu="uniformes"
    if(this.model.get("id")!=="-1"){
      this.render();
    }
  }, 
  render: function () {
    var self =this;
    //var detalle = this.model.toJSON();
   var html = this.template();
   this.$el.html(html);
    $("#uniforme_fecha_entrega").datepicker({dateFormat:"dd/mm/yy"});
    $("#uniforme_fecha_servicio").datepicker({dateFormat:"dd/mm/yy"});
   this.catalogoUniformes = [];
   this.limpiarCajas(true);
   this.llenarCatalogoUniformes();  
   
  
   console.log("es el render");
 },
 comboPeriodoAnio: function(){
    var fecha_actual = new Date();
    var anio = fecha_actual.getFullYear();
    var mes = fecha_actual.getMonth()
    var periodo = mes <6 ? 1 : 2; 
    anios_lista = this.llenarLista(2016,anio + 1);
    this.crearColeccion("#uniforme_anio",anios_lista);

    periodos_lista = this.llenarLista(1,2);
    this.crearColeccion("#uniforme_periodo",periodos_lista);
    $("#uniforme_anio").val(anio);
    $("#uniforme_periodo").val(periodo).change();
 },
 limpiarCajas: function(resetear_periodo){     
    $("#impresion_registro").attr('src', '');
    var fecha_actual = new  funcionGenerica().fechaActual(); 
    $("#uniforme_fecha_entrega").val(fecha_actual);
     $("#uniforme_fecha_servicio").val(fecha_actual);
    $("#uniformes_observaciones").val("");
    this.sucursalAsignado();

 },
 desmarcarUniformesDetalles:function(){     
      this.marcarGenerico(this.catalogoUniformes,false,'cdu_catalogo',true);
 },
marcarUniformesDetalles: function(){
      this.desmarcarUniformesDetalles();
      var personal = this.model.id;
      var anio = $("#uniforme_anio").val();
      var periodo = $("#uniforme_periodo").val();
      self = this
      this.UniformeBasicoModelo = new Uniforme();
      this.UniformeBasicoModelo.clear({silent: true})
      this.UniformeBasicoModelo.personal = personal;
      this.UniformeBasicoModelo.anio = anio;
      this.UniformeBasicoModelo.periodo = periodo;
      this.UniformeBasicoModelo.fetch({headers: {'Authorization' :localStorage.token},
         success: function(data){
            if(Object.keys(data.toJSON()).length===0){
               $("#esta_entregado").text("");
              // var a=data.toJSON()[0].detalle_uniforme
              // a.length
                //self.limpiarCajas();
            }
            else{
                var obs = data.toJSON()[0].observaciones;
                var fecha = data.toJSON()[0].fecha;
                 $("#uniforme_fecha_entrega").val(fecha);
               // $("#uniformes_observaciones").text(obs);
                $("#uniformes_observaciones").val(obs);
                $("#esta_entregado").text("ENTREGADO");
                self.marcarGenerico(data.toJSON()[0].detalle_uniforme,true,'cdu_concepto_uniforme');              
            }
         } ,
         error: function(a,err){
          
         },
       });
},
 marcarGenerico: function(datos,checar,nom_columna,formato_json){
     for(indice in datos){
       var columna =datos[indice];
       if(formato_json === true){
        columna = datos[indice].toJSON();
       }
      
       idCheck = "#" + columna[nom_columna];
      var periodo =$("#uniforme_periodo").val();
        var periodo_catalogo = Math.round(columna["monto1"]);
    
        var deshabilitar =  ("monto1" in columna && periodo_catalogo!="0" && periodo_catalogo != periodo);
       if("monto1" in columna){
          var estilo = deshabilitar ? "line-through" : "none";
          $('span#span' + columna[nom_columna]).css("text-decoration", estilo);  
          
          $(idCheck).prop('disabled', deshabilitar);  
        }

        $(idCheck).prop('checked', checar);
        
     }
 },
 llenarCatalogoUniformes: function(){
    var self = this;
    $("#uniforme_lista1").empty();
    var EmpresaCatalogos = new Catalogos();
    EmpresaCatalogos.claves ="31";  
    EmpresaCatalogos.fetch(
      {
        headers: {'Authorization' :localStorage.token},
        success: function(data){

          $("#uniforme_lista1").empty();
          $("#uniforme_lista2").empty();
          var uniformes = data.models; 
          self.catalogoUniformes =uniformes;
          var mitad = Math.round(uniformes.length/2)

          var lista_unif = "#uniforme_lista1";
          var i = 1;
          for(unif in uniformes){
            if(i>mitad){
              lista_unif = "#uniforme_lista2";
            }
            i++;
            var udc_catalogo = uniformes[unif].get("cdu_catalogo");
            var descripcion1 = uniformes[unif].get("descripcion1");
            var elemento ='<input class=inputs_checkbox type=checkbox name=' + udc_catalogo + ' id=' + udc_catalogo + ' value=' + udc_catalogo + '><span id=span' + udc_catalogo +  '>' + descripcion1 + '</span>';
            $(lista_unif).append(elemento);            
          }
          self.comboPeriodoAnio();
           //self.limpiarCajas();
          //self.marcarUniformesDetalles()
        },
        error: function(a,err){
            self.catalogoUniformes = []
            self.limpiarCajas();
         }
    });
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
guardar: function(){
    var data =this.generarJSON();
    var self = this;
    var modelo = new Uniforme(data);
    modelo.operacion ="guardar";

    this.tipo='POST'
   
    modelo.save(null,{
      headers: {'Authorization' :localStorage.token},
        type: self.tipo,
        success: function(modelo,response) {
          self.UniformeBasicoModelo.set(modelo.attributes)
            $("#notify_success").text("La asignacion del uniforme fue guardada correctamente");
            $("#notify_success").notify();
          },
        error: function(model,response, options) {
             $("#notify_error").text(response.responseText);
             $("#notify_error").notify();
              console.log(response.responseText);
        }

    });
  },
  
generarJSON: function(){
      var data ={};
      data["id_personal"] = this.model.id;
      data["fecha"] =  $("#uniforme_fecha_entrega").val();
      data["fecha_servicio"] = $("#uniforme_fecha_servicio").val();
      data["anio"] =  $("#uniforme_anio").val();
      data["periodo"] = $("#uniforme_periodo").val();
      data["observaciones"] = $("#uniformes_observaciones").val();
      data["detalle_uniforme"] = [];
      for(det_uniforme in this.catalogoUniformes)
      {
        var cat= this.catalogoUniformes[det_uniforme].toJSON()["cdu_catalogo"]
        if($("#" + cat).prop("checked")){
          var det = {"cdu_concepto_uniforme": cat}
          data["detalle_uniforme"].push(det);
        }
      }
      return data;
   },
  generarPDF: function(){
      if (Object.keys(this.UniformeBasicoModelo.toJSON()).length>0){
        var generar = new generarPDF();
        generar.matricula = this.model.get('matricula');
        generar.nombre =this.model.get('nombre');
        generar.datos_uniforme = this.UniformeBasicoModelo.toJSON()[0];
        generar.catalogos_uniformes = this.catalogoUniformes;
        generar.servicioActual = $("#uniforme_servicio").text();
        var datos_usuario = Backbone.app.usuario_logueado;
        generar.nombre_usuario =datos_usuario.first_name + ' ' + datos_usuario.last_name;
        generar.generaPDF();
      }
      else{
         $("#notify_info").text("No hay asignacion de uniformes guardada aun para ese periodo");
         $("#notify_info").notify()
      }
        console.log("generando pdf");
  },   
 });

