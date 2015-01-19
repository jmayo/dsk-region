Personal.Collections.Catalogos = Backbone.Collection.extend({
  claves : function(claves){
      this.claves  = claves;
  },
  url : function(){
   return 'http://192.168.0.14:8000/catalogos_detalle/' + this.claves + '/';
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
