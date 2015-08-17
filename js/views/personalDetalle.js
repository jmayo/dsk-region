var Backbone                = require('backbone');
    $                       = require('jquery');
    $.ui                    = require('jquery-ui'),
    Catalogos               = require('../collections/catalogos'),
    PersonalCatalogosVista  = require('../views/personalCatalogos'),
    Personal                = require('../models/personal'),
    Sucursales              = require('../collections/sucursales'),
    PersonalAsignacion      = require('../models/personal_sucursal'),
    Plantilla               = require('../templates/personal-detalle.hbs'),
    DatoBusquedasVista     = require('../views/datoBusquedas'),
    CajaBusquedaVista      = require('../views/cajaBusqueda'),
    PlantillaSucursal      = require('../templates/resultados-sucursal-busqueda.hbs');
    $.ua                    = require('../notificaciones');


//Personal.Views.PersonalDetalle
 module.exports = Backbone.View.extend({
  events : {
     "change #perso_edonac": function(){ this.llenadoComboDependiente(this.catMunicipioNac,'15', $( "#perso_edonac").val(),'',"#perso_mpionac");},
     "change #perso_estado_dom": function(){ this.llenadoComboDependiente(this.catMunicipioDom,'15', $( "#perso_estado_dom").val(),'',"#perso_municipio_dom");},
     'submit form' : 'uploadFile',
     "blur #persona_matricula": function(){this.buscarMatricula()},
  //   'change #imagencontrol':  'mostrarImagen',
   },

  el: $('#personal_basicos'),
  className: 'ul_bloque',
  tagName: 'ul',
  template: Plantilla,

  cambioImagen: function(control){
    console.log("cambio la imagen");
    this.mostrarImagen();
  },
  mostrarImagen: function() {
     var input = $('#imagencontrol').get(0);
     
     if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
       $('#perso_foto').attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
     }
},
    
  initialize: function (options) {
    this.options = options || {};
    this.PersoBusqueda = new Personas();
    this.catMunicipioNac = new Catalogos();
    this.catMunicipioDom = new Catalogos();
    
    this.listenTo(this.model, "change", this.llenado, this);
    this.listenTo(this.options.modelSucursal, "change", this.SeleccionSucursal, this);
  },
  buscarMatricula: function(){
    var self = this;
    var mat =$(this.relacionColumnas()['personal'].matricula).val();
    var id =$(this.relacionColumnas()['personal'].id).text();
    debugger;
    this.PersoBusqueda.valor = mat;
    $("#notify_warning").hide();
    this.PersoBusqueda.fetch({headers: {'Authorization' :localStorage.token}}).then(
        function () {
            console.log("****");
            console.log(self.PersoBusqueda.models[0].get('matricula'));
            console.log(id);
            console.log(self.PersoBusqueda.models[0].get('id'));
            console.log("****");
            //Si hay una matricula y con un id diferente al actual
            if(parseInt(id) !== parseInt(self.PersoBusqueda.models[0].get('id'))) {
               var nombre_completo = self.PersoBusqueda.models[0].get('nombre')  + ' ' + self.PersoBusqueda.models[0].get('paterno') + ' ' + self.PersoBusqueda.models[0].get('materno');
               $("#notify_warning").text("La matricula " + mat + " ya pertenece a " + nombre_completo );
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
    if(this.model.get("id")!=="-1"){
      this.render();
    }
  },
  SeleccionSucursal: function(){
    var detalle = this.options.modelSucursal.toJSON();
    console.log("*** " +detalle.nombre + " ****");
    var clave_sucursal = (detalle.cve_sucursal ==="") ? "" : detalle.cve_sucursal + ", "; 
    $('#id_sucursal_personal').text(detalle.id);
    $('#nombre_sucursal_personal').text(detalle.nombre);
    $('#clave_sucursal_personal').text(clave_sucursal);
    $('#perso_asignacion_puesto').focus();
  },
  render: function () {
   this.$el.empty();
   console.log("buscando en el render");
   var detalle = this.model.toJSON();
   console.log("el id es " + detalle.id)
   var asignacion = new PersonalAsignacion();
   var detalleAsignacion = asignacion.toJSON();
   detalle.cdu_puesto = detalleAsignacion.cdu_puesto;
   detalle.cdu_rango = detalleAsignacion.cdu_rango;
   detalle.cdu_turno = detalleAsignacion.cdu_turno;
   detalle.sueldo = detalleAsignacion.sueldo;
   var html = this.template(detalle);
   this.$el.html(html)
   $('#perso_foto_wait').hide();
   $('#contenedor_foto').hide();
   $('#personal_primera_asignacion').show();
   console.log("aqui es:" +detalle.id)
   if(detalle.id !== ""){
      $('#contenedor_foto').show();   
      $('#personal_primera_asignacion').hide();
   }

  this.Sucursal = new Sucursales();
  this.SucursalMBusquedasVista = new DatoBusquedasVista({collection: this.Sucursal,el: '#resultados_sucursal_persona',template:PlantillaSucursal});
  this.CajaBusquedaSucursal= new CajaBusquedaVista({collection: this.Sucursal,el: '#caja_buscar_sucursal_persona',divResultados: '#resultados_sucursal_persona'});



   var self = this;   
   $("#persona_fec_nac, #persona_fec_alta").datepicker({dateFormat:"dd/mm/yy"});
  
   this.agregarValidacion('personal');
   this.agregarValidacion('asignacion');


    var PersonalCatalogos = new Catalogos();
    PersonalCatalogos.claves ="1,2,14,16,17,18,20,21,26,27,28";
  
    PersonalCatalogos.fetch(
      { headers: {'Authorization' :localStorage.token},
        success: function(){
          
          self.llenadoCatalogosCombo(PersonalCatalogos.Escolaridad(),detalle["cdu_escolaridad"],"#perso_escolaridad");

          self.llenadoCatalogosCombo(PersonalCatalogos.Estados(),detalle["cdu_estado_nac"],"#perso_edonac");
        
          self.llenadoCatalogosCombo(PersonalCatalogos.SeguridadSocial(),detalle["cdu_seguridad_social"],"#perso_segsoc");

          self.llenadoCatalogosCombo(PersonalCatalogos.EstadoCivil(),detalle["cdu_estado_civil"],"#perso_estado_civil");

          self.llenadoCatalogosCombo(PersonalCatalogos.TipoAlta(),detalle["cdu_tipo_alta"],"#perso_tipo_de_alta");

          self.llenadoCatalogosCombo(PersonalCatalogos.TipoEmpleado(),detalle["cdu_tipo_empleado"],"#perso_tipo_de_empleado");

          self.llenadoCatalogosCombo(PersonalCatalogos.Estados(),detalle["cdu_estado_dom"],"#perso_estado_dom");

          //Detalle de la asignacion
          self.llenadoCatalogosCombo(PersonalCatalogos.Puesto(),detalle["cdu_puesto"],"#perso_asignacion_puesto");
          self.llenadoCatalogosCombo(PersonalCatalogos.Rango(),detalle["cdu_rango"],"#perso_asignacion_rango");
          self.llenadoCatalogosCombo(PersonalCatalogos.Turno(),detalle["cdu_turno"],"#perso_asignacion_turno");
        }
          
    });


          this.llenadoComboDependiente(this.catMunicipioNac,'15', detalle["cdu_estado_nac"],detalle["cdu_municipio_nac"],"#perso_mpionac");

          this.llenadoComboDependiente(this.catMunicipioDom,'15', detalle["cdu_estado_dom"],detalle["cdu_municipio_dom"],"#perso_municipio_dom");
          
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
      catalogo.fetch({ headers: {'Authorization' :localStorage.token},
              success: function(){
                  var vista = new PersonalCatalogosVista({
                   collection: cat,cdu_seleccionado: cdu_seleccion ,id_select: id_selector });
                  vista.render();
                }
            });
   },
relacionColumnas: function(){ 
      var columnasCampos ={
        "personal":{
          "calle_dom": '#perso_domicilio', 
          "cdu_escolaridad": '#perso_escolaridad', 
          "cdu_estado_civil" : '#perso_estado_civil',
          "cdu_estado_dom": '#perso_estado_dom', 
          "cdu_estado_nac": '#perso_edonac', 
          "cdu_municipio_dom": '#perso_municipio_dom', 
          "cdu_municipio_nac": '#perso_mpionac', 
          "cdu_seguridad_social": '#perso_segsoc', 
          "cdu_tipo_alta":'#perso_tipo_de_alta' , 
          "cdu_tipo_empleado": '#perso_tipo_de_empleado', 
          "colonia_dom": '#persona_colonia_dom', 
          "condicionada": '#persona_condicionada_1', 
          "condiciones_alta": '#persona_condicion_alta', 
          "cp_dom": '#persona_cp_dom', 
          "cuip": '#persona_cuip', 
          "curp": '#persona_curp', 
          "fec_alta": '#persona_fec_alta', 
          "fec_nacimiento":'#persona_fec_nac', 
          "id":'#persona_id',
          "id_seguridad_social": '#persona_segsocial', 
          "materno":'#persona_materno', 
          "matricula":'#persona_matricula',
          "nombre":'#persona_nombre', 
          "numero_dom": '#persona_numero_dom', 
          "paterno": '#persona_paterno', 
          "portacion": '#persona_portacion_1',
          "rfc": '#persona_rfc', 
        },
      'asignacion':{
          "id_sucursal": '#id_sucursal_personal',
          "cdu_puesto": '#perso_asignacion_puesto', 
          "cdu_rango": '#perso_asignacion_rango',
          "cdu_turno": '#perso_asignacion_turno',
          "sueldo": '#perso_asignacion_sueldo',
        }
      };

console.log(columnasCampos)

console.log(columnasCampos.personal)
console.log(columnasCampos.asignacion)

      return columnasCampos;
   },

eliminar: function(){
    console.log("Eliminar esta asignacion");
},
guardar: function(){
  var datos_personal =this.generarJSON("personal");
  var asignacion =this.generarJSON("asignacion");
  //var asignacion = {"id_sucursal":datos_personal.id_sucursal, "cdu_turno":datos_personal.cdu_turno, "cdu_puesto": datos_personal.cdu_puesto,"cdu_rango": datos_personal.cdu_rango,"sueldo":datos_personal.sueldo }
   var data = {"personal": [datos_personal],"asignacion":[asignacion]}
    var self = this;

   if( Backbone.app.operacion==="nuevo" && ($('#id_sucursal_personal').text()==="" || $('#id_sucursal_personal').text()==="0" )){
       $("#notify_error").text("no has seleccionado una sucursal donde sera asignado")
       $("#notify_error").notify();
        console.log(response.responseText);
     return;
  }

    //delete data["sueldo"] 
    var model = new Personal(data);
    model.valor = undefined;
    model.pk= data.personal[0].id; //data["id"];
    this.tipo='POST'
    if(Backbone.app.operacion!=="nuevo"){
        this.tipo='PUT';
    }
 
    model.save(null,{
        headers: {'Authorization' :localStorage.token},
        type: self.tipo,
        success: function(model,response) {
            $('#persona_id').text(model.get("id"));
           Backbone.app.operacion="buscar";
            $("#notify_success").text("Los datos fueron guardados correctamente");
            $("#notify_success").notify();
            $('#contenedor_foto').show();   
            $('#personal_primera_asignacion').hide();
          },
        error: function(model,response, options) {
             $("#notify_error").text(response.responseText);
             $("#notify_error").notify();
              console.log(response.responseText);
             // var responseObj = $.parseJSON(response.responseText);
             // console.log(responseObj);
   //           for(campo in responseObj){ console.log(campo); }
        }

    });

},
  
generarJSON: function(nodo){
      var data ={};
      var relacion =this.relacionColumnas()[nodo];
      for(var campo in relacion)
      {
        if(campo==="id_sucursal"){
            console.log(campo);
          }
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
 agregarValidacion: function(nodo){
      var relacion =this.relacionColumnas()[nodo];
      var listaVal = Backbone.app.PersoModelo.validation();
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

uploadFile: function(event) {
    event.preventDefault();
    $('#perso_foto_wait').show();
    var self = this;
    var id =$("#persona_id").text();;
    var x = document.getElementById("imagencontrol");
    if (!x) {
    return;
  }

  if (!x.name) {
    console.log('Trying to upload an invalid file');
    return;
  }

    var file =x.files[0]
    //var file=$("#imagencontrol")[0].files[0]
    var data = new FormData();

    data.append('imagen', file);
    //'http://192.168.122.1:8000/subirf/'
    $.ajax(window.ruta + 'personal/subir_imagen/' + id + '/', {
        type:'POST',
        data: data,
        processData: false,
       contentType: false ,
        headers: {'Authorization' :localStorage.token},
        success: function(result){
          $('#perso_foto_wait').hide();
          console.log("Exito al subir la foto");
           $("#notify_success").notify();
          self.mostrarImagen();
      },
        error: function(model,response, options) {
            $('#perso_foto_wait').hide();
              console.log(model.responseText);
             $("#notify_error").text(model.responseText);
             $("#notify_error").notify();
        }
    });
  }
});