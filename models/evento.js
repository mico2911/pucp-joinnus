const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventoSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    fecha: { type: Date, required: true },
    hora: { type: String, required: true },
    lugar: { type: Date, required: true },
    ciudad: { type: String, required: true },
    urlImagen: { type: String, required: true },
    catalogoEntradas: [{
        tipoEntrada: { type: Schema.Types.ObjectId, ref: 'TipoEntrada', required: true },
        precio: { type: Number, required: true },
        cantidadVenta: { type: Number, required: true },
        cantidadDisponibles: { type: Number, required: true }
    }],
    activo: { type: Boolean, default: true }
});

module.exports = mongoose.model('Evento', eventoSchema);