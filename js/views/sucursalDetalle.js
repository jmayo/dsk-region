Personal.Views.SucursalDetalle = Backbone.View.extend({
  events : {
     "change #sucursal_estado": function(){ this.llenadoComboDependiente(this.catMunicipio,'15', $( "#sucursal_estado").val(),'',"#sucursal_municipio");},
   },

  el: $('#bloque_sucursal'),
  className: 'ul_bloque',
  tagName: 'ul',
  template: Handlebars.compile($("#sucursal-detalle-template").html()),

  initialize: function () {
    if(this.model !==undefined){
      this.catMunicipio = new Personal.Collections.Catalogos();  
      this.listenTo(this.model, "change", this.llenado, this);
    }
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
 
   this.agregarValidacion();
   
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
        "latitud":"#sucursal_latitud",
        "longitud":"#sucursal_longitud",        
      };
      return columnasCampos;
},
guardar: function(){
    var data =this.generarJSON();
    var self = this;
    var model = new Personal.Models.sucursal(data);
    //model.valor = undefined;
    model.pk= data["id"];
    this.tipo='POST'
    if(model.get("id")!=="-1"){
      this.tipo='PUT';
    }
   
    model.save(null,{
        type: self.tipo,
        success: function(model,response) {
            $('#sucursal_id').text(model.get("id"));
             Personal.app.SucursalLista.model.set(response.toJSON());
            //window.Personal.operacion="buscar";
            $("#notify_success").notify();
          },
        error: function(model,response, options) {
             $("#notify_error").notify();
              console.log(response.responseText);
             // var responseObj = $.parseJSON(response.responseText);
             // console.log(responseObj);
   //           for(campo in responseObj){ console.log(campo); }
        }

    });
    //CREAETE SEND POST
    // PARA PATCH:
    //model.clear().set({id: 1, a: 1, b: 2, c: 3, d: 4}); 
    //model.save();
    //model.save({b: 2, d: 4}, {patch: true});

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
agregarValidacion: function(){
      var relacion =this.relacionColumnas();
      var suc = new Personal.Models.sucursal();
      var listaVal = suc.validation();
      for(var campo in relacion){
          if (relacion.hasOwnProperty(campo)){
            var id_control = relacion[campo];
            var validacion =listaVal[campo];
            
            if(validacion !== undefined){
                $(id_control).prop('maxlength',validacion['maxlength']);

                $(id_control).prop('pattern',validacion['pattern']); 
                $(id_control).prop('required',validacion['required']);
                var mensaje ="Este campo "
                mensaje += ((validacion['required'] === true) ? 'es obligatorio y ' :'');
                mensaje +=  validacion['title']
                $(id_control).prop('title',mensaje);         
            }
          }
      }
    },
});

