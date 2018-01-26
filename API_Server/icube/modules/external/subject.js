var subjectDAO = require('../internal/DAOs/subjectDAO');

module.exports = {
  add: function(channelID, areaID, subject){
    subjectDAO.add(channelID, areaID, subject);
  },
  update: function(channelID, areaID, subjectID, subject){
    subjectDAO.update(channelID, areaID, subjectID, subject);
  },
  delete: function(channelID, areaID, subjectID){
    subjectDAO.delete(channelID, areaID, subjectID);
  }
}
