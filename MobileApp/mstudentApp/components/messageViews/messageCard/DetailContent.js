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

    getFormattedMessage(){
        var message = this.props.messageData.message;
        var text = message.split('---');

        return (
            <Text>
                <Text>{text[0]}</Text>
                <Text style={{color: '#0076FF'}}>{text[1]}</Text>
                <Text>{text[2]}</Text>
            </Text>
        )

    }

    renderSubscriptionText(){
        if(this.props.subInfo.level === "Forced"){
            return (
                <Text style={styles.infoText2}>Required</Text>
            );
        }
        else if(this.state.subscribed){
            return (
                <TouchableOpacity>
                    <Text style={styles.pressableText}>Unsubscribe ✕</Text>
                </TouchableOpacity>
            );
        }
        else {
            return (
                <TouchableOpacity>
                    <Text style={styles.pressableText}>Subscribe ✓</Text>
                </TouchableOpacity>
            );
        }
    }

    render(){
        var SubscriptionText = this.renderSubscriptionText();
        return(
            <View>
                <Text style={styles.messageText}>{this.getFormattedMessage()}</Text>
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