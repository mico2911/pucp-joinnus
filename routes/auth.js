const express = require('express');
const router = express.Router();

const accountController = require('../controllers/Account');
const loginController = require('../controllers/Login');

router.get('/registrarse', accountController.getRegistrarse);
router.post('/registrarse', accountController.postRegistrarse);

module.exports = router;