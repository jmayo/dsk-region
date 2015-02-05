$(document).ready(function(){
var map = new ol.Map({
	target: 'mapa',
	layers: [
		new ol.layer.Tile({
			source: new ol.source.MapQuest({layer: 'osm'})
		})
	],
	view: new ol.View({
		center: ol.proj.transform([131.044922, -25.363882], 'EPSG:4326', 'EPSG:3857'),
		zoom: 1
	})
});
});

