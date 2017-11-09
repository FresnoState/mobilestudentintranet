import React, { Component } from 'react';
import {
    Text,
    View,
    ListView,
    TouchableOpacity,
    Dimensions,
    Platform,
    StyleSheet
} from 'react-native';
import {Button, Icon} from 'native-base';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import message from '../modules/message.js';
import subscription from '../modules/subscription';
import MessageQueue from './messageViews/MessageQueue';
const dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
const { width, height } = Dimensions.get('window');

export default class ChannelView extends Component {
    static navigationOptions = {
        tabBarIcon: <Icon name='ios-megaphone' />
    };

    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            index: 0,
            dataSource: ds.cloneWithRows([]),
            date: new Date().toLocaleDateString('en-US', dateOptions)
        };
        this.channels = [{"name": "Channel News", "messages": []}]; //placeholder until data loads
        this.currScreen = null;
    }

    _initChannels() {
        subscription.get_iCube((icube)=>{
            for(var i=0; i<icube.length; ++i){
                this.channels[i] = {id: icube[i]._id, name: icube[i].name, messages: []}
            }
            message.getMessages((messages)=>{
                this._filterMessages(messages);
                //this._filterMessages(this.props.screenProps.messages);
                this.setState({dataSource: this.state.dataSource.cloneWithRows(this.channels[0].messages)})
            });
        });
    }

    _filterMessages(messages){
        for(var i=0; i<messages.length; ++i){
            var channel_id = messages[i].topic_key.split("-")[0]; //parse topic key to get channel
            var c_index = this._getChannelIndex(channel_id);
            if(c_index != null) {
                this.channels[c_index].messages.push(messages[i]);
            }
        }
    }

    componentDidMount() {
        this._initChannels();
        this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
                //debugging

                if(notif.message) { //if data message
                    this.addToChannels({
                        "msi_key" : notif.msi_key,
                        "topic_key" : notif.topic_key,
                        "dist" : notif.dist,
                        "title" : notif.title,
                        "desc" : notif.desc,
                        "message" : notif.message,
                        "timestamp": Number(notif.timestamp)
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

    componentDidUpdate(){
        if(this.currScreen !== this.props.screenProps.currentScreen && this.props.screenProps.currentScreen === "Channel"){
            message.getMessages((messages)=>{
                for(var i=0; i<this.channels.length; i++){
                    this.channels[i].messages = [];
                }
                this._filterMessages(messages);
                this.setState({dataSource: this.state.dataSource.cloneWithRows(this.channels[this.state.index].messages)})
            });
        }
        this.currScreen = this.props.screenProps.currentScreen;
    }

    _getChannelIndex(channel_id){
        var c_index = null;
        for(var i=0; i<this.channels.length; ++i){
            if(this.channels[i].id === channel_id){
                c_index = i;
                break;
            }
        }
        return c_index;
    }

    addToChannels(newMessage){
        var channel_id = newMessage.topic_key.split("-")[0];
        var c_index = this._getChannelIndex(channel_id);
        //var c_index = this._getChannelIndex(newMessage.channel);
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

    removeMessage(msi_key, rowID){
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

    onVisibleRowChange(visibleRows, changedRows){
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
        var headerWidth = width >= 600 ? width*0.4 : width*0.75;
        return (
            <View style={styles.noncentered_container}>
                <View style={{marginTop: 30, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', width: headerWidth}}>
                    <Text style={styles.subHeaderText}>{this.state.date}</Text>
                    <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.goLeft()}>
                            <Icon style={StyleSheet.flatten(styles.headerText)} name='ios-arrow-back'/>
                        </TouchableOpacity>
                        <View style={{flex: 10, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={[styles.headerText, {textAlign: 'center'}]}>
                                {this.channels[this.state.index].name}
                            </Text>
                        </View>
                        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.goRight()}>
                            <Icon style={StyleSheet.flatten(styles.headerText)} name='ios-arrow-forward'/>
                        </TouchableOpacity>
                    </View>
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
