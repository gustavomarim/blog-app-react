const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

// Rota Register
router.post('/users/register', UserController.register);

// Rota Login
router.post('/users/login', UserController.login);
router.get('/users/logout', UserController.logout);

module.exports = router;
