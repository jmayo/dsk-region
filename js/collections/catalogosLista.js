var Backbone      = require('backbone'),
    CatalogoModelo = require('../models/catalogoLista');

//Personal.Collections.Catalogos = 

module.exports = Backbone.Collection.extend({
  id : function(id){
      this.id  = id;
  },

  initialize: function(){
  },

  url : function(){
   return window.ruta + 'catalogos/editables/';
  },
  
  model: CatalogoModelo,

 
});
