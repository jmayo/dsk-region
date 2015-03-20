Personal.Views.SucursalMapa = Backbone.View.extend({
 
  initialize: function () {
 

  },
  reset: function()
  {
    console.log("valores por defecto");
  },
  events :{
     "click #idubicacion": "marcar",
  },
  marcar: function(latitud,longitud){
    console.log("poner marca");
    
    var pos_ini = parseFloat(latitud);
    var pos_fin = parseFloat(longitud);
    
    this.map.latitud = pos_ini;
    this.map.longitud = pos_fin;
    
    var self= this;
    //this.map.getView().setCenter(ol.proj.transform([pos_ini, pos_fin], 'EPSG:4326', 'EPSG:3857'));
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
      },
});
