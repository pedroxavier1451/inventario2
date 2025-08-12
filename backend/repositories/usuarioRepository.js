const db = require('../db/db');

// Función para insertar un usuario en la base de datos
const createUser = (username, email, password) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.run(sql, [username, email, password], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, username, email });
      }
    });
  });
};

// Función para obtener todos los usuarios
const getUsers = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getUserByUsernameOrEmail = (username) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE username = ? OR email = ? LIMIT 1';
    db.get(sql, [username, username], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row); // row es undefined si no hay resultado
      }
    });
  });
};


module.exports = {
  createUser,
  getUsers,
  getUserByUsernameOrEmail
};
