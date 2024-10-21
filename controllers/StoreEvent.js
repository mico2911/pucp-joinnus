// Controlador para ver el detalle de un evento desde la tienda
const Evento = require('../models/evento');

exports.getDetalleEventoTienda = async (req, res) => {
    const codEvento = req.params.codEvento;

    try {
        Evento.findByCode(codEvento, evento => {
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
    } catch (e) {
        console.log(e);
    }
}