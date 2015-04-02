$(function() {
  Personal.app = new Personal.Router();
 
  Personal.app.on("route:personal",Personal.app.ContenidoVista.mostrarMenuPersonal);   
  Personal.app.on("route:empresa",Personal.app.ContenidoVista.mostrarMenuEmpresas);
  Personal.app.on("route:movimiento",Personal.app.ContenidoVista.mostrarMenuMovimientos);
  
  // Backbone.history.stop(); 
   Backbone.history.start({
      root: '/',
      silent: true,
     // pushState: true,
    //  hashChange: true,
    });
    //Personal.app.navigate('', true);
});
