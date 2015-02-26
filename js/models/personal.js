Personal.Models.personal = Backbone.Model.extend({
  initialize: function(){
  		this.valor = null;
  		this.pk = null;
  },
 valor : function(valor){
      this.valor  = valor;
  },
  pk : function(pk){
      this.pk  = pk;
  },
  url : function(){
   var direccion = window.ruta + 'personal/';
   if(this.pk!== undefined && this.pk!== null){
      if(window.Personal.operacion==='buscar' && this.pk!==""){
   	    direccion = direccion + this.pk + '/';
      }
   } 
   if(this.valor!== undefined && this.valor!== null){
   	  direccion = direccion + 'buscar/' + this.valor + '/';
   } 
   return direccion;
  },
  defaults : {
        "id" : "",
        "matricula": "",
        "paterno": "", 
        "materno":"", 
        "nombre":"", 
        "rfc": "", 
        "curp": "", 
        "cuip": "", 
        "fec_nacimiento":"01/01/1900", 
        "cdu_estado_nac": "0140000", 
        "cdu_municipio_nac": "0150000", 
        "cdu_estado_civil" : "0010000",
        "cdu_escolaridad": "0020000", 
        "cdu_religion": "0160000", 
        "cdu_seguridad_social": "0170000", 
        "id_seguridad_social": "", 
        "portacion": false,
        "cdu_tipo_alta": "0200000", 
        "fec_alta": "01/01/1900", 
        "condicionada": false, 
        "condiciones_alta": "", 
        "cdu_tipo_empleado": "0210000", 
        "calle_dom": "", 
        "numero_dom": "", 
        "colonia_dom": "", 
        "cp_dom": "", 
        "cdu_estado_dom": "0140000", 
        "cdu_municipio_dom": "0150000", 
        "ciudad_dom": "",
        "imagen": "",
  },
  validation: function() {
    return {
      matricula: {
        required: true,
        maxlength: 10,
        pattern: '[0-9]{4,10}',
        title: 'La matricula solo puede contener numero',
      },
      paterno: {
        required: true,
        maxlength: 20,
        pattern: '[A-Za-zñáéíóúÑÁÉÍÓÚ\\s]{1,20}',
        title: 'Solo se aceptan letras',
      },
      materno: {
        required: true,
        maxlength: 20,
        pattern: '[A-Za-zñáéíóúÑÁÉÍÓÚ\\s]{1,20}',
        title: 'Solo se aceptan letras',
      },
      nombre: {
        required: true,
        maxlength: 20,
        pattern: '[A-Za-zñáéíóúÑÁÉÍÓÚ\\s]{2,20}',
        title: 'Solo se aceptan letras',
      },
       rfc: {
        required: true,
        maxlength: 13,
        pattern: '[A-Za-z0-9]{10,13}',
        title: 'Error en el rfc',
      },
       curp: {
        required: true,
        maxlength: 18,
        pattern: '[A-Za-z0-9]{10,18}',
        title: 'Error en el curp',
      },
       cuip: {
        required: false,
        maxlength: 30,
        pattern: '[A-Za-z0-9]{0,10}',
        title: 'Error en el cuip',
      },
      id_seguridad_social: {
        required: false,
        maxlength: 20,
        pattern: '[A-Za-z0-9\\s]{0,10}',
        title: '',
      },
       condiciones_alta: {
        required: false,
        maxlength: 150,
        pattern: '[A-Za-z0-9\\s]{0,10}',
        title: '',
      },
       calle_dom: {
        required: true,
        maxlength: 100,
        pattern: '[A-Za-z0-9\\s]{0,10}',
        title: '',
      },
       numero_dom: {
        required: true,
        maxlength: 10,
        pattern: '[A-Za-z0-9\\s]{0,10}',
        title: '',
      },
       colonia_dom: {
        required: true,
        maxlength: 100,
        pattern: '[A-Za-z0-9\\s]{0,10}',
        title: '',
      },
       cp_dom: {
        required: true,
        maxlength: 10,
        pattern: '[A-Za-z0-9]{0,10}',
        title: '',
      },
       ciudad_dom: {
        required: true,
        maxlength: 100,
        pattern: '[A-Za-z0-9\\s]{0,10}',
        title: '',
      },
    }
  }
});


       