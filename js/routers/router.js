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
    this.PersoModelo.fetch(
       {
        success: function(){
           console.log("exito");
           // this.PersonalCatalogos = new Personal.Collections.Catalogos();
            //this.PersonalCatalogos.claves ="1,2";
            //this.PersonalCatalogosVista= new Personal.Views.PersonalCatalogos({collection: this.PersonalCatalogos});
            //this.PersonalCatalogos.fetch();            
        }
      });
    // this.model.fetch({ // call fetch() with the following options
    //    success: this.render // $.ajax 'success' callback
    //  });
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
