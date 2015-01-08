Personal.Views.CajaBusqueda = Backbone.View.extend({
events : {
     "keyup .buscar": "buscarEnServidor",
   },
  //el: $('.divResultados'),
  el: $('.caja_acciones'),
  template: Handlebars.compile($("#resultados-busqueda-template").html()),

  initialize: function () {
   },

   buscarEnServidor: function(event) {
    if(event.keyCode == 13){
      console.log("Buscando..");
      this.collection.valor = "a";
      this.collection.fetch();
      }
  },
});
