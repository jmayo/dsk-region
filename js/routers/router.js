var Backbone                = require('backbone'),
    $                       = require('jquery');
    jQuery                  = require('jquery');
    JQueryMouseWheel        = require('../jquery.mousewheel')  
    JQueryCalendarPicker    = require('../jquery.calendarPicker') 
    PlantillaSucursalBasico = require('../templates/sucursal-datos-basicos.hbs'),
    PlantillaSucursalSimple = require('../templates/sucursal-datos-simple.hbs'),

    CatalogosLista          = require('../collections/catalogosLista'),
    CatalogosDetalleLista   =  require('../collections/catalogos'),
    Personas                = require('../collections/personas'),
    Empresas                = require('../collections/empresas'),
    Sucursales              = require('../collections/sucursales'),
    PersoActivoEmpresas     = require('../collections/personal_activo_empresas'),
    PersonalBusquedaVista   = require('../views/personalBusqueda'),
    EmpresaBusquedaVista    = require('../views/empresaBusqueda'),
    SucursalListadosVista   = require('../views/sucursalListados'),
    PersonalListadosVista   = require('../views/personalListados')
    IniciarSesionVista      = require('../views/iniciarSesion'),
    CajaOperacionesVista    = require('../views/cajaOperaciones'),
    Personal                = require('../models/personal'),
    CatalogoLista           = require('../models/catalogoLista'),    
    PersonalDetalleVista    = require('../views/personalDetalle');
    Empresa                 = require('../models/empresa'),
    CatalogoDescripcionVista = require('../views/catalogoDescripcion'),
    CatalogoListadoVista     = require('../views/catalogosListado'), 

    CatalogoDetDescripcionVista = require('../views/catalogoDetalleDescripcion'),
    CatalogoDetListadoVista     = require('../views/catalogosDetalleListado'), 
    
    EmpresaDetalleVista     = require('../views/empresaDetalle'),
    EmpresaReporteVista     = require('../views/empresaListaReportes'),
    PersoXEmpresaRepVista    = require('../views/personalXEmpresaReportes'),
    
    EmpresaMapaVista        = require('../views/sucursalMapa'),

    PersonalBasicoVista     = require('../views/personalBasicos'),
    PersonalSucursal        = require('../models/personal_sucursal'),
    Sucursal                = require('../models/sucursal'),
    SucursalBasicoVista     = require('../views/sucursalBasicos'),
    
    PersonalSucursalVista   = require('../views/personalSucursal'),
    PersonalMovimientoVista = require('../views/personalMovimiento'),

    PersonalIncidenciasVista = require('../views/personalIncidencias'),
    PersonalIncidenciasListadosVista   = require('../views/personalListados')
    
    Incidencia              = require('../models/incidencia'),     
    ContenidoVista          = require('../views/contenido'),
    funcionGenerica = require('../funcionesGenericas')
    MenuVista       = require('../views/menu'),
    BodyVista = require('../views/body'),
    MenuOpcion = require('../models/menu'),
    popup                  = require('../popup');
    Calendario              = require('../calendarioComp')   
   
    // CalendarPick = require('../jquery.calendarPicker')
    // jQueryMouseWheel = require('../jquery.mousewheel')
    // Calendario = require('../calendario')
 

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
    "Catalogo": "catalogo",
    "Incidencias": "incidencias",
    "ConsultaEmpPerso": "cons_empperso",
  //  http://localhost:8080/personal/1/sucursal/activa/
  },

