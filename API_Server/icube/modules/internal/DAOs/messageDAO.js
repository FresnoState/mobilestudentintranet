var db = require('../db');

module.exports = {
  add: function(message){
    db.insert('message', message)
  }
}
