var Backbone              = require('backbone'),
    $                     = require('jquery');
    EmpresaReporte        = require('../views/personalXEmpresaReporte'),
    Plantilla             = require('../templates/personalXEmpresa_empresa.hbs');
//Personal.Views.PersonalBusquedas 
module.exports= Backbone.View.extend({
  el: $('#quitafondo_lista_empleados_sucursal'),
  template: Plantilla,

  initialize: function () {
    this.listenTo(this.collection, "add", this.addOne, this);
    this.listenTo(this.collection, "reset", this.limpiarTodo, this);
  },

  render: function () {
  	console.log("haciendo redner de los resultados");
    this.collection.forEach(this.addOne, this);
  },
  addOne: function (resultados) {
    console.log("Se agregaron datos al reporte de personas por empresa");
    
   var el_id_empresa="reporte_empresa_cve_" + resultados.id_sucursal__cve_empresa;
 

    //Primero intentara insertar la empresa sino existe
    var busquedaView1 = new EmpresaReporte({ model: resultados }); 
    this.$el.append(busquedaView1.render().el);
    //Despues intentara insertar la sucursal sino existe
    var busquedaView2 = new EmpresaReporte({ model: resultados }); 
    this.$el.append(busquedaView2.render().el);
    //  //Despues  insertar al personal en su sucursal correspondiente
    var busquedaView3 = new EmpresaReporte({ model: resultados }); 
    this.$el.append(busquedaView3.render().el);

 
  },
   limpiarTodo:function(){
    console.log("limpiando resultados");
     this.$el.empty();
  },
  close: function(){
      this.collection.reset();
      this.collection.unbind();
      this.collection.drop();
      this.unbind();
    }
});

//id_sucursal__cve_empresa