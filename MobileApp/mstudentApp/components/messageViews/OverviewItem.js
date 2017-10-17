import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';

export default class OverviewItem extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.titleText}>{this.props.messageData.title}</Text>
                    <Text style={styles.defaultText}>{(new Date(this.props.messageData.timestamp)).toLocaleString()}</Text>
                </View>
                <Text style={styles.defaultText}>{this.props.messageData.desc}</Text>
            </View>
        )
    }
}