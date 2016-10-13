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
  el: $('#uniforme_periodo_detalle_mostrar'),
  className: 'ul_bloque',
  tagName: 'ul',
  template: Plantilla,

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


      self = this
      this.UniformeBasicoModelo = new Uniforme();
      this.UniformeBasicoModelo.personal = this.model.id;
      this.UniformeBasicoModelo.anio = anio;
      this.UniformeBasicoModelo.periodo = periodo;
       
      this.UniformeBasicoModelo.fetch({headers: {'Authorization' :localStorage.token},
         success: function(data){
            var obs = data.toJSON()[0].observaciones;
             $("#uniformes_observaciones").text(obs);
         } ,
         error: function(a,err){

         },
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
     ;
      var vis = new PersonalCatalogosVista({
        collection: cat,cdu_seleccionado:cdu_seleccion,id_select: id_selector });
      vis.render();

},
 });

