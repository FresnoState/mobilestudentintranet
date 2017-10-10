import React, { Component } from 'react';
import {
    View,
    ListView,
    Switch,
    Text
} from 'react-native';
import subscription from '../../modules/subscription';

export default class SubjectRow extends Component {

    constructor(props){
        super(props);
        this.state = {subscribed: this.props.subject.subscribed};
    }

    onSwitch(switched){
        if(switched) {
            subscription.subscribe(this.props.subject.topic_key);
        }
        else{
            subscription.unsubscribe(this.props.subject.topic_key);
        }

        this.setState({subscribed: switched});
    }

    render() {
        return (
            <View style={{margin: 10, padding: 10, flexDirection: 'row'}}>
                <Switch disabled={this.props.subject.opt.level === "Forced"} value={this.state.subscribed} onValueChange={(value)=>this.onSwitch(value)}/>
                <Text style={styles.defaultText}>{this.props.subject.name}</Text>
            </View>
        );
    }
}