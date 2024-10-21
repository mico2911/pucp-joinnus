const express = require('express');
const router = express.Router();

const homeController = require ('../controllers/Home');
const accountController = require('../controllers/Account');
const loginController = require('../controllers/Login');

router.get ('/', homeController.getIndex);
router.get ('/eventos', homeController.getEventos);
router.get ('/eventos/:codigoEvento', homeController.getEvento);

router.get('/register', (req, res) => {
    res.render('tienda/register');
});

router.post('/register', accountController.register);

router.get('/login', (req, res) => {
    res.render('tienda/login');
});

router.post('/login', loginController.login);

module.exports = router;

module.exports = router;