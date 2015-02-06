Personal.Collections.Catalogos = Backbone.Collection.extend({
  claves : function(claves){
      this.claves  = claves;
     
  },
  cdu_default : function(cdu_default){
      this.cdu_default  = cdu_default;
  },

  initialize: function(){
  	 this.cdu_default = '';
  },

//  http://192.168.0.14:8000/catalogos_detalle/15/0140001/
  url : function(){
   //return 'http://192.168.0.14:8000/catalogos_detalle/' + this.claves + '/' + this.cdu_default;
   return 'http://104.236.232.238:8000/catalogos_detalle/' + this.claves + '/' + this.cdu_default;
  },
  
  model: Personal.Models.catalogo,

  EstadoCivil: function () {
		return this.where({catalogos: 1});
	},
  Escolaridad: function () {
		return this.where({catalogos: 2});
	},
  Sexo: function () {
		return this.where({catalogos: 3});
	},
  Pais: function () {
		return this.where({catalogos: 13});
	},
  Estados: function () {
		return this.where({catalogos: 14});
	},
  Municipios: function () {
		return this.where({catalogos: 15});
	},
  Religion: function () {
		return this.where({catalogos: 16});
	},
  SeguridadSocial: function () {
		return this.where({catalogos: 17});
	},

});
