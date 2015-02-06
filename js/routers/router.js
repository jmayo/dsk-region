Personal.Router = Backbone.Router.extend({
  routes: {
    "": "index",
    "Personal": "personal",
    "Personas/nuevo/": "personalNuevo",
    "Personal/buscar/:valor_buscado": "personalMatricula",
  },

initialize: function () {
    location.hash = '';//Para que al refrescar la pagina ponga #
    this.current = {};
    this.jsonData = {};
    this.Perso = new Personal.Collections.Personas();
    this.PersonalCatalogos = new Personal.Collections.Catalogos();
    this.PersonalCatalogos.claves ="1";
    //this.PersonalCatalogos.fetch();

    this.PersonalCatalogosVista= new Personal.Views.PersonalCatalogos({collection: this.PersonalCatalogos});
    this.PersonalBusquedaVista = new Personal.Views.PersonalBusqueda();
    this.PersonalBusquedasVista = new Personal.Views.PersonalBusquedas({collection: this.Perso});
    
    this.CajaBusqueda= new Personal.Views.CajaBusqueda({collection: this.Perso});
    this.PersoModelo = new Personal.Models.personal();
    this.PersonalDetalle = new Personal.Views.PersonalDetalle({model: this.PersoModelo,collection: this.PersonalCatalogos});
  
     //this.PersonalCatalogos.reset();
     //this.PersonalCatalogos.fetch();
      //<select name="estado" class="select_bloque" id="personal_basicos">
    //</select>
    Backbone.history.start({
      root: '/',
      pushState: true,
      silent: false
    });
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
   personalNuevo: function () {
     var data = {
        "id": -1,
        "matricula": "",
        "paterno": "", 
        "materno":"", 
        "nombre":"", 
        "rfc": "", 
        "curp": "", 
        "cuip": "", 
        "fec_nacimiento":"01/01/1900", 
        "cdu_estado_nac": "0140000", 
        "cdu_municipio_nac": "0150000", 
        "cdu_estado_civil" : "0010000",
        "cdu_escolaridad": "0020000", 
        "cdu_religion": "0160000", 
        "cdu_seguridad_social": "0170000", 
        "id_seguridad_social": "", 
        "portacion": false
      };
     this.PersoModelo.set(data);

    console.log("nueva persona");

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
