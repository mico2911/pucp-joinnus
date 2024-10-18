const eventsHelper = require ('../scripts/helpers/eventsHelper');

exports.getListaEventos = async (req, res) => {
    try {
        const eventosConCategorias = await eventsHelper.obtenerEventosConCategorias();
        
        res.render('backoffice/events/listar-eventos', {
            eventos       : eventosConCategorias,
            titulo        : "Administracion de eventos", 
            tituloSeccion : 'Listado de eventos',
            opcion        : "listadoEventos"
        });
    } catch (error) {
        console.log('Error en el controlador OfficeEvent - getListaEventos: ', error);

        res.status(500).render('error', {
            mensaje: "No se pudieron cargar los eventos."
        });
    }
};