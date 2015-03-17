Personal.Views.SucursalDetalle = Backbone.View.extend({
  events : {
     "change #sucursal_estado": function(){ this.llenadoComboDependiente(this.catMunicipio,'15', $( "#sucursal_estado").val(),'',"#sucursal_municipio");},
   },

  el: $('#bloque_sucursal'),
  className: 'ul_bloque',
  tagName: 'ul',
  template: Handlebars.compile($("#sucursal-detalle-template").html()),

  initialize: function () {
    this.catMunicipio = new Personal.Collections.Catalogos();  
    this.listenTo(this.model, "change", this.llenado, this);
  },
  reset: function()
  {
    console.log("valores por defecto");
  },
  llenado: function(){
    console.log("llenando el formulario");
  //  if(this.model.get("id")!=="-1"){
      this.render();
   // }
  }, 
  render: function () {
   console.log("buscando en el render");
   var detalle = this.model.toJSON();
   var html = this.template(detalle);
   this.$el.html(html);


   var self = this;   
   $("#sucursal_fecha_alta, #sucursal_fecha_baja").datepicker({dateFormat:"dd/mm/yy"});
 

    var SucursalCatalogos = new Personal.Collections.Catalogos();
    SucursalCatalogos.claves ="14,24";
  
    SucursalCatalogos.fetch(
      {
        success: function(){
          
          self.llenadoCatalogosCombo(SucursalCatalogos.Estados(),detalle["cdu_estado"],"#sucursal_estado");

          self.llenadoCatalogosCombo(SucursalCatalogos.Estatus(),detalle["cdu_estatus"],"#sucursal_estatus");
        }
          
    });


          this.llenadoComboDependiente(this.catMunicipio,'15', detalle["cdu_estado"],detalle["cdu_municipio"],"#sucursal_municipio");

    },
    llenadoCatalogosCombo: function(catalogo,cdu_seleccion,id_selector){
          var cat = new Backbone.Collection(catalogo);
          var vis = new Personal.Views.PersonalCatalogos({
            collection: cat,cdu_seleccionado:cdu_seleccion,id_select: id_selector });
          vis.render();

    },
   llenadoComboDependiente: function(catalogo,id_catalogo,cdu_default,cdu_seleccion,id_selector){
      catalogo.claves = id_catalogo;
      catalogo.cdu_default = cdu_default;
      var cat = catalogo;
      catalogo.fetch({
              success: function(){
                  var vista = new Personal.Views.PersonalCatalogos({
                   collection: cat,cdu_seleccionado: cdu_seleccion ,id_select: id_selector });
                  vista.render();
                }
            });
    //  this.mostrarSucursalLista(this.model.get("id"));
    //this.mostrarMapa(this.model.get("latitud"),this.model.get("longitud"));
   },
relacionColumnas: function(){
      var columnasCampos ={
     		"id": "#sucursal_id",
				"cve_empresa": "#empresa_id",
				"cve_sucursal": "#sucursal_cve_sucursal",
        "nombre": "#sucursal_nombre",
				"calle": "#sucursal_calle",
				"numero": "#sucursal_numero",
				"colonia": "#sucursal_colonia",
				"cp": "#sucursal_cp",
				"cdu_estado": "#sucursal_estado",
				"cdu_municipio": "#sucursal_municipio",
				"ciudad": "#sucursal_ciudad",
				"telefono": "#sucursal_telefono",
				"cdu_estatus": "#sucursal_estatus",
				"fecha_alta":"#sucursal_fecha_alta",
        "fecha_baja":"#sucursal_fecha_alta",
           };
      return columnasCampos;
},
generarJSON: function(){
      var data ={};
      var relacion =this.relacionColumnas();
      for(var campo in relacion)
      {
        if (relacion.hasOwnProperty(campo))
        {
           var elemento  =$(relacion[campo]).get(0).tagName;
           var tipo = $(relacion[campo]).get(0).type;
           var id_control = relacion[campo];

           if (elemento === "LABEL"){
              data[campo] = $(id_control).text();
           }      
           else if (elemento === "INPUT" || elemento==='TEXTAREA' || elemento==="SELECT"){
              if(tipo=='radio'){
                 data[campo] = $(id_control).get(0).checked
              }
              else{
                 data[campo] = $(id_control).val();
              }
           }      
        }
      }
      return data;
   },
});

