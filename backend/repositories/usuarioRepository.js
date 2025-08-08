const db = require('../db/db');

// Función para insertar un usuario en la base de datos
const createUser = (name, email, password) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.run(sql, [name, email, password], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, name, email });
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

module.exports = {
  createUser,
  getUsers,
};
