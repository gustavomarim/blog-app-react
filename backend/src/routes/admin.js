const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/CategoryController');

router.get('/admin/categories', CategoryController.read);
router.post('/admin/categories', CategoryController.create);
router.delete('/admin/categories/:id', CategoryController.delete);
router.put('/admin/categories/:id', CategoryController.update);

module.exports = router;
