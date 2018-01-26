var db = require('../db');
var ObjectID = require('mongodb').ObjectID;

module.exports = {
  add: function(channelID, areaID, subject){
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
  update: function(channelID, areaID, subjectID, subject){
    let found = false;
    db.find('icube', {_id: ObjectID(channelID)}, (icube)=>{
      var newChannel = icube[0];
      for(var i=0; i<newChannel.areas.length; ++i){
        if(newChannel.areas[i].id == areaID){
          for(var j=0; j<newChannel.areas[i].subjects.length; ++j){
            if(newChannel.areas[i].subjects[j].id == subjectID){
              newChannel.areas[i].subjects[j].name = subject.name;
              newChannel.areas[i].subjects[j].desc = subject.desc;
              newChannel.areas[i].subjects[j].opt = subject.opt;
              found = true;
            }
          }
        }
      }
      if(found){
          db.update('icube',{"_id": ObjectID(channelID)},newChannel)
      }
    });
  },
  delete: function(channelID, areaID, subjectID){
    db.update('icube', {
      "_id": ObjectID(channelID),
      "areas.id": ObjectID(areaID)
    },
    {
      $pull: {
        "areas.$.subjects" : {id: ObjectID(subjectID)}
      }
    });
  }
}
