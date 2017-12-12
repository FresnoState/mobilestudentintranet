import {Platform} from 'react-native';
import FCM from 'react-native-fcm';

const API_KEY = 'AAAA1i1g05s:APA91bEm3cI3lCflqY74PSH3O-3RGUk4H9kGqXKB1NfhT9igNntvDSSqWDBxajEK-rsbFovPVJzTJojx4Q-SlgFs-7D2fT2dmdw_0ii_5jodpn__jahPlKE1UL-HibRkSO8_6WL88B3D';
var icube = [];
var loaded = false;

module.exports = {
    //gets subscription data icube either from REST endpoint or cache
    get_iCube: function(callback) {
        if(!loaded) {
            //process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
            //var url = Platform.OS === 'ios' ? 'https://mobile-api.innovate.fresnostate.edu/icube' : 'http://mobile-api.innovate.fresnostate.edu/icube';
            //var url = 'https://mobile-api.innovate.fresnostate.edu/icube';
            var url = 'http://mobile-api.innovate.fresnostate.edu/icube';
            fetch(url)
            .then(function (response) {
                return response.json();
            }).then(function (json) { //save icube to cache
                loaded = true;
                icube = json.icube;
                callback(icube);
            }).catch(function (err) {
                console.log("GET TOPICS ERR", err);
            });
        }
        else{
            callback(icube);
        }

    },
    //gets array of topic keys of currently subscribed subjects
    getSubscribed: function(callback){
        FCM.getFCMToken().then((token) => {
            fetch('https://iid.googleapis.com/iid/info/'+token+'?details=true', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'key='+API_KEY
                }
            }).then(function(response) {
                return response.json();
            }).then(function(subscribed) {
                if(subscribed.rel && subscribed.rel.topics){
                    callback(Object.keys(subscribed.rel.topics));
                }
                else{
                    callback([]);
                }
            }).catch(function(err){
                console.log("GET SUBS ERR", err);
            });
        });
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
      this.getSubscribed((subjects)=>{
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
    },
    //subscribes device to subject (FCM topic) that corresponds with topic_key parameter
    subscribe: function(topic_key){
        FCM.subscribeToTopic('/topics/'+topic_key);
    },
    //unsubscribes device from subject (FCM topic) that corresponds with topic_key parameter
    unsubscribe: function(topic_key){
        //add check here for safeguarding against removing required/forced topics?
        FCM.unsubscribeFromTopic('/topics/'+topic_key);
    }
};
