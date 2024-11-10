const express = require('express');
const router = express.Router();

const homeController = require ('../controllers/Home');
const storeEventController = require('../controllers/StoreEvent');
const purchaseController = require('../controllers/Purchase');

router.get ('/', homeController.getIndex);
router.get('/detalle-evento/:idEvento', storeEventController.getDetalleEventoTienda);

router.post('/realizar-compra', purchaseController.postRealizarCompra);
router.get('/detalle-compra/:idCompra', purchaseController.getDetalleCompra);

module.exports = router;