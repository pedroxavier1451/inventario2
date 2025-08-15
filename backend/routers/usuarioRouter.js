const express = require('express');
const userController = require('../controllers/usuarioController');
const verificarToken = require('../middlewares/verificarToken');
const router = express.Router();

// Ruta para registrar un usuario
router.post('/register', userController.registerUser);

// Ruta para obtener todos los usuarios
router.get('/get', userController.getUsers);

// Aquí agregamos la ruta login
router.post('/login', userController.loginUser);

module.exports = router;