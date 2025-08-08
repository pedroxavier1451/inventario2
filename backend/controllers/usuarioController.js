const userService = require('../services/usuarioService');

// Crear un nuevo usuario
const registerUser = async (req, res) => {
  console.log('BODY RECIBIDO:', req.body); // <-- Agrega este log
  try {
    const { username, email, password } = req.body;
    const user = await userService.createUser(username, email, password);
    res.status(201).json(user); // 201 Created
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users); // 200 OK
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
};

module.exports = {
  registerUser,
  getUsers,
};
