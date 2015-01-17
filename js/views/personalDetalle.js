Personal.Views.PersonalDetalle = Backbone.View.extend({
 
  el: $('#personal_basicos'),
  className: 'ul_bloque',
  tagName: 'ul',
  template: Handlebars.compile($("#personal-detalle-template").html()),

  initialize: function () {
    //this.Escuchar();
    this.listenTo(this.model, "change", this.llenado, this);
  },
  llenado: function(){
    console.log("llenando el formulario");
    this.render();
   // $("#persona_id").val(this.model.get("matricula"));
  }, 
  render: function () {
   console.log("buscando en el render");
   var detalle = this.model.toJSON();
    
   
   var html = this.template(detalle);
  
   this.$el.html(html);   
   $("#cal_fec_nac, #cal_fec_alt").datepicker({dateFormat:"dd/mm/yy"});
  }
});
//$("#persona_id").val("444")
