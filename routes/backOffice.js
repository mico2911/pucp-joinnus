const express = require('express');
const router = express.Router();

const backOfficeController = require('../controllers/BackOffice');
const officeEventController = require('../controllers/OfficeEvent');

// /backoffice
router.get('/', backOfficeController.getMenuPrincipal);

router.get('/listado-eventos', officeEventController.getListaEventos);

module.exports = router;