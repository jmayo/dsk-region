Personal.Views.PersonalDetalle = Backbone.View.extend({
  events : {
     "change #perso_edonac": "edonacSelected"
   },

  el: $('#personal_basicos'),
  className: 'ul_bloque',
  tagName: 'ul',
  template: Handlebars.compile($("#personal-detalle-template").html()),

  initialize: function () {
    this.listenTo(this.model, "change", this.llenado, this);
  },
  llenado: function(){
    console.log("llenando el formulario");
    this.render();
  }, 
  edonacSelected: function(){
    console.log("se selecciono un estado");
  },
  render: function () {
   console.log("buscando en el render");
   var detalle = this.model.toJSON();
   var html = this.template(detalle);
   this.$el.html(html);   
   $("#cal_fec_nac, #cal_fec_alt").datepicker({dateFormat:"dd/mm/yy"});

   
    var PersonalCatalogos = new Personal.Collections.Catalogos();
    PersonalCatalogos.claves ="1,2,14,16,17,18";
    //PersonalCatalogos.cdu_default ="";
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
            collection: catEdoCiv,cdu_seleccionado: "" ,id_select: "#perso_estado_civil" });
          visEdoCiv.render();
        }
    });
          var catMunicipioNac = new Personal.Collections.Catalogos();
          catMunicipioNac.claves ='15';
          catMunicipioNac.cdu_default = detalle["cdu_estado_nac"];
          catMunicipioNac.fetch({
              success: function(){
                  var visMunicipioNac = new Personal.Views.PersonalCatalogos({
                   collection: catMunicipioNac,cdu_seleccionado: detalle["cdu_municipio_nac"] ,id_select: "#perso_mpionac" });
                  visMunicipioNac.render();
                }
          });
  }
});

