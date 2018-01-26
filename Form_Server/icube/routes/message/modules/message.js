const fetch = require('node-fetch');
var https = require('https');

module.exports = {
  send: function(message, sender, cb){
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  message.sender = sender;
  fetch('https://mobile-api.innovate.fresnostate.edu/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    })
    .then(()=>{
      if(cb){
        cb();
      }
    })
    .catch(err=>console.log("MSG MODULE ERROR", err))
  }
}
