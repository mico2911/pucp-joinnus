const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

exports.getIngresar = (req, res, next) => {
    let mensaje = req.flash('error');
    if (mensaje.length > 0) {
      mensaje = mensaje[0];
    } else {
      mensaje = null;
    }
    res.render('auth/ingresar', {
      path: '/ingresar',
      titulo: 'Ingresar',
      autenticado: false,
      mensajeError: mensaje
    });
};

exports.postIngresar = (req, res, next) => {
    const correo = req.body.correo;
    const password = req.body.password;

    Usuario.findOne({ correo: correo })
    .then(usuario => {
      if (!usuario) {
        req.flash('error', 'El correo no está registrado')
        return res.redirect('/ingresar');
      }
      bcrypt.compare(password, usuario.password)
        .then(hayCoincidencia => {
          if(hayCoincidencia) {
            req.session.autenticado = true;
            req.session.usuario = usuario;
            return req.session.save(err => {
              console.log(err);
              if (usuario.isAdmin) {
                res.redirect('/backoffice/listado-eventos')
              } else {
                res.redirect('/tienda')
              }              
            })
          }
          req.flash('error', 'Las credenciales son invalidas')
          res.redirect('/ingresar');
        })
        .catch(err => console.log(err));
    })
};

exports.postSalir = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/tienda');
  });
};

exports.getReinicio = (req, res, next) => {
  let mensaje = req.flash('error');
  if (mensaje.length > 0) {
    mensaje = mensaje[0];
  } else {
    mensaje = null;
  }
  res.render('auth/reinicio', {
    path: '/reinicio',
    titulo: 'Reinicio Password',
    mensajeError: mensaje
  });
};

exports.postReinicio = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect('/reinicio');
    }
    const token = buffer.toString('hex');
    Usuario.findOne({ email: req.body.correo })
      .then(usuario => {
        if (!usuario) {
          req.flash('error', 'No se encontro usuario con dicho correo');
          return res.redirect('/reinicio');
        }
        usuario.tokenReinicio = token;
        usuario.expiracionTokenReinicio = Date.now() + 3600000; // + 1 hora
        return usuario.save();
      })
      .then(result => {
        res.redirect('/');
        /*transporter.sendMail({
          to: req.body.email,
          from: 'jcabelloc@itana.pe',
          subject: 'Reinicio de Password',
          html: `
            <p>Tu has solicitado un reinicio de password</p>
            <p>Click aqui <a href="http://localhost:3000/reinicio/` + token + `">link</a> para establecer una nuevo password.</p>
          `
        });*/
      })
      .catch(err => {
        console.log(err);
      });
  });
};
