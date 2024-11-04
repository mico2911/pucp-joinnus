const express = require('express');
const router = express.Router();

const homeController = require ('../controllers/Home');
const storeEventController = require('../controllers/StoreEvent');
const accountController = require('../controllers/Account');

router.get ('/', homeController.getIndex);
router.get('/detalle-evento/:idEvento', storeEventController.getDetalleEventoTienda);

router.get('/miperfil', accountController.getMiPerfil);

router.post('/add-to-wishlist', accountController.postAgregarWishlist);
router.post('/remove-to-wishlist', accountController.postRemoveWishlist);

module.exports = router;