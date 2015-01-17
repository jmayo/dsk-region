Personal.Views.PersonalBusqueda = Backbone.View.extend({
  events : {
     "click .nuevo":   "createArticle",
     "mousedown ": "seleccionado",
   },
  tagName: 'div',
  className: 'resultado_ind',
  template: Handlebars.compile($("#resultados-busqueda-template").html()),

  initialize: function () {
  },

  createArticle : function (e) {
    e.preventDefault();
    console.log("nuevo");
  },  

  render: function () {
    var busqueda = this.model.toJSON();
    var html = this.template( busqueda);
    this.$el.html(html);
    return this;
  },
  seleccionado: function(){
    console.log(this.model.get('nombre'));
    Personal.app.navigate("Personal/" + this.model.get('matricula'), {trigger: true, replace: true});
  }
});



