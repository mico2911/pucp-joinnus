const express = require('express');
const router = express.Router();

const accountController = require('../controllers/Account');
const loginController = require('../controllers/Login');

router.get('/ingresar', loginController.getIngresar);
router.post('/ingresar', loginController.postIngresar);

router.post('/salir', loginController.postSalir);

router.get('/registrarse', accountController.getRegistrarse);
router.post('/registrarse', accountController.postRegistrarse);

router.get('/reinicio', loginController.getReinicio);
router.post('/reinicio', loginController.postReinicio);
router.get('/reinicio/:token', loginController.getNuevoPassword);
router.post('/nuevo-password', loginController.postNuevoPassword);

module.exports = router;