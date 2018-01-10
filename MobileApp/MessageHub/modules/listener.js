import fcm from "./fcm";
import message from "./message";
import {Platform} from 'react-native';

//sets up background listener to process notifications and store information messages
function listen(){
    var alertCallback = (notif)=> {
        if(Platform.OS === 'android'){
            fcm.displayLocalNotif(notif);
        }
    };

    var infoCallback = (notif)=> {
        message.exists(notif.msi_key, (duplicate)=>{ //if not duplicate
            if(!duplicate){
                message.addMessage(notif.msi_key, notif.topic_key, notif.dist, notif.title, notif.desc, notif.message, Number(notif.timestamp));
            }
        });
    };

    fcm.listen(alertCallback, infoCallback);
}

module.exports = listen;