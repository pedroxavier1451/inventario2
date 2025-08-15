const bcrypt = require('bcrypt');
const userRepository = require('../repositories/usuarioRepository');
const usuarioBusiness = require('../business/usuarioBusiness');
const jwt = require('jsonwebtoken');

// Función para crear un usuario
const createUser = async (username, email, password) => {

  // Valida usando reglas de negocio
  usuarioBusiness.validarDatosUsuario(username, email, password);

  // Obtener el rol desde la lógica de negocio
  const rol = usuarioBusiness.asignarRol(email);

  // Encriptar la contraseña antes de guardar
  const hashedPassword = await bcrypt.hash(password, 10);

  // Guardar el usuario en la base de datos con la contraseña encriptada
  const user = await userRepository.createUser(username, email, hashedPassword, rol);

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

  // Convertir a objeto plano y eliminar password
  const plainUser = user.get({ plain: true });
  delete plainUser.password;

  // 3. Generar token
  const token = jwt.sign(
    { id: user.id, email: user.email, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  console.log('Token generado:', token);

  

  return { user: plainUser, token };
};

module.exports = {
  createUser,
  getUsers,
  loginUser
};