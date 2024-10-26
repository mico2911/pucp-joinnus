const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    dni: { type: String, required: true },
    fechaNacimiento: { type: String, required: false },
    genero: { type: String, required: false },
    celular: { type: String, required: false },
    correo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    eventosFavoritos: [{ type: Schema.Types.ObjectId, ref: 'Evento' }],
    compras: [{ type: Schema.Types.ObjectId, ref: 'Compra' }]
});

module.exports = mongoose.model('Usuarios', usuarioSchema);