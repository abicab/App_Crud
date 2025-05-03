const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Obtener todos los productos
router.get('/', productController.getProducts);

// Obtener un producto por su ID
router.get('/:id', productController.getProductById); // Agrega esta línea

// Crear un nuevo producto
router.post('/', productController.createProduct);

// Actualizar un producto existente
router.put('/:id', productController.updateProduct);

// Eliminar un producto
router.delete('/:id', productController.deleteProduct);

module.exports = router;