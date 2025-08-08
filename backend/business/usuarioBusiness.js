const usuarioRepository = require('../repositories/usuarioRepository');

// Lógica de negocio para crear un usuario
const crearUsuario = (username, email, password, callback) => {
  // Validaciones de la lógica de negocio
  if (!username || !email || !password) {
    return callback({ message: 'Todos los campos son obligatorios' }, null);
  }

  if (password.length < 6) {
    return callback({ message: 'La contraseña debe tener al menos 6 caracteres' }, null);
  }

  // Si todo es correcto, llama al repositorio
  usuarioRepository.crearUsuario(username, email, password, (err, result) => {
    if (err) {
      return callback({ message: 'Error al crear usuario en la base de datos' }, null);
    }
    callback(null, result);
  });
};

// Lógica de negocio para obtener usuarios
const listarUsuarios = (callback) => {
  usuarioRepository.obtenerUsuarios((err, result) => {
    if (err) {
      return callback({ message: 'Error al obtener usuarios' }, null);
    }
    callback(null, result);
  });
};

module.exports = { crearUsuario, listarUsuarios };