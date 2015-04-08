Personal.Models.personal = Backbone.Model.extend({
  initialize: function(){
  		this.valor = null;
  		this.pk = null;
      this.camposValidar();
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
  busqueda: function(){
     Personal.app.navigate("Personal/buscar/" + this.get('matricula'), {trigger: true});
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
  camposValidar: function(){
      var vali = new Personal.Models.validacion();
      vali.Campo('matricula',4,10,vali.Numeros());
      vali.Campo('paterno',1,20,vali.AlfaNumerico());
      vali.Campo('materno',1,20,vali.AlfaNumerico());
      vali.Campo('nombre',1,20,vali.AlfaNumerico());
      vali.Campo('rfc',1,13,vali.RFC());
      vali.Campo('curp',1,18,vali.RFC());
      vali.Campo('cuip',0,30,vali.RFC());
      vali.Campo('fec_nacimiento',1,10,vali.Fecha());
      vali.Campo('fec_alta',1,10,vali.Fecha());
      vali.Campo('id_seguridad_social',1,20,vali.AlfaNumerico());
      vali.Campo('condiciones_alta',1,150,vali.AlfaNumerico()); 
      vali.Campo('calle_dom',1,10,vali.AlfaNumerico());
      vali.Campo('numero_dom',1,100,vali.AlfaNumerico());
      vali.Campo('colonia_dom',1,100,vali.AlfaNumerico()); 
      vali.Campo('cp_dom',1,10,vali.Numeros()); 
      vali.Campo('ciudad_dom',1,100,vali.AlfaNumerico());
      this.listado = vali.Listado();
  },
  validation: function() {
      return this.listado;  
  }
});


       