Personal.Views.SucursalMapa = Backbone.View.extend({
 
  el: $('.bloque_mapa'),
  initialize: function () {
    this.marcas ={};
      // this.handler = new OpenLayers.Handler.Click(
      //               this, {
      //                   'click': this.trigger
      //               }, this.handlerOptions
      //           );

  },
  reset: function()
  {
    console.log("valores por defecto");
  },
  events :{
     "click #idubicacion": "marcar",
     "click .obtener_cordenadas": "obtenerUbicacion",
  },
  obtenerUbicacion: function(event){
    event.preventDefault();
    console.log("obteniendo cordenadas");
    if (navigator.geolocation) {
        var self=this;
        navigator.geolocation.getCurrentPosition(function(position){
            console.log(position);
             self.posicionar(position.coords.latitude,position.coords.longitude,true);
             self.marcaTemporal(position.coords.latitude,position.coords.longitude);
        });

    } 
    else {
       $("#notify_warning").notify();
    }
  },
  marcar: function(id,latitud,longitud){
    console.log("poner marca");
    
    var lon = parseFloat(longitud);
    var lat = parseFloat(latitud);
    
    this.map.latitud = lat;
    this.map.longitud = lon;
    
    var self= this;
    //Si ya existe una marca para ese servicio la quitamos del mapa
   
    var imagen = new ol.Overlay({
          position: ol.proj.transform(
            [ this.map.longitud,this.map.latitud],
            'EPSG:4326',
            'EPSG:3857'
          ),
       element: $('<img src="images/marker.png" height=20px weight=20px>')
       });

  if(this.marcas[id]){
      this.map.removeOverlay(this.marcas[id]);
      this.posicionar(this.map.latitud, this.map.longitud);
  } 
   this.map.addOverlay(imagen);
   
   this.marcas[id] =  imagen;
  },
  marcaTemporal: function(latitud,longitud){
    console.log("poner marca");
    
    var lon = parseFloat(longitud);
    var lat = parseFloat(latitud);
    
    this.map.latitud = lat;
    this.map.longitud = lon;
    
    var self= this;
    //Si ya existe una marca para ese servicio la quitamos del mapa
   
    var imagen = new ol.Overlay({
          position: ol.proj.transform(
            [ this.map.longitud,this.map.latitud],
            'EPSG:4326',
            'EPSG:3857'
          ),
       element: $('<img src="images/ubicacion.png" height=50px weight=50px>')
       });

  if(this.marcas["marca_temporal"]){
      this.map.removeOverlay(this.marcas["marca_temporal"]);
   //   this.posicionar( this.map.longitud,this.map.latitud);
  } 
   this.map.addOverlay(imagen);
   
   this.marcas["marca_temporal"] =  imagen;
  },
  zoom: function(valor){
    this.map.getView().setZoom(valor);

  },
  posicionar: function(latitud,longitud,cambiar){
    var lat = (parseFloat(latitud).toFixed(4))/1;
    var lon = (parseFloat(longitud).toFixed(4))/1;
    this.map.latitud = lat;
    this.map.longitud = lon;
    this.map.getView().setCenter(ol.proj.transform([this.map.longitud,this.map.latitud],'EPSG:4326', 'EPSG:3857'));
    this.zoom(14);
    if(cambiar===true){
        $('#sucursal_latitud').val(lat);
        $('#sucursal_longitud').val(lon);
    }
  },
  mostrarMapa: function(latitud,longitud){
        $('#mapa').empty();
        lat= parseFloat(latitud);
        lon = parseFloat(longitud);
        this.map = new ol.Map({
          target: 'mapa',
          layers: [
            new ol.layer.Tile({
              source: new ol.source.MapQuest({layer: 'osm'})
            })
          ],
          view: new ol.View({
            center: ol.proj.transform([ lon,lat],'EPSG:4326','EPSG:3857'),
            zoom: 12
          })
        });

        // this.map.on('click', function(evt) {
        //   console.log("click");
        //    var lonlat = ol.proj.transform(evt.coordinate,  'EPSG:3857','EPSG:4326');
        //    var lon = lonlat[0];
        //    var lat = lonlat[1];
        //    console.log(lonlat);    
        // });
      },
});
