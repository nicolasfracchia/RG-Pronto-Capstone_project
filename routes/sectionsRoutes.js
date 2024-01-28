const express = require('express');
const router = express.Router();
const SectionsController = require('../controllers/SectionsController');

// GET
router.get('/', SectionsController.getAllSections);
router.get('/:sectionId', SectionsController.getSection);

// POST
router.post('/', SectionsController.newSection);

// PUT
router.put('/:sectionId', SectionsController.updateSection);

// DELETE
router.delete('/:sectionId', SectionsController.deleteSection);

module.exports = router;