$(function() {
  Personal.app = new Personal.Router();
 
  Personal.app.on("route:personal",Personal.app.ContenidoVista.mostrarMenu);   
  Personal.app.on("route:empresas",Personal.app.ContenidoVista.mostrarMenu);
  
  // Backbone.history.stop(); 
   Backbone.history.start({
      root: '/',
      silent: true,
    //  pushState: true,
    //  hashChange: true,
    });
    //Personal.app.navigate('', true);
});
