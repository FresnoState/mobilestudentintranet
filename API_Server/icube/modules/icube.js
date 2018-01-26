var db = require('./db');
var randomstring = require("randomstring");
var ObjectID = require('mongodb').ObjectID

module.exports = {
  getAll: function(callback){
    db.find('icube', {}, callback);
  },
  addSubject: function(channelID, areaID, subject){
    //add fields for data struct
    subject.id = new ObjectID(); //randomstring.generate();
    subject.topic_key = channelID+'-'+areaID+'-'+subject.id;
    subject.access = [];
    subject.tags = []; //will possibly do something with later
    db.update('icube',
      { //criteria//
        "_id": ObjectID(channelID),
        "areas.id": ObjectID(areaID)
      },
      { //data
        ["$addToSet"]: {["areas.$.subjects"]: subject}
      }
    )
  },
  updateSubject: function(channelID, areaID, subjectID, subject){
    /*db.update('icube',
    {
      "_id": ObjectID(channelID),
      "areas.id": ObjectID(areaID.id),
      "areas.subjects.id": ObjectID(subject.id)
    },
    {
      $set: {
        ["areas.subjects.$"]: subject
      }
    });*/
    let found = false;
    db.find('icube', {_id: ObjectID(channelID)}, (icube)=>{
      var newChannel = icube[0];
      for(var i=0; i<newChannel.areas.length; ++i){
        if(newChannel.areas[i].id == areaID){
          for(var j=0; j<newChannel.areas[i].subjects.length; ++j){
            if(newChannel.areas[i].subjects[j].id == subjectID){
              newChannel.areas[i].subjects[j].name = subject.name;
              newChannel.areas[i].subjects[j].desc = subject.desc;
              newChannel.areas[i].subjects[j].opt = subject.opt; //update fields individually?
              found = true;
            }
          }
        }
      }
      if(found){
          db.update('icube',{"_id": ObjectID(channelID)},newChannel)
      }
    })
  },
  deleteSubject: function(channelID, areaID, subjectID){
    db.update('icube', {
      "_id": ObjectID(channelID),
      "areas.id": ObjectID(areaID)
    },
    {
      $pull: {
        "areas.$.subjects" : {id: ObjectID(subjectID)}
      }
    });
  },
  addArea: function(channelID, area){
    area.id = new ObjectID(); //randomstring.generate();
    area.access = [];
    area.subjects = [];
    db.update('icube',
      { //criteria
        "_id": ObjectID(channelID),
      },
      { //data
        ["$addToSet"]: {"areas": area}
      })
  },
  updateArea: function(channelID, areaID, area){
    db.update('icube',
    {
      "_id": ObjectID(channelID),
      "areas.id": ObjectID(areaID)
    },
    {
      $set: {
        ["areas.$.name"]: area.name,
        ["areas.$.desc"]: area.desc
      }
    });
  },
  deleteArea: function(channelID, areaID){
    db.update('icube', {
      "_id": ObjectID(channelID)
    },
    {
      $pull: {
        "areas" : {id: ObjectID(areaID)}
      }
    });
  }
}
