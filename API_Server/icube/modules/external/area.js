var areaDAO = require('../internal/DAOs/areaDAO');

module.exports = {
  add: function(channelID, area){
    areaDAO.add(channelID, area);
  },
  update: function(channelID, areaID, area){
    areaDAO.update(channelID, areaID, area);
  },
  delete: function(channelID, areaID){
    areaDAO.delete(channelID, areaID);
  }
}
