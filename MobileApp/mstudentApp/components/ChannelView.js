import React, { Component } from 'react';
import {
    Text,
    View,
    ListView,
    TouchableOpacity,
    StyleSheet,
    Platform
} from 'react-native';
import {Button, Icon} from 'native-base';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import message from '../modules/message.js';
import subscription from '../modules/subscription';
import MessageQueue from './messageViews/MessageQueue';

export default class ChannelView extends Component {
    static navigationOptions = {
        tabBarLabel: 'Channel News',
        tabBarIcon: <Icon name='ios-megaphone' />
    };

    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.channels = [{"name": "Channel News", "messages": []}]; //placeholder until data loads
        this.state = {
            index: 0,
            dataSource: ds.cloneWithRows([])
        }
    }

    _initChannels() {
        var channels = [];
        subscription.get_iCube((icube)=>{
            for(var i=0; i<icube.length; ++i){
                //console.log(icube[i]._id)
                channels[i] = {id: icube[i]._id, name: icube[i].name, messages: []}
            }
            message.getMessages((messages)=>{
                for(var i=0; i<messages.length; ++i){
                    var c_index = this._getChannelIndex(channels, messages[i].channel);
                    //var channel_id = messages[i].topic_key.split("-")[0]; //parse topic key to get channel
                    //var c_index = this._getChannelIndex(channels, channel_id);
                    if(c_index != null) {
                        channels[c_index].messages.push(messages[i]);
                    }
                }
                this.channels = channels;
                this.setState({dataSource: this.state.dataSource.cloneWithRows(channels[0].messages)})
            });
        });
    }

    componentDidMount() {
        this._initChannels();
        this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
                //debugging

                if(notif.message) { //if data message
                    var now = Date.now();
                    var timestamp = Platform.OS === 'ios' ? now : notif["google.sent_time"];
                    this.addToChannels({
                        "msi_key" : notif.msi_key,
                        "topic_key" : notif.topic_key,
                        ////remove this
                        "channel": notif.channel,
                        "title" : notif.title,
                        "desc" : notif.desc,
                        "message" : notif.message,
                        "timestamp": timestamp
                    });
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

    _getChannelIndex(channels, channel_id){
        var c_index = null;
        for(var i=0; i<channels.length; ++i){
            if(channels[i].name === channel_id){
            //if(channels[i]._id === channel_id){
                c_index = i;
                break;
            }
        }
        return c_index;
    }

    addToChannels(newMessage){
        //var channel_id = newMessage.topic_key.split("-")[0];
        //var c_index = this._getChannelIndex(this.channels, channel_id);
        var c_index = this._getChannelIndex(this.channels, newMessage.channel);
        if(c_index != null){
            this.channels[c_index].messages.unshift(newMessage);
            if(c_index === this.state.index){
                //clear first, later see if more efficient way to ensure render updates correctly
                this.setState({dataSource: this.state.dataSource.cloneWithRows([])});
                this.updateDS();
            }
        }
    }

    updateDS(){
        this.setState({dataSource: this.state.dataSource.cloneWithRows(this.channels[this.state.index].messages)});
    }

    removeMessage(rowID, msi_key){
        message.removeMessage(msi_key);
        var messages = this.state.dataSource._dataBlob.s1;
        delete messages[rowID];
        this.setState({dataSource: this.state.dataSource.cloneWithRows(messages)});
    }

    goLeft(){ //also update datasource
        if(this.state.index !== 0) {
            this.setState((prevState)=>{prevState.index--}, this.updateDS);
        }
        else {
            this.setState({index: this.channels.length-1}, this.updateDS);
        }
    }

    goRight() {
        if(this.state.index !== this.channels.length-1){
            this.setState((prevState)=>{prevState.index++}, this.updateDS);
        }
        else {
            this.setState({index: 0}, this.updateDS);
        }
    }

    render() {
        return (
            <View style={styles.noncentered_container}>
                <View style={{marginTop: 20, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                    <TouchableOpacity onPress={()=>this.goLeft()}><Icon name='ios-arrow-dropleft'/></TouchableOpacity>
                    <Text style={styles.headerText}>{this.channels[this.state.index].name}</Text>
                    <TouchableOpacity onPress={()=>this.goRight()}><Icon name='ios-arrow-dropright'/></TouchableOpacity>
                </View>
                <MessageQueue messageDS={this.state.dataSource} removeMessage={this.removeMessage}/>
            </View>
        );
    }
}
