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
    var x = document.getElementById("imagenform");
    if (!file) {
    return;
  }

  if (!file.name) {
    console.log('Trying to upload an invalid file');
    return;
  }

    var file =x.files[0]
    //var file=$("#imagenform")[0].files[0]
    var data = new FormData();

    data.append('image', file);

    $.ajax('http://192.168.122.1:8000/subirf/', {
        type:'POST',
        data: data,
        processData: false,
       contentType: false // it automaticly sets multipart/form-data; boundary=...
    });
  }
});

