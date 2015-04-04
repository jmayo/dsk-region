Personal.Views.CajaBusqueda = Backbone.View.extend({
events : {
     "keyup .buscar": "buscarEnServidor",
     "blur .buscar" : "esconderBusqueda",
     "focus .buscar" : "mostrarBusqueda",  
   },
  // el: $('.caja_acciones'),
  initialize: function (opciones) {
     this.setElement(opciones.el);  
     this.divResultados = opciones.divResultados;
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
    //this.$(".divResultados").hide();
      this.$(this.divResultados).hide(); 
  },
   mostrarBusqueda: function(){
    //this.$(".divResultados").show();
     this.$(this.divResultados).show(); 
  },
  close: function(){
      // Cuando se asigna una nueva instancia en ocaciones quedan objetos zombies
      // Estas funciones eliminan cualquier referencia
      //this.$(".divResultados").empty();
      this.$(this.divResultados).empty(); 
      this.collection.unbind();
      this.unbind();
      this.undelegateEvents();
    }

});
