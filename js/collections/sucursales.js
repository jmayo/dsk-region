Personal.Collections.Sucursales = Backbone.Collection.extend({
  initialize: function(){
  		this.id_empresa = null;
  },
  valor : function(valor){
      this.valor  = valor;
  },
  id_empresa : function(id_empresa){
          this.id_empresa  = id_empresa;
  },
  url : function(){
    var direccion = window.ruta;
   
   if(this.valor!== undefined && this.valor!== null){
      direccion = direccion + 'sucursal/' + 'buscar/' + this.valor + '/';
      return direccion;
    } 
   
     if(this.id_empresa=== undefined || this.id_empresa===""){
        this.id_empresa=0;
      }
    
    direccion= direccion + 'empresa/' + this.id_empresa + '/sucursales';
    
   return direccion;
  },
  
  model: Personal.Models.sucursal,
});
