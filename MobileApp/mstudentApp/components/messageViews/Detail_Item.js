import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';
import subscription from '../../modules/subscription';

export default class DetailItem extends Component {
    constructor(props){
        super(props);
        this.state = {
           subInfo: {
               channel: 'Channel',
               area: 'Area',
               subject: 'Subject'
           }
        };
    }

    componentDidMount(){
        subscription.getSubscriptionInfo(this.props.messageData.topic_key, (subInfo)=>{
            this.setState({subInfo: subInfo});
        });
    }

    render(){
        return(
            <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.titleText}>{this.props.messageData.title}</Text>
                    <Text style={styles.defaultText}>{(new Date(this.props.messageData.timestamp)).toLocaleString()}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Text style={styles.defaultText}>{this.state.subInfo.channel}</Text>
                    <Text style={styles.defaultText}>{">"}</Text>
                    <Text style={styles.defaultText}>{this.state.subInfo.area}</Text>
                    <Text style={styles.defaultText}>{">"}</Text>
                    <Text style={styles.defaultText}>{this.state.subInfo.subject}</Text>
                </View>
                <Text style={styles.defaultText}>{this.props.messageData.message}</Text>
            </View>
        )
    }
}