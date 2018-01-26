var express = require('express');
var router = express.Router();

var main = require('./main/main');
router.use('/', main);

var message = require('./message/message');
router.use('/message', message);

var subscription = require('./subscription/subscription');
router.use('/subscription', subscription);


module.exports = router
