import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ListView
} from 'react-native';
import {Button} from 'native-base';
import MessageCard from './messageCard/MessageCard';

export default class MessageQueue extends Component {
    constructor(props){
        super(props);
        this.state = {
            expanded: false
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', margin: 10}}>
                    <Button style={StyleSheet.flatten(styles.button)} info onPress={()=>this.setState({expanded: false})}><Text style={styles.defaultText}>Overview</Text></Button>
                    <Button style={StyleSheet.flatten(styles.button)} info onPress={()=>this.setState({expanded: true})}><Text style={styles.defaultText}>Detailed</Text></Button>
                </View>
                <ListView
                    dataSource={this.props.messageDS}
                    renderRow={(rowData, sectionID, rowID)=>(<MessageCard expanded={this.state.expanded} messageData={rowData} rowID={rowID} removeMessage={this.props.removeMessage.bind(this)}/>)}
                />
            </View>
        );
    }
}
