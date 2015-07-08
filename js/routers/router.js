var Backbone        = require('backbone'),
    $               = require('jquery');
    Personas        = require('../collections/personas'),
    Empresas        = require('../collections/empresas'),
    Sucursales      = require('../collections/sucursales'),
    MenuVista       = require('../views/menu'),
    PersonalBusquedaVista   = require('../views/personalBusqueda'),
    EmpresaBusquedaVista    = require('../views/empresaBusqueda'),
    SucursalListadosVista   = require('../views/sucursalListados'),
    IniciarSesionVista      = require('../views/iniciarSesion'),
    CajaOperacionesVista    = require('../views/cajaOperaciones'),
    Personal                = require('../models/personal'),
    PersonalDetalleVista    = require('../views/personalDetalle');
    Empresa                 = require('../models/empresa'),
    EmpresaDetalleVista     = require('../views/empresaDetalle'),
    EmpresaMapaVista        = require('../views/sucursalMapa'),
    PersonalBasicoVista     = require('../views/personalBasicos'),
    PersonalSucursal        = require('../models/personal_sucursal'),
    SucursalBasicoVista     = require('../views/sucursalBasicos'),
    PersonalSucursalVista   = require('../views/personalSucursal'),
    PersonalMovimientoVista = require('../views/personalMovimiento'),
    ContenidoVista          = require('../views/contenido'),
    BodyVista = require('../views/body');
   app      = Backbone.app;

//Personal.Router
module.exports = Backbone.Router.extend({
  routes: {
    "": "root",
    "Personal": "personal",
    "Personas/nuevo/": "personalNuevo",
    "Personal/buscar/:valor_buscado": "personalMatricula",
    "Empresa": "empresa",
    "Empresas/nuevo/": "empresaNuevo",    
    "Empresa/buscar/:valor_buscado": "empresaClave",
    "Sucursal/buscar/:valor_buscado": "sucursalClave",
    
    "Movimiento": "movimiento",
    "Personal/:valor_buscado/sucursal/activa": "sucursalActiva",
  //  http://localhost:8080/personal/1/sucursal/activa/
  },

initialize: function () {
    //104.236.232.238:8000
    window.ruta="http://192.168.0.14:8080/";
    //window.ruta="http://104.236.232.238:8080/";
    //window.ruta ="http://localhost:8080/";
 

      
    this.Perso = new Personas();          
    this.Empresa = new Empresas();
    this.Sucursal = new Sucursales();
    this.SucursalLista = new Sucursales(); 

    this.MenuVista = new MenuVista; 

    this.ContenidoVista = new ContenidoVista(); 
 
       
    this.PersonalBusquedaVista = new PersonalBusquedaVista();
    
    this.EmpresaBusquedaVista = new EmpresaBusquedaVista();
    
    this.SucursalListadoVista = new SucursalListadosVista({collection: this.SucursalLista});

    this.IniciarSesion = new IniciarSesionVista();

    this.CajaOperaciones= new CajaOperacionesVista();
 
    this.PersoModelo = new Personal();
    this.PersoModelo.set({"id":"-1"});

    this.PersonalDetalle = new PersonalDetalleVista({model: this.PersoModelo});
    
    this.EmpresaModelo = new Empresa();
    this.EmpresaModelo.set({"id":"-1"});

    this.EmpresaDetalle = new EmpresaDetalleVista({model: this.EmpresaModelo});
    

  

    this.EmpresaMapa= new EmpresaMapaVista();
        
    this.PersoBasicoModelo = new Personal();
    this.PersoBasicoModelo.set({"id":"-1"});

   

    this.PersonalBasico = new PersonalBasicoVista({model: this.PersoBasicoModelo});
    
    this.PersoSucursalModelo = new PersonalSucursal();
    this.PersoSucursalModelo.set({"id":"-1"});
    this.PersonalSucursal = new PersonalSucursalVista({model: this.PersoSucursalModelo});
  
    this.SucursalBasicoModelo = new PersonalSucursal();
    this.SucursalBasicoModelo.set({"id":"-1"});
    
     

    this.SucursalBasico = new SucursalBasicoVista({model: this.SucursalBasicoModelo});
    

    this.PersonalMovimientoModelo = new PersonalSucursal();
    this.PersonalMovimientoModelo.set({"id":"-1"});
    this.PersonalMovimiento = new PersonalMovimientoVista({model: this.PersonalMovimientoModelo});
    

    this.Body = new BodyVista();
    
    this.menu="root";
  },

  root: function () {
    console.log("Estas en el indice");
  },


  personal: function () {
      
    //Si es la primera vez cambiamos el id para llenar el formulario
//     window.Personal.menu="personal";
    window.Personal.operacion="buscar";
    if( this.PersoModelo.get("id")==="-1" ||  this.PersoModelo.get("id")===""){
      this.PersoModelo.set({"id":""});
      window.Personal.operacion="nuevo";
  
    }
    window.Personal.menu="personal";
   
    console.log("Estas en la lista de personal");
  },

 personalMatricula: function (valor_buscado) {
  //  window.Personal.menu="personal";
  if(window.Personal.menu==="personal"){
      window.Personal.operacion="buscar";
      this.PersoModelo.valor = valor_buscado;
      this.PersoModelo.fetch(  { headers: {'Authorization' :localStorage.token}} );
  }
  if(window.Personal.menu==="movimiento"){
      window.Personal.operacion="buscar";
      $('#personal_sin_asignar').hide();
      //Ponemos vacia la sucursal, asi solo si esta asignado a una, se llenaran los datos
      this.PersonalSucursal.limpiarTodo();
      this.PersoSucursalModelo.set({"id":"-1"});
      this.PersoBasicoModelo.valor = valor_buscado;
      var self = this; 
      
      this.PersoBasicoModelo.fetch({
       
          success: function(){
              self.PersoSucursalModelo.id_personal = self.PersoBasicoModelo.get("id");
              self.PersoSucursalModelo.fetch({
                error: function(a,err){
                  if(err.status===404){
                    $('#personal_sin_asignar').show();
                  }
                },
              });
            }
        });
       }
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
    window.Personal.operacion="buscar";
    //window.Personal.menu="empresa";
    if( this.EmpresaModelo.get("id")==="-1"  ||  this.EmpresaModelo.get("id")===""){
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
   movimiento: function () {
    window.Personal.operacion="buscar";
    
    window.Personal.menu="movimiento";
   
    console.log("Estas en la lista de movimientos del personal");
  },
  sucursalActiva: function(valor_buscado){
    console.log("Ver su sucursal activa");
    window.Personal.operacion="buscar";
    //this.PersoBasicoModelo.valor = valor_buscado;
    //this.EmpresaModelo.fetch();
    //this.PersoBasicoModelo =
  },
  sucursalClave: function (valor_buscado) {
   // window.Personal.menu="empresas";
    window.Personal.operacion="buscar";
    this.SucursalBasicoModelo.valor = valor_buscado;
    this.SucursalBasicoModelo.fetch();
    this.PersonalMovimientoModelo.set({model: this.PersonalMovimientoModelo.defaults});
    this.PersonalMovimiento.render();
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
