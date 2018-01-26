var express = require('express')
var router = express.Router()
var area = require('../modules/external/area')
var ObjectID = require('mongodb').ObjectID

//add area
router.post('/:channelID', function(req, res){
  var areaObj = req.body;
  areaObj.id = new ObjectID();
  areaObj.access = [];
  areaObj.subjects = [];
  area.add(req.params.channelID, areaObj);
  res.end();
})

//update area
router.put('/:channelID/:areaID', function(req, res){
  area.update(req.params.channelID, req.params.areaID, req.body);
  res.end();
})

//delete area
router.delete('/:channelID/:areaID', function(req, res){
  area.delete(req.params.channelID, req.params.areaID);
  res.end();
})

module.exports = router;
