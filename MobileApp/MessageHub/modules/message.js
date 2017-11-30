import db from './db.js';

module.exports = {
  addMessage: function(msi_key, topic_key, dist, title, description, message, timestamp){
      db.executeSql('INSERT INTO Message (msi_key, topic_key, dist, title, desc, message, timestamp) VALUES (?,?,?,?,?,?,?);', [msi_key, topic_key, dist, title, description, message, timestamp]);
  },
  getMessages: function(callback){
      var messages = [];
      db.executeSql('SELECT * FROM Message ORDER BY Timestamp DESC;', [], function(result){
          for(var i=0; i<result.rows.length; ++i){
              messages.push(result.rows.item(i));
          }
          callback(messages);
      })
  },
  exists: function(msi_key, callback){
    db.executeSql('SELECT EXISTS (SELECT * FROM Message WHERE Message.msi_key = (?))', [msi_key], function(result){
        callback(Object.values(result.rows.item(0))[0])
    })
  },
  removeMessage: function(msi_key){
    db.executeSql('DELETE FROM Message WHERE msi_key = (?);',[msi_key]);
  },
  clearOldMessages: function(){ //remove messages that are older than a week from today's midnight tonight
    var timestamp = new Date();
    //set ts to midnight at end of current day
    timestamp.setHours(24,0,0,0);
    timestamp = timestamp.getTime();
    //subtract a week from the ts
    timestamp -= 604800000;
    db.executeSql('DELETE FROM Message WHERE timestamp < (?);',[timestamp]);
  }
};
