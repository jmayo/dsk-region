var Backbone                = require('backbone'),
    $                     = require('jquery'),
    CatalogoDetalleVista = require('../views/catalogoDetalleDescripcion'),
    CatalogoDetalle       = require('../models/catalogo');

//Personal.Views.SucursalListados 
module.exports = Backbone.View.extend({
  el: $('#catalogo_detalle_lista'),
 // template: Handlebars.compile($("#resultados-empresa-sucursal-listado-template").html()),

  initialize: function () {
    this.listenTo(this.collection, "add", this.addOne, this);
    this.listenTo(this.collection, "reset", this.limpiarTodo, this);
  },

  render: function () {
    this.collection.forEach(this.addOne, this);
  },
  addOne: function (catalogoDet) {     
  	if(catalogoDet.get("cdu_catalogo")!==""){
  		   catalogoDet.set({ico: "fa-remove",clase:"eliminar_renglon"});
  	}

    var busquedaView = new CatalogoDetalleVista({ model: catalogoDet }); 
    if(catalogoDet.attributes.nuevo===true){
      ;
      var a= this.collection.get(catalogoDet.pk)
      this.$("#catdet_nuevo").after(busquedaView.render().el);

    }
    else{
      this.$el.append(busquedaView.render().el);
    }
  },
   limpiarTodo:function(){
    console.log("limpiando resultados");
     this.$el.empty();
  },
  guardar: function(){
     var self = this;
     var modificados=this.collection.where({cambio: true})
      console.log("catalogos modificados " + modificados.length);
      modificados.forEach(function(catalogo,index,array){
        console.log("guardando");
         this.col1 =  "#desc1_"  + catalogo.attributes.cdu_catalogo;
         this.col2 =  "#desc2_"  + catalogo.attributes.cdu_catalogo;
         this.col3 =  "#monto1_" + catalogo.attributes.cdu_catalogo;
         this.col4 =  "#monto2_" + catalogo.attributes.cdu_catalogo;
          catalogo.valor = undefined;
          catalogo.modificar = true;
          catalogo.claves = catalogo.attributes.cdu_catalogo;;
          catalogo.attributes.pk = catalogo.attributes.cdu_catalogo;
          catalogo.pk = catalogo.attributes.cdu_catalogo;
          catalogo.set({descripcion1: $(this.col1).text(), descripcion2: $(this.col2).text(),
                        monto1: $(this.col3).text(),monto2: $(this.col4).text(),cambio:false })
          console.log(catalogo.toJSON());
          catalogo.save(null,{
            headers: {'Authorization' :localStorage.token},
            type: 'PUT',
            success: function(model,response) {
              self.collection.add(catalogo, {merge: true});
              $("#notify_success").text("Los datos fueron guardados correctamente");
              $("#notify_success").notify();
              console.log(response);
            },
             error: function(model,response, options) {
                 $("#notify_error").text(response.responseText);
                 $("#notify_error").notify();
             },

          })
      });

},
  
});
