// Controlador para ver el detalle de un evento desde la tienda
const Evento      = require('../models/evento');
const TipoEntrada = require('../models/tipoEntrada');
const { format } = require('date-fns');

exports.getDetalleEventoTienda = async (req, res) => {
    const idEvento = req.params.idEvento;

    try {
        Evento.findById(idEvento).populate({
            path: 'catalogoEntradas',
            populate: {
                path: 'tipoEntrada',
                select: 'nombre'
            }
        })
        .then(evento => {
            if (!evento) {
                return res.status(404).render('error', {
                    mensaje: "Evento no encontrado."
                });
            }

            const fechaFormateada = format(evento.fecha, 'dd/MM/yyyy');

            res.render('tienda/events/detalle-evento', {
                titulo: evento.nombre,
                evento: evento,
                fechaFormateada : fechaFormateada, 
                opcion: 'detalleEvento'
            })
        })
        .catch(err => {
            console.log(err);
        });
    } catch (e) {
        console.log(e);
    }
}