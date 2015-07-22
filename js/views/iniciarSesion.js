var Backbone    = require('backbone'),
    $                     = require('jquery'),
    Login       = require('../models/login');
   
//Personal.Views.IniciarSesion 
module.exports = Backbone.View.extend({

	events: {
      "click #iniciar_sesion": "login",
   },

  el: $('.login'),
    
  initialize: function () {

  },
  
   login: function(){
    console.log("iniciar sesion");
    this.usuario = $('#login_user').val();
    this.pass = $('#login_password').val();
    this.guardar();
  },

  guardar: function(){
    console.log(this.usuario)
    console.log(this.pass)
    
    var data ={"username": this.usuario, "password": this.pass};

    var self = this;
    var model = new Login(data);
    this.tipo='POST'
    model.save(null,{
        type: self.tipo,
        success: function(model,response) {
          $("#notify_success").text("Bienvenido " + self.usuario) 
            Backbone.app.operacion="buscar";
            $("#notify_success").notify();
            localStorage.setItem("token",'Token ' + response.token);
            console.log( localStorage.token);
          },
        error: function(model,response, options) {
           $("#notify_error").text("El usuario o contraseña son incorrectos") 
             $("#notify_error").notify();
              console.log(response.responseText);
             // var responseObj = $.parseJSON(response.responseText);
             // console.log(responseObj);
   //           for(campo in responseObj){ console.log(campo); }
        }

    });

},



  });
