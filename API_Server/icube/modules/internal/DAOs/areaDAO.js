var db = require('../db');
var ObjectID = require('mongodb').ObjectID;

module.exports = {
  add: function(channelID, area){
    db.update('icube',
      { //criteria
        "_id": ObjectID(channelID),
      },
      { //data
        ["$addToSet"]: {"areas": area}
      })
  },
  update: function(channelID, areaID, area){
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
  delete: function(channelID, areaID){
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
