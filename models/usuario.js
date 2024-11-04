const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    dni: { type: String, required: false },
    fechaNacimiento: { type: String, required: false },
    genero: { type: String, required: false },
    celular: { type: String, required: false },
    correo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    eventosFavoritos: [{ type: Schema.Types.ObjectId, ref: 'Evento' }]
});

module.exports = mongoose.model('Usuarios', usuarioSchema);