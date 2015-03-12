Personal.Views.SucursalMapa = Backbone.View.extend({
 
  el: $('#bloque_mapa_sucursal'),
 
  initialize: function () {
   // this.listenTo(this.model, "change", this.llenado, this);


  },
  reset: function()
  {
    console.log("valores por defecto");
  },
  events :{
     "click #idubicacion": "ver",
  },
  ver: function(){
    console.log("poner marca");
    pos_ini= -99.2088957;
    pos_fin =  19.4958339;

    //this.map.getView().setCenter(ol.proj.transform([pos_ini, pos_fin], 'EPSG:4326', 'EPSG:3857'));
    this.map.addOverlay(new ol.Overlay({
          position: ol.proj.transform(
            [pos_ini, pos_ini],
            'EPSG:4326',
            'EPSG:3857'
          ),
       element: $('<img src="images/marker.png" height=20px weight=20px>')
       }));

  },
  mostrarMapa: function(latitud,longitud){
        //this.mostrarMapa(this.model.get("latitud"),this.model.get("longitud"));

        var pos_ini = parseFloat(latitud);
        var pos_fin = parseFloat(longitud);
         pos_ini= -99.2088957;
        pos_fin =  19.4958339;
        //pos_ini= parseFloat(-99.1696);
        //pos_fin = parseFloat(19.5225);
        this.map = new ol.Map({
          target: 'mapa',
          layers: [
            new ol.layer.Tile({
              source: new ol.source.MapQuest({layer: 'osm'})
            })
          ],
          view: new ol.View({
            center: ol.proj.transform([pos_ini, pos_fin], 'EPSG:4326', 'EPSG:3857'),
            zoom: 15
          })
        });

        
    // this.map.addOverlay(new ol.Overlay({
    //         position: ol.proj.transform(
    //       [pos_ini, pos_ini],
    //       'EPSG:4326',
    //        'EPSG:3857'
    //      ),
    //   element: $('<img src="images/marker.png" height=20px weight=20px>')
    //     }));
  },


});
