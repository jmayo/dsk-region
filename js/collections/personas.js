Personal.Collections.Personas = Backbone.Collection.extend({
  valor : function(valor){
      this.valor  = valor;
  },
  url : function(){
   return 'http://192.168.0.14:8000/personal/' + this.valor + '/';
  },
  
  model: Personal.Models.personal,
});
