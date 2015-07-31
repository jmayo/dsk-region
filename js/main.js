var Backbone    = require('backbone'),
    $           = require('jquery');
    Router      = require('./routers/router'),
    //Handlerbars = require("./templates/funciones.hbs");
    Handlebars = require("hbsfy/runtime");

       // Funciones generales para los templates
  Handlebars.registerHelper('if', function(conditional, options) {
      if(conditional) {
        return options.fn(this);
      }
    });

  Handlebars.registerHelper('ifCond', function(v1, v2, options) {
      if(v1 === v2) {
        return options.fn(this);
      }
      return options.inverse(this);
  });

  //********** Helpers ********************

  //Helper para titulos de campos
    Handlebars.registerHelper('titulos_caja',function(contenido, options){
        label_id = '';
        label_desc = options.hash.label_desc;
        if (options.hash.label_id !== undefined){
          label_id = 'id="'+ options.hash.label_id + '"';
         }
        return '<label ' + label_id + ' for="'+ label_desc +'" class="etiquetas_bloque">'+ contenido +'</label>';
      });

    Handlebars.registerHelper('titulos_etiqueta',function(contenido){
        return '<label  class="etiquetas_bloque reducir">'+ contenido +'</label>';
      });

    Handlebars.registerHelper('titulos_dato',function(options){
        label_id = '';
        clase_color ='';
        valor = options.hash.valor;

         if (options.hash.clase_color !== undefined){
          clase_color = options.hash.clase_color;
         }

        if (options.hash.label_id !== undefined){
          label_id = 'id="'+ options.hash.label_id + '"';
         }

        if (options.hash.valor !== undefined){
          valor =  options.hash.valor ;
         }

        return '<label ' + label_id + ' class="etiquetas_bloque_consulta  '+ clase_color + '">'+ valor +'</label>';
      });

  Handlebars.registerHelper('caja_imagen',function(contenido,options){
    img_id = 'id=' + options.hash.img_id;
    var ruta = Handlebars.helpers.ruta_imagen(contenido);
    var clase1 = "caja_foto"
        var clase2 = "foto"

      if (options.hash.clase1 !== undefined){
          clase1 =  options.hash.clase1 ;
         }

      if (options.hash.clase2 !== undefined){
          clase2 =  options.hash.clase2 ;
         }

    var valor =  '<div class="' + clase1 + '">'+
            '<figure class="' + clase2 + '">' +
             '<p><img ' + img_id + ' src=' + ruta + ' alt="foto" />' +
             '<p><i id="esperar_personal" class="fa fa-spinner fa-pulse fa-5x"></i>' +
            '</figure>' +
          '</div>';
    return valor;
      });



  Handlebars.registerHelper('ruta_imagen',function(contenido){
    var ruta= window.ruta + 'media/';
    if(contenido===undefined || contenido===""){
      contenido='imagenes/foto.png';
    }
    ruta = ruta + contenido;
    return ruta;
  });


  //Helper para cajas de texto
    Handlebars.registerHelper('valores_caja', function(options){
        input_id = '';
        valor = '';
        input_desc = options.hash.input_desc;
        
         if (options.hash.input_id !== undefined){
          input_id = 'id="'+ options.hash.input_id + '"';
         }

         if (options.hash.valor !== undefined){
          valor = 'value="'+ options.hash.valor + '"';
         }

        return '<input '+ input_id + ' class="inputs_bloque" type="text" placeholder="'+ input_desc + '" ' +valor + ' style="text-transform:uppercase ;" />';
      });

  //Helper para cajas de texto
    Handlebars.registerHelper('valores_textarea', function(options){
        valor = options.hash.valor;
      textarea_id ='';
        textarea_desc = options.hash.textarea_desc;
    
      if (options.hash.textarea_id !== undefined){
          textarea_id = 'id="'+ options.hash.textarea_id + '"';
         }
        return '<textarea '+ textarea_id + ' class="textarea_bloque" placeholder="'+ textarea_desc + '">' +valor + '</textarea>';
      });


  
  


    //Helper para selectores tipo combo
    Handlebars.registerHelper('selectores_combo',function(options){
        select_id = ''; 
        select_name = options.hash.select_name;
        if (options.hash.select_id !== undefined){
          select_id = 'id="'+ options.hash.select_id + '"';
         }
        return '<select name="' + select_name + '" class="select_bloque" ' + select_id + '> </select>'
      });

  
    //Helper para controles tipo radio
  Handlebars.registerHelper('valores_radio', function(options){
          radio_id = ''; 
          valor = '';
          checado = '';
          radio_name = options.hash.radio_name;

          titulo = options.hash.titulo ;
          
          valor = 'value="'+ options.hash.valor + '" ';
          

          if (options.hash.radio_id !== undefined){
          radio_id = 'id="'+ options.hash.radio_id + '"';
          }
           if (options.hash.checado===true){
            checado = 'checked="checked"';
           }

          label = '<label  for="' + radio_name + '"><span><span></span></span>"' + titulo + '"</label>';
          return '<input  ' + radio_id + ' class="radio_bloque" type="radio" name="' +  radio_name + '" ' + valor + checado + '/>' + label
        });

  // ************* Helper de agrupacion de varios controles ***********************

   //Agrupacion de label como titulo y un input
    Handlebars.registerHelper('grp_perdet',function(contenido, options){
    var res1 =Handlebars.helpers.titulos_caja(contenido, options)
    var res2 =Handlebars.helpers.valores_caja(options)
     if (options.hash.titulo  !== undefined){
      var res1 =Handlebars.helpers.titulos_etiqueta(contenido, options)
     }
    return '<li class="li_bloque">' + res1 + res2 + '<div class="viñeta"></div>' + '</li>';
    }
    );

  
  //Agrupacion de dos labels uno para titulo y otro para datos
  Handlebars.registerHelper('grp_perbasico',function(contenido, options){
    var oculto = ''
    if(options.hash.ocultar && options.hash.ocultar===true){
      oculto = 'hidden';
    }

    var res1 =Handlebars.helpers.titulos_etiqueta(contenido, options)
    var res2 =Handlebars.helpers.titulos_dato(options)
    return '<li ' + oculto + ' class="li_bloque">' + res1 + res2 + '</li>';
    }
    );
  


   //Agrupacion de label como titulo y un TextArea
    Handlebars.registerHelper('grp_perdetTextArea',function(contenido, options){
    var res1 =Handlebars.helpers.titulos_caja(contenido, options)
    var res2 =Handlebars.helpers.valores_textarea(options)
     if (options.hash.titulo  !== undefined){
      var res1 =Handlebars.helpers.titulos_etiqueta(contenido, options)
     }
    return '<li class="li_bloque">' + res1 + res2 + '<div class="viñeta"></div>'  + '</li>';
    }
    );




    //Agrupacion de label como titulo y un combo
  Handlebars.registerHelper('grp_combo',function(contenido, options){

    var res1 =Handlebars.helpers.titulos_caja(contenido, options)
     if (options.hash.titulo  !== undefined){
      var res1 =Handlebars.helpers.titulos_etiqueta(contenido, options)
     }
    var res2 =Handlebars.helpers.selectores_combo(options)
    return '<li class="li_bloque">' + res1 + res2 + '</li>';
    }
    );

  //Agrupacion de un label como titulo y dos radio button
  Handlebars.registerHelper('grp_options',function(contenido, options){
    var res1 =Handlebars.helpers.titulos_caja(contenido, options)
    var radio_id = options.hash.radio_id;
    options.hash.titulo = options.hash.op1_titulo;
    options.hash.valor = options.hash.op1_val;
    options.hash.checado = options.hash.op1_checado;
    options.hash.radio_id = radio_id + '_1';
    var res2 =Handlebars.helpers.valores_radio(options)

    options.hash.titulo = options.hash.op2_titulo;
    options.hash.valor = options.hash.op2_val;
    options.hash.checado = !options.hash.op1_checado;
    options.hash.radio_id = radio_id + '_2';
    var res3 =Handlebars.helpers.valores_radio(options)
  
    return '<li class="li_bloque">' + res1 + res2 +  res3 + '</li>';
    }
    );

    
  
   // Backbone.$  = $; //Como backbone no tiene jquery

$(function() {
  Backbone.app = new Router();
 
  Backbone.app.on("route:personal",Backbone.app.ContenidoVista.mostrarMenuPersonal);   
  Backbone.app.on("route:empresa",Backbone.app.ContenidoVista.mostrarMenuEmpresas);
  Backbone.app.on("route:movimiento",Backbone.app.ContenidoVista.mostrarMenuMovimientos);
  
  // Backbone.history.stop(); 
   Backbone.history.start({
      root: '/',
      silent: true,
     // pushState: true,
    //  hashChange: true,
    });
    Backbone.app.navigate('', true);
});
