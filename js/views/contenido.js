var Backbone               = require('backbone'),
    $                      = require('jquery'),
    PersonalBusquedasVista = require('../views/personalBusquedas'),
    EmpresaBusquedasVista  = require('../views/empresaBusquedas'),
    DatoBusquedasVista     = require('../views/datoBusquedas'),
    CajaBusquedaVista      = require('../views/cajaBusqueda'),
    PlantillaPersonal      = require('../templates/resultados-personal-busqueda.hbs'),
    PlantillaSucursal      = require('../templates/resultados-sucursal-busqueda.hbs');


//Personal.Views.Contenido
module.exports = Backbone.View.extend({
  el: $('.contenido_principal'),

  initialize: function () {
      $('.contenido_personal').hide();
      $('.contenido_empresa').hide();
      $('.contenido_movimientos').hide();
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
          $('#busqueda_generico').show();
          $('#nuevo_generico').show();
          $('#eliminar_generico').hide();

   },
   mostrarMenuEmpresas: function(){
        Backbone.app.menu="empresa";
          if (this.CajaBusqueda){
            this.CajaBusqueda.close();
          } 
          this.EmpresaBusquedasVista = new EmpresaBusquedasVista({collection: this.Empresa});
          this.CajaBusqueda= new CajaBusquedaVista({collection: this.Empresa,el: '.caja_acciones',divResultados: '#resultados_generales'});
          console.log("ruta empresa")
          $('.contenido_personal').hide();
          $('.contenido_movimientos').hide();
          $('.contenido_empresa').show();
          $('#busqueda_generico').show();
          $('#nuevo_generico').show();
          $('#eliminar_generico').hide();

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
        $('.contenido_movimientos').show();
        $('#busqueda_generico').hide();
        $('#nuevo_generico').hide();
        $('#eliminar_generico').show();


   },

});
