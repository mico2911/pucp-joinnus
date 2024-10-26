const eventsHelper = require ('../scripts/helpers/eventsHelper');
const Evento       = require('../models/evento');
const Categoria    = require('../models/categoria');

exports.getListaEventos = async (req, res) => {
    Evento
    .find().populate('categoria')
    .then(productos => {
        res.render('backoffice/events/listar-eventos', {
            eventos       : productos,
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

    Evento.findByCode(idEvento, evento => {
        
        if (!evento) {
            return res.redirect('/');
        }

        let categorias = [];
        
        Categoria.getCategoriesList(categoriasObtenidas => {
            categorias = categoriasObtenidas;

            res.render('backoffice/events/detalle-evento', { 
                titulo        : 'Editar Producto',             
                tituloSeccion : 'Edición de eventos',
                opcion        : 'listadoEventos',
                categorias    : categorias,
                evento        : evento,
                categoriaSeleccionada : evento.codCategoria, 
                modoEdicion   : true,
            })
        })
    })
}

exports.postEditarEvento = (req, res, next) => {
    const codigo       = req.body.codigo;
    const nombre       = req.body.nombre;
    const urlImagen    = req.body.urlImagen;
    const codCategoria = req.body.codCategoria;    
    const descripcion  = req.body.descripcion;
    const fecha        = req.body.fecha;
    const hora         = req.body.hora;
    const lugar        = req.body.lugar;
    const ciudad       = req.body.ciudad;

    const eventoActualizado = new Evento(codigo, nombre, urlImagen, codCategoria, descripcion, fecha, hora, lugar, ciudad);
    
    eventoActualizado.save();
    res.redirect('/backoffice/listado-eventos');
};
