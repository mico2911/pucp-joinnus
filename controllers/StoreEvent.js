// Controlador para ver el detalle de un evento desde la tienda
const Evento      = require('../models/evento');
const Usuario     = require('../models/usuario');
const TipoEntrada = require('../models/tipoEntrada');
const { format } = require('date-fns');

exports.getDetalleEventoTienda = async (req, res) => {
    const idEvento = req.params.idEvento;

    var autenticado  = req.session.autenticado;
    var dataUser     = null;
    var isWishlisted = false;

    if (autenticado) {
        dataUser    = req.session.usuario;
    }

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

            if (!autenticado) {
                return res.render('tienda/events/detalle-evento', {
                    titulo          : evento.nombre,
                    evento          : evento,
                    autenticado     : false,
                    isAdmiUser      : false,
                    isWishlisted    : false,
                    usuario         : null,
                    fechaFormateada : fechaFormateada, 
                    opcion          : 'detalleEvento'
                })
            } else {
                Usuario.findById(dataUser._id)
                .then(usuario => {

                    if (usuario.eventosFavoritos && usuario.eventosFavoritos.length > 0) {
                        const index = usuario.eventosFavoritos.findIndex(evento => evento._id == idEvento);

                        isWishlisted = index > -1;                        
                    }

                    var isAdmiUser = dataUser.isAdmin;

                    return res.render('tienda/events/detalle-evento', {
                        titulo          : evento.nombre,
                        evento          : evento,
                        autenticado     : autenticado,
                        isAdmiUser      : isAdmiUser,
                        isWishlisted    : isWishlisted,
                        usuario         : dataUser,
                        fechaFormateada : fechaFormateada, 
                        opcion          : 'detalleEvento'
                    })
                })
            }        
        })
        .catch(err => {
            console.log(err);
        });
    } catch (e) {
        console.log(e);
    }
}