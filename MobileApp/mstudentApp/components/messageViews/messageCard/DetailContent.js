import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
const { width, height } = Dimensions.get('window');

export default class DetailContent extends Component {
    constructor(props){
        super(props);
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
        else if(this.props.subInfo.subscribed){
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
        var subAlign = width >= 600 ? 'flex-end' : 'flex-start';
        var subFlex = width >= 600 ? 20 : 8.5;
        return(
            <View>
                <Text style={styles.messageText}>{this.getFormattedMessage()}</Text>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: subFlex, alignItems: subAlign}}>
                        {SubscriptionText}
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                        <Image style={{width: 15, height: 15}} source={require('../../../images/save.png')} />
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                    {this.event &&
                        (<Image style={{width: 15, height: 15}} source={require('../../../images/calendar.png')} />
                    )}
                    </View>
                    {this.props.mode === 'overview' &&
                    (<View style={{flex: 1.5, alignItems: 'flex-end'}}>
                        <TouchableOpacity onPress={this.props.toggleItem}>
                            <Text style={styles.pressableText}>less</Text>
                        </TouchableOpacity>
                    </View>)}
                </View>
            </View>
        )
    }
}