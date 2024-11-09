const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/is-auth');

const accountController = require('../controllers/Account');

router.get('/', isAuth, accountController.getMiPerfil);
router.get('/seguridad', isAuth, accountController.getSeguridadPage);
router.get('/wishlist', isAuth, accountController.getWishlistPage);

router.post('/add-to-wishlist', isAuth, accountController.postAgregarWishlist);
router.post('/remove-to-wishlist', isAuth, accountController.postRemoveWishlist);

module.exports = router;