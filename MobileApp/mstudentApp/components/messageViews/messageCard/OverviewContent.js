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

    render(){
        return(
            <View>
                <Text style={styles.messageText} numberOfLines={2}>{this.props.messageData.message}</Text>
                    <TouchableOpacity style={{alignItems: 'flex-end'}} onPress={this.props.toggleItem}>
                        <Text style={styles.pressableText}>more</Text>
                    </TouchableOpacity>
            </View>
        )
    }
}