Personal.Models.personal = Backbone.Model.extend({
 valor : function(valor){
      this.valor  = valor;
  },
  url : function(){
   return 'http://192.168.0.14:8000/personal/' + this.valor + '/';
  },
});
