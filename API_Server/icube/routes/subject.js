var express = require('express')
var router = express.Router()
var subject = require('../modules/external/subject')
var ObjectID = require('mongodb').ObjectID

//add subject
router.post('/:channelID/:areaID', function(req, res){
  var subjectObj = req.body;
  var channelID = req.params.channelID;
  var areaID = req.params.areaID;
  subjectObj.id = new ObjectID();
  subjectObj.topic_key = channelID+'-'+areaID+'-'+subject.id;
  subjectObj.access = [];
  subjectObj.tags = [];
  subject.add(channelID, areaID, subjectObj);
  res.end();
})

//update subject
router.put('/:channelID/:areaID/:subjectID', function(req, res){
  subject.update(req.params.channelID, req.params.areaID, req.params.subjectID, req.body);
  res.end();
})

//delete subject
router.delete('/:channelID/:areaID/:subjectID', function(req, res){
  subject.delete(req.params.channelID, req.params.areaID, req.params.subjectID);
  res.end();
})

module.exports = router;
