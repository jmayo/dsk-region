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
 
   this.agregarValidacion();
   
    var SucursalCatalogos = new Personal.Collections.Catalogos();
    SucursalCatalogos.claves ="25,26,27,28";
  
    SucursalCatalogos.fetch(
      {
        success: function(){
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
          vis.render();

    },
    relacionColumnas: function(){ 
      var columnasCampos ={
        'id_personal' : '#personal_basico_id',
        'id_sucursal':'#sucursal_basico_id',
        'cdu_motivo':'#movimiento_sucursal_motivo',
        'cdu_turno':'#movimiento_sucursal_turno',
        'cdu_puesto':'#movimiento_sucursal_puesto',
        'cdu_rango':'#movimiento_sucursal_rango',
        'sueldo':'#movimiento_sucursal_sueldo',
        'fecha_inicial':'#movimiento_sucursal_fecha',
        'motivo': '#movimiento_sucursal_dscmotivo',
        //'fecha_final':'01/01/1900',
      };
      return columnasCampos;
   },
guardar: function(){
    if(this.campoValor('id_personal')===null){
        $("#notify_error").notify();
    }
    if(this.campoValor('id_sucursal')===null){
        $("#notify_error").notify();
    }
    else{
      var self = this;
      var data =this.generarJSON();
      
      data.sueldo= parseFloat(data.sueldo).toFixed(7)
      var model = new Personal.Models.personalsucursal(data);
      model.pk = "-1";
      this.tipo='POST'

        model.save(null,{
        type: self.tipo,
        success: function(model,response) {
           //window.Personal.operacion="buscar";
           Personal.app.PersoSucursalModelo.set(response);
            $("#notify_success").notify();
            $('#personal_sin_asignar').hide();
          },
        error: function(model,response, options) {
             $("#notify_error").text(response.responseJSON) 
             $("#notify_error").notify();
              console.log(response.responseJSON);
        }
      });
    }
},
generarJSON: function(){
      var data ={};
      var relacion =this.relacionColumnas();
      for(var campo in relacion)
      {
        if (relacion.hasOwnProperty(campo))
        {
          data[campo] = this.campoValor(campo);
        }
      }
      return data;
   },
campoValor: function(campo){
       var id_control = this.relacionColumnas()[campo];
       if($(id_control).get(0)===undefined){
          return null;
       }
       var elemento  =$(id_control).get(0).tagName;
       var tipo = $(id_control).get(0).type;
       
       if (elemento === "LABEL"){
          return $(id_control).text();
       }      
       else if (elemento === "INPUT" || elemento==='TEXTAREA' || elemento==="SELECT"){
          if(tipo=='radio'){
             return $(id_control).get(0).checked
          }
          else{
             return $(id_control).val();
          }
       } 
       return null;    
  },
agregarValidacion: function(){
      var relacion =this.relacionColumnas();
      var perso_suc = new Personal.Models.personalsucursal();
      var listaVal = perso_suc.validation();
      for(var campo in relacion){
          if (relacion.hasOwnProperty(campo)){
            var id_control = relacion[campo];
            var validacion =listaVal[campo];
            
            if(validacion !== undefined){
                $(id_control).prop('maxlength',validacion['maxlength']);

                $(id_control).prop('pattern',validacion['pattern']); 
                $(id_control).prop('required',validacion['required']);
                var mensaje ="Este campo "
                mensaje += ((validacion['required'] === true) ? 'es obligatorio y ' :'');
                mensaje +=  validacion['title']
                $(id_control).prop('title',mensaje);         
            }
          }
      }
    },
});

