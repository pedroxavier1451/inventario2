const express = require('express');
const compraController = require('../controllers/compraController');
const verificarToken = require('../middlewares/verificarToken');
const router = express.Router();

// Crear una compra (puede hacerlo cualquier cliente autenticado)
router.post('/register', verificarToken, compraController.createCompra);

// Obtener todas las compras (solo admin)
router.get('/get', verificarToken, compraController.getCompras);

// Actualizar una compra (solo admin)
router.put('/update/:id', verificarToken, compraController.updateCompra);

// Eliminar una compra (solo admin)
router.delete('/delete/:id', verificarToken, compraController.deleteCompra);

module.exports = router;