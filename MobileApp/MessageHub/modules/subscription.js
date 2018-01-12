import fcm from "./fcm";

var icube = [];
var loaded = false;

module.exports = {
    //gets subscription data icube either from REST endpoint or cache
    get_iCube: function(callback) {
        if(!loaded) {
            //var url = 'https://mobile-api.innovate.fresnostate.edu/channel';
            var url = 'http://mobile-api.innovate.fresnostate.edu/channel';
            fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) { //save icube to cache
                loaded = true;
                icube = json.icube;
                callback(icube);
            })
            .catch(function (err) {
                console.log("GET TOPICS ERR", err);
            });
        }
        else{
            callback(icube);
        }

    },
    //updates subject data to have a boolean field for whether a subject is currently subscribed to
    mergeSubData: function(subjects, subscribed, callback){
        subjects.forEach(function (subject) {
            subject["subscribed"] = subscribed.indexOf(subject.topic_key) >=0;
        });
        callback(subjects);
    },
    //takes subject data and returns only those currently subscribed to
    mergeMySubData: function(subjects, subscribed, callback){
        var mySubjects = [];
        subjects.forEach(function (subject) {
            if(subscribed.indexOf(subject.topic_key) >=0){
                subject["subscribed"] = true;
                mySubjects.push(subject);
            }
        });
        callback(mySubjects);
    },
    //returns boolean in cb for whether a subject is currently subscribed to
    checkIfSubscribed(topic_key, callback){
      fcm.getSubscribed((subjects)=>{
          var subscribed = false;
          for(var i=0; i<subjects.length; ++i){
              if(subjects[i].indexOf(topic_key) >=0){
                  subscribed = true;
                  break;
              }
          }
          callback(subscribed);
      })
    },
    //gets subscription info for a single subject by looking up the topic_key
    getSubscriptionInfo(topic_key, callback){
      this.get_iCube((channels)=>{
          let found = false;
          var subInfo = {
              channel: 'Channel',
              area: 'Area',
              subject: 'Subject',
              subscribed: false
          };
          //parse topic key to get subscription IDs
          var channel_id = topic_key.split("-")[0];
          var area_id = topic_key.split("-")[1];
          var subject_id = topic_key.split("-")[2];
          //get subscription/icube names from IDs
          for(var i=0; i<channels.length; ++i){
              if(channels[i]._id === channel_id){
                  for(var j=0; j<channels[i].areas.length; ++j){
                      if(channels[i].areas[j].id === area_id){
                          for(var k=0; k<channels[i].areas[j].subjects.length; ++k){
                              if(channels[i].areas[j].subjects[k].id === subject_id){
                                 found = true;
                                 subInfo.channel = channels[i].name;
                                 subInfo.area = channels[i].areas[j].name;
                                 subInfo.subject = channels[i].areas[j].subjects[k].name;
                                 subInfo.level = channels[i].areas[j].subjects[k].opt.level;
                                 break;
                              }
                          }
                      }
                  }
              }
          }
          if(found){
              this.checkIfSubscribed(topic_key, (subscribed)=> {
                  subInfo.subscribed = subscribed;
                  callback(subInfo);
              });
          }
          else{
              callback(subInfo);
          }
      });
    }
};
