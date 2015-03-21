Personal.Views.SucursalMapa = Backbone.View.extend({
 
  el: $('.bloque_mapa'),
  initialize: function () {
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
        navigator.geolocation.getCurrentPosition(this.mostrarUbicacion);
    } 
    else {
       $("#notify_warning").notify();
    }
  },
  mostrarUbicacion: function(position) {
       console.log('latitud:' + position.coords.latitude + '  longitud:' + position.coords.longitude);
  },
  marcar: function(latitud,longitud){
    console.log("poner marca");
    
    var pos_ini = parseFloat(latitud);
    var pos_fin = parseFloat(longitud);
    
    this.map.latitud = pos_ini;
    this.map.longitud = pos_fin;
    
    var self= this;
    this.map.addOverlay(new ol.Overlay({
          position: ol.proj.transform(
            [this.map.latitud, this.map.longitud],
            'EPSG:4326',
            'EPSG:3857'
          ),
       element: $('<img src="images/marker.png" height=20px weight=20px>')
       }));

  },
  zoom: function(valor){
    this.map.getView().setZoom(valor);

  },
  posicionar: function(latitud,longitud){
    var pos_ini = parseFloat(latitud);
    var pos_fin = parseFloat(longitud);
   
    this.map.latitud = pos_ini;
    this.map.longitud = pos_fin;
    this.map.getView().setCenter(ol.proj.transform([this.map.latitud, this.map.longitud], 'EPSG:4326', 'EPSG:3857'));
    this.zoom(14);
  },
  mostrarMapa: function(latitud,longitud){
        $('#mapa').empty();
        pos_ini= parseFloat(latitud);
        pos_fin = parseFloat(longitud);
        this.map = new ol.Map({
          target: 'mapa',
          layers: [
            new ol.layer.Tile({
              source: new ol.source.MapQuest({layer: 'osm'})
            })
          ],
          view: new ol.View({
            center: ol.proj.transform([pos_ini, pos_fin], 'EPSG:4326', 'EPSG:3857'),
            zoom: 12
          })
        });

        this.map.on('click', function(evt) {
          console.log("click");
           var lonlat = ol.proj.transform(evt.coordinate,  'EPSG:3857','EPSG:4326');
           var lon = lonlat[0];
           var lat = lonlat[1];

           console.log(lonlat);
        //   var out = ol.coordinate.toStringXY(lonlat, 4);
      //     console.log(out);
        });
      },
});
