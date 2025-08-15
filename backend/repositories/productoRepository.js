const Producto = require('../models/producto');
const { Op } = require('sequelize');

// Función para insertar un producto en la base de datos
const createProducto = async (nombre, categoria, cantidad, precio) => {
  return await Producto.create({ nombre, categoria, cantidad, precio });
};

// Obtener todos los productos
const getProductos = async () => {
  return await Producto.findAll();
};

// Obtener un producto por nombre o categoría (ejemplo de búsqueda)
const getProductoByNombreOrCategoria = async (nombreOrCategoria) => {
  return await Producto.findOne({
    where: {
      [Op.or]: [{ nombre: nombreOrCategoria }, { categoria: nombreOrCategoria }]
    }
  });
};

const updateProducto = async (id, nombre, categoria, cantidad, precio) => {
  const producto = await Producto.findByPk(id);
  if (!producto) {
    throw new Error(`Producto con id ${id} no encontrado`);
  }

  producto.nombre = nombre ?? producto.nombre;
  producto.categoria = categoria ?? producto.categoria;
  producto.cantidad = cantidad ?? producto.cantidad;
  producto.precio = precio ?? producto.precio;

  await producto.save();
  return producto;
};

const deleteProducto = async (id) => {
  const producto = await Producto.findByPk(id);
  if (!producto) {
    throw new Error(`Producto con id ${id} no encontrado`);
  }
  await producto.destroy();
  return true;
};

module.exports = {
  createProducto,
  getProductos,
  getProductoByNombreOrCategoria,
  updateProducto,
  deleteProducto
};