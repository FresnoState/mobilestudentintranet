import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import subscription from '../../../modules/subscription';

export default class DetailContent extends Component {
    constructor(props){
        super(props);
        this.state = {
            subscribed: this.props.subInfo.subscribed
        }
    }

    subscribe(){
        //subscription.subscribe(this.props.messageData.topic_key);
        //this.setState({subscribed: true});
    }

    unsubscribe(){
        //subscription.unsubscribe(this.props.messageData.topic_key);
        //this.setState({subscribed: false});
    }

    renderSubscriptionText(){
        if(this.props.subInfo.level === "Forced"){
            return (
                <Text style={styles.infoText2}>Required</Text>
            );
        }
        else if(this.state.subscribed){
            return (
                <TouchableOpacity onPress={this.unsubscribe.bind(this)}>
                    <Text style={styles.pressableText}>Unsubscribe ✕</Text>
                </TouchableOpacity>
            );
        }
        else {
            return (
                <TouchableOpacity onPress={this.subscribe.bind(this)}>
                    <Text style={styles.pressableText}>Subscribe ✓</Text>
                </TouchableOpacity>
            );
        }
    }

    render(){
        var SubscriptionText = this.renderSubscriptionText();
        return(
            <View>
                <Text style={styles.messageText}>{this.props.messageData.message}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    {SubscriptionText}
                    <TouchableOpacity onPress={this.props.toggleItem}>
                        <Text style={styles.pressableText}>less</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}