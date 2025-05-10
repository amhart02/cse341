const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

// to get all the info from the database
router.get('/', contactsController.getAll);

// to get queried results from the database
router.get('/:id', contactsController.getSingle);

// create a contact
router.post('/', contactsController.createContact)

//update a contact
router.put('/:id', contactsController.updateContact)

//delete a contact
router.delete('/:id', contactsController.deleteContact)

module.exports = router;