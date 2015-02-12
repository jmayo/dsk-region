$(document).ready(function(){
var pos_ini = -99.1696;
var pos_fin = 19.5225;

var map = new ol.Map({
	target: 'mapa',
	layers: [
		new ol.layer.Tile({
			source: new ol.source.MapQuest({layer: 'osm'})
		})
	],
	view: new ol.View({
		center: ol.proj.transform([pos_ini, pos_fin], 'EPSG:4326', 'EPSG:3857'),
		zoom: 14
	})
});

map.addOverlay(new ol.Overlay({
	position: ol.proj.transform(
		[pos_ini, pos_fin],
		'EPSG:4326',
		'EPSG:3857'
	),
	element: $('<img src="images/marker.png" height=20px weight=20px>')

// element: $('<img class="location-popover" src="images/marker.png" height=25px weight=25px>')
// 	.css({marginTop: '-200%', marginLeft: '-50%', cursor: 'pointer'})
// 	.popover({'placement': 'top','html': true,'content':'<strong>id</strong>'})
// 	.on('click', function (e) { $(".location-popover").not(this).popover('hide'); })

}));


});

