import React, { Component } from 'react';
import {
    Text,
    FlatList,
    View
} from 'react-native';
import subscription from '../../modules/subscription';
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
            subscription.getSubscribed((subscribed)=>{
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
                    style={{padding: 10}}
                    data={this.state.data}
                    renderItem={({item})=>(<SubjectRow subject={item}/>)}
                />
            </View>
        )
    }

}