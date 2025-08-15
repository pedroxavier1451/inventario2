const usuarioService = require('../services/usuarioService');

const registerUser = async (req, res) => {
  try {
    const { username, email, password, rol } = req.body;
    const { user, token } = await usuarioService.createUser(username, email, password, rol);
    res.status(201).json(user, token);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await usuarioService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await usuarioService.loginUser(username, password);
    if (!result) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }
    res.json({ message: 'Login exitoso', user: result.user, token: result.token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  getUsers,
  loginUser
};