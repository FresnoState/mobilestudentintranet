var express = require('express')
var router = express.Router()
var message = require('../modules/external/message')
var ObjectID = require('mongodb').ObjectID

router.post('/', function(req, res) {
  var messageObj = req.body;
  messageObj.msi_key = new ObjectID();
  messageObj.timestamp = Date.now();
  message.log(messageObj);
  message.relay(messageObj);
  res.end();
})

module.exports = router;
