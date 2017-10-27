import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';

export default class OverviewContent extends Component {
    constructor(props){
        super(props);
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
            return (
                <Text>
                    <Text>{text[0]}</Text>
                    <Text style={{color: '#0076FF'}}>{text[1]}</Text>
                    <Text>{text[2]}</Text>
                </Text>
            )
        }

    }

    render(){
        var txt = this.getFormattedMessage();
        return(
            <View>
                <Text style={styles.messageText} numberOfLines={2}>{this.getFormattedMessage()}</Text>
                <TouchableOpacity style={{alignItems: 'flex-end'}} onPress={this.props.toggleItem}>
                    <Text style={styles.pressableText}>more</Text>
                </TouchableOpacity>
            </View>
        )
    }
}