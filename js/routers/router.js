Personal.Router = Backbone.Router.extend({
  routes: {
    "": "index",
    "Personal": "personal",
    "Personal/:valor_buscado": "personalMatricula",
  },

initialize: function () {
    location.hash = '';//Para que al refrescar la pagina ponga #
    this.current = {};
    this.jsonData = {};
    this.Perso = new Personal.Collections.Personas();
    this.PersonalBusquedaVista = new Personal.Views.PersonalBusqueda();
    this.PersonalBusquedasVista = new Personal.Views.PersonalBusquedas({collection: this.Perso});
    this.CajaBusqueda= new Personal.Views.CajaBusqueda({collection: this.Perso});
    this.PersoModelo = new Personal.Models.personal();
    this.PersonalDetalle = new Personal.Views.PersonalDetalle({model: this.PersoModelo});
  
     this.PersonalCatalogos = new Personal.Collections.Catalogos();
     this.PersonalCatalogos.claves ="15";
     this.PersonalCatalogosVista= new Personal.Views.PersonalCatalogos({collection: this.PersonalCatalogos});
     this.PersonalCatalogos.reset();
     this.PersonalCatalogos.fetch();
    Backbone.history.start();
  },

  index: function () {
    //this.Modulos.reset();
    //this.fetchData('/modulos.json',this.addModulo);
    console.log("Estas en el indice");
  },


  personal: function () {
    console.log("Estas en la lista de personal");
  },

 personalMatricula: function (valor_buscado) {
    this.PersoModelo.valor = valor_buscado;
    this.PersoModelo.fetch();
  },



//***** FUNCIONES GENERICAS ****************
  fetchData:function(ruta_json,funcion_llenado,clave){
      var self = this;
      var val = clave;

      $.ajax({
      dataType: 'json',
      data: "",
      url: ruta_json,
      success: function(datos){
         for(var index in datos){
               //calls nos permite llamar a una funcion pasandole el this que la ejecutara
               funcion_llenado.call(self,datos[index],val);
         }
        },
       error: function() { alert("Error leyendo fichero jsonP"); }
    });
    }

});
