var channelDAO = require('../internal/DAOs/channelDAO');

module.exports = {
  get: function(accessID, callback){
    //channelDAO.get(accessID, callback);
  },
  getAll: function(callback){
    channelDAO.getAll(callback);
  },
  add: function(channel){
    //channelDAO.add(channel);
  },
  update: function(channelID, channel){
    //channelDAO.update(channelID, channel)
  },
  delete: function(channelID){
    //channelDAO.delete(channelID);
  }
}
