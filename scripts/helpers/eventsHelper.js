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

module.exports = {
    obtenerEventosConCategorias : obtenerEventosConCategorias
};