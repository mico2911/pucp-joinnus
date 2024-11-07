const eventsHelper = require ('../scripts/helpers/eventsHelper');
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');

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

    Usuario.findOne({ correo: correo })
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

exports.getMiPerfil = (req, res, next) => {
    const citiesOptions = eventsHelper.getCitiesOptions();

    var autenticado = req.session.autenticado;
    var dataUser    = null;

    if (autenticado) {
        dataUser    = req.session.usuario;
    }

    res.render('tienda/profile/mi-perfil', {
        titulo        : 'Mi Perfil',
        tituloSeccion : 'Información de mi cuenta',
        opcion        : 'infoPersonal',
        autenticado   : req.session.autenticado,
        citiesOptions : citiesOptions,
        editingEvent  : false,
        usuario       : dataUser
    });
};

exports.getSeguridadPage = (req, res, next) => {
    var autenticado = req.session.autenticado;
    var dataUser    = null;

    if (autenticado) {
        dataUser    = req.session.usuario;
    }

    res.render('tienda/profile/seguridad-page', {
        titulo        : 'Mi Perfil',
        tituloSeccion : 'Seguridad y contraseña',
        opcion        : 'seguridad',
        autenticado   : req.session.autenticado,
        usuario       : dataUser
    });
};

exports.getWishlistPage = (req, res, next) => {
    var autenticado = req.session.autenticado;
    var dataUser    = null;

    if (autenticado) {
        dataUser    = req.session.usuario;
    }

    Usuario.findById(dataUser._id)
    .populate('eventosFavoritos', 'nombre urlImagen')
    .then(usuario => {

        var eventosFavoritos    = [];
        var hayEventosFavoritos = false;


        if (usuario.eventosFavoritos && usuario.eventosFavoritos.length > 0) {
            eventosFavoritos    = usuario.eventosFavoritos;
            hayEventosFavoritos = true;
        }                    

        return res.render('tienda/profile/wishlist-page', {
            titulo        : 'Mi Perfil',
            tituloSeccion : 'Eventos favoritos',
            opcion        : 'wishlist',
            autenticado   : req.session.autenticado,
            usuario       : dataUser,
            hayEventosFavoritos : hayEventosFavoritos,
            eventosFavoritos    : eventosFavoritos
        });
    })
};

exports.postAgregarWishlist = (req, res, next) => {
    const idEvento = req.body.idEvento;

    var autenticado = req.session.autenticado;
    var dataUser    = null;

    if (autenticado) {
        dataUser = req.session.usuario;

        Usuario.findById(dataUser._id)
        .then(usuario => {
            return usuario.agregarEventoWishlist(idEvento);
        })
        .then(result => {
            console.log(result);
            res.redirect('/tienda/detalle-evento/' + idEvento);
        });
    }    
};


exports.postRemoveWishlist = (req, res, next) => {
    const idEvento      = req.body.idEvento;
    const isFromProfile = req.body.isFromProfile;

    var autenticado = req.session.autenticado;
    var dataUser    = null;

    if (autenticado) {
        dataUser = req.session.usuario;

        Usuario.findById(dataUser._id)
        .then(usuario => {
            return usuario.eliminarEventoWishlist(idEvento);
        })
        .then(result => {
            console.log(result);
            if (isFromProfile) {
                res.redirect('/perfil/wishlist/');
            } else {
                res.redirect('/tienda/detalle-evento/' + idEvento);
            }            
        });
    }    
};