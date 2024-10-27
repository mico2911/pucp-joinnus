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
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00'
    ]
}

module.exports = {
    obtenerEventosConCategorias : obtenerEventosConCategorias,
    getHoursOptions             : getHoursOptions
};