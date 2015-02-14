Personal.Router = Backbone.Router.extend({
  routes: {
    "": "root",
    "Personal": "personal",
    "Personas/nuevo/": "personalNuevo",
    "Personal/buscar/:valor_buscado": "personalMatricula",
    "Empresa": "empresa",
    "Empresas/nuevo/": "empresaNuevo",
    "Empresa/buscar/:valor_buscado": "empresaClave",
  },

initialize: function () {
    //104.236.232.238:8000
    window.ruta="http://192.168.0.14:8000/";
    //window.ruta="http://104.236.232.238:8080/";

    this.Perso = new Personal.Collections.Personas();          
    this.Empresa = new Personal.Collections.Empresas();

    this.MenuVista = new Personal.Views.Menu(); 

    this.ContenidoVista = new Personal.Views.Contenido(); 
 
       
    this.PersonalBusquedaVista = new Personal.Views.PersonalBusqueda();
    

    this.EmpresaBusquedaVista = new Personal.Views.EmpresaBusqueda();
    

    this.CajaOperaciones= new Personal.Views.CajaOperaciones();
    // this.CajaBusqueda= new Personal.Views.CajaBusqueda({collection: this.Perso});
    // this.CajaBusqueda= new Personal.Views.CajaBusqueda({collection: this.Empresa});

    this.PersoModelo = new Personal.Models.personal();
    this.PersoModelo.set({"id":"-1"});
    this.PersonalDetalle = new Personal.Views.PersonalDetalle({model: this.PersoModelo/*,collection: this.PersonalCatalogos*/});
    


    this.EmpresaModelo = new Personal.Models.empresa();
    this.EmpresaModelo.set({"id":"-1"});
    this.EmpresaDetalle = new Personal.Views.EmpresaDetalle({model: this.EmpresaModelo/*,collection: this.PersonalCatalogos*/});
    

    this.formview = new Personal.Models.formview();
    this.FormView = new Personal.Views.FormView({model:this.formview });

    window.Personal.menu="root";
  },

  root: function () {
    console.log("Estas en el indice");
  },


  personal: function () {
      
    //Si es la primera vez cambiamos el id para llenar el formulario
//     window.Personal.menu="personal";
    window.Personal.operacion="";
    if( this.PersoModelo.get("id")=="-1"){
      this.PersoModelo.set({"id":""});
      window.Personal.operacion="nuevo";
    }
    window.Personal.menu="personal";
   
    console.log("Estas en la lista de personal");
  },

 personalMatricula: function (valor_buscado) {
  //  window.Personal.menu="personal";
    window.Personal.operacion="buscar";
    this.PersoModelo.valor = valor_buscado;
    this.PersoModelo.fetch();
  },
   personalNuevo: function () {
   // window.Personal.menu="personal";
    window.Personal.operacion="nuevo";
    //Cambiamos el valor del id para que detecte cambio en el modelo 
    //Cuando le mandamos los valores por defecto
    this.PersoModelo.set({"id":"-1"});
    this.PersoModelo.set(this.PersoModelo.defaults);
    
    console.log("nueva persona");
  },

  empresa: function () {
    window.Personal.operacion="";
    //window.Personal.menu="empresa";
    if( this.EmpresaModelo.get("id")=="-1"){
      this.EmpresaModelo.set({"id":""});
      window.Personal.operacion="nuevo";
    }
   
    console.log("Estas en la lista de empresas");
  },
  empresaClave: function (valor_buscado) {
   // window.Personal.menu="empresas";
    window.Personal.operacion="buscar";
    this.EmpresaModelo.valor = valor_buscado;
    this.EmpresaModelo.fetch();
  },
   empresaNuevo: function () {
    //window.Personal.menu="empresa";
    window.Personal.operacion="nuevo";
    //Cambiamos el valor del id para que detecte cambio en el modelo 
    //Cuando le mandamos los valores por defecto
    this.EmpresaModelo.set({"id":"-1"});
    this.EmpresaModelo.set(this.EmpresaModelo.defaults);
    
    console.log("nueva empresa");
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
