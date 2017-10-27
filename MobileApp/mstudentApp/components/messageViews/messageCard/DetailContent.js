import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

export default class DetailContent extends Component {
    constructor(props){
        super(props);
        this.state = {
            subscribed: this.props.subInfo.subscribed
        };
        this.event = false;
    }

    getFormattedMessage(){
        var message = this.props.messageData.message;
        var text = message.split('---');
        if(text.length === 1){
            return (
                <Text>{message}</Text>
            )
        }
        else{
            this.event = true;
            return (
                <Text>
                    <Text>{text[0]}</Text>
                    <Text style={{color: '#0076FF'}}>{text[1]}</Text>
                    <Text>{text[2]}</Text>
                </Text>
            )
        }
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
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 6}}>
                        {SubscriptionText}
                    </View>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Image style={{width: 15, height: 15}} source={require('../../../images/save.png')} />
                    </View>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        {this.event &&
                        (<Image style={{width: 15, height: 15}} source={require('../../../images/calendar.png')} />)}
                    </View>
                    <View style={{flex: 2, alignItems: 'flex-end'}}>
                        {this.props.mode === 'overview' &&
                        (<TouchableOpacity onPress={this.props.toggleItem}>
                            <Text style={styles.pressableText}>less</Text>
                        </TouchableOpacity>)}
                    </View>
                </View>
            </View>
        )
    }
}