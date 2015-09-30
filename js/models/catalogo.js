var Backbone = require('backbone');

//Personal.Models.catalogo 
module.exports = Backbone.Model.extend({
 idAttribute: "cdu_catalogo",

 claves : function(claves){
      this.claves  = claves;
      this.modificar = false;
  },
  url : function(){
  	if(this.modificar===true){
  			return  window.ruta +  'catalogos_detalle/' + this.claves  + '/';	}
    return  window.ruta +  'catalogos_detalle/' + this.claves + '/';
  },
});