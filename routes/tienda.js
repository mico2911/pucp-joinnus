const express = require('express');
const router = express.Router();

const homeController = require ('../controllers/Home');
const storeEventController = require('../controllers/StoreEvent');

router.get('/detalle-evento/:idEvento', storeEventController.getDetalleEventoTienda);

module.exports = router;