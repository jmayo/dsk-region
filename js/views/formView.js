Personal.Views.FormView = Backbone.View.extend({

  // some more code here
initialize: function () {
  		//window.routers.base.on('router:root' , this.inicio());
  		//Personal.app.on("route:root", this.inicio());
   },
  events: {
    'submit form' : 'uploadFile'
  },
  el: $('.caja_acciones'),


  uploadFile: function(event) {
    event.preventDefault();
    var id =$("#persona_id").text();;
    var x = document.getElementById("imagencontrol");
    if (!x) {
    return;
  }

  if (!x.name) {
    console.log('Trying to upload an invalid file');
    return;
  }

    var file =x.files[0]
    //var file=$("#imagencontrol")[0].files[0]
    var data = new FormData();

    data.append('imagen', file);
    //'http://192.168.122.1:8000/subirf/'
    $.ajax('http://192.168.122.1:8000/personal/subir_imagen/' + id + '/', {
        type:'POST',
        data: data,
        processData: false,
       contentType: false // it automaticly sets multipart/form-data; boundary=...
    });
  }
});

