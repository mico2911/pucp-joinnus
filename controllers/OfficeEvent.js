const { format }   = require('date-fns');
const eventsHelper = require ('../scripts/helpers/eventsHelper');
const Evento       = require('../models/evento');
const Categoria    = require('../models/categoria');

exports.getListaEventos = async (req, res) => {
    Evento
    .find().populate('categoria')
    .then(eventos => {
        res.render('backoffice/events/listar-eventos', {
            eventos       : eventos,
            titulo        : "Administracion de eventos", 
            tituloSeccion : 'Listado de eventos',
            opcion        : 'listadoEventos'
        });
    })
    .catch(err => console.log(err));
};

exports.getCrearEvento = (req, res) => {
    Categoria
    .find()
    .then(categorias => {
        res.render('backoffice/events/detalle-evento', { 
            titulo        : 'Creación Evento', 
            tituloSeccion : 'Creación de eventos',
            opcion        : 'creacionEvento',
            categorias    : categorias,
            modoEdicion   : false
        })
    })
    .catch(err => console.log(err));
};

exports.postCrearEvento = (req, res) => {
    const nombre       = req.body.nombre;
    const urlImagen    = req.body.urlImagen;
    const idCategoria = req.body.idCategoria;
    const descripcion  = req.body.descripcion;
    const fecha        = req.body.fecha;
    const hora         = req.body.hora;
    const lugar        = req.body.lugar;
    const ciudad       = req.body.ciudad;

    const evento = new Evento({
        nombre      : nombre, 
        descripcion : descripcion,
        categoria   : idCategoria,
        fecha       : fecha,
        hora        : hora,
        lugar       : lugar,
        ciudad      : ciudad,
        urlImagen   : urlImagen
    });

    evento
      .save()
      .then(result => {
        console.log('Evento Creado');
        res.redirect('/backoffice/listado-eventos');
      })
      .catch(err => {
        console.log(err);
    });
};

exports.getEditarEvento = (req, res) => {
    const idEvento = req.params.idEvento;

    Categoria
    .find()
    .then(categorias => {
        Evento.findById(idEvento)
        .then(evento => {
            if (!evento) {
                return res.redirect('/backoffice/listado-eventos');
            }

            res.render('backoffice/events/detalle-evento', { 
                titulo        : 'Editar Producto',             
                tituloSeccion : 'Edición de eventos',
                opcion        : 'listadoEventos',
                categorias    : categorias,
                evento        : evento,
                fechaEvento   : format(evento.fecha, 'yyyy-MM-dd'),
                categoriaSeleccionada : evento.categoria, 
                modoEdicion   : true,
            })
        })
        .catch(err => {
            console.log(err);
            return res.redirect('/backoffice/listado-eventos');
        });
    })
    .catch(err => console.log(err));
}

exports.postEditarEvento = (req, res, next) => {
    const idEvento     = req.body.idEvento;
    const nombre       = req.body.nombre;
    const urlImagen    = req.body.urlImagen;
    const categoria    = req.body.idCategoria;
    const descripcion  = req.body.descripcion;
    const fecha        = req.body.fecha;
    const hora         = req.body.hora;
    const lugar        = req.body.lugar;
    const ciudad       = req.body.ciudad;

    Evento.findById(idEvento)
    .then(producto => {
      producto.nombre      = nombre;
      producto.urlImagen   = urlImagen;
      producto.categoria   = categoria;
      producto.descripcion = descripcion;
      producto.fecha       = fecha;
      producto.hora        = hora;
      producto.lugar       = lugar;
      producto.ciudad      = ciudad;
      return producto.save();
    })
    .then(result => {
      res.redirect('/backoffice/listado-eventos');
    })
    .catch(err => console.log(err));
};

exports.postEliminarEvento = (req, res, next) => {
    const idEvento = req.body.idEvento;
    Evento.findByIdAndDelete(idEvento)
      .then(() => {
        res.redirect('/backoffice/listado-eventos');
      })
      .catch(err => console.log(err));
}; 
