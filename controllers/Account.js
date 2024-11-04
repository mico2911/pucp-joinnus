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
