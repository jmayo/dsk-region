Personal.Router = Backbone.Router.extend({
  routes: {
    "": "root",
    "Personal": "personal",
    "Personas/nuevo/": "personalNuevo",
    "Personal/buscar/:valor_buscado": "personalMatricula",
    "Empresas": "empresas",
  },

initialize: function () {
    //104.236.232.238:8000
    window.ruta="http://192.168.122.1:8000/";

    this.Perso = new Personal.Collections.Personas();
    this.MenuVista = new Personal.Views.Menu(); 

    this.ContenidoVista = new Personal.Views.Contenido(); 
 
    this.PersonalBusquedaVista = new Personal.Views.PersonalBusqueda();
    this.PersonalBusquedasVista = new Personal.Views.PersonalBusquedas({collection: this.Perso});
    
    this.CajaOperaciones= new Personal.Views.CajaOperaciones();
    this.CajaBusqueda= new Personal.Views.CajaBusqueda({collection: this.Perso});
  
    this.PersoModelo = new Personal.Models.personal();
    this.PersonalDetalle = new Personal.Views.PersonalDetalle({model: this.PersoModelo,collection: this.PersonalCatalogos});
  },

  root: function () {
    window.Personal.menu="root";
    console.log("Estas en el indice");
  },


  personal: function () {
    window.Personal.menu="personal";
    window.Personal.operacion="";
    console.log("Estas en la lista de personal");
  },

 personalMatricula: function (valor_buscado) {
    window.Personal.menu="personal";
    window.Personal.operacion="buscar";
    this.PersoModelo.valor = valor_buscado;
    this.PersoModelo.fetch();
  },
   personalNuevo: function () {
    window.Personal.menu="personal";
    window.Personal.operacion="nuevo";
    this.PersoModelo.set(this.PersoModelo.defaults);
    console.log("nueva persona");
  },

  empresas: function () {
    window.Personal.menu="empresas";
    window.Personal.operacion="";
    console.log("Estas en la lista de empresas");
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
