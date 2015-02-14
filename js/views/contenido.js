Personal.Views.Contenido = Backbone.View.extend({
  el: $('.contenido_principal'),

  initialize: function () {
  		//window.routers.base.on('router:root' , this.inicio());
  		//Personal.app.on("route:root", this.inicio());
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
        
   }

});
