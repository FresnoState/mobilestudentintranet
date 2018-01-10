import {Platform, AsyncStorage} from 'react-native';
import FCM from 'react-native-fcm';
import subscription from './subscription';
import fcm from './fcm';

//subscribes to all required/forced and recommend subjects
function initSubs(){
    subscription.get_iCube((icube)=>{
        for(var i=0; i<icube.length; ++i){
            for(var j=0; j<icube[i].areas.length; ++j){
                for(var k=0; k<icube[i].areas[j].subjects.length; ++k){
                    var sub = icube[i].areas[j].subjects[k];
                    if(sub.opt.level === 'Forced' || sub.opt.level === 'Recommended'){
                        fcm.subscribe(sub.topic_key);
                    }
                }
            }
        }
    })
}

//requests permissions if iOS, calls the subscription initialization, and sets the app initialized flag
function init(){
    if(Platform.OS === 'ios') {
        FCM.requestPermissions()
            .then(() => {
                initSubs();
                AsyncStorage.setItem('initialized', 'true');
            })
            .catch((err) => {
                console.log(err)
            });
    }
    else {
        initSubs();
        AsyncStorage.setItem('initialized', 'true');
    }
}



module.exports = init;