Personal.Views.PersonalBusqueda = Backbone.View.extend({
  events : {
     "click .nuevo":   "createArticle",
   },


  el: $('.caja_accioness'),
  tagName: 'div',
  className: 'resultado_ind',
  template: Handlebars.compile($("#resultados-busqueda-template").html()),

  //el: $('.caja_acciones'),
  initialize: function () {
    //  this.listenTo(this.model, "change", this.render, this);
  //  this.listenTo(this.collection, "add", this.addOne, this);
  },

  createArticle : function (e) {
    e.preventDefault();
    console.log("nuevo");
  },
  

  render: function () {
    var busqueda = this.model.toJSON();
    var html = this.template(busqueda);
    this.$el.html(html);
    return this;
  },
});



