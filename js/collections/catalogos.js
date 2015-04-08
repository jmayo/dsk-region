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

  url : function(){
   return window.ruta + 'catalogos_detalle/' + this.claves + '/' + this.cdu_default;
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
  Rubro: function () {
    return this.where({catalogos: 19});
  },
  Giro: function () {
    return this.where({catalogos: 18});
  },
  TipoAlta: function(){
    return this.where({catalogos:20});
  },
  TipoEmpleado: function(){
    return this.where({catalogos: 21});
  },
  Estatus: function(){
    return this.where({catalogos: 24});
  },
   Motivo: function(){
    return this.where({catalogos: 25});
  },
   Turno: function(){
    return this.where({catalogos: 26});
  },
   Puesto: function(){
    return this.where({catalogos: 27});
  },
   Rango: function(){
    return this.where({catalogos: 28});
  },



});
