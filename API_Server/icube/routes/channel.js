var express = require('express')
var router = express.Router()
var channel = require('../modules/external/channel')

router.get('/', function(req, res) {
  channel.getAll(results=>res.json({"icube": results}));
})

module.exports = router;
