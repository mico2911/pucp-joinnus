const Evento = require('../../models/evento');
const Categoria = require('../../models/categoria');

function obtenerEventosConCategorias() {
    return Promise.all([Evento.fetchAllEvents(), Categoria.fetchAllCategories()])
        .then(([eventos, categorias]) => {            
            const categoriasMapa = {};
            categorias.forEach(categoria => {                
                categoriasMapa[categoria.codigo] = categoria.nombre;
            });

            return eventos.map(evento => ({
                ...evento,
                nombreCategoria: categoriasMapa[evento.codCategoria] || 'Categoría desconocida'
            }));
        })
        .catch(error => {
            throw new Error('No se pudieron cargar los eventos o categorías: ' + error.message);
        });
}

function getHoursOptions() {
    return [
        '08:00 AM',
        '09:00 AM',
        '10:00 AM',
        '11:00 AM',
        '12:00 PM',
        '01:00 PM',
        '02:00 PM',
        '03:00 PM',
        '04:00 PM',
        '05:00 PM',
        '06:00 PM',
        '07:00 PM',
        '08:00 PM',
        '09:00 PM',
        '10:00 PM'
    ]
}

module.exports = {
    obtenerEventosConCategorias : obtenerEventosConCategorias,
    getHoursOptions             : getHoursOptions
};