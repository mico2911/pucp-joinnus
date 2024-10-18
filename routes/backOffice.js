const express = require('express');
const router = express.Router();

const backOfficeController = require('../controllers/BackOffice');

// /backoffice
router.get('/', backOfficeController.getMenuPrincipal);

module.exports = router;