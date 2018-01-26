/**
  The MIT License
  Copyright (c) -2017 Max J. Tsai (mt8168@gmail.com)
**/
const express = require('express');
const bodyParser= require('body-parser');
const multer  = require('multer');
const MongoClient = require('mongodb').MongoClient;
var cookieParser = require('cookie-parser');

const app = express();

/** static pages and js/css **/
app.use(express.static('public'));
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'))

/** parse for form data **/
app.use(bodyParser.urlencoded({extended: true}));
// and multipart
var upload = multer({ dest: 'uploads/' })

/** template engine **/
app.set('view engine', 'ejs');

/** Database **/
/*var db;
MongoClient.connect('mongodb://localhost:27017/hellomax', (err, database) => {
  if (err) {
    console.log(err); // well - it does not actuall check the collection exists
  } else {
    console.log(`database connected`);
    db = database;
    app.set('db', db);
  }
  /*app.listen(3000, () => {
    console.log('listening on 3000')
  })
})*/

//cookies
app.use(cookieParser());
//be able to access cookie from ejs template
app.use(function(req, res, next) {
    res.locals.user = req.cookies.user;
    next();
});

app.use(require('./routes/components'))

/** Start Server **/
app.listen(3000, function() {
  console.log('listening on 3000')
})
