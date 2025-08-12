const usuarioRepository = require('../repositories/usuarioRepository');

// Lógica de negocio para crear un usuario
const validarDatosUsuario = (username, email, password) => {
  // Validaciones de la lógica de negocio
  if (!username || !email || !password) {
    throw new Error('Todos los campos son obligatorios');
  }

  if (password.length < 6) {
    throw new Error('La contraseña debe tener al menos 6 caracteres');
  }
  return true;
};

const validarDatosLogin = (username, password) => {
  if (!username || !password) {
    throw new Error('El usuario o email y la contraseña son obligatorios');
  }
  return true;
};

module.exports = { validarDatosUsuario, validarDatosLogin};