import React, { Component } from 'react';
import {
    View,
    Switch,
    Text
} from 'react-native';
import subscription from '../../modules/subscription';

export default class SubjectSwitch extends Component {

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
            <View style={{margin: 10}}>
                <Switch disabled={this.props.subject.opt.level === "Forced"} value={this.state.subscribed} onValueChange={(value)=>this.onSwitch(value)}/>
            </View>
        );
    }
}