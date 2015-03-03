Personal.Collections.Sucursales = Backbone.Collection.extend({
  initialize: function(){
  		this.id_empresa = null;
  },
  id_empresa : function(id_empresa){
          this.id_empresa  = id_empresa;
  },
  url : function(){
     if(this.id_empresa=== undefined || this.id_empresa===""){
        this.id_empresa=0;
      }
    var direccion = window.ruta + 'empresa/' + this.id_empresa + '/sucursales';

   return direccion;
  },
  
  model: Personal.Models.sucursal,
});
