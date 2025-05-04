const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

// to get all the info from the database
router.get('/', contactsController.getAll);

// to get queried results from the database
router.get('/:id', contactsController.getQueried);

module.exports = router;