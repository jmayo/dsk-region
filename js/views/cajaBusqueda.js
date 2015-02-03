Personal.Views.CajaBusqueda = Backbone.View.extend({
events : {
     "keyup .buscar": "buscarEnServidor",
     "blur .buscar" : "esconderBusqueda",
     "focus .buscar" : "mostrarBusqueda",
     "click .guardar": "guardar",
   },
  el: $('.caja_acciones'),
  template: Handlebars.compile($("#resultados-busqueda-template").html()),

  initialize: function () {
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
    model.pk = id;
    model.save();
  },

   buscarEnServidor: function(event,val) {
    if(event.keyCode == 13){
      console.log("Buscando..");
      this.collection.valor = this.$('.buscar').val();//el.val();
      this.collection.reset();
      this.collection.fetch();
      }
  },
  esconderBusqueda: function(){
    this.$(".divResultados").hide();
  },
   mostrarBusqueda: function(){
    this.$(".divResultados").show();
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
}

});
