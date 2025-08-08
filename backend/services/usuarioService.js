const userRepository = require('../repositories/usuarioRepository');

// Función para crear un usuario
const createUser = async (username, email, password) => {
  if (!username || !email || !password) {
    throw new Error('Todos los campos son obligatorios');
  }
  // Guardar el usuario en la base de datos
  const user = await userRepository.createUser(username, email, password);
  return user;
};

// Función para obtener todos los usuarios
const getUsers = async () => {
  const users = await userRepository.getUsers();
  return users;
};

module.exports = {
  createUser,
  getUsers,
};
