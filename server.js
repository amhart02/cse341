var express = require('express');
var app = express();
const mongodb = require('./db/connect');
const port = process.env.PORT || 8000;

app.use('/', require('./routes'));

mongodb.initDB((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log('Connected to Db')
    }
})

