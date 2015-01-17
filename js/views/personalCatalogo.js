Personal.Views.PersonalCatalogo = Backbone.View.extend({
  tagName: 'option',
 // el: $('#personal_basicos'),
  template: Handlebars.compile($("#personal-catalogos-template").html()),
  
  initialize: function () {
  },

  render: function () {
    var catalogo = this.model.toJSON();
    var html = this.template(catalogo);
    this.$el.html(html);
    this.el.value = this.model.get('cdu_catalogo');
    return this;
  }
});

