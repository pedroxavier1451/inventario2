const Usuario = require('../models/usuario');
const { Op } = require('sequelize');

// Función para insertar un usuario en la base de datos
const createUser = async (username, email, password, rol) => {
  return await Usuario.create({ username, email, password, rol });
};

const getUsers = async () => {
  return await Usuario.findAll();
};

const getUserByUsernameOrEmail = async (usernameOrEmail) => {
  return await Usuario.findOne({
    where: {
      [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
    }
  });
};


module.exports = {
  createUser,
  getUsers,
  getUserByUsernameOrEmail
};