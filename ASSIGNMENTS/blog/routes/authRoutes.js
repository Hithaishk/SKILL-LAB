const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', express.json(), authController.login);
router.post('/register', express.json(), authController.register);

module.exports = router;