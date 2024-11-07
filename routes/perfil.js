const express = require('express');
const router = express.Router();

const accountController = require('../controllers/Account');

router.get('/', accountController.getMiPerfil);
router.get('/seguridad', accountController.getSeguridadPage);

router.post('/add-to-wishlist', accountController.postAgregarWishlist);
router.post('/remove-to-wishlist', accountController.postRemoveWishlist);

module.exports = router;