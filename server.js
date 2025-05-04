var express = require('express');
var app = express();
const mongodb = require('./db/connect');
const port = process.env.PORT || 3000;

app.use('/', require('./routes'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log('Connected to Db')
    }
})

