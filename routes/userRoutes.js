const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const UserController = require('../controllers/UserController');


// GET
router.get('/', verifyToken([1]), UserController.getAllUsers);
router.get('/:userId', UserController.getUser);

// POST
router.post('/', UserController.newUser);
router.post('/login', UserController.login);

// PUT
router.put('/:userId', UserController.updateUser);

// DELETE
router.delete('/:userId', UserController.deleteUser);

module.exports = router;