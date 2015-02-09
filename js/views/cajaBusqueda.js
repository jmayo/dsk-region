Personal.Views.CajaBusqueda = Backbone.View.extend({
events : {
     "keyup .buscar": "buscarEnServidor",
     "blur .buscar" : "esconderBusqueda",
     "focus .buscar" : "mostrarBusqueda",  
   },
  el: $('.caja_acciones'),
  template: Handlebars.compile($("#resultados-busqueda-template").html()),

  initialize: function () {
  
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
