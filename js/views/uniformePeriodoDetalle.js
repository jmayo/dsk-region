var Backbone                = require('backbone'),
    funcionGenerica         = require('../funcionesGenericas'),
    PersonalCatalogosVista  = require('../views/personalCatalogos'),
    $                       = require('jquery');
    $.ui                    = require('jquery-ui'),
    Catalogos               = require('../collections/catalogos'),
    Plantilla               = require('../templates/uniformes-detalle-periodo.hbs'),
    Uniforme                = require('../models/uniformes'),
    app                     = Backbone.app;

//Personal.Views.EmpresaDetalle 
module.exports = Backbone.View.extend({
  events : {
     "change #uniforme_anio": function(){ this.cambioConsulta()},
     "change #uniforme_periodo": function(){this.cambioPeriodo()},

  },
  el: $('#uniforme_periodo_detalle_mostrar'),
  className: 'ul_bloque',
  tagName: 'ul',
  template: Plantilla,
  cambioConsulta: function(){
    console.log("Cambio el año")
  },
 cambioPeriodo: function(){
    console.log("Cambio el periodo")
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
   
    this.limpiarCajas();
    this.llenarCatalogoUniformes();
 },
 limpiarCajas: function(){
    var fecha_actual = new Date();
    var anio = fecha_actual.getFullYear();
    var mes = fecha_actual.getMonth()
    var periodo = mes <6 ? 1 : 2; 
    anios_lista = this.llenarLista(2010,anio);
    this.crearColeccion("#uniforme_anio",anios_lista);

    periodos_lista = this.llenarLista(1,2);
    this.crearColeccion("#uniforme_periodo",periodos_lista);
     
     
    $("#uniforme_anio").val(anio).change();
    $("#uniforme_periodo").val(periodo).change();
    var fecha_actual = new  funcionGenerica().fechaActual();
    $("#uniforme_fecha_entrega").val(fecha_actual);
    $("#uniformes_observaciones").text("");
 },
marcarUniformesDetalles: function(){
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
                self.limpiarCajas();
            }
            else{
                var obs = data.toJSON()[0].observaciones;
                var fecha = data.toJSON()[0].fecha;
                 $("#uniforme_fecha_entrega").val(fecha);
                $("#uniformes_observaciones").text(obs);
                self.marcarGenerico(data.toJSON()[0].detalle_uniforme,true,'cdu_concepto_uniforme');              
            }
         } ,
         error: function(a,err){

         },
       });
},
 marcarGenerico: function(datos,checar,nom_columna){
     for(indice in datos){
       idCheck = "#" + datos[indice][nom_columna];
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
            var elemento ='<input class=inputs_checkbox type=checkbox name=' + udc_catalogo + ' id=' + udc_catalogo + ' value=' + udc_catalogo + '><span>' + descripcion1 + '</span>';
            $(lista_unif).append(elemento);            
          }

          self.marcarUniformesDetalles()
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
 });

