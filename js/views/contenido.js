Personal.Views.Contenido = Backbone.View.extend({
  el: $('.contenido_principal'),

  initialize: function () {
      $('.contenido_personal').hide();
      $('.contenido_empresa').hide();
      $('.contenido_movimientos').hide();
   },
   mostrarMenuPersonal: function(){
   			window.Personal.menu="personal";
           if (this.CajaBusqueda){
            this.CajaBusqueda.close();
          } 
          
          this.PersonalBusquedasVista = new Personal.Views.PersonalBusquedas({collection: this.Perso});
          this.CajaBusqueda= new Personal.Views.CajaBusqueda({collection: this.Perso,el: '.caja_acciones',divResultados: '#resultados_generales'});
          console.log("ruta personal")
          $('.contenido_empresa').hide();
          $('.contenido_movimientos').hide();
          $('.contenido_personal').show();
   },
   mostrarMenuEmpresas: function(){
        window.Personal.menu="empresa";
          if (this.CajaBusqueda){
            this.CajaBusqueda.close();
          } 
          this.EmpresaBusquedasVista = new Personal.Views.EmpresaBusquedas({collection: this.Empresa});
          this.CajaBusqueda= new Personal.Views.CajaBusqueda({collection: this.Empresa,el: '.caja_acciones',divResultados: '#resultados_generales'});
          console.log("ruta empresa")
          $('.contenido_personal').hide();
          $('.contenido_movimientos').hide();
          $('.contenido_empresa').show();
          
          if(Personal.app.SucursalListadoVista.collection.length>0){
            $('#bloque_mapa_sucursal').show();
          }
          else{
            $('#bloque_sucursal').hide();
            $('#bloque_empresa').show();
          }        
   },
   mostrarMenuMovimientos:function(){
      window.Personal.menu = "movimiento";
      if (this.CajaBusquedaPersonal){
            this.CajaBusquedaPersonal.close();
          } 
         if (this.CajaBusquedaSucursal){
            this.CajaBusquedaSucursal.close();
          } 

        this.PersonalMBusquedasVista = new Personal.Views.DatoBusquedas({collection: this.Perso,el: '#resultados_personal_movimiento',template:"#resultados-personal-busqueda-template"});
        this.CajaBusquedaPersonal= new Personal.Views.CajaBusqueda({collection: this.Perso,el: '#caja_buscar_personas',divResultados: '#resultados_personal_movimiento'});

        this.SucursalMBusquedasVista = new Personal.Views.DatoBusquedas({collection: this.Sucursal,el: '#resultados_sucursal_movimiento',template:"#resultados-sucursal-busqueda-template"});
        this.CajaBusquedaSucursal= new Personal.Views.CajaBusqueda({collection: this.Sucursal,el: '#caja_buscar_sucursales',divResultados: '#resultados_sucursal_movimiento'});


        console.log("ruta movimientos")
        $('.contenido_personal').hide();
        $('.contenido_empresa').hide();
        $('.contenido_movimientos').show();


   },

});
