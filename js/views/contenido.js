Personal.Views.Contenido = Backbone.View.extend({
  el: $('.contenido_principal'),

  initialize: function () {
      $('.contenido_personal').hide();
      $('.contenido_empresa').hide();
   },
   mostrarMenuPersonal: function(){
   			window.Personal.menu="personal";
           if (this.CajaBusqueda){
            this.CajaBusqueda.close();
          } 
          
          this.PersonalBusquedasVista = new Personal.Views.PersonalBusquedas({collection: this.Perso});
          this.CajaBusqueda= new Personal.Views.CajaBusqueda({collection: this.Perso});
          console.log("ruta personal")
          $('.contenido_empresa').hide();
          $('.contenido_personal').show();
   },
      mostrarMenuEmpresas: function(){
        window.Personal.menu="empresa";
          if (this.CajaBusqueda){
            this.CajaBusqueda.close();
          } 
          this.EmpresaBusquedasVista = new Personal.Views.EmpresaBusquedas({collection: this.Empresa});
          this.CajaBusqueda= new Personal.Views.CajaBusqueda({collection: this.Empresa});
          console.log("ruta empresa")
          $('.contenido_personal').hide();
          $('.contenido_empresa').show();
          
          if(Personal.app.SucursalListadoVista.collection.length>0){
            $('#bloque_mapa_sucursal').show();
          }
          else{
            $('#bloque_sucursal').hide();
            $('#bloque_empresa').show();
          }        
   }

});
