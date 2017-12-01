import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import {Icon} from 'native-base';
import subscription from '../../modules/subscription';
const { width, height } = Dimensions.get('window');

export default class SubjectRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subscribed: this.props.subject.subscribed
        };
    }

    sub(){
        subscription.subscribe(this.props.subject.topic_key);
        this.setState({subscribed: true});
        this.props.updateSub(this.props.index, true);
    }

    unsub(){
        subscription.unsubscribe(this.props.subject.topic_key);
        this.setState({subscribed: false});
        this.props.updateSub(this.props.index, false);
    }

    renderCheckBox(){
        if(this.props.subject.opt.level === "Forced"){
            return (
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={[styles.requiredText, {marginRight: 10}]}>Required</Text>
                    <Icon style={{color: '#a1a1a1'}} name={'md-checkbox'}/>
                </View>
            );
        }
        else if(this.state.subscribed){
            return (
                <TouchableOpacity onPress={this.unsub.bind(this)}>
                    <Icon name={'md-checkbox'}/>
                </TouchableOpacity>
            );
        }
        else{
            return (
                <TouchableOpacity onPress={this.sub.bind(this)}>
                    <Icon name={'md-square-outline'}/>
                </TouchableOpacity>
            );
        }
    }

    render() {
        var extraPadding = width >= 600 ? {paddingLeft: 40} : {paddingLeft: 30};
        return (
            <View style={{borderBottomWidth: 0.5}}>
                <View style={[extraPadding, {padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}>
                    <Text style={styles.subscriptionText}>{this.props.subject.name}</Text>
                    {this.renderCheckBox()}
                </View>
            </View>
        );
    }
}