// initializing the database
const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let _db;

const initDB = (callback) => {
    // if database is already initalized
    if (_db) {
        console.log('Db is already initalized')
        return callback(null, _db)
    }
    // connect the database using the mongoDb URI in the env file
    MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
        _db = client;
        callback(null, _db);
    });
};

// ensure database is connected
const getDB = () => {
    if (!_db) {
        throw error('Db not initalized');
    }
    return _db;
}

// export the initalize DB and get DB functions
module.exports = { initDB, getDB }

