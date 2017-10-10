import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import {Button} from 'native-base';
import OverviewList from './OverviewList';
import DetailList from './DetailList';

export default class MessageQueue extends Component {
    constructor(props){
        super(props);
        this.state = {
            mode: 'Overview'
        }
    }

    render() {
        let MessageView = this.state.mode === 'Overview' ? <OverviewList {...this.props}/> : <DetailList {...this.props}/>;
        return (
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', margin: 10}}>
                    <Button style={StyleSheet.flatten(styles.button)} info onPress={()=>this.setState({mode: 'Overview'})}><Text style={styles.defaultText}>Overview</Text></Button>
                    <Button style={StyleSheet.flatten(styles.button)} info onPress={()=>this.setState({mode: 'Detail'})}><Text style={styles.defaultText}>Detailed</Text></Button>
                </View>
                {MessageView}
            </View>
        );
    }
}
