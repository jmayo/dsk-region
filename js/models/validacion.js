Personal.Models.validacion= function validacion(){
	var lista={}
	 
return {
	Letras: function(){
	  	var regex ='[A-Za-zñáéíóúÑÁÉÍÓÚ\\s]';
	 	var mensaje= "solo acepta Letras";
	    return {regex,mensaje};
	},
	 Numeros: function(){
		var regex ='[0-9]';
	    var mensaje = "solo acepta Numeros"
		return {regex,mensaje};
	},
	AlfaNumerico: function(){
	  	var regex ='[0-9A-Za-zñáéíóúÑÁÉÍÓÚ\\s]';
	 	var mensaje= "es alfanumerico";
	    return {regex,mensaje};
	},
	AlfaNumericoSinEspacios: function(){
	  	var regex ='[0-9A-Za-zñáéíóúÑÁÉÍÓÚ]';
	 	var mensaje= "es alfanumerico sin espacios";
	    return {regex,mensaje};
	},
	Decimales: function(){
		var regex ='[0-9]?[0-9]?(\\.[0-9][0-9]?)?';
	 	var mensaje= "solo acepta decimales";
	    return {regex,mensaje};
	},
	RFC: function(){
		var regex = '^(([A-Z]|[a-z]){4})([0-9]{6})((([A-Z]|[a-z]|[0-9]){3}))';
		var mensaje= "debe ser un rfc correcto";
		return {regex,mensaje};;
	},
	Fecha: function(){
		var regex = '^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\\d\\d';
		var mensaje= "debe ser una fecha correcta";
		return {regex,mensaje};;
	},
	Generico: function(){
		var regex = '';
		var mensaje= " acepta cualquier caracter";
		return {regex,mensaje};;
	},
	Campo: function(campo,min,longitud,expmsg,mensaje){
	  var req =  ((min === 0) ? false :true);
	  var msg= mensaje;
	  var expreg=expmsg['regex'] + '{' + min + ',' + longitud + '}';
	  if(mensaje===undefined){
      	 msg= expmsg['mensaje']
      }
      lista[campo]={
		required: req,
		maxlength: longitud,
		pattern: expreg,
		title: msg,	 	 
	  }
	},
	Listado: function(){
		console.log("listado");
		return lista;

	}
  }
};
