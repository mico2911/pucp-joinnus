const path       = require('path');
const fileHelper = require('../scripts/helpers/fileHelper');

const raizDir = require('../scripts/utils/path');
const p       = path.join(raizDir, 'data', 'categorias.json');

module.exports = class Categoria {

    constructor(codigo, nombre) {
        this.codigo = codigo;
        this.nombre = nombre;
    }

    static fetchAllCategories() {
        return fileHelper.leerArchivoJSON(p);
    }

    static getCategoriesList(cb) {
        fileHelper.getDataFromFile(p, categorias => {
            cb(categorias);
        })
    }
}