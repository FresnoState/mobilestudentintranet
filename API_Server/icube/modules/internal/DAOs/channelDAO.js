var db = require('../db');
var ObjectID = require('mongodb').ObjectID;

module.exports = {
  getAll: function(callback){
    db.find('icube', {}, callback);
  },
  get: function(accessID, callback){

  },
  add: function(channel){
    channel.access = []
    channel.areas = [];
    db.insert('icube', channel);
  },
  update: function(channelID, channel){
    db.update('icube',
    {//criteria
      "_id": ObjectID(channelID)
    },
    {//data
      "name": channel.name,
      "desc": channel.desc
    });
  },
  delete: function(channelID){
    db.remove('icube', {
      "_id": ObjectID(channelID)
    });
  }
}
