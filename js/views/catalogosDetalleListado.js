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
    if(catalogoDet.id=="0000000"){
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
  nuevo: function(){
       var nuevo_catalogo = new CatalogoDetalle();
       var num_cat = this.collection.claves; // catalogo.attributes.cdu_catalogo.substring(0, 3); 
       if($( "#desc1_").text().trim() !== "" || $( "#desc2_").text().trim() !== "" 
              || $("#monto1_").text().trim() !=="0.00" || $("#monto2_").text().trim() !=="0.00" ){
           
            nuevo_catalogo.set({cdu_catalogo: "0000000",
                           catalogos:num_cat, descripcion1: $( "#desc1_").text().trim(), descripcion2: $("#desc2_").text().trim(),
                           monto1: $("#monto1_").text().trim(),monto2: $("#monto2_").text().trim(),cdu_default:"", cambio:true});
            
            this.collection.add(nuevo_catalogo);
            $( "#desc1_").text("");
            $( "#desc2_").text("");
            $("#monto1_").text("0.00");
            $("#monto2_").text("0.00");   
       }
  },
  guardar: function(){
    this.nuevo();
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
          var tipo = (catalogo.id==="0000000") ? 'POST': 'PUT';
          catalogo.save(null,{
            headers: {'Authorization' :localStorage.token},
            type: tipo,
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
