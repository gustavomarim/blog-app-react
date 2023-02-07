const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/CategoryController');
const PostController = require('../controllers/PostController');

// Rota Category
router.get('/admin/categories', CategoryController.read);
router.post('/admin/categories', CategoryController.create);
router.put('/admin/categories/:id', CategoryController.update);
router.delete('/admin/categories/:id', CategoryController.delete);

// Rota Post
router.get('/admin/posts', PostController.read);
router.post('/admin/posts', PostController.create);
router.put('/admin/posts/:id', PostController.update);
router.delete('/admin/posts/:id', PostController.delete);

module.exports = router;
