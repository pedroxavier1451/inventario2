const express = require('express');
const productoController = require('../controllers/productoController');
const verificarToken = require('../middlewares/verificarToken');
const verificarAdmin = require('../middlewares/verificarAdmin');
const router = express.Router();

// Ruta para crear un producto
router.post('/register', verificarToken, verificarAdmin, productoController.createProducto);

// Ruta para obtener todos los productos
router.get('/get', verificarToken, verificarAdmin, productoController.getProductos);

// Ruta para actualizar un producto
router.put('/update/:id', verificarToken, verificarAdmin, productoController.updateProducto);

// Ruta para eliminar un producto
router.delete('/delete/:id', verificarToken, verificarAdmin, productoController.deleteProducto);

module.exports = router;