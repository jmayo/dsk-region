var Backbone              = require('backbone'),
    $                     = require('jquery'),
    Plantilla             = require('../templates/catalogos-detalle.hbs'),
    app                   = Backbone.app;
    CatalogoDetalle       = require('../models/catalogo'),

//Personal.Views.SucursalDescripcion
module.exports = Backbone.View.extend({
  tagName: 'tr',
  className: '',
  template: Plantilla,
  attributes : function () {
       if(this.model.id==="")
       {
        return{
          id : "catdet_nuevo"
        };
       }
  },
  initialize: function () {
    this.listenTo(this.model, "change:descripcion1 change:descripcion1:descripcion2 change:monto1 change:monto2", this.render, this);
  },
  events: function(){
        this.col1 =  "#desc1_" +this.model.get('cdu_catalogo');
        this.col2 =  "#desc2_" +this.model.get('cdu_catalogo');
        this.col3 =  "#monto1_" +this.model.get('cdu_catalogo');
        this.col4 =  "#monto2_" +this.model.get('cdu_catalogo');
        
        var _events = {};
        _events["click " + "#catdet_guardar"] = "nuevo";
        _events["focusout " + this.col1] = function(){this.cambio()}
        _events["focusout " + this.col2] = function(){this.cambio()}
        _events["focusout " + this.col3] = function(){this.cambio()}
        _events["focusout " + this.col4] = function(){this.cambio()}
        
        return _events;
    }, 
  cambio: function(){
  
     if(   this.model.get("descripcion1")!== $(this.col1).text() 
        || this.model.get("descripcion2")!== $(this.col2).text() 
        || this.model.get("monto1")!== $(this.col3).text() 
        || this.model.get("monto2")!== $(this.col4).text()      ){
              this.model.set({cambio: true});
      }
      else{
              this.model.set({cambio: false});
      }
  },
  render: function () {
    console.log("se agrega")
    var descripcion = this.model.toJSON();
    var html = this.template(descripcion);
    this.$el.html(html);
    return this;
  },
  nuevo: function(){
       console.log("nuevo catalogo");
       var nuevo_catalogo = new CatalogoDetalle();
       var num_cat =Backbone.app.CatalogosDet.claves 
       if($( "#desc1_").text().trim() !== "" || $( "#desc2_").text().trim() !== "" 
              || $("#monto1_").text().trim() !=="0.00" || $("#monto2_").text().trim() !=="0.00" ){
           
            nuevo_catalogo.set({cdu_catalogo: "0000000",
                           catalogos:num_cat, descripcion1: $( "#desc1_").text().trim(), descripcion2: $("#desc2_").text().trim(),
                           monto1: $("#monto1_").text().trim(),monto2: $("#monto2_").text().trim(),cdu_default:"", cambio:true});
            
           // Backbone.app.CatalogosDet.add(nuevo_catalogo);
          
            this.guardar(nuevo_catalogo);   
       }
  },
 
  guardar: function(catalogo){
          var self = this;
          console.log("guardando");
         
          catalogo.valor = undefined;
          catalogo.modificar = true;
          catalogo.claves = this.model.attributes.catalogos;
          catalogo.pk =this.model.attributes.catalogos;
          catalogo.set({descripcion1: $("#desc1_").text(), descripcion2: $("#desc2_").text(),
                        monto1: $("#monto1_").text(),monto2: $("#monto2_").text(),cambio:false })
          catalogo.save(null,{
            headers: {'Authorization' :localStorage.token},
            type: 'POST',
            success: function(model,response) {
               response.nuevo = true;
               Backbone.app.CatalogosDet.add(response);
               $( "#desc1_").text("");
               $( "#desc2_").text("");
               $("#monto1_").text("0.00");
               $("#monto2_").text("0.00");
              $("#notify_success").text("Los datos fueron guardados correctamente");
              $("#notify_success").notify();
              console.log(response);
            },
             error: function(model,response, options) {
                 $("#notify_error").text(response.responseText);
                 $("#notify_error").notify();
             },
          });
  },
});



