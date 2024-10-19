const eventsHelper = require ('../scripts/helpers/eventsHelper');
const Evento       = require('../models/evento');

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
    res.render('backoffice/events/detalle-evento', { 
        titulo        : 'Creación Evento', 
        tituloSeccion : 'Creación de eventos',
        opcion        : 'creacionEvento',
        modoEdicion   : false
    })
};

exports.getEditarEvento = (req, res) => {
    const idEvento = req.params.idEvento;

    Evento.findByCode(idEvento, evento => {
        
        if (!evento) {
            return res.redirect('/');
        }

        res.render('backoffice/events/detalle-evento', { 
            titulo        : 'Editar Producto',             
            tituloSeccion : 'Edición de eventos',
            opcion        : 'listadoEventos',
            evento        : evento,
            modoEdicion   : true,
        })
    })
}