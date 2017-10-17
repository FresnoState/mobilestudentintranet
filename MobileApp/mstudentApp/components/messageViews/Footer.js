import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import {Icon} from 'native-base';

export default class ToggableItem extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={{margin: 10, marginTop: 20, flexDirection: 'row', flex: 1}}>
                <View style={{alignItems: 'center', flex: 1}}>
                    {this.props.messageData.dist === "Alert" && <Icon name='ios-notifications'/> }
                </View>
                <View style={{alignItems: 'center', flex: 1}}>
                    <TouchableOpacity>
                        {this.props.messageData.event !== "" && <Icon name='ios-calendar'/>}
                    </TouchableOpacity>
                </View>
                <View style={{alignItems: 'center', flex: 1}}>
                    <TouchableOpacity onPress={()=>this.props.removeMessage(this.props.messageData.msi_key, this.props.rowID)}>
                        <Icon name='ios-trash'/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}