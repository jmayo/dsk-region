var Backbone      = require('backbone')

//Personal.Collections.Uniformes
module.exports = Backbone.Collection.extend({
  initialize: function(){
  		this.anio = null;
	  	this.periodo = null;  			
  },
  anio : function(valor){
      this.anio  = valor;
  },
  periodo : function(valor){
          this.periodo  = valor;
  },
  url : function(){
    var direccion = window.ruta;
 
   if(this.anio!== undefined && this.periodo!== null){
      direccion =direccion + 'uniforme/reporte_general/';
      var parametros = '?anio='+ this.anio + '&periodo=' + this.periodo;
      direccion = direccion +  parametros;
      return direccion;
    } 
   return direccion;
  },  
});
