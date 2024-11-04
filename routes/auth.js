const express = require('express');
const router = express.Router();

const accountController = require('../controllers/Account');
const loginController = require('../controllers/Login');

router.get('/ingresar', loginController.getIngresar);
router.post('/ingresar', loginController.postIngresar);

router.get('/registrarse', accountController.getRegistrarse);
router.post('/registrarse', accountController.postRegistrarse);

module.exports = router;