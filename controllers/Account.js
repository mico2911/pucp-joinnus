// Controlador para manejar las cuentas
const fs = require('fs');
const path = require('path');
const usuariosPath = path.join(__dirname, '..', 'data', 'usuarios.json');

// Función para guardar nuevos usuarios en usuarios.json
function saveUser(user) {
    const users = JSON.parse(fs.readFileSync(usuariosPath, 'utf8'));
    users.push(user);
    fs.writeFileSync(usuariosPath, JSON.stringify(users, null, 2));
}

// Controlador para manejar el registro
exports.register = async (req, res) => {
    const { nombre, apellido, correo, password } = req.body;

    // Verificar si el usuario ya existe
    const users = JSON.parse(fs.readFileSync(usuariosPath, 'utf8'));
    const existingUser = users.find(user => user.correo === correo);
    if (existingUser) {
        return res.status(400).send('Este correo ya está registrado.');
    }

    const newUser = {
        nombre,
        apellido,
        correo,
        password
    };

    saveUser(newUser);
    res.redirect('/tienda/login');
};