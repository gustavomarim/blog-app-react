import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';
const router = Router();

const categoryController = CategoryController;

// All Categories
router.get('/categories', categoryController.read);

// All Categories by Slug
router.get('/categories/:slug', categoryController.readCategoriesBySlug);

// Category by id
router.get('/category/:slug', categoryController.readBySlug);

module.exports = router;
