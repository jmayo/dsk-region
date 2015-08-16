var moment = require('../node_modules/moment/moment');

var funcionesGenericas = function() {  
  return {
    fechaActual: function() {
         var now  = new Date();
       var dia  =  "" + now.getDate(); 
       if (dia.length == 1) { dia = "0" + dia; };
       var mes  =  "" + (now.getMonth() + 1); 
       if (mes.length == 1) { mes = "0" + mes; };
       var anio = now.getFullYear();
       var fecha_actual =  dia + '/' + mes + '/' + anio; 
       return fecha_actual;
    },
    fecha18Years: function(){
    	var nueva_fec = new Date()
    	nueva_fec.setFullYear(nueva_fec.getUTCFullYear() - 18)
    	var nueva = this.fechaCadena(nueva_fec);
      return nueva;
    },
    fechaSumarDias: function(fecha,dias){
      var day = moment(fecha, "DD/MM/YYYY");
      day.add('days', dias)
      var fecha = day.format("DD/MM/YYYY");
      return fecha;
    },
    fechaCadena: function(fecha){
    	 var dia  =  "" + fecha.getDate(); 
       if (dia.length == 1) { dia = "0" + dia; };
       var mes  =  "" + (fecha.getMonth() + 1); 
       if (mes.length == 1) { mes = "0" + mes; };
       var anio = fecha.getFullYear();
       var fecha_actual =  dia + '/' + mes + '/' + anio; 
       return fecha_actual;
    }


  };
}

module.exports = funcionesGenericas;  

