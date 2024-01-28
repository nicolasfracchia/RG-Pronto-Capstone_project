const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

// GET
router.get('/', CategoryController.getAllCategories);
router.get('/:categoryId', CategoryController.getCategory);

// POST
router.post('/', CategoryController.newCategory);

// PUT
router.put('/:categoryId', CategoryController.updateCategory);

// DELETE
router.delete('/:categoryId', CategoryController.deleteCategory);

module.exports = router;