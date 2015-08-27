var Backbone                = require('backbone'),
    $                     = require('jquery'),
    PersonalDescripcionVista = require('../views/personalDescripcion');


//Personal.Views.PersonalListados 
module.exports = Backbone.View.extend({
  el: $('#personal_listado'),

  initialize: function () {
    this.listenTo(this.collection, "add", this.addOne, this);
    this.listenTo(this.collection, "reset", this.limpiarTodo, this);
  },

  render: function () {
    this.collection.forEach(this.addOne, this);
  },
  addOne: function (personal) {
    var busquedaView = new PersonalDescripcionVista({ model: personal }); 
    if(personal.get("id")==="-1"){
      
      this.$el.prepend(busquedaView.render().el);  
    }
    else{
      this.$el.append(busquedaView.render().el);
    }
  },
   limpiarTodo:function(){
    console.log("limpiando resultados");
     this.$el.empty();
  }
  
});
