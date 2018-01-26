var messageDAO = require('../internal/DAOs/messageDAO');
var fcm = require('../internal/fcm')

module.exports = {
  relay: function(message){
    if(message.distribution === 'Alert'){
        fcm.relayNotification(message);
    }
    fcm.relayData(message);
  },
  log: function(message){
    messageDAO.add(message);
  }
}
