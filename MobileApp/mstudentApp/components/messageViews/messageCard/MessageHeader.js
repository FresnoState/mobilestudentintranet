import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';

export default class MessageHeader extends Component {
    constructor(props){
        super(props);
    }

    getDateTimeString(timestamp){
        var displayString = "";
        var today = new Date();
        var messageDateTime = new Date(timestamp);
        if(messageDateTime.toDateString() === today.toDateString()){
            displayString += "Today";
        }
        else {
            var yesterday = new Date(today);
            yesterday.setDate(today.getDate()-1);
            if(messageDateTime.toDateString() === yesterday.toDateString()){
                displayString += "Yesterday";
            }
            else {
                var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
                displayString += weekdays[messageDateTime.getDay()];
            }
        }
        displayString += ", ";
        displayString += messageDateTime.toLocaleString('en-US', {hour: 'numeric', minute:'numeric', hour12: true});
        return displayString;
    }

    render(){
        var Title = this.props.messageData.dist === 'Alert' ? (
                        <Text style={styles.titleAlertText}>ALERT: {this.props.messageData.title}</Text>
                    ) : (
                        <Text style={styles.titleText}>{this.props.messageData.title}</Text>
                    );
        return(
            <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.infoText1}>{this.props.subInfo.channel}</Text>
                    <Text style={styles.infoText1}>{this.getDateTimeString(this.props.messageData.timestamp)}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.infoText2}>{this.props.subInfo.area}</Text>
                    <Text style={styles.infoText2}>{" > "}</Text>
                    <Text style={styles.infoText2}>{this.props.subInfo.subject}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    {Title}
                </View>
            </View>
        )
    }
}