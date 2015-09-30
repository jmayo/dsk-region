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
        _events["click " + "#catdet_guardar"] = "guardar";
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
  seleccionado: function(){
    //console.log("seleccionado " + this.model.get("cdu_catalogo"))
    var cdu =  this.model.get('cdu_catalogo');
    var val_cat = this.model.get('catalogos');
    var val_desc1='#desc1_' + cdu;
    var val_desc2='#desc2_' + cdu;
    var val_monto1='#monto1_' + cdu;
    var val_monto2='#monto2_' + cdu;
    
    //cdu_catalogo,catalogos,num_dcatalogo,descripcion1,descripcion2,monto1,monto2,cdu_default
    var data ={};
    data['cdu_catalogo'] = cdu;
    data['catalogos'] = val_cat;
    data['descripcion1'] = $(val_desc1).text();
    data['descripcion2'] = $(val_desc2).text();
    data['monto1'] = $(val_monto1).text();
    data['monto2'] = $(val_monto2).text();
    data['cdu_default'] = '';
   // console.log(data);

   //   this.tipo='POST'
   // if(Backbone.app.operacion!=="nuevo"){
      this.tipo='PUT';
   // }
   
   // var modelo = new CatalogoDetalle(data);

   //  modelo.save(null,{
   //    headers: {'Authorization' :localStorage.token},
   //      type: self.tipo,
   //      success: function(modelo,response) {
   //        console.log("Exito");
   //        },
   //      error: function(model,response, options) {
   //           $("#notify_error").text(response.responseText);
   //           $("#notify_error").notify();
   //            console.log(response.responseText);
   //      }
   //    });


    //console.log(this.$el('desc1_').text());
    // Backbone.app.menu="sucursal";
    // $('#bloque_empresa').hide();
    // $('#bloque_sucursal').show();
 
    // if(this.model.get("id")==="-1"){
    //   var a= Backbone.app.EmpresaModelo.toJSON();
    //   this.model.set({"nombre": a.razon_social,"calle":a.calle,"numero":a.numero,"colonia":a.colonia,  "cp":a.cp, "cdu_estado":a.cdu_estado,"cdu_municipio":a.cdu_municipio ,"telefono": "telefono1"});
    
    //   this.SucursalDetalle = new SucursalDetalleVista({model: this.model});
    //   this.SucursalDetalle.llenado();
    //   Backbone.app.EmpresaMapa.posicionar(this.model.get("latitud"),this.model.get("longitud"));
    // }
    // else{  
    //   this.SucursalModelo = new Sucursal();
    //   this.SucursalModelo.pk = this.model.get("id");
    //   this.SucursalDetalle = new SucursalDetalleVista({model: this.SucursalModelo});
    //   this.SucursalModelo.fetch({ headers: {'Authorization' :localStorage.token}});
    //   Backbone.app.EmpresaMapa.posicionar(this.model.get("latitud"),this.model.get("longitud"));
    // }
  },
  guardar: function(){
    console.log("guardando")
   // { cdu_catalogo: "0280001", num_dcatalogo: 1, descripcion1: "2", descripcion2: "", monto1: "0.00", monto2: "0.00", cdu_default: "", catalogos: 28, ico: "fa-remove", clase: "eliminar_renglon" }
    // var data =this.generarJSON();
    //  var self = this;
    // var modelo = new Empresa(data);
    // modelo.valor = undefined;
    // modelo.pk= data["id"];
    
    // this.tipo='POST'
    // if(Backbone.app.operacion!=="nuevo"){
    //   this.tipo='PUT';
    // }
   
    // modelo.save(null,{
    //   headers: {'Authorization' :localStorage.token},
    //     type: self.tipo,
    //     success: function(modelo,response) {
    //         $('#empresa_id').text(modelo.get("id"));
    //        // self.mostrarDescripcion(modelo);
    //       //  self.mostrarSucursalLista(modelo.get("id"));
    //        Backbone.app.operacion="buscar";
    //         $("#notify_success").notify();
    //        self.model.set({"id":modelo.get("id"),"cve_empresa":modelo.get("cve_empresa"), "razon_social": modelo.get("razon_social"),
    //                     "rfc": modelo.get("rfc"),"calle":modelo.get("calle"),"numero":modelo.get("numero"),"colonia":modelo.get("colonia"),
    //                       "cp":modelo.get("cp"), "cdu_estado":modelo.get("cdu_estado"),"cdu_municipio":modelo.get("cdu_municipio") ,
    //                       "telefono1": modelo.get("telefono1"), "telefono2": modelo.get("telefono2"), "cdu_giro": modelo.get("cdu_giro"),
    //                       "cdu_rubro": modelo.get("cdu_rubro"),"fecha_alta": modelo.get("fecha_alta")
    //                     });
    //       },
    //     error: function(model,response, options) {
    //          $("#notify_error").text(response.responseText);
    //          $("#notify_error").notify();
    //           console.log(response.responseText);
    //     }

    // });
  },
  
});



