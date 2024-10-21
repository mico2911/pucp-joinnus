// Controlador para iniciar sesión
const fs = require('fs');
const path = require('path');
const usuariosPath = path.join(__dirname, '..', 'data', 'usuarios.json');

// Controlador para manejar el inicio de sesión
exports.login = async (req, res) => {
    const { correo, password } = req.body;

    if (correo == 'admi@admi.pe' && password == '1234')  {        
        return res.redirect('/backoffice/listado-eventos');
    }

    // Verificar si el usuario existe
    const users = JSON.parse(fs.readFileSync(usuariosPath, 'utf8'));
    const user = users.find(user => user.correo === correo);
    if (!user) {
        return res.status(401).send('Usuario no encontrado.');
    }

    // Verificar si la contraseña es correcta
    const isPasswordCorrect = password == user.password;
    if (!isPasswordCorrect) {
        return res.status(401).send('Contraseña incorrecta.');
    }

    res.redirect('/tienda');
};