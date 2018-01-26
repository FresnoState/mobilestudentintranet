var express = require('express');
var router = express.Router();

var message = require('./message');
router.use('/message', message);

//to be removed later
/*var icube = require('./icube');
router.use('/icube', icube);*/

var channel = require('./channel');
router.use('/channel', channel);

var area = require('./area');
router.use('/area', area);

var subject = require('./subject');
router.use('/subject', subject);

module.exports = router;
