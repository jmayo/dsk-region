Personal.Views.PersonalDetalle = Backbone.View.extend({
  events : {
     "change #perso_edonac": "edonacSelected",
   },

  el: $('#personal_basicos'),
  className: 'ul_bloque',
  tagName: 'ul',
  template: Handlebars.compile($("#personal-detalle-template").html()),
  
  initialize: function () {
    this.catMunicipioNac = new Personal.Collections.Catalogos();
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
   $("#persona_fec_nac, #cal_fec_alt").datepicker({dateFormat:"dd/mm/yy"});
  

    var PersonalCatalogos = new Personal.Collections.Catalogos();
    PersonalCatalogos.claves ="1,2,14,16,17,18,20,21";
  
    PersonalCatalogos.fetch(
      {
        success: function(){
          var catEscolaridad = new Backbone.Collection(PersonalCatalogos.Escolaridad());
          var visEscolaridad = new Personal.Views.PersonalCatalogos({
            collection: catEscolaridad,cdu_seleccionado: detalle["cdu_escolaridad"] ,id_select: "#perso_escolaridad"});
          visEscolaridad.render();
          
          var catReligion = new Backbone.Collection(PersonalCatalogos.Religion());
          var visReligion = new Personal.Views.PersonalCatalogos({
            collection: catReligion,cdu_seleccionado: detalle["cdu_religion"] ,id_select: "#perso_religion" });
          visReligion.render();
          
          var catEdoNac = new Backbone.Collection(PersonalCatalogos.Estados());
          var visEdoNac = new Personal.Views.PersonalCatalogos({
            collection: catEdoNac,cdu_seleccionado: detalle["cdu_estado_nac"] ,id_select: "#perso_edonac" });
          visEdoNac.render();


          var catSegSoc = new Backbone.Collection(PersonalCatalogos.SeguridadSocial());
          var visSegSoc = new Personal.Views.PersonalCatalogos({
          collection: catSegSoc,cdu_seleccionado: detalle["cdu_seguridad_social"] ,id_select: "#perso_segsoc" });
          visSegSoc.render();
        
          var catEdoCiv = new Backbone.Collection(PersonalCatalogos.EstadoCivil());
          var visEdoCiv = new Personal.Views.PersonalCatalogos({
            collection: catEdoCiv,cdu_seleccionado:  detalle["cdu_estado_civil"]  ,id_select: "#perso_estado_civil" });
          visEdoCiv.render();

          var catTipAlta = new Backbone.Collection(PersonalCatalogos.TipoAlta());
          var visTipAlta = new Personal.Views.PersonalCatalogos({
          collection: catTipAlta,cdu_seleccionado: detalle["cdu_tipo_alta"] ,id_select: "#perso_tipo_de_alta" });
          visTipAlta.render();


          var catTipEmpleado = new Backbone.Collection(PersonalCatalogos.TipoEmpleado());
          var visTipEmpleado = new Personal.Views.PersonalCatalogos({
          collection: catTipEmpleado,cdu_seleccionado: detalle["cdu_tipo_empleado"] ,id_select: "#perso_tipo_de_empleado" });
          visTipEmpleado.render();

          
        }
    });
          this.catMunicipioNac.claves ='15';
          this.catMunicipioNac.cdu_default = detalle["cdu_estado_nac"];
          cat = this.catMunicipioNac;
          this.catMunicipioNac.fetch({
              success: function(){
                  var visMunicipioNac = new Personal.Views.PersonalCatalogos({
                   collection: cat,cdu_seleccionado: detalle["cdu_municipio_nac"] ,id_select: "#perso_mpionac" });
                  visMunicipioNac.render();
                }
          });
    },
  edonacSelected: function(){
    var cdu_seleccion = $( "#perso_edonac").val();
    this.catMunicipioNac.claves ='15';
    this.catMunicipioNac.cdu_default = cdu_seleccion;
    cat = this.catMunicipioNac;
    this.catMunicipioNac.fetch({
              success: function(){
                  var visMunicipioNac = new Personal.Views.PersonalCatalogos({
                   collection: cat,cdu_seleccionado: cdu_seleccion ,id_select: "#perso_mpionac" });
                  visMunicipioNac.render();
                }
              });
  },
  guardar: function(){
    console.log("guardando");
    var id = $('#persona_id').text();
    var matricula = $('#persona_matricula').val();
    var paterno = $('#persona_paterno').val();
    var materno = $('#persona_materno').val();
    var nombre = $('#persona_nombre').val();
    var rfc = $('#persona_rfc').val();
    var curp = $('#persona_curp').val();
    var cuip = $('#persona_cuip').val();
    var fec_nac = $('#persona_fec_nac').val();
    var cdu_estado_nac= $('#perso_edonac').val();
    var cdu_municipio_nac =$('#perso_mpionac').val();
    var cdu_estado_civil = $('#perso_estado_civil').val();
   
    var cdu_escolaridad = $('#perso_escolaridad').val();
    var cdu_religion = $('#perso_religion').val();
    var cdu_seguridad_social = $('#perso_segsoc').val();
    var id_seguridad_social = $('#persona_segsocial').val();
    var portacion = this.getRadioCheckedValue('persona_portacion');
    var bln_port = Boolean(portacion.match(/^true$/i)); 
  
    var data = {
        "id": id,
        "matricula": matricula,
        "paterno": paterno, 
        "materno":materno, 
        "nombre":nombre, 
        "rfc": rfc, 
        "curp": curp, 
        "cuip": cuip, 
        "fec_nacimiento":fec_nac, 
        "cdu_estado_nac": cdu_estado_nac, 
        "cdu_municipio_nac": cdu_municipio_nac, 
        "cdu_estado_civil" : cdu_estado_civil,
        "cdu_escolaridad": cdu_escolaridad, 
        "cdu_religion": cdu_religion, 
        "cdu_seguridad_social": cdu_seguridad_social, 
        "id_seguridad_social": id_seguridad_social, 
        "portacion": bln_port
      };
  
    var model = new Personal.Models.personal(data);
    model.valor = undefined;
    model.pk= id;
    //if(id ===""){ model.pk= null;}else{ model.pk= id;}

    var tipo='POST'
    if(window.Personal.operacion!=="nuevo"){
      var tipo='PUT';
    }
  
    model.save(null,{type: tipo});
  },
  getRadioCheckedValue: function(radio_name)
  {
   var oRadio = $('[name=' + radio_name + ']'); 
   for(var i = 0; i < oRadio.length; i++)
   {
      if(oRadio[i].checked)
      {
         return oRadio[i].value;
      }
   }
   return '';
},
});

