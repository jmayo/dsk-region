var Backbone    = require('backbone'),
    $           = require('jquery'),
    Login       = require('../models/login'),
    Permisos    = require('../models/permisos');
   
//Personal.Views.IniciarSesion 
module.exports = Backbone.View.extend({

	events: {
      "click #iniciar_sesion": "login",
      "keyup #login_password": "loginEnter",
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
  loginEnter: function(event){
      if(event.keyCode == 13){
        this.login();
      } 
  },
  mostrar_menu: function(menu,icono,clase2){
      if (this.menu_permisos === "*" || this.menu_permisos.split(',').indexOf(menu)>=0){
         var elemento ='<li class="li_menu" hidden><a class="' + menu + ' ico_nav" href="#"><i class="fa ' + icono +' fa-3x"></i></a></li>';
         $("#menu_principal").append(elemento); 
      }
  },
  permisosMenu: function(){
     $("#menu_principal").empty();
    var permiso = new Permisos()
    self = this;
    permiso.fetch({
            headers: {'Authorization' :localStorage.token},
            success: function(data){
              self.menu_permisos = data.toJSON().Permiso;
              self.mostrar_menu('personal','fa-group')
              self.mostrar_menu('empresas','fa-industry')
              self.mostrar_menu('movimientos','fa-user-plus')
              self.mostrar_menu('catalogosli','fa-th')
              self.mostrar_menu('uniformes','fa-user-secret')
              self.mostrar_menu('incidencias','fa-check-square-o')
              self.mostrar_menu('conempresapersona','fa-indent')
              self.mostrar_menu('conincidencias','fa-calendar')

              var cerrar_sesion = '<li class="li_menu" hidden><a class="cerrar_sesion ico_logout" href="#"><i class="fa fa-sign-out fa-2x"></i></a></li>'
               $("#menu_principal").append(cerrar_sesion);
              },
            error: function(model,response, options) {

              }
          });
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
            $('.login').css("visibility", "hidden");
            $(".li_menu").css("visibility", "visible");
            $('.caja_acciones').show();

            self.permisosMenu();


            /*gadministrador =["raul","carlos.oaxaca","oakland.magana"]
            gencargado=["martin.cardona","monica.penilla","mirian.chavez"]
            gsupervisor = ["raul.torres","rulo","heron.yanez","roman.osorio","ernesto.uruzieta","martin.martinez","jose.alvarado","felipe.gomez"]
            visible = "hidden"
            if(gadministrador.includes(self.usuario)){
              visible = "visible"
            }
            if(gencargado.includes(self.usuario)){
              visible = "visible"
            }*/
            /*  $(".personal").css("visibility", visible);
              $(".empresas").css("visibility", visible);
              $(".movimientos").css("visibility", visible);
              $(".catalogosli").css("visibility", visible);
              $(".conempresapersona").css("visibility", visible);
       */

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
