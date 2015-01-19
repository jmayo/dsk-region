Personal.Views.PersonalDetalle = Backbone.View.extend({
 
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
  render: function () {
   console.log("buscando en el render");
   var detalle = this.model.toJSON();
   var html = this.template(detalle);
   this.$el.html(html);   
   $("#cal_fec_nac, #cal_fec_alt").datepicker({dateFormat:"dd/mm/yy"});

   
    var PersonalCatalogos = new Personal.Collections.Catalogos();
    PersonalCatalogos.claves ="1,2,14,15,16,17,18";
  
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
        }
    });
  }
});

