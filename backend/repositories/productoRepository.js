const db = require('../db/db');

// Función para insertar un producto en la base de datos
const createProducto = (name, category, amount, price) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO productos (name, category, amount, price) VALUES (?, ?, ?, ?)';
    db.run(sql, [name, category, amount, price], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, name, category, amount, price });
      }
    });
  });
};

// Función para obtener todos los productos
const getProductos = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM productos';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// (Opcional) función para buscar producto por nombre o categoría (ejemplo)
const getProductoByNombreOrCategoria = (nombreOrCategoria) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM productos WHERE nombre = ? OR categoria = ? LIMIT 1';
    db.get(sql, [nombreOrCategoria, nombreOrCategoria], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row); // row es undefined si no hay resultado
      }
    });
  });
};

module.exports = {
  createProducto,
  getProductos,
  getProductoByNombreOrCategoria
};
