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
const dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

export default class Home extends Component {
    static navigationOptions = {
        tabBarIcon: <Icon name='ios-home'/>
    };

    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
            date: new Date().toLocaleDateString('en-US', dateOptions),
            day: 'Today'
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
        console.log(visibleRows, changedRows);
            if(visibleRows.s1){
                var rowID = Object.keys(visibleRows.s1)[0];
                var timestamp = this.state.dataSource._dataBlob.s1[rowID].timestamp;
                var newDate = new Date(timestamp).toLocaleDateString('en-US', dateOptions);
                if (newDate != this.state.date) {
                    var today = new Date();
                    if (newDate === today.toLocaleDateString('en-US', dateOptions)) {
                        var newDay = "Today";
                    }
                    else {
                        var yesterday = today;
                        yesterday.setDate(today.getDate() - 1);
                        if (newDate === yesterday.toLocaleDateString('en-US', dateOptions)) {
                            var newDay = "Yesterday";
                        }
                        else {
                            newDay = new Date(timestamp).toLocaleDateString('en-US', {weekday: 'long'})
                        }
                    }
                    this.setState({date: newDate, day: newDay})
                }
            }
    }

    render() {
        //console.log("HOME", this.props.screenProps);
        return (
            <View style={styles.noncentered_container}>
                <View style={{marginTop: 30, alignItems: 'center'}}>
                    <Text style={styles.subHeaderText}>{this.state.date}</Text>
                    <Text style={styles.headerText}>{this.state.day}</Text>
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
