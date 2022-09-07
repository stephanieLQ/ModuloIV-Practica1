const express = require("express");
const productController = require('../controllers/productController');
const productRouter = express.Router();

// routes
productRouter.route('/')
  .get(productController.getAllProducts)
  .post(productController.adicionarNuevoProducto);
productRouter.route('/:id')
  .get(productController.getProductoId)
  .put(productController.editarProducto)
  .delete(productController.eliminarProducto);

module.exports = productRouter;