import React, { Component } from 'react';
import {
    Text,
    View,
    Platform
} from 'react-native';
import {Icon} from 'native-base';
import moment from 'moment';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import message from '../modules/message.js';
import MessageQueue from './messageViews/MessageQueue';

export default class Home extends Component {
    static navigationOptions = {
        tabBarIcon: <Icon name='ios-home'/>
    };

    constructor(props){
        super(props);
        this.state = {
            data: [],
            date: moment().format("dddd, MMMM D, YYYY"),
            day: 'Today',
            lastUpdated: new Date()
        };
        this.currScreen = null;
    }

    componentDidMount() {
        message.getMessages((messages)=>{
            this.setState({data: messages});
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
        if(this.currScreen !== this.props.screenProps.currentScreen && this.props.screenProps.currentScreen === "Today"){
            message.getMessages((messages)=>{
                this.setState({data: messages, lastUpdated: new Date()});
            });
        }
        this.currScreen = this.props.screenProps.currentScreen;
    }

    addToQueue(newMessage){
        var messages = this.state.data.slice(); //slice list for re-render
        messages.unshift(newMessage); //add most recent message to top of the list
        this.setState({data: messages});
    }

    removeMessage(msi_key, index){
        message.removeMessage(msi_key);
        var messages = this.state.data;
        messages.splice(index, 1);
        this.setState({data:  messages, lastUpdated: new Date()});
    }

    onVisibleItemChange(visibleItems, changedItems){
        if(visibleItems[0]){
            var timestamp = visibleItems[0].item.timestamp;
            var newDate = moment(timestamp).format("dddd, MMMM D, YYYY");
            if (newDate != this.state.date) {
                var today = new Date();
                if (newDate === moment(today).format("dddd, MMMM D, YYYY")) {
                    var newDay = "Today";
                }
                else {
                    var yesterday = today;
                    yesterday.setDate(today.getDate() - 1);
                    if (newDate === moment(yesterday).format("dddd, MMMM D, YYYY")) {
                        var newDay = "Yesterday";
                    }
                    else {
                        newDay = moment(timestamp).format("dddd");
                    }
                }
                this.setState({date: newDate, day: newDay})
            }
        }
    }

    render() {
        return (
            <View style={styles.noncentered_container}>
                <View style={{marginTop: 30, alignItems: 'center'}}>
                    <Text style={styles.subHeaderText}>{this.state.date}</Text>
                    <Text style={styles.headerText}>{this.state.day}</Text>
                </View>
                <MessageQueue
                    lastUpdated={this.state.lastUpdated}
                    messageData={this.state.data}
                    removeMessage={this.removeMessage.bind(this)}
                    onVisibleItemChange={this.onVisibleItemChange.bind(this)}
                />
            </View>
        );
    }
}
