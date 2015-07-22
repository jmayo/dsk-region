var Backbone    = require('backbone'),
    $                     = require('jquery'),
    Login       = require('../models/login');
   
//Personal.Views.IniciarSesion 
module.exports = Backbone.View.extend({

	events: {
      "click .login": "login",
   },

  el: $('.caja_acciones'),
    
  initialize: function () {

  },
  
   login: function(){
    console.log("iniciar sesion");
    this.guardar();
  },

  guardar: function(){
    var data ={"username": "rulo", "password": "123"};

    var self = this;
    var model = new Login(data);
    this.tipo='POST'
    model.save(null,{
        type: self.tipo,
        success: function(model,response) {
            Backbone.app.operacion="buscar";
            $("#notify_success").notify();
            localStorage.setItem("token",'Token ' + response.token);
            console.log( localStorage.token);
          },
        error: function(model,response, options) {
             $("#notify_error").notify();
              console.log(response.responseText);
             // var responseObj = $.parseJSON(response.responseText);
             // console.log(responseObj);
   //           for(campo in responseObj){ console.log(campo); }
        }

    });

},



  });
