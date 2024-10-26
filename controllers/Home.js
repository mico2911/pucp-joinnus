// Controlador para mostrar el Home
const Evento = require('../models/evento');

exports.getEventos = (req, res, next) => {
    Evento
    .find()
    .then(eventos => {
        res.render('lista-eventos', {
            ev     : eventos,
            titulo : "Nuestros Eventos", 
            path   : "/eventos"
        });
    })
    .catch(err => console.log(err));
};

exports.getEvento = (req, res) => {
    const codigoEvento = req.params.codigoEvento;
    Evento.findByCode(codigoEvento, (evento)=>{
        res.render('tienda/events/detalle-producto', {
            ev : evento,
            titulo: evento.nombre,
            path: '/eventos',
        });
    })
}

exports.getIndex = (req, res, next) => {
    console.log('Ruta raíz alcanzada');
    Evento
    .find()
    .then(eventos => {
        res.render('tienda/home', {
            ev     : eventos,
            titulo : "Bienvenido a Joinnus", 
            path   : "/"
        });
    })
    .catch(err => console.log(err));
};
