var Backbone        = require('backbone'),
    $               = require('jquery');
    Personas        = require('../collections/personas'),
    Empresas        = require('../collections/empresas'),
    Sucursales      = require('../collections/sucursales'),
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
    Sucursal                = require('../models/sucursal'),
    SucursalBasicoVista     = require('../views/sucursalBasicos'),
    PersonalSucursalVista   = require('../views/personalSucursal'),
    PersonalMovimientoVista = require('../views/personalMovimiento'),
    ContenidoVista          = require('../views/contenido'),
    funcionGenerica = require('../funcionesGenericas')
    MenuVista       = require('../views/menu'),
    BodyVista = require('../views/body');
    MenuOpcion = require('../models/menu')
 

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
    window.ruta="http://192.168.0.14:8001/";
    //window.ruta="http://104.236.232.238:8080/";
    //window.ruta ="http://localhost:8080/";
 

      
    this.Perso = new Personas();          
    this.Empresa = new Empresas();
    this.Sucursal = new Sucursales();
    this.SucursalLista = new Sucursales(); 

    this.MenuModelo = new MenuOpcion();
    this.MenuVista = new MenuVista({model: this.MenuModelo}); 

    this.ContenidoVista = new ContenidoVista(); 
 
       
    this.PersonalBusquedaVista = new PersonalBusquedaVista();
    
    this.EmpresaBusquedaVista = new EmpresaBusquedaVista();
    
    this.SucursalListadoVista = new SucursalListadosVista({collection: this.SucursalLista});

    this.IniciarSesion = new IniciarSesionVista();

    this.CajaOperaciones= new CajaOperacionesVista();
 
    this.PersoModelo = new Personal();
    this.PersoModelo.set({"id":"-1"});

    this.SucursalModeloEnPersonal = new Sucursal();
    this.SucursalModeloEnPersonal.set({"id":"-1"});
    
    this.PersonalDetalle = new PersonalDetalleVista({model: this.PersoModelo,modelSucursal:this.SucursalModeloEnPersonal});
    
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
  
    this.SucursalBasicoModelo = new Sucursal();
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
    this.MenuModelo.Opcion ='personal';
    self = this;
    this.MenuModelo.fetch({
              headers: {'Authorization' :localStorage.token},
              success: function(){
                  //Si es la primera vez cambiamos el id para llenar el formulario
                     Backbone.app.operacion="buscar";
                    if( self.PersoModelo.get("id")==="-1" ||  self.PersoModelo.get("id")===""){
                      self.PersoModelo.set({"id":""});
                      $('#personal_primera_asignacion').show();
                      Backbone.app.operacion="nuevo";
                    }
                    Backbone.app.menu="personal";
                   
                    console.log("Estas en la lista de personal");
                },
              error: function(model,response, options) {
                     $("#notify_error").text("No estas registrado en el sistema"); 
                     $("#notify_error").notify();
                      console.log(response.responseText);
                }
            });

  
  },

 personalMatricula: function (valor_buscado,callback) {
  if(Backbone.app.menu==="personal"){
      Backbone.app.operacion="buscar";
      this.PersoModelo.valor = valor_buscado;
      this.PersoModelo.fetch(  { headers: {'Authorization' :localStorage.token}} );
  }
  if(Backbone.app.menu==="movimiento"){
      console.log("refrescando asignaciones");
      Backbone.app.operacion="buscar";
      $('#personal_sin_asignar').hide();
      //Ponemos vacia la sucursal, asi solo si esta asignado a una, se llenaran los datos
      this.PersonalSucursal.limpiarTodo();
      this.PersoSucursalModelo.set({"id":"-1"});
      this.PersoBasicoModelo.valor = valor_buscado;
      var self = this; 

      

      this.PersoBasicoModelo.fetch({ headers: {'Authorization' :localStorage.token},async:false,
       
          success: function(){
                 self.mostrarSucursal();
            }
        });
       
    }
  },
   //************
   mostrarSucursal: function() {
              self = this
              this.PersoSucursalModelo.id_personal = self.PersoBasicoModelo.get("id");

              this.PersoSucursalModelo.fetch({headers: {'Authorization' :localStorage.token},
                success: function(data){
                    // Si encuentra alguna sucursal donde esta asignada la persona
                    // Cargamos la sucursal del lado derecho
                    if(data.attributes.id_sucursal.cve_sucursal > 0){
                      self.sucursalClave(data.attributes.id_sucursal.cve_sucursal,data.attributes);
                    }
                } ,
                error: function(a,err){
                  if(err.status===404){
                    $('#personal_sin_asignar').show();
                  }
                },
              });
   },

   personalNuevo: function () {
    Backbone.app.operacion="nuevo";
    //Cambiamos el valor del id para que detecte cambio en el modelo 
    //Cuando le mandamos los valores por defecto
    this.PersoModelo.set({"id":"-1"});
    this.PersoModelo.set(this.PersoModelo.defaults());

    this.SucursalModeloEnPersonal.set({"id":"-1"});
    this.SucursalModeloEnPersonal.set(this.SucursalModeloEnPersonal.defaults());
  
    
  
    console.log("nueva persona");
  },

  empresa: function () {
    this.MenuModelo.Opcion ='sucursal';
    self = this;
    this.MenuModelo.fetch({
              headers: {'Authorization' :localStorage.token},
              success: function(){
                 Backbone.app.operacion="buscar";
                  if( self.EmpresaModelo.get("id")==="-1"  ||  self.EmpresaModelo.get("id")===""){
                    self.EmpresaModelo.set({"id":""});
                    Backbone.app.operacion="nuevo";
                  }
                 
                  console.log("Estas en la lista de empresas");
                },
              error: function(model,response, options) {
                     $("#notify_error").text("No estas registrado en el sistema"); 
                     $("#notify_error").notify();
                      console.log(response.responseText);
                }
            });

  },
  empresaClave: function (valor_buscado) {
    Backbone.app.operacion="buscar";
    this.EmpresaModelo.valor = valor_buscado;
    this.EmpresaModelo.fetch({headers: {'Authorization' :localStorage.token}});
  },
   empresaNuevo: function () {
    Backbone.app.operacion="nuevo";
    //Cambiamos el valor del id para que detecte cambio en el modelo 
    //Cuando le mandamos los valores por defecto
    
    this.EmpresaModelo.set({"id":"-1"});
    this.EmpresaModelo.set(this.EmpresaModelo.defaults());
    
    console.log("nueva empresa");
  },
   movimiento: function () {

     this.MenuModelo.Opcion ='personal_sucursales';
    self = this;
    this.MenuModelo.fetch({
              headers: {'Authorization' :localStorage.token},
              success: function(){                
                    Backbone.app.operacion="buscar";
                    
                    Backbone.app.menu="movimiento";
                   
                    console.log("Estas en la lista de movimientos del personal");
                },
              error: function(model,response, options) {
                     $("#notify_error").text("No estas registrado en el sistema"); 
                     $("#notify_error").notify();
                      console.log(response.responseText);
                }
            });
  },
  sucursalActiva: function(valor_buscado){
    console.log("Ver su sucursal activa");
    Backbone.app.operacion="buscar";
    //this.PersoBasicoModelo.valor = valor_buscado;
    //this.EmpresaModelo.fetch();
    //this.PersoBasicoModelo =
  },
  sucursalClave: function (valor_buscado, asignacion_actual) {
    if(Backbone.app.menu==="personal"){
        this.SucursalModeloEnPersonal.valor = valor_buscado;
        this.SucursalModeloEnPersonal.fetch({headers: {'Authorization' :localStorage.token}});
    }
    if(Backbone.app.menu==="movimiento"){
        self =this; 
        var asignacion =asignacion_actual;      
        
        Backbone.app.operacion="buscar";
        this.SucursalBasicoModelo.valor = valor_buscado;
        this.SucursalBasicoModelo.fetch({headers: {'Authorization' :localStorage.token},
          //Llenamos el formulario con los datos del ultimo movimiento
        success: function(data){
        if(asignacion !== undefined && asignacion !==null){
               nueva_fecha = new  funcionGenerica().fechaSumarDias(asignacion.fecha_inicial,1);       
               self.PersonalMovimientoModelo.set({
                  'cdu_turno': asignacion.cdu_turno.cdu_catalogo,
                  'cdu_puesto': asignacion.cdu_puesto.cdu_catalogo,
                  'cdu_puesto': asignacion.cdu_puesto.cdu_catalogo,
                  'cdu_rango': asignacion.cdu_rango.cdu_catalogo,
                  'sueldo': asignacion.sueldo,
                  'fecha_inicial': nueva_fecha})
          }
        },
      });
  }
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
