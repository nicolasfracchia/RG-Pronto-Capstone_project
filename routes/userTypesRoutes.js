const express = require('express');
const router = express.Router();
const UserTypesController = require('../controllers/UserTypesController');

// GET
router.get('/', UserTypesController.getAllUserTypes);
router.get('/:utId', UserTypesController.getUserType);

module.exports = router;