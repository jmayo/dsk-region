Personal.Views.EmpresaDetalle = Backbone.View.extend({
  events : {
     "change #empresa_estado": function(){ this.llenadoComboDependiente(this.catMunicipio,'15', $( "#empresa_estado").val(),'',"#empresa_municipio");},
   },

  el: $('#empresa_basicos'),
  className: 'ul_bloque',
  tagName: 'ul',
  template: Handlebars.compile($("#empresa-detalle-template").html()),
  
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
    if(this.model.get("id")!=="-1"){
      this.render();
    }
  }, 
  render: function () {
   console.log("buscando en el render");
   var detalle = this.model.toJSON();
   var html = this.template(detalle);
   this.$el.html(html);
   var self = this;   
   $("#empresa_fecha_alta").datepicker({dateFormat:"dd/mm/yy"});
  

    var EmpresaCatalogos = new Personal.Collections.Catalogos();
    EmpresaCatalogos.claves ="14,19,18";
  
    EmpresaCatalogos.fetch(
      {
        success: function(){
          
          self.llenadoCatalogosCombo(EmpresaCatalogos.Estados(),detalle["cdu_estado"],"#empresa_estado");

          self.llenadoCatalogosCombo(EmpresaCatalogos.Giro(),detalle["cdu_giro"],"#empresa_giro");

          self.llenadoCatalogosCombo(EmpresaCatalogos.Rubro(),detalle["cdu_rubro"],"#empresa_rubro");
        }
          
    });


          this.llenadoComboDependiente(this.catMunicipio,'15', detalle["cdu_estado"],detalle["cdu_municipio"],"#empresa_municipio");

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
   },
relacionColumnas: function(){
      var columnasCampos ={
     		"id": "#empresa_id",
				"cve_empresa": "#empresa_clave",
				"razon_social": "#empresa_razon_social",
				"rfc": "#empresa_rfc",
				"calle": "#empresa_calle",
				"numero": "#empresa_numero",
				"colonia": "#empresa_colonia",
				"cp": "#empresa_cp",
				"cdu_estado": "#empresa_estado",
				"cdu_municipio": "#empresa_municipio",
				"ciudad": "#empresa_ciudad",
				"telefono1": "#empresa_telefono1",
				"telefono2": "#empresa_telefono2",
				"cdu_giro": "#empresa_giro",
				"cdu_rubro": "#empresa_rubro",
				"fecha_alta":"#empresa_fecha_alta",
           };
      return columnasCampos;
   },
guardar: function(){
    var data =this.generarJSON();
    
    var model = new Personal.Models.empresa(data);
    model.valor = undefined;
    model.pk= data["id"];
    
    var tipo='POST'
    if(window.Personal.operacion!=="nuevo"){
      var tipo='PUT';
    }
  
    model.save(null,{type: tipo});
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

