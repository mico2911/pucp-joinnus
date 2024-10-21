const express = require('express');
const router = express.Router();

const homeController = require ('../controllers/Home');

router.get ('/', homeController.getIndex);
router.get ('/eventos', homeController.getEventos);
router.get ('/eventos/:codigoEvento', homeController.getEvento);

module.exports = router;