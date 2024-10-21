const path         = require('path');
const fs           = require('fs');
const fileHelper   = require('../scripts/helpers/fileHelper');

const raizDir = require('../scripts/utils/path');
const p       = path.join(raizDir, 'data', 'eventos.json');

module.exports = class Evento {

    constructor(codigo, nombre, urlImagen, codCategoria, descripcion, fecha, hora, lugar, ciudad) {        
        this.codigo = codigo;
        this.nombre = nombre;
        this.urlImagen = urlImagen;
        this.codCategoria = codCategoria;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.hora = hora;
        this.lugar = lugar;
        this.ciudad = ciudad;        
    }

    getFechaYHora() {
        return this.fecha + ' ' + this.hora;
    }

    save() {        
        fileHelper.getDataFromFile(p, eventos => {
            if (this.codigo) {
                const indiceEventoExistente = eventos.findIndex(
                    eve => eve.codigo === this.codigo
                );
                const eventoActualizados = [...eventos];
                eventoActualizados[indiceEventoExistente] = this;
                fs.writeFile(p, JSON.stringify(eventoActualizados), err => {
                    console.log(err);
                });
            } else {
                const lastCodigo = eventos[eventos.length - 1].codigo;
                const lastNumber = parseInt(lastCodigo.replace("EVT", ""), 10);
                const newCodigo = `EVT${(lastNumber + 1).toString().padStart(3, '0')}`;
                this.codigo = newCodigo;
                eventos.push(this);
                fs.writeFile(p, JSON.stringify(eventos), err => {
                    console.log(err);
                });
            }
        });
    }

    static fetchAllEvents() {
        return fileHelper.leerArchivoJSON(p);
    }

    static findByCode(codigo, cb) {
        fileHelper.getDataFromFile(p, eventos => {
            const evento = eventos.find(eve => eve.codigo === codigo);
            cb(evento);
        })
    }

}