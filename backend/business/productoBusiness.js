const productoRepository = require('../repositories/productoRepository');

// Lógica de negocio para crear un preducto
const crearProducto = (name, category, amount, price) => {
  // Validaciones de la lógica de negocio
  if (!name || !category || !amount || !price) {
    return callback({ message: 'Todos los campos son obligatorios' }, null);
  }

  // Si todo es correcto, llama al repositorio
  productoRepository.crearProducto(name, category, amount, price, (err, result) => {
    if (err) {
      return callback({ message: 'Error al crear producto en la base de datos' }, null);
    }
    callback(null, result);
  });
};

// Lógica de negocio para obtener productos
const listarProductos = (callback) => {
  productoRepository.obtenerProductos((err, result) => {
    if (err) {
      return callback({ message: 'Error al obtener productos' }, null);
    }
    callback(null, result);
  });
};

module.exports = { crearProducto, listarProductos };