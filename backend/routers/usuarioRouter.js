const express = require('express');
const userController = require('../controllers/usuarioController');
const router = express.Router();

// Ruta para registrar un usuario
router.post('/register', userController.registerUser);

// Ruta para obtener todos los usuarios
router.get('/users', userController.getUsers);

module.exports = router;
