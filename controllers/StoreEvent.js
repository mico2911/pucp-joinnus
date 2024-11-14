// Controlador para ver el detalle de un evento desde la tienda
const Evento       = require('../models/evento');
const Usuario      = require('../models/usuario');
const Categoria    = require('../models/categoria');
const eventsHelper = require ('../scripts/helpers/eventsHelper');
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

exports.getListadoEventos = async (req, res) => {
    const searchTerm = req.query.searchTerm || '';
    const categorias = await Categoria.find();
    const citiesOptions = eventsHelper.getCitiesOptions();

    Evento
    .find()
    .then(eventos => {

        const eventosFormateados = eventos.map(evento => {
            const fechaFormateada = format(evento.fecha, 'dd/MM/yyyy');
            return {
                ...evento.toObject(),
                fecha: fechaFormateada
            };
        });

        res.render('tienda/events/listado-eventos', {
            eventos       : eventosFormateados,
            categorias    : categorias,
            citiesOptions : citiesOptions,
            modoEdicion   : false,
            titulo        : "Encuentra eventos", 
            opcion        : 'listadoEventos'
        });
    })
    .catch(err => console.log(err));
}