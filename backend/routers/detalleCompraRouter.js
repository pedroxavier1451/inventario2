const express = require('express');
const detalleCompraController = require('../controllers/detalleCompraController');
const verificarToken = require('../middlewares/verificarToken');
const router = express.Router();

// Crear una compra (puede hacerlo cualquier cliente autenticado)
router.post('/register', verificarToken, detalleCompraController.crearDetalleCompra);

// Obtener todas las compras (solo admin)
router.get('/get', verificarToken, detalleCompraController.getDetallesByCompra);

module.exports = router;