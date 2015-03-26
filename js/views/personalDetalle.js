Personal.Views.PersonalDetalle = Backbone.View.extend({
  events : {
     "change #perso_edonac": function(){ this.llenadoComboDependiente(this.catMunicipioNac,'15', $( "#perso_edonac").val(),'',"#perso_mpionac");},
     "change #perso_estado_dom": function(){ this.llenadoComboDependiente(this.catMunicipioDom,'15', $( "#perso_estado_dom").val(),'',"#perso_municipio_dom");},
     'submit form' : 'uploadFile',
  //   'change #imagencontrol':  'mostrarImagen',
   },

  el: $('#personal_basicos'),
  className: 'ul_bloque',
  tagName: 'ul',
  template: Handlebars.compile($("#personal-detalle-template").html()),

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
    
  initialize: function () {
    this.catMunicipioNac = new Personal.Collections.Catalogos();
    this.catMunicipioDom = new Personal.Collections.Catalogos();
    
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
    this.$el.empty();
   console.log("buscando en el render");
   var detalle = this.model.toJSON();
   var html = this.template(detalle);
   this.$el.html(html)

   var self = this;   
   $("#persona_fec_nac, #persona_fec_alta").datepicker({dateFormat:"dd/mm/yy"});
  
   this.agregarValidacion();

    var PersonalCatalogos = new Personal.Collections.Catalogos();
    PersonalCatalogos.claves ="1,2,14,16,17,18,20,21";
  
    PersonalCatalogos.fetch(
      {
        success: function(){
          
          self.llenadoCatalogosCombo(PersonalCatalogos.Escolaridad(),detalle["cdu_escolaridad"],"#perso_escolaridad");

          self.llenadoCatalogosCombo(PersonalCatalogos.Religion(),detalle["cdu_religion"],"#perso_religion");

          self.llenadoCatalogosCombo(PersonalCatalogos.Estados(),detalle["cdu_estado_nac"],"#perso_edonac");
        
          self.llenadoCatalogosCombo(PersonalCatalogos.SeguridadSocial(),detalle["cdu_seguridad_social"],"#perso_segsoc");

          self.llenadoCatalogosCombo(PersonalCatalogos.EstadoCivil(),detalle["cdu_estado_civil"],"#perso_estado_civil");

          self.llenadoCatalogosCombo(PersonalCatalogos.TipoAlta(),detalle["cdu_tipo_alta"],"#perso_tipo_de_alta");

          self.llenadoCatalogosCombo(PersonalCatalogos.TipoEmpleado(),detalle["cdu_tipo_empleado"],"#perso_tipo_de_empleado");

          self.llenadoCatalogosCombo(PersonalCatalogos.Estados(),detalle["cdu_estado_dom"],"#perso_estado_dom");

        }
          
    });


          this.llenadoComboDependiente(this.catMunicipioNac,'15', detalle["cdu_estado_nac"],detalle["cdu_municipio_nac"],"#perso_mpionac");

          this.llenadoComboDependiente(this.catMunicipioDom,'15', detalle["cdu_estado_dom"],detalle["cdu_municipio_dom"],"#perso_municipio_dom");

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
        "calle_dom": '#perso_domicilio', 
        "cdu_escolaridad": '#perso_escolaridad', 
        "cdu_estado_civil" : '#perso_estado_civil',
        "cdu_estado_dom": '#perso_estado_dom', 
        "cdu_estado_nac": '#perso_edonac', 
        "cdu_municipio_dom": '#perso_municipio_dom', 
        "cdu_municipio_nac": '#perso_mpionac', 
        "cdu_religion": '#perso_religion', 
        "cdu_seguridad_social": '#perso_segsoc', 
        "cdu_tipo_alta":'#perso_tipo_de_alta' , 
        "cdu_tipo_empleado": '#perso_tipo_de_empleado', 
        "ciudad_dom": '#persona_ciudad_dom',
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
      };
      return columnasCampos;
   },
guardar: function(){
    var data =this.generarJSON();
    var self = this;
    var model = new Personal.Models.personal(data);
    model.valor = undefined;
    model.pk= data["id"];
    this.tipo='POST'
    if(window.Personal.operacion!=="nuevo"){
        this.tipo='PUT';
    }
 
    model.save(null,{
        type: self.tipo,
        success: function(model,response) {
            $('#persona_id').text(model.get("id"));
            window.Personal.operacion="buscar";
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
      var listaVal = Personal.app.PersoModelo.validation();
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
        success: function(result){
          console.log("Exito al subir la foto");
           $("#notify_success").notify();
          self.mostrarImagen();
      },
        error: function(model,response, options) {
             $("#notify_error").notify();
        }
    });
  }
});

