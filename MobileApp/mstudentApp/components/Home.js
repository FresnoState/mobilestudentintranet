import React, { Component } from 'react';
import {
    Text,
    View,
    ListView,
    Platform
} from 'react-native';
import {Icon} from 'native-base';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import message from '../modules/message.js';
import MessageQueue from './messageViews/MessageQueue';

export default class Home extends Component {
    static navigationOptions = {
        tabBarLabel: 'Home',
        tabBarIcon: <Icon name='ios-home'/>
    };

    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
            selectedIndex: 0
        };
        this.currScreen = null;
    }

    componentDidMount() {
        //console.log("HOME", this.props.screenProps);
        message.getMessages((messages)=>{
            this.setState({dataSource: this.state.dataSource.cloneWithRows(messages)});
        });

        this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
                if(notif.message) { //if data message
                    //message.exists(notif.msi_key, (exists)=>{ //if not duplicate
                           this.addToQueue({
                               "msi_key" : notif.msi_key,
                               "topic_key" : notif.topic_key,
                               "dist" : notif.dist,
                               "title" : notif.title,
                               "desc" : notif.desc,
                               "message" : notif.message,
                               "timestamp": Number(notif.timestamp)
                           });
                           console.log(new Date(notif.timestamp).toLocaleString())
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

    componentDidUpdate(){
        if(this.currScreen !== this.props.screenProps.currentScreen && this.props.screenProps.currentScreen === "Home"){
            message.getMessages((messages)=>{
                this.setState({dataSource: this.state.dataSource.cloneWithRows(messages)});
            });
        }
        this.currScreen = this.props.screenProps.currentScreen;
    }

    addToQueue(newMessage){
        var messages = this.state.dataSource._dataBlob.s1.slice(); //slice list for re-render
        messages.unshift(newMessage); //add most recent message to top of the list
        this.setState({dataSource: this.state.dataSource.cloneWithRows(messages)});
    }

    removeMessage(msi_key, rowID){
        message.removeMessage(msi_key);
        var messages = this.state.dataSource._dataBlob.s1;
        delete messages[rowID];
        this.setState({dataSource: this.state.dataSource.cloneWithRows(messages)});
    }

    onVisibleRowChange(visibleRows, changedRows){
        console.log('onVisibleRowChange')
        console.log(visibleRows, changedRows);
    }

    render() {
        //console.log("HOME", this.props.screenProps);
        return (
            <View style={styles.noncentered_container}>
                <View style={{marginTop: 10, alignItems: 'center'}}>
                    <Text style={styles.headerText}>Messages</Text>
                </View>
                <MessageQueue
                    messageDS={this.state.dataSource}
                    removeMessage={this.removeMessage.bind(this)}
                    onVisibleRowChange={this.onVisibleRowChange.bind(this)}
                />
            </View>
        );
    }
}
