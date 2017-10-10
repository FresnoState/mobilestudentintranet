import {Platform} from 'react-native';
import FCM from 'react-native-fcm';

const API_KEY = 'AAAA1i1g05s:APA91bEm3cI3lCflqY74PSH3O-3RGUk4H9kGqXKB1NfhT9igNntvDSSqWDBxajEK-rsbFovPVJzTJojx4Q-SlgFs-7D2fT2dmdw_0ii_5jodpn__jahPlKE1UL-HibRkSO8_6WL88B3D';

module.exports = {
    get_iCube: function(callback) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        //var url = Platform.OS === 'ios' ? 'https://mobile-api.innovate.fresnostate.edu/icube' : 'http://mobile-api.innovate.fresnostate.edu/icube';
        //var url = 'https://mobile-api.innovate.fresnostate.edu/icube';
        var url = 'http://mobile-api.innovate.fresnostate.edu/icube';
        fetch(url)
        .then(function(response){
            return response.json();
        }).then(function(json){
            callback(json.icube);
        }).catch(function(err){
            console.log("GET TOPICS", err);
        });

    },
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
                console.log("GET SUBS", err);
            });
        });
    },
    mergeSubData: function(subjects, subscribed, callback){
        subjects.forEach(function (subject) {
            subject["subscribed"] = subscribed.indexOf(subject.topic_key) >=0;
        });
        callback(subjects);
    },
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
    subscribe: function(topic_key){
        FCM.subscribeToTopic('/topics/'+topic_key);
    },
    unsubscribe: function(topic_key){
        //add check here for safeguarding against removing required/forced topics
        FCM.unsubscribeFromTopic('/topics/'+topic_key);
    }
};