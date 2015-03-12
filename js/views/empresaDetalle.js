Personal.Views.EmpresaDetalle = Backbone.View.extend({
  events : {
     "change #empresa_estado": function(){ this.llenadoComboDependiente(this.catMunicipio,'15', $( "#empresa_estado").val(),'',"#empresa_municipio");},
   },

  el: $('#bloque_empresa'),
  className: 'ul_bloque',
  tagName: 'ul',
  template: Handlebars.compile($("#empresa-detalle-template").html()),

  initialize: function () {
    this.catMunicipio = new Personal.Collections.Catalogos();  
    this.listenTo(this.model, "change", this.llenado, this);
  },
  reset: function()
  {
    console.log("valores por defecto");
  },
  llenado: function(){
    console.log("llenando el formulario");
    if(this.model.get("id")!=="-1"){
      this.render();
    }
  }, 
  render: function () {
   console.log("buscando en el render");
   var detalle = this.model.toJSON();
   var html = this.template(detalle);
   this.$el.html(html);


   var empresaTitulo = new Personal.Views.EmpresaDescripcion({model: this.model});
   $("#sucursal_padre").empty();
   $("#sucursal_padre").append(empresaTitulo.render().el);
   $('#bloque_empresa').show();
   $('#bloque_sucursal').empty();
   

   var self = this;   
   $("#empresa_fecha_alta").datepicker({dateFormat:"dd/mm/yy"});


    var EmpresaCatalogos = new Personal.Collections.Catalogos();
    EmpresaCatalogos.claves ="14,19,18";
  
    EmpresaCatalogos.fetch(
      {
        success: function(){
          
          self.llenadoCatalogosCombo(EmpresaCatalogos.Estados(),detalle["cdu_estado"],"#empresa_estado");

          self.llenadoCatalogosCombo(EmpresaCatalogos.Giro(),detalle["cdu_giro"],"#empresa_giro");

          self.llenadoCatalogosCombo(EmpresaCatalogos.Rubro(),detalle["cdu_rubro"],"#empresa_rubro");
        }
          
    });


          this.llenadoComboDependiente(this.catMunicipio,'15', detalle["cdu_estado"],detalle["cdu_municipio"],"#empresa_municipio");

    },
    llenadoCatalogosCombo: function(catalogo,cdu_seleccion,id_selector){
          var cat = new Backbone.Collection(catalogo);
          var vis = new Personal.Views.PersonalCatalogos({
            collection: cat,cdu_seleccionado:cdu_seleccion,id_select: id_selector });
          vis.render();

    },
   llenadoComboDependiente: function(catalogo,id_catalogo,cdu_default,cdu_seleccion,id_selector){
      catalogo.claves = id_catalogo;
      catalogo.cdu_default = cdu_default;
      var cat = catalogo;
      catalogo.fetch({
              success: function(){
                  var vista = new Personal.Views.PersonalCatalogos({
                   collection: cat,cdu_seleccionado: cdu_seleccion ,id_select: id_selector });
                  vista.render();
                }
            });
      this.mostrarSucursalLista(this.model.get("id"));
      //this.mostrarMapa(this.model.get("latitud"),this.model.get("longitud"));
      var mimapa= new Personal.Views.SucursalMapa();
      mimapa.mostrarMapa(this.model.get("latitud"),this.model.get("longitud"));

   },
   mostrarSucursalLista: function(id_empresa){
      Personal.app.SucursalLista.id_empresa = id_empresa;
      Personal.app.SucursalLista.reset();
      Personal.app.SucursalLista.fetch();
   },
  mostrarMapa: function(latitud,longitud){
        var pos_ini = parseFloat(latitud);
        var pos_fin = parseFloat(longitud);
        //pos_ini= -99.1696;
        //pos_fin = 19.5225;

        var map = new ol.Map({
          target: 'mapa',
          layers: [
            new ol.layer.Tile({
              source: new ol.source.MapQuest({layer: 'osm'})
            })
          ],
          view: new ol.View({
            center: ol.proj.transform([pos_ini, pos_fin], 'EPSG:4326', 'EPSG:3857'),
            zoom: 14
          })
        });

        map.addOverlay(new ol.Overlay({
          position: ol.proj.transform(
            [pos_ini, pos_fin],
            'EPSG:4326',
            'EPSG:3857'
          ),
       element: $('<img src="images/marker.png" height=20px weight=20px>')
       }));
  },


relacionColumnas: function(){
      var columnasCampos ={
     		"id": "#empresa_id",
				"cve_empresa": "#empresa_clave",
				"razon_social": "#empresa_razon_social",
				"rfc": "#empresa_rfc",
				"calle": "#empresa_calle",
				"numero": "#empresa_numero",
				"colonia": "#empresa_colonia",
				"cp": "#empresa_cp",
				"cdu_estado": "#empresa_estado",
				"cdu_municipio": "#empresa_municipio",
				"ciudad": "#empresa_ciudad",
				"telefono1": "#empresa_telefono1",
				"telefono2": "#empresa_telefono2",
				"cdu_giro": "#empresa_giro",
				"cdu_rubro": "#empresa_rubro",
				"fecha_alta":"#empresa_fecha_alta",
           };
      return columnasCampos;
   },
guardar: function(){
    var data =this.generarJSON();
     var self = this;
    var model = new Personal.Models.empresa(data);
    model.valor = undefined;
    model.pk= data["id"];
    
    this.tipo='POST'
    if(window.Personal.operacion!=="nuevo"){
      this.tipo='PUT';
    }
   
    model.save(null,{
        type: self.tipo,
        success: function(model,response) {
            $('#empresa_id').text(model.get("id"));
            window.Personal.operacion="buscar";
            $("#notify_success").notify();
          },
        error: function(model,response, options) {
             $("#notify_error").notify();
              console.log(response.responseText);
             // var responseObj = $.parseJSON(response.responseText);
             // console.log(responseObj);
   //           for(campo in responseObj){ console.log(campo); }
        }

    });
    //CREAETE SEND POST
    // PARA PATCH:
    //model.clear().set({id: 1, a: 1, b: 2, c: 3, d: 4}); 
    //model.save();
    //model.save({b: 2, d: 4}, {patch: true});

  },
  
generarJSON: function(){
      var data ={};
      var relacion =this.relacionColumnas();
      for(var campo in relacion)
      {
        if (relacion.hasOwnProperty(campo))
        {
           var elemento  =$(relacion[campo]).get(0).tagName;
           var tipo = $(relacion[campo]).get(0).type;
           var id_control = relacion[campo];

           if (elemento === "LABEL"){
              data[campo] = $(id_control).text();
           }      
           else if (elemento === "INPUT" || elemento==='TEXTAREA' || elemento==="SELECT"){
              if(tipo=='radio'){
                 data[campo] = $(id_control).get(0).checked
              }
              else{
                 data[campo] = $(id_control).val();
              }
           }      
        }
      }
      return data;
   },
});

