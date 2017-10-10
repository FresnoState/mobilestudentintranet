import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import {Card, Icon} from 'native-base';

export default class OverviewItem extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Card style={{margin: 10, padding: 10}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.titleText}>{this.props.messageData.title}</Text>
                    <Text style={styles.defaultText}>{(new Date(this.props.messageData.timestamp)).toLocaleString()}</Text>
                </View>
                <Text style={styles.defaultText}>{this.props.messageData.desc}</Text>
                <View style={{margin: 10, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{alignItems: 'center'}}>
                        <Icon name='ios-notifications'/>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity onPress={()=>this.props.removeMessage(this.props.messageData.msi_key, this.props.rowID)}>
                            <Icon name='ios-trash'/>
                        </TouchableOpacity>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity>
                            <Icon name='ios-calendar'/>
                        </TouchableOpacity>
                    </View>
                </View>
            </Card>
        )
    }
}