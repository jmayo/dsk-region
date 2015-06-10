Personal.Views.IniciarSesion = Backbone.View.extend({

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
    var model = new Personal.Models.login(data);
    this.tipo='POST'
    model.save(null,{
        type: self.tipo,
        success: function(model,response) {
            window.Personal.operacion="buscar";
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
