var Backbone               = require('backbone'),
    $                      = require('jquery'),
    PersonalBusquedasVista = require('../views/personalBusquedas'),
    EmpresaBusquedasVista  = require('../views/empresaBusquedas'),
    DatoBusquedasVista     = require('../views/datoBusquedas'),
    CajaBusquedaVista      = require('../views/cajaBusqueda'),
    PlantillaPersonal      = require('../templates/resultados-personal-busqueda.hbs'),
    PlantillaSucursal      = require('../templates/resultados-sucursal-busqueda.hbs');
    PlantillaEmpresa       = require('../templates/resultados-empresa-busqueda.hbs');
      

//Personal.Views.Contenido
module.exports = Backbone.View.extend({
  el: $('.contenido_principal'),

  initialize: function () {
      $('.contenido_personal').hide();
      $('.contenido_empresa').hide();
      $('.contenido_movimientos').hide();
      $(".li_menu").css("visibility", "hidden");
      $('.caja_acciones').hide();
      $('#incidencias_personal').hide();
      $('#consulta_empresa_personal').hide();
      $('#incidencia_fecha_ini').hide();
      $('#incidencia_fecha_fin').hide();
      $('#catalogo_movimientos').hide();
      $('#personal_incidencias_checks').hide();
      $('#personal_consulta_incidencias').hide();  
   },
   mostrarMenuPersonal: function(){
   			  Backbone.app.menu="personal";
           if (this.CajaBusqueda){
            this.CajaBusqueda.close();
          }
          
          this.PersonalBusquedasVista = new PersonalBusquedasVista({collection: this.Perso});
          this.CajaBusqueda= new CajaBusquedaVista({collection: this.Perso,el: '.caja_acciones',divResultados: '#resultados_generales'});
        

          console.log("ruta personal")
          $('.contenido_empresa').hide();
          $('.contenido_movimientos').hide();
          $('.contenido_personal').show();
          $('#incidencias_personal').hide();
          $('#consulta_empresa_personal').hide();
          $('#incidencia_fecha_ini').hide();
          $('#incidencia_fecha_fin').hide();
          $('#busqueda_generico').show();
          $('#nuevo_generico').show();
          $('#eliminar_generico').hide();
          $('#catalogo_movimientos').hide();
          $('#personal_consulta_incidencias').hide(); 
   },
   mostrarMenuEmpresas: function(){
        if(Backbone.app.menu!=="sucursal"){
            Backbone.app.menu="empresa";
         }
          if (this.CajaBusqueda){
            this.CajaBusqueda.close();
          } 
          this.EmpresaBusquedasVista = new EmpresaBusquedasVista({collection: this.Empresa});
          this.CajaBusqueda= new CajaBusquedaVista({collection: this.Empresa,el: '.caja_acciones',divResultados: '#resultados_generales'});
          console.log("ruta empresa")
          $('.contenido_personal').hide();
          $('.contenido_movimientos').hide();
          $('#incidencias_personal').hide();
          $('#consulta_empresa_personal').hide();
          $('#incidencia_fecha_ini').hide();
          $('#incidencia_fecha_fin').hide();
          $('.contenido_empresa').show();
          $('#busqueda_generico').show();
          $('#nuevo_generico').show();
          $('#eliminar_generico').show();
          $('#catalogo_movimientos').hide();
          $('#personal_consulta_incidencias').hide(); 
          if(Backbone.app.SucursalListadoVista.collection.length>0){
            $('#bloque_mapa_sucursal').show();
          }
          else{
            $('#bloque_sucursal').hide();
            $('#bloque_empresa').show();
          }        
   },
   mostrarMenuMovimientos:function(){
      Backbone.app.menu = "movimiento";
      if (this.CajaBusquedaPersonal){
            this.CajaBusquedaPersonal.close();
          } 
         if (this.CajaBusquedaSucursal){
            this.CajaBusquedaSucursal.close();
          } 

        this.PersonalMBusquedasVista = new DatoBusquedasVista({collection: this.Perso,el: '#resultados_personal_movimiento',template:PlantillaPersonal});
        this.CajaBusquedaPersonal= new CajaBusquedaVista({collection: this.Perso,el: '#caja_buscar_personas',divResultados: '#resultados_personal_movimiento'});

        this.SucursalMBusquedasVista = new DatoBusquedasVista({collection: this.Sucursal,el: '#resultados_sucursal_movimiento',template:PlantillaSucursal});
        this.CajaBusquedaSucursal= new CajaBusquedaVista({collection: this.Sucursal,el: '#caja_buscar_sucursales',divResultados: '#resultados_sucursal_movimiento'});


        console.log("ruta movimientos")
        $('.contenido_personal').hide();
        $('.contenido_empresa').hide();
        $('#incidencias_personal').hide();
        $('#consulta_empresa_personal').hide();
        $('#incidencia_fecha_ini').hide();
        $('#incidencia_fecha_fin').hide();
        $('.contenido_movimientos').show();
        $('#busqueda_generico').hide();
        $('#nuevo_generico').hide();
        $('#catalogo_movimientos').hide();
        $('#eliminar_generico').show();
        $('#personal_consulta_incidencias').hide();  


   },
   mostrarMenuCatalogos:function(){
      Backbone.app.menu = "catalogo";
      if (this.CajaBusquedaPersonal){
            this.CajaBusquedaPersonal.close();
          } 
         if (this.CajaBusquedaSucursal){
            this.CajaBusquedaSucursal.close();
          } 


        console.log("ruta movimientos")
        $('.contenido_personal').hide();
        $('.contenido_empresa').hide();
        $('.contenido_movimientos').hide();
        $('#incidencias_personal').hide();
        $('#consulta_empresa_personal').hide();
        $('#incidencia_fecha_ini').hide();
        $('#incidencia_fecha_fin').hide();
        $('#busqueda_generico').hide();
        $('#nuevo_generico').hide();
        $('#eliminar_generico').hide();
        $('#catalogo_movimientos').show();
        $('#personal_consulta_incidencias').hide();  

   },
   mostrarMenuIncidencias: function(){
     Backbone.app.menu = "movimiento";
         if (this.CajaBusquedaSucursal){
            this.CajaBusquedaSucursal.close();
          } 



       
        this.SucursalIBusquedasVista = new DatoBusquedasVista({collection: this.Sucursal,el: '#resultados_sucursal_incidencias',template:PlantillaSucursal});
        this.CajaBusquedaSucursal= new CajaBusquedaVista({collection: this.Sucursal,el: '#caja_buscar_sucursales_incidencias',divResultados: '#resultados_sucursal_incidencias'});
        



        this.PersonalCubreBusquedasVista = new DatoBusquedasVista({collection: this.PersoCubre,el: '#resultados_personal_cubre',template:PlantillaPersonal});
        this.CajaBusquedaPersonalCubre= new CajaBusquedaVista({collection: this.PersoCubre,el: '#caja_buscar_personal_cubre',divResultados: '#resultados_personal_cubre'});

        this.PersonalCubreBusquedasVista.otraConsulta = "busqueda_perso_cubre";

        Backbone.app.menu ='incidencias';
        $('.contenido_personal').hide();
        $('.contenido_empresa').hide();
        $('.contenido_movimientos').hide();
        $('#incidencias_personal').show();
        $('#consulta_empresa_personal').hide();
        $('#incidencia_fecha_ini').hide();
        $('#incidencia_fecha_fin').hide();
        $('#busqueda_generico').hide();
        $('#nuevo_generico').hide();
        $('#eliminar_generico').hide();
        $('#catalogo_movimientos').hide();
        $('#personal_consulta_incidencias').hide();  
        $('#caja_buscar_personal_cubre').hide(); 

   },
    mostrarMenuConsEmpPerso:function(){
          Backbone.app.menu = "consulta_empresaperso";
          if (this.CajaBusqueda){
            this.CajaBusqueda.close();
          } 
       
//        this.EmpresaConsultaBusquedasVista = new EmpresaBusquedasVista({collection: this.EmpresaConsulta}); 
        this.EmpresaConsultaBusquedasVista = new DatoBusquedasVista({collection: this.EmpresaConsulta,el: '#resultados_generales',template:PlantillaEmpresa});
        this.CajaBusqueda=  new CajaBusquedaVista({collection: this.EmpresaConsulta,el: '.caja_acciones',divResultados: '#resultados_generales'});
        

      
    

        console.log("ruta consulta empresa personal")
        $('.contenido_personal').hide();
        $('.contenido_empresa').hide();
        $('.contenido_movimientos').hide();
        $('#busqueda_generico').show();
        $('#incidencia_fecha_ini').hide();
        $('#incidencia_fecha_fin').hide();  
        $('#nuevo_generico').hide();
        $('#eliminar_generico').hide();
        $('#catalogo_movimientos').hide();
        $('#incidencias_personal').hide();
        $('#consulta_empresa_personal').show();
        $('#personal_consulta_incidencias').hide();  

   },
     mostrarMenuConsIncidencias:function(){
          Backbone.app.menu = "consulta_incidencias";
          if (this.CajaBusqueda){
            this.CajaBusqueda.close();
          } 
       
        console.log("ruta consulta incidencias")
        $('.contenido_personal').hide();
        $('.contenido_empresa').hide();
        $('.contenido_movimientos').hide();
        $('#busqueda_generico').hide();
        $('#nuevo_generico').hide();
        $('#eliminar_generico').hide();
        $('#catalogo_movimientos').hide();
        $('#incidencias_personal').hide();
        $('#consulta_empresa_personal').hide();
        $('#personal_consulta_incidencias').show();   
        $('#incidencia_fecha_ini').show();
        $('#incidencia_fecha_fin').show();

   },
   mostrarCerrarSesion: function(){
        alert('La sesion caduco');
        localStorage.clear();
        $('.login').css("visibility", "visible");
        $(".li_menu").css("visibility", "hidden");
        $('.caja_acciones').hide();
        $('.contenido_personal').hide();
        $('.contenido_empresa').hide();
        $('.contenido_movimientos').hide();
        $('#incidencias_personal').hide();
        $('#catalogo_movimientos').hide();
        $('#incidencias_personal').hide();
        $('#consulta_empresa_personal').hide();
        $('#personal_consulta_incidencias').hide();  

   },
});
