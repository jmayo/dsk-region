Personal.Views.Contenido = Backbone.View.extend({
  el: $('.contenido_principal'),

  initialize: function () {
  		//window.routers.base.on('router:root' , this.inicio());
  		//Personal.app.on("route:root", this.inicio());
   },
   mostrarMenu: function(){
   			console.log("te escucho");
   			if (window.Personal.menu==="personal"){
   				$('.contenido_empresas').hide();
   				$('.contenido').show();
   			}
   			if (window.Personal.menu==="empresas"){
   				$('.contenido').hide();
   				$('.contenido_empresas').show();
   			}
   }
});
