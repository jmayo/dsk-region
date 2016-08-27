var Backbone                = require('backbone'),
    $                       = require('jquery');
    $.ui                    = require('jquery-ui'),
    Sucursal                = require('../models/sucursal'),
    Empresa                 = require('../models/empresa'),  
    Catalogos               = require('../collections/catalogos'),
    PersonalCatalogosVista  = require('../views/personalCatalogos'),
    EmpresaDescripcionVista = require('../views/empresaDescripcion'),
    Plantilla               = require('../templates/empresa-detalle.hbs'),
    app                     = Backbone.app;

//Personal.Views.EmpresaDetalle 
module.exports = Backbone.View.extend({
  events : {
     "change #empresa_estado": function(){ this.llenadoComboDependiente(this.catMunicipio,'15', $( "#empresa_estado").val(),'',"#empresa_municipio");},
     "blur #empresa_clave": function(){this.buscarClaveEmpresa()},

   },

  el: $('#bloque_empresa'),
  className: 'ul_bloque',
  tagName: 'ul',
  template: Plantilla,

  initialize: function () {
    this.EmpresaBusqueda = new Empresa();
    this.catMunicipio = new Catalogos();  
    this.listenTo(this.model, "change", this.llenado, this);
  },
  buscarClaveEmpresa: function(){
    var self = this;
    var cve_empresa =$(this.relacionColumnas().cve_empresa).val();
    var id =$(this.relacionColumnas().id).text();
    this.EmpresaBusqueda.valor = cve_empresa;
    $("#notify_warning").hide();
    this.EmpresaBusqueda.fetch({headers: {'Authorization' :localStorage.token}}).then(
        function () {
            console.log("****");
            console.log(self.EmpresaBusqueda.get('cve_empresa'));
            console.log(id);
            console.log(self.EmpresaBusqueda.get('id'));
            console.log("****");
            //Si hay una cve_empresa y con un id diferente al actual
            if(parseInt(id) !== parseInt(self.EmpresaBusqueda.get('id'))) {
               var razon_social =self.EmpresaBusqueda.get('razon_social');
               $("#notify_warning").text("La clave " + cve_empresa + " ya pertenece a " + razon_social);
               $("#notify_warning").notify();
            }
          });
  },

  reset: function()
  {
    console.log("valores por defecto");
  },
  llenado: function(){
    console.log("llenando el formulario");

    Backbone.app.menu="empresa"
    if(this.model.get("id")!=="-1"){
      this.render();
    }
  }, 
  mostrarDescripcion: function(modelo){
     $("#sucursal_padre").empty();
     this.empresaTitulo = new EmpresaDescripcionVista({model: modelo});
     $('#listado_empresa_sucursal').hide();
     if(modelo.get("id")!==""){
        $("#listado_empresa_sucursal").show();
        $("#sucursal_padre").append(this.empresaTitulo.render().el);
     }
     
   
     $('#bloque_sucursal').empty();
     $('#bloque_sucursal').hide();
     $("#bloque_mapa_sucursal").hide();


  },
  render: function () {
   $('#bloque_sucursal').hide();
   $('#bloque_empresa').show();
   console.log("buscando en el render");
   var detalle = this.model.toJSON();
   var html = this.template(detalle);
   this.$el.html(html);
   this.mostrarDescripcion(this.model);  
  

   var self = this;   
   $("#empresa_fecha_alta").datepicker({dateFormat:"dd/mm/yy"});
   this.agregarValidacion();
   

    var EmpresaCatalogos = new Catalogos();
    EmpresaCatalogos.claves ="14,19,18";
  
    EmpresaCatalogos.fetch(
      {
        headers: {'Authorization' :localStorage.token},
        success: function(){
          
          self.llenadoCatalogosCombo(EmpresaCatalogos.Estados(),detalle["cdu_estado"],"#empresa_estado");

          self.llenadoCatalogosCombo(EmpresaCatalogos.Giro(),detalle["cdu_giro"],"#empresa_giro");

          self.llenadoCatalogosCombo(EmpresaCatalogos.Rubro(),detalle["cdu_rubro"],"#empresa_rubro");
        }
          
    });


    this.llenadoComboDependiente(this.catMunicipio,'15', detalle["cdu_estado"],detalle["cdu_municipio"],"#empresa_municipio");
           
    this.mostrarSucursalLista(this.model.get("id"));
    },
    llenadoCatalogosCombo: function(catalogo,cdu_seleccion,id_selector){
          var cat = new Backbone.Collection(catalogo);
          var vis = new PersonalCatalogosVista({
            collection: cat,cdu_seleccionado:cdu_seleccion,id_select: id_selector });
          vis.render();

    },
   llenadoComboDependiente: function(catalogo,id_catalogo,cdu_default,cdu_seleccion,id_selector){
      catalogo.claves = id_catalogo;
      catalogo.cdu_default = cdu_default;
      var cat = catalogo;
      catalogo.fetch({headers: {'Authorization' :localStorage.token},
              success: function(){
                  var vista = new PersonalCatalogosVista({
                   collection: cat,cdu_seleccionado: cdu_seleccion ,id_select: id_selector });
                  vista.render();
                }
            });
   //   this.mostrarSucursalLista(this.model.get("id"));
     
      },
   mostrarSucursalLista: function(id_empresa){
        Backbone.app.SucursalLista.valor = null;
        Backbone.app.SucursalLista.id_empresa = id_empresa;
        Backbone.app.SucursalLista.reset();
        Backbone.app.SucursalLista.fetch({headers: {'Authorization' :localStorage.token}}).always(function(){
             if(id_empresa!==""){
                // Este modelo sera para crear nuevas sucursales
               var sucursal = new Sucursal();
               sucursal.set(sucursal.defaults);
               sucursal.set({"id":"-1","cve_empresa":id_empresa,"nombre":""});
               Backbone.app.SucursalLista.add(sucursal);
            }
          }
        );
   },
relacionColumnas: function(){
      var columnasCampos ={
     		"id": "#empresa_id",
				"cve_empresa": "#empresa_clave",
				"razon_social": "#empresa_razon_social",
				"rfc": "#empresa_rfc",
				"calle": "#empresa_calle",
				"numero": "#empresa_numero",
        "numero_int": "#empresa_numero_int",
				"colonia": "#empresa_colonia",
				"cp": "#empresa_cp",
				"cdu_estado": "#empresa_estado",
				"cdu_municipio": "#empresa_municipio",
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
     var self = this;
    var modelo = new Empresa(data);
    modelo.valor = undefined;
    modelo.pk= data["id"];
    
    this.tipo='POST'
    if(Backbone.app.operacion!=="nuevo"){
      this.tipo='PUT';
    }
   
    modelo.save(null,{
      headers: {'Authorization' :localStorage.token},
        type: self.tipo,
        success: function(modelo,response) {
            $('#empresa_id').text(modelo.get("id"));
           // self.mostrarDescripcion(modelo);
          //  self.mostrarSucursalLista(modelo.get("id"));
           Backbone.app.operacion="buscar";
            $("#notify_success").notify();
           self.model.set({"id":modelo.get("id"),"cve_empresa":modelo.get("cve_empresa"), "razon_social": modelo.get("razon_social"),
                        "rfc": modelo.get("rfc"),"calle":modelo.get("calle"),"numero":modelo.get("numero"),"numero_int":modelo.get("numero_int"),"colonia":modelo.get("colonia"),
                          "cp":modelo.get("cp"), "cdu_estado":modelo.get("cdu_estado"),"cdu_municipio":modelo.get("cdu_municipio") ,
                          "telefono1": modelo.get("telefono1"), "telefono2": modelo.get("telefono2"), "cdu_giro": modelo.get("cdu_giro"),
                          "cdu_rubro": modelo.get("cdu_rubro"),"fecha_alta": modelo.get("fecha_alta")
                        });
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
      var relacion =this.relacionColumnas();
      for(var campo in relacion)
      {
        if (relacion.hasOwnProperty(campo))
        {
           console.log(campo);
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
      var listaVal = Backbone.app.EmpresaModelo.validation();
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

