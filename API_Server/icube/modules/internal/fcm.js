const fetch = require('node-fetch');

//will store in external file later
const api_key = 'AAAA1i1g05s:APA91bEm3cI3lCflqY74PSH3O-3RGUk4H9kGqXKB1NfhT9igNntvDSSqWDBxajEK-rsbFovPVJzTJojx4Q-SlgFs-7D2fT2dmdw_0ii_5jodpn__jahPlKE1UL-HibRkSO8_6WL88B3D';

function relayMessage(message){
  fetch("https://fcm.googleapis.com/fcm/send", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'key='+api_key
      },
      body: JSON.stringify(message)
  })
  //.then(response => console.log(response))
  .catch(err => console.log(err));
}


module.exports = {
  relayNotification: function(message) {
    return relayMessage(
      {
        "to" : "/topics/"+message.topic_key,
        "priority" : "high",
        "notification" : {
            "title" : message.title,
            "body" : message.desc,
            "sound" : "default"
        },
        "data" : {
          "msi_key" : message.msi_key
        }
      }
    );
  },
  relayData: function(message) {
    return relayMessage(
      {
        "to" : "/topics/"+message.topic_key,
        "content_available" : true,
        "priority" : "high",
        "data" : {
          "msi_key" : message.msi_key,
          "topic_key" : message.topic_key,
          "dist" : message.distribution,
          "channel" : message.channel,
          "title" : message.title,
          "desc" : message.desc,
          "message" : message.message,
          "timestamp" : message.timestamp
        }
      }
    );
  }
}
