Personal.Views.PersonalSucursal = Backbone.View.extend({
  el: $('#personal_sucursal_activa'),
  className: 'ul_bloque',
  tagName: 'ul',
  template: Handlebars.compile($("#personal-sucursal-activa-template").html()),
    
  initialize: function () {
    this.listenTo(this.model, "change", this.llenado, this);
  },
  llenado: function(){
    console.log("llenando el formulario sucursal activa");
    if(this.model.get("id")!=="-1"){
      this.render();
    }
  }, 
  limpiarTodo: function(){
  	this.$el.empty();

  },
  render: function () {
   this.$el.empty();
   var detalle = this.model.toJSON();
   var html = this.template(detalle);
   this.$el.html(html);
  },
  defaults : {
  	"id": "",
	"id_personal": "", 
    "id_sucursal": {
        "id": "", 
        "cve_sucursal": "", 
        "nombre": "", 
    }, 
    "cdu_motivo": {
        "cdu_catalogo": "", 
        "descripcion1": "", 
    }, 
    "cdu_turno": {
        "cdu_catalogo": "", 
        "descripcion1": "", 
    }, 
    "cdu_puesto": {
        "cdu_catalogo": "", 
        "descripcion1": "", 
    }, 
    "cdu_rango": {
        "cdu_catalogo": "", 
        "descripcion1": "", 
    }, 
    "sueldo": "0.0", 
    "fecha_inicial": "", 
    "fecha_final": "", 
    "motivo": ""
    },
  });
