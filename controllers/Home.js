// Controlador para mostrar el Home
const Evento = require('../models/evento');

exports.getEventos = (req, res, next) => {
    let eventos = [];
    Evento.getEventsList(eventosObtenidos => {
        eventos = eventosObtenidos;
        res.render('lista-eventos', {
            ev: eventos,
            titulo: "Nuestros Eventos", 
            path: "/eventos"
        });
    });
};

exports.getEvento = (req, res) => {
    const codigoEvento = req.params.codigoEvento;
    Evento.findByCode(codigoEvento, (evento)=>{
        res.render('tienda/detalle-producto', {
            ev : evento,
            titulo: evento.nombre,
            path: '/eventos',
        });
    })
}

exports.getIndex = (req, res, next) => {
    console.log('Ruta raíz alcanzada');
    Evento.getEventsList(eventos => {
        res.render('tienda/home', {
            ev: eventos,
            titulo: "Bienvenido a Joinnus", 
            path: "/"
        });
    });
};
