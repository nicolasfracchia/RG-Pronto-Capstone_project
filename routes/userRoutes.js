const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// GET
router.get('/', UserController.getAllUsers);
router.get('/:userId', UserController.getUser);

// POST
router.post('/', UserController.newUser);

// PUT
router.put('/:userId', UserController.updateUser);

// DELETE
router.delete('/:userId', UserController.deleteUser);

module.exports = router;