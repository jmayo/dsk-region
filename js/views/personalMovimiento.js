Personal.Views.PersonalMovimiento = Backbone.View.extend({
 
  el: $('#movimiento_personal_sucursal'),
  className: 'ul_bloque',
  tagName: 'ul',
  template: Handlebars.compile($("#movimiento-personal-sucursal-template").html()),

  initialize: function () {
    if(this.model !==undefined){
      this.listenTo(this.model, "change", this.llenado, this);
    }
  },
  reset: function()
  {
    console.log("valores por defecto");
  },
  llenado: function(){
    console.log("llenando el formulario");
  //  if(this.model.get("id")!=="-1"){
      this.render();
   // }
  }, 
  render: function () {
   console.log("buscando en el render");
   var detalle = this.model.toJSON();
   var html = this.template(detalle);
   this.$el.html(html);

   var self = this;   
   $("#movimiento_sucursal_fecha").datepicker({dateFormat:"dd/mm/yy"});
 
   //this.agregarValidacion();
   
    var SucursalCatalogos = new Personal.Collections.Catalogos();
    SucursalCatalogos.claves ="25,26,27,28";
  
    SucursalCatalogos.fetch(
      {
        success: function(){
   		  debugger;
          
          self.llenadoCatalogosCombo(SucursalCatalogos.Motivo(),detalle["cdu_motivo"],"#movimiento_sucursal_motivo");

          self.llenadoCatalogosCombo(SucursalCatalogos.Turno(),detalle["cdu_turno"],"#movimiento_sucursal_turno");

		  self.llenadoCatalogosCombo(SucursalCatalogos.Puesto(),detalle["cdu_puesto"],"#movimiento_sucursal_puesto");

		  self.llenadoCatalogosCombo(SucursalCatalogos.Rango(),detalle["cdu_rango"],"#movimiento_sucursal_rango");

        }
          
    });


    },
    llenadoCatalogosCombo: function(catalogo,cdu_seleccion,id_selector){
          var cat = new Backbone.Collection(catalogo);
          var vis = new Personal.Views.PersonalCatalogos({
            collection: cat,cdu_seleccionado:cdu_seleccion,id_select: id_selector });
          debugger;
          vis.render();

    },
});

