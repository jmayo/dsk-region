var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
 initialize: function(){
  		this.id = -1;
      this.nuevo = false;   
      this.eliminar = false;
 },

 id: function(id){
    this.id = id;
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
    this.eliminar= eliminar;
  },
  cubre: function(id_personal){
    this.cubre = id_personal;
  },
  url : function(){
    if(this.nuevo){
      console.log("entro a incidencias");
      var ruta =  window.ruta +  'incidencias/';
      if(this.cubre>0){
        ruta = ruta + "?cubrefalta=" + this.cubre;
      }
  		return ruta;
  	}
    if(this.eliminar){
      console.log("entro a eliminar");
      return   window.ruta +  'incidencias/' + this.id + '/';
    }
    console.log("entro a otro");
    return  window.ruta +  'incidencias/personal/' + this.id_personal + '/fecha/' + this.fecha + '/';
  },
});
