import React, { Component } from 'react';
import {
    Text,
    View,
    ListView
} from 'react-native';
import ContainerItem from './ContainerItem';

export default class ContainerList extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <ListView
                    dataSource={this.props.messageDS}
                    renderRow={(rowData, sectionID, rowID)=>(<ContainerItem messageData={rowData} rowID={rowID} removeMessage={this.props.removeMessage.bind(this)}/>)}
                />
            </View>
        )
    }
}