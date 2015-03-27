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
             self.posicionar(position.coords.longitude,position.coords.latitude,true)
        });
    } 
    else {
       $("#notify_warning").notify();
    }
  },
  marcar: function(id,latitud,longitud){
    console.log("poner marca");
    
    var pos_ini = parseFloat(latitud);
    var pos_fin = parseFloat(longitud);
    
    this.map.latitud = pos_ini;
    this.map.longitud = pos_fin;
    
    var self= this;
    //Si ya existe una marca para ese servicio la quitamos del mapa
   
    var imagen = new ol.Overlay({
          position: ol.proj.transform(
            [this.map.latitud, this.map.longitud],
            'EPSG:3857',
            'EPSG:4326',
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
  zoom: function(valor){
    this.map.getView().setZoom(valor);

  },
  posicionar: function(latitud,longitud,cambiar){
    var pos_ini = (parseFloat(latitud).toFixed(4))/1;
    var pos_fin = (parseFloat(longitud).toFixed(4))/1;
    this.map.latitud = pos_ini;
    this.map.longitud = pos_fin;
    this.map.getView().setCenter(ol.proj.transform([this.map.latitud, this.map.longitud], 'EPSG:3857','EPSG:4326'));
    this.zoom(14);
    if(cambiar===true){
        $('#sucursal_latitud').val(pos_ini);
        $('#sucursal_longitud').val(pos_fin);
    }
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
            center: ol.proj.transform([pos_ini, pos_fin],'EPSG:3857''EPSG:4326'),
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
