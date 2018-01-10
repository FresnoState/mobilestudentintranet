import React, { Component } from 'react';
import {
    Text,
    FlatList,
    View
} from 'react-native';
import subscription from '../../modules/subscription';
import fcm from '../../modules/fcm';
import SubjectRow from '../subscriptionViews/SubjectRow';

export default class MySubscriptions extends Component {
    constructor(props){
        super(props);
        this.state = {data: []};
    }

    componentDidMount() {
        subscription.get_iCube((icube)=>{
            var subjects = [];
            icube.forEach(function(channel){
                channel.areas.forEach(function(area){
                    subjects = subjects.concat(area.subjects);
                });
            });
            fcm.getSubscribed((subscribed)=>{
                subscription.mergeMySubData(subjects, subscribed, (mySubjects)=>{
                    this.setState({data: mySubjects});
                });
            });
        });
    }

    render() {
        return (
            <View style={styles.noncentered_container}>
                <View style={{alignItems: 'center'}}>
                    <Text style={[styles.headerText, {margin: 10}]}>My Subscriptions</Text>
                </View>
                <FlatList
                    style={{paddingLeft: 10, paddingRight: 10}}
                    data={this.state.data}
                    renderItem={({item})=>(<SubjectRow subject={item}/>)}
                />
            </View>
        )
    }

}