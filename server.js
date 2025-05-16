var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const port = process.env.PORT || 8000;
app.use(express.static('.')); 

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

mongodb.initDB((err, mongodb) => {
    if (err) {
        console.log(err);
        process.exit(1);
    } else {
        app.listen(port);
        console.log('Connected to Db')
    }
})

