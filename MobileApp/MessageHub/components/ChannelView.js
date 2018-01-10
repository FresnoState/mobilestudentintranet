import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    StyleSheet
} from 'react-native';
import {Button, Icon} from 'native-base';
import moment from 'moment';
import message from '../modules/message';
import fcm from '../modules/fcm';
import subscription from '../modules/subscription';
import MessageQueue from './messageViews/MessageQueue';
const { width, height } = Dimensions.get('window');

export default class ChannelView extends Component {
    static navigationOptions = {
        tabBarIcon: <Icon name='ios-megaphone' />
    };

    constructor(props){
        super(props);
        this.state = {
            index: 0,
            data: [],
            date: moment().format("dddd, MMMM D, YYYY"),
            lastUpdated: new Date()
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
                this.setState({data: this.channels[0].messages});
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
        fcm.listen(null, (notif)=>{
            if(this.state.data.length === 0 || notif.msi_key !== this.state.data[0].msi_key){ //if not duplicate
                if(this.state.data.length === 0 || notif.msi_key !== this.state.data[0].msi_key) { //if not duplicate
                    this.addToChannels({
                        "msi_key": notif.msi_key,
                        "topic_key": notif.topic_key,
                        "dist": notif.dist,
                        "title": notif.title,
                        "desc": notif.desc,
                        "message": notif.message,
                        "timestamp": Number(notif.timestamp)
                    });
                }
            }
        });

    }

    componentDidUpdate(){
        if(this.currScreen !== this.props.screenProps.currentScreen && this.props.screenProps.currentScreen === "Channel"){
            message.getMessages((messages)=>{
                for(var i=0; i<this.channels.length; i++){
                    this.channels[i].messages = [];
                }
                this._filterMessages(messages);
                this.setState({data: this.channels[this.state.index].messages, lastUpdated: new Date()});
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
        if(c_index != null){
            this.channels[c_index].messages.unshift(newMessage);
            if(c_index === this.state.index){
                this.updateData();
            }
        }
    }

    updateData(){
        this.setState({data: this.channels[this.state.index].messages});
    }

    removeMessage(msi_key, index){
        message.removeMessage(msi_key);
        var messages = this.state.data;
        messages.splice(index, 1);
        this.setState({data:  messages, lastUpdated: new Date()});
    }

    goLeft(){ //also update datasource
        if(this.state.index !== 0) {
            this.setState((prevState)=>{prevState.index--}, this.updateData);
        }
        else {
            this.setState({index: this.channels.length-1}, this.updateData);
        }
    }

    goRight() {
        if(this.state.index !== this.channels.length-1){
            this.setState((prevState)=>{prevState.index++}, this.updateData);
        }
        else {
            this.setState({index: 0}, this.updateData);
        }
    }

    onVisibleItemChange(visibleItems, changedItems){
        if(visibleItems[0]){
            var timestamp = visibleItems[0].item.timestamp;
            var newDate = moment(timestamp).format("dddd, MMMM D, YYYY");
            if (newDate != this.state.date) {
                this.setState({date: newDate})
            }
        }
    }

    render() {
        var headerWidth = width >= 600 ? width*0.45 : width*0.75;
        return (
            <View style={styles.noncentered_container}>
                <View style={{marginTop: 30, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', width: headerWidth}}>
                    <Text style={styles.subHeaderText}>{this.state.date}</Text>
                    <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.goLeft()}>
                            <Icon style={StyleSheet.flatten(styles.arrowText)} name='ios-arrow-back'/>
                        </TouchableOpacity>
                        <View style={{flex: 10, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={[styles.headerText, {textAlign: 'center'}]}>
                                {this.channels[this.state.index].name}
                            </Text>
                        </View>
                        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.goRight()}>
                            <Icon style={StyleSheet.flatten(styles.arrowText)} name='ios-arrow-forward'/>
                        </TouchableOpacity>
                    </View>
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
