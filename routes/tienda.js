const express = require('express');
const router = express.Router();

const homeController = require ('../controllers/Home');
const accountController = require('../controllers/Account');
const loginController = require('../controllers/Login');
const storeEventController = require('../controllers/StoreEvent');

router.get ('/', homeController.getIndex);
//router.get ('/eventos', homeController.getEventos);

router.get('/register', (req, res) => {
    res.render('tienda/register');
});

router.post('/register', accountController.register);

router.get('/login', (req, res) => {
    res.render('tienda/login');
});

router.post('/login', loginController.login);

router.get('/detalle-evento/:idEvento', storeEventController.getDetalleEventoTienda);

module.exports = router;