initialize: function () {
    //104.236.232.238:8000
    //window.ruta="http://192.168.0.13:8001/";
    //window.ruta="http://104.236.232.238:8080/";
    window.ruta ="http://localhost:8001/";
 

    this.Catalogos = new CatalogosLista()
    this.CatalogosDet = new CatalogosDetalleLista()
    this.Perso = new Personas();          
    this.Empresa = new Empresas();
    this.EmpresaConsulta = new Empresas();
    this.EmpresaReporte = new Empresas();
    this.PersoActEmpresa = new PersoActivoEmpresas();

    this.Sucursal = new Sucursales();
    this.SucursalLista = new Sucursales(); 
    this.PersonalLista = new Personas();
    this.PersonalIncidenciasLista = new Personas();

    this.MenuModelo = new MenuOpcion();
    this.MenuVista = new MenuVista({model: this.MenuModelo}); 

    this.ContenidoVista = new ContenidoVista(); 
 

    this.CatalogoVista = new CatalogoListadoVista({collection: this.Catalogos});
    this.CatalogoDetVista = new CatalogoDetListadoVista({collection: this.CatalogosDet})

    this.PersonalBusquedaVista = new PersonalBusquedaVista();
    
    this.EmpresaBusquedaVista = new EmpresaBusquedaVista();
    
    this.SucursalListadoVista = new SucursalListadosVista({collection: this.SucursalLista});

    this.PersonalListadoVista = new PersonalListadosVista({collection: this.PersonalLista, el:'#personal_listado'});


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
    
    this.EmpresaReporteDetalle = new EmpresaReporteVista({collection: this.EmpresaReporte});
    
    this.PersoXEmpresaRep = new PersoXEmpresaRepVista({collection: this.PersoActEmpresa});

    this.EmpresaMapa= new EmpresaMapaVista();
        
    this.PersoBasicoModelo = new Personal();
    this.PersoBasicoModelo.set({"id":"-1"});

   

    this.PersonalBasico = new PersonalBasicoVista({model: this.PersoBasicoModelo, el:'#personal_datos_basicos'});
    
    this.PersoSucursalModelo = new PersonalSucursal();
    this.PersoSucursalModelo.set({"id":"-1"});
    this.PersonalSucursal = new PersonalSucursalVista({model: this.PersoSucursalModelo});
  
    this.SucursalBasicoModelo = new Sucursal();
    this.SucursalBasicoModelo.set({"id":"-1"});
    
     

    this.SucursalBasico = new SucursalBasicoVista({model: this.SucursalBasicoModelo, el:'#sucursal_datos_basicos', template:PlantillaSucursalBasico});
    

    this.PersonalMovimientoModelo = new PersonalSucursal();
    this.PersonalMovimientoModelo.set({"id":"-1"});
    this.PersonalMovimiento = new PersonalMovimientoVista({model: this.PersonalMovimientoModelo});
    

    this.SucursalIncidenciaBasicoModelo = new Sucursal();
    this.SucursalIncidenciaBasicoModelo.set({"id":"-1"});
    
    this.SucursalIncidenciaBasico = new SucursalBasicoVista({model: this.SucursalIncidenciaBasicoModelo, el:'#sucursal_datos_basicos_incidencias', template:PlantillaSucursalSimple});
    
    this.PersonalIncidenciasListadoVista = new PersonalListadosVista({collection: this.PersonalIncidenciasLista, el:'#personal_incidencias_listado'});

    this.PersoIncidenciasBasicoModelo = new Personal();
    this.PersoIncidenciasBasicoModelo.set({"id":"-1"});
    this.PersonalIncidenciasBasico = new PersonalBasicoVista({model: this.PersoIncidenciasBasicoModelo, el:'#personal_incidencias_datos_basicos'});
   
    this.IncidenciaModelo = new Incidencia();
    this.IncidenciasVista = new PersonalIncidenciasVista({model: this.IncidenciaModelo});


    popup.initialize();
    

    this.Body = new BodyVista();
    
    this.menu="root";
    Calendario.initialize();
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
    if(  Backbone.app.menu ==='incidencias'){
      var self = this;
      console.log("voy a buscar a una persona");
       $('#personal_incidencias_checks').show();
     
   
    this.PersoIncidenciasBasicoModelo.valor = valor_buscado;
     this.PersoIncidenciasBasicoModelo.fetch(  { headers: {'Authorization' :localStorage.token},
        success: function(data){
            //Calendario.initialize();
            //self.PersonalIncidenciasBasico.limpiarTodo();
            self.IncidenciaModelo.clear();
            self.IncidenciaModelo.id_personal = data.attributes.id;
            self.IncidenciaModelo.fecha = '08-03-2016';
            self.IncidenciaModelo.fetch({headers: {'Authorization' :localStorage.token},
              success: function(){
                if( Object.keys(self.IncidenciaModelo.attributes).length === 0){
                       self.IncidenciasVista.render();
                }
              },
              error: function(){
                console.log("hay un error al traer la incidencia");
              }
          });
        },
        error: function(){
          console.log("error");
            
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
    console.log(Backbone.app.menu);
    if(Backbone.app.menu==="empresa"){
       console.log("**2")
      Backbone.app.operacion="buscar";
      this.EmpresaModelo.valor = valor_buscado;
      this.EmpresaModelo.fetch({headers: {'Authorization' :localStorage.token}});
    }
    if(Backbone.app.menu==="consulta_empresaperso"){
      Backbone.app.operacion="buscar";
      var empresaModelo = new Empresa();
      empresaModelo.valor = valor_buscado;
      self = this;
      empresaModelo.fetch({ 
        headers: {'Authorization' :localStorage.token},
        success: function(){
             self.EmpresaReporte.add(empresaModelo,{merge: true});
             
        },
      });
      
      console.log("consulta empresas reportes");
    }
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
    console.log("busco una sucursal");

   if(Backbone.app.menu==="personal"){
        this.SucursalModeloEnPersonal.valor = valor_buscado;
        this.SucursalModeloEnPersonal.fetch({headers: {'Authorization' :localStorage.token}});
    }
    if(Backbone.app.menu==="movimiento"){

        self =this; 
        var asignacion =asignacion_actual;      
        
        Backbone.app.operacion="buscar";
        this.SucursalBasicoModelo.valor = valor_buscado;
        this.SucursalBasicoModelo.fetch({
          headers: {'Authorization' :localStorage.token},
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
                    'fecha_inicial': nueva_fecha
                  })   
            }
                 self.listadoPersonasEnSucursal(valor_buscado);     
        }
    });
  }
  if(Backbone.app.menu === "incidencias"){
    console.log("buscas sucursales para las incidencias");
    this.SucursalIncidenciaBasicoModelo.valor = valor_buscado;
    this.SucursalIncidenciaBasicoModelo.fetch({headers: {'Authorization' :localStorage.token}});
    this.listadoPersonasIncidenciasEnSucursal(valor_buscado); 
  }
 },
 listadoPersonasEnSucursal: function(valor_buscado){
      var self= this;
      this.PersonalLista.id_sucursal = valor_buscado;
      this.PersonalLista.reset();
      this.PersonalLista.fetch({headers: {'Authorization' :localStorage.token},
        success: function(){
          if(self.PersonalLista.length>0){
                   self.PersonalLista.add({id: "-1", id_personal: {matricula:"Id Empleado", nombre:"Nombre(s)"}});
          }
        }
      });
 },
  listadoPersonasIncidenciasEnSucursal: function(valor_buscado){
      var self= this;
      this.PersonalIncidenciasLista.id_sucursal = valor_buscado;
      this.PersonalIncidenciasLista.reset();
      this.PersonalIncidenciasLista.fetch({headers: {'Authorization' :localStorage.token},cache: false,
        success: function(result){
    
          if(result.length >0){
            var valor = result.at(0); 
            self.personalMatricula(valor.get('id_personal').matricula);
          }
          else{
              self.personalMatricula("-1");
          }
        },
          error: function(model,response, options){
            self.personalMatricula("-1");
          }
   
       });
 },
 catalogo: function(){
     Backbone.app.operacion="buscar";
     this.Catalogos.fetch(  { headers: {'Authorization' :localStorage.token}} );

    // this.MenuModelo.Opcion ='catalogo';
    // self = this;
    // this.MenuModelo.fetch({
    //           headers: {'Authorization' :localStorage.token},
    //           success: function(){
    //               //Si es la primera vez cambiamos el id para llenar el formulario
    //                  Backbone.app.operacion="buscar";
    //                 if( self.PersoModelo.get("id")==="-1" ||  self.PersoModelo.get("id")===""){
    //                   self.PersoModelo.set({"id":""});
    //                   $('#personal_primera_asignacion').show();
    //                   Backbone.app.operacion="nuevo";
    //                 }
    //                 Backbone.app.menu="personal";
                   
    //                 console.log("Estas en la lista de personal");
    //             },
    //           error: function(model,response, options) {
    //                  $("#notify_error").text("No estas registrado en el sistema"); 
    //                  $("#notify_error").notify();
    //                   console.log(response.responseText);
    //             }
    //         });

  
 },
 incidencias: function(){
    this.MenuModelo.Opcion ='incidencias';
    console.log('incidencias');
   // this.PersonalIncidencias.render();
 },
 cons_empperso: function () {
    this.MenuModelo.Opcion ='consulta_empresaperso';
    self = this;
    console.log("Estas en el modulo de consulta de empresas y personal")
    // this.MenuModelo.fetch({
    //           headers: {'Authorization' :localStorage.token},
    //           success: function(){
    //               //Si es la primera vez cambiamos el id para llenar el formulario
    //                  Backbone.app.operacion="buscar";
    //                 if( self.PersoModelo.get("id")==="-1" ||  self.PersoModelo.get("id")===""){
    //                   self.PersoModelo.set({"id":""});
    //                   $('#personal_primera_asignacion').show();
    //                   Backbone.app.operacion="nuevo";
    //                 }
    //                 Backbone.app.menu="personal";
                   
    //                 console.log("Estas en la lista de personal");
    //             },
    //           error: function(model,response, options) {
    //                  $("#notify_error").text("No estas registrado en el sistema"); 
    //                  $("#notify_error").notify();
    //                   console.log(response.responseText);
    //             }
    //         });

  
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
