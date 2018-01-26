var fcm = require('./fcm');
var db = require('./db');
var ObjectID = require('mongodb').ObjectID

module.exports = {
  relayMessage: function(message){
      message.msi_key = new ObjectID();
      message.timestamp = Date.now();
      db.insert('message', message);

      //remove this after relay is working in front end client
      if(message.distribution === 'Alert'){
          fcm.relayAlert(message);
      }
      fcm.relayInfo(message);
  },
}
