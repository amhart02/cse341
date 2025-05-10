const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    // find the correct contact collection in the database
    const result = await mongodb.getDB('CSE341').collection('Contacts').find();
    // make collection in database into an array
    result.toArray().then((lists) => {
        // sets the data as JSON format
        res.setHeader('Content-Type', 'application/json')
        // sends status as "Ok", and send list
        res.status(200).json(lists);
    })
}

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDB('CSE341').collection('Contacts').find({_id: userId});
    result.toArray().then((lists) => {
        // sets the data as JSON format
        res.setHeader('Content-Type', 'application/json');
        // sends status as "Ok", and send queried result
        res.status(200).json(lists[0]);
    })
}

const createContact = async (req, res) => {
    // create contact object 
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }
    // use the database to create the new contact (insertOne) into the database
    const result = await mongodb.getDB('CSE341').collection('Contacts').insertOne(contact);
    //return contact id in response and send an error if it didn't work
    if (result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json('An error occured');
    }
}

const updateContact = async (req, res) => {
    //get the id of the contact to update
    const id = new ObjectId(req.params.id);
    //create an object to replace the contact with 
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }
    //use database to replace the contact (replaceOne) 
    const result = await mongodb.getDB('CSE341').collection('Contacts').replaceOne({_id : id}, contact)
    if (result.modifiedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json('An error occurred')
    }
}

const deleteContact = async (req, res) => {  
    // get id of contact to delete
    const id = new ObjectId(req.params.id)
    // delete contact
    const result = await mongodb.getDB('CSE341').collection('Contacts').deleteOne({_id : id});
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json('An error occurred')
    }
}

module.exports = { getAll, getSingle , createContact, updateContact, deleteContact }

