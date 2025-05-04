const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    // find the correct contact collection in the database
    const result = await mongodb.getDB.db().collection('contact').find();
    // make collection in database into an array
    result.toArray().then((lists) => {
        // sets the data as JSON format
        res.setHeader('Content-Type', 'application/json')
        // sends status as "Ok", and send list
        res.status(200).json(lists);
    })
}

const getQueried = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDB().db().collection('contacts').find({_id: userId});
    result.toArray().then((lists) => {
        // sets the data as JSON format
        res.setHeader('Content-Type', 'application/json');
        // sends status as "Ok", and send queried result
        res.status(200).json(lists[0]);
    })
}

module.exports = { getAll, getQueried }