import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';
import {Card} from 'native-base';

export default class DetailItem extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <Card style={{margin: 10, padding: 10}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.titleText}>{this.props.messageData.title}</Text>
                        <Text style={styles.defaultText}>{(new Date(this.props.messageData.timestamp)).toLocaleString()}</Text>
                    </View>
                    <Text style={styles.defaultText}>{this.props.messageData.message}</Text>
                </Card>
            </View>
        )
    }
}