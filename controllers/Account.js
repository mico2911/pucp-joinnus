// Controlador para manejar las cuentas
const fs = require('fs');
const path = require('path');
const usuariosPath = path.join(__dirname, '..', 'data', 'usuarios.json');

const eventsHelper = require ('../scripts/helpers/eventsHelper');
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');

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

exports.getRegistrarse = (req, res, next) => {
    const citiesOptions = eventsHelper.getCitiesOptions();

    let mensaje = req.flash('error');
    if (mensaje.length > 0) {
      mensaje = mensaje[0];
    } else {
      mensaje = null;
    }
    res.render('auth/registrarse', {
        path          : '/registrarse',
        titulo        : 'Registrarse',
        citiesOptions : citiesOptions,
        editingEvent  : false,
        autenticado   : false,
        mensajeError  : mensaje
    });
};

exports.postRegistrarse = (req, res, next) => {
    const nombre             = req.body.nombre;
    const apellido           = req.body.apellido;
    const correo             = req.body.correo;
    const correoConfirmado   = req.body.correoConfirmado;
    const password           = req.body.password;
    const passwordConfirmado = req.body.passwordConfirmado;
    const genero             = req.body.genero;
    const ciudad             = req.body.ciudad;
    
    if (correo !== correoConfirmado) {
        req.flash('error', 'Los correos no coinciden.')
        res.redirect('/registrarse');
    }
    
    if (password !== passwordConfirmado) {
      req.flash('error', 'Las contraseñas no coinciden.')
      res.redirect('/registrarse');
    }    

    Usuario.findOne({ email: email })
    .then(usuarioDoc => {
        if (usuarioDoc) {
          req.flash('error', 'Este correo ya se encuentra registrado.')
          return res.redirect('/registrarse');
        }

        return bcrypt.hash(password, 10)
        .then(passwordCifrado => {
            const usuario = new Usuario({
                nombre   : nombre,
                apellido : apellido,
                correo   : correo,                
                password : passwordCifrado,
                genero   : genero,
                ciudad   : ciudad
            });

            return usuario.save();
        });
    })
    .then(result => {
        res.redirect('/ingresar');
    })
    .catch(err => {
        console.log(err);
    });
};
