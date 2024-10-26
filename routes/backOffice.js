const express = require('express');
const router = express.Router();

const backOfficeController = require('../controllers/BackOffice');
const officeEventController = require('../controllers/OfficeEvent');

// /backoffice
router.get('/', backOfficeController.getMenuPrincipal);

router.get('/listado-eventos', officeEventController.getListaEventos);

router.get('/creacion-evento', officeEventController.getCrearEvento);
router.post('/creacion-evento', officeEventController.postCrearEvento);

router.get('/editar-evento/:idEvento', officeEventController.getEditarEvento);
router.post('/editar-evento', officeEventController.postEditarEvento);

router.post('/eliminar-evento', officeEventController.postEliminarEvento);

module.exports = router;