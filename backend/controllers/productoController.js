const productoService = require('../services/productoService');

const createProducto = async (req, res) => {
  try {
    const { nombre, categoria, cantidad, precio } = req.body;
    const producto = await productoService.createProducto(nombre, categoria, cantidad, precio);
    res.status(201).json(producto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getProductos = async (req, res) => {
  try {
    const productos = await productoService.getProductos();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, categoria, cantidad, precio } = req.body;
    const producto = await productoService.updateProducto(id, nombre, categoria, cantidad, precio);
    res.json(producto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    await productoService.deleteProducto(id);
    res.json({ message: `Producto con id ${id} eliminado correctamente` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createProducto,
  getProductos,
  updateProducto,
  deleteProducto
};
