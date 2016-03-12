var Backbone = require('backbone');

//Personal.Models.catalogo 
module.exports = Backbone.Model.extend({
 initialize: function(){
  		this.pk = -1;
      this.nuevo = false;   
      this.eliminar = false;
 },
 pk: function(pk){
    this.pk = pk;
 },
 id_personal : function(id_personal){
      this.id_personal  = id_personal;
  },
 fecha : function(fecha){
      this.fecha  = fecha;
  },
  nuevo : function(nuevo){
  	this.nuevo= nuevo;
  },
  eliminar : function(eliminar){
    this.nuevo= eliminar;
  },
  url : function(){
  	if(this.nuevo){
  		return  window.ruta +  'incidencias/';
  	}
    if(this.eliminar){
      return   window.ruta +  'incidencias/' + this.pk + '/';
    }
    return  window.ruta +  'incidencias/personal/' + this.id_personal + '/fecha/' + this.fecha + '/';
  },
});
