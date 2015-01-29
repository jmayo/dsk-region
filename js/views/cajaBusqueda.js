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
    var matricula = $('#persona_id').val();
    var paterno = $('#persona_paterno').val();
    var materno = $('#persona_materno').val();
    var nombre = $('#persona_nombre').val();
    var data = {
        "matricula": matricula, 
        "paterno": paterno, 
        "materno":materno, 
        "nombre":nombre, 
        "rfc": "2", 
        "curp": "3", 
        "cuip": "3", 
        "fec_nacimiento": "2014-12-22", 
        "cdu_estado_nac": "0140001", 
        "cdu_municipio_nac": "0150002", 
        "cdu_escolaridad": "0020000", 
        "cdu_religion": "0160000", 
        "cdu_seguridad_social": "0170001", 
        "id_seguridad_social": "2", 
        "portacion": false
      };
    console.log(data);
    var model = new Personal.Models.personal(matricula,data);
    model.valor = matricula;
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
  }

});
