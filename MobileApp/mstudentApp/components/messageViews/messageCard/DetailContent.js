import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';

export default class DetailContent extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <Text style={styles.messageText}>{this.props.messageData.message}</Text>
                <TouchableOpacity onPress={this.props.toggleItem}>
                    <Text style={styles.pressableText}>less</Text>
                </TouchableOpacity>
            </View>
        )
    }

    /*
    * render(){
        return(
            <View>
                <View style={{flexDirection: 'row', flex: 1}}>
                    <View style={{flex: 5}}>
                        <Text style={styles.messageText}>{this.props.messageData.message}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <TouchableOpacity onPress={this.props.toggleItem}>
                            <Text style={styles.pressableText}>less</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    *
    * */
}