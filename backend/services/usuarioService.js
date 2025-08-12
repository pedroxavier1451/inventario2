const bcrypt = require('bcrypt');
const userRepository = require('../repositories/usuarioRepository');
const usuarioBusiness = require('../business/usuarioBusiness');

// Función para crear un usuario
const createUser = async (username, email, password) => {

  // Valida usando reglas de negocio
  usuarioBusiness.validarDatosUsuario(username, email, password);

  // Encriptar la contraseña antes de guardar
  const hashedPassword = await bcrypt.hash(password, 10);

  // Guardar el usuario en la base de datos con la contraseña encriptada
  const user = await userRepository.createUser(username, email, hashedPassword);

  return user;
};

// Función para obtener todos los usuarios
const getUsers = async () => {
  return await userRepository.getUsers();
};

// Funcion para validar los usuarios
const loginUser = async (username, password) => {

  usuarioBusiness.validarDatosLogin(username, password);

  // Buscar usuario por username o email en el repositorio
  const user = await userRepository.getUserByUsernameOrEmail(username);

  if (!user) {
    // Usuario no encontrado
    return null;
  }

  // Comparar contraseña
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return null; // Contraseña incorrecta
  }

  // No devolver la contraseña en el resultado
  delete user.password;

  return user;
};

module.exports = {
  createUser,
  getUsers,
  loginUser
};
