const eventsHelper = require ('../scripts/helpers/eventsHelper');
const Evento       = require('../models/evento');
const Categoria    = require('../models/categoria');

exports.getListaEventos = async (req, res) => {
    try {
        const eventosConCategorias = await eventsHelper.obtenerEventosConCategorias();
        
        res.render('backoffice/events/listar-eventos', {
            eventos       : eventosConCategorias,
            titulo        : "Administracion de eventos", 
            tituloSeccion : 'Listado de eventos',
            opcion        : 'listadoEventos'
        });
    } catch (error) {
        console.log('Error en el controlador OfficeEvent - getListaEventos: ', error);

        res.status(500).render('error', {
            mensaje: "No se pudieron cargar los eventos."
        });
    }
};

exports.getCrearEvento = (req, res) => {
    let categorias = [];
    Categoria.getCategoriesList(categoriasObtenidas => {
        categorias = categoriasObtenidas;

        res.render('backoffice/events/detalle-evento', { 
            titulo        : 'Creación Evento', 
            tituloSeccion : 'Creación de eventos',
            opcion        : 'creacionEvento',
            categorias    : categorias,
            modoEdicion   : false
        })
    })
};

exports.postCrearEvento = (req, res) => {
    const nombre       = req.body.nombre;
    const urlImagen    = req.body.urlImagen;
    const codCategoria = req.body.codCategoria;    
    const descripcion  = req.body.descripcion;
    const fecha        = req.body.fecha;
    const hora         = req.body.hora;
    const lugar        = req.body.lugar;
    const ciudad       = req.body.ciudad;

    const evento = new Evento(null, nombre, urlImagen, codCategoria, descripcion, fecha, hora, lugar, ciudad);

    evento.save();

    res.redirect('/backoffice/listado-eventos');
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
