import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import message from "./message.js";
import {Platform} from 'react-native';

function listen(){
    this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
            //debugging
            console.log(notif);

            //receive & process message
            if(Platform.OS==='android' && notif.fcm.body && !notif.local_notification){
                FCM.presentLocalNotification({
                    id: notif["google.message_id"],
                    body: notif.fcm.body,
                    sound: "default",
                    show_in_foreground: true
                });
                alert(notif.fcm.body);
            }
            if(notif.message) { //if data message
                //message.exists(notif.msi_key, (exists)=>{ //if not duplicate
                //if(!exists){
                message.addMessage(notif.msi_key, notif.topic_key, notif.dist, notif.title, notif.desc, notif.message, Number(notif.timestamp));
                //}
                //});
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
}

module.exports = listen();