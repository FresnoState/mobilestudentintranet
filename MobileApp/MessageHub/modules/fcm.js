//interface for accessing react-native-fcm module

import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import {Platform} from "react-native";

const API_KEY = 'api-key';

module.exports = {
    listen: function(alertCallback, infoCallback){
        this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {

                //if alert type message
                if(!notif.local_notification){
                    //if iOS or Android alert
                    if((notif.aps && notif.aps.alert && notif.aps.alert.body) || (notif.fcm && notif.fcm.body)){
                        if(alertCallback) {
                            alertCallback(notif);
                        }
                    }
                }
                //if information type message
                if(notif.message) {
                    if(infoCallback)
                        infoCallback(notif);
                }

                //closing iOS notification, required for being able to properly continuing receiving notifications
                if (Platform.OS === 'ios') {
                    switch (notif._notificationType) {
                        case NotificationType.Remote:
                            notif.finish(RemoteNotificationResult.NewData);
                            break;
                        case NotificationType.NotificationResponse:
                            notif.finish();
                            break;
                        case NotificationType.WillPresent:
                            notif.finish(WillPresentNotificationResult.All);
                            break;
                    }
                }
            }
        );
    },
    displayLocalNotif: function(notif){ //Android Only
        FCM.presentLocalNotification({
            id: notif["google.message_id"],
            body: notif.fcm.body,
            sound: "default",
            show_in_foreground: true
        });
        alert(notif.fcm.body);
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
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(subscribed) {
                if(subscribed.rel && subscribed.rel.topics){
                    callback(Object.keys(subscribed.rel.topics));
                }
                else{
                    callback([]);
                }
            })
            .catch(function(err){
                console.log("GET SUBS ERR", err);
            });
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
