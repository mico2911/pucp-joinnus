// Controlador para ver el detalle de un evento desde la tienda
const Evento = require('../models/evento');

exports.getDetalleEventoTienda = async (req, res) => {
    const idEvento = req.params.idEvento;

    try {
        Evento.findById(idEvento)
        .then(evento => {
            if (!evento) {
                return res.status(404).render('error', {
                    mensaje: "Evento no encontrado."
                });
            }

            res.render('tienda/events/detalle-evento', {
                titulo: evento.nombre,
                evento: evento,
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