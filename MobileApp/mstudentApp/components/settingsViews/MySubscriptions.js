import React, { Component } from 'react';
import {
    Text,
    ListView,
    View
} from 'react-native';
import OverviewList from '../subsViews/OverviewList';
import subscription from '../../modules/subscription';

export default class MySubscriptions extends Component {
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {dataSource: ds.cloneWithRows([])};
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
                    this.setState({dataSource: this.state.dataSource.cloneWithRows(mySubjects)});
                });
            });
        });
    }

    render() {
        return (
            <View style={styles.noncentered_container}>
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.headerText}>My Subscriptions</Text>
                </View>
                <OverviewList subjectDS={this.state.dataSource}/>
            </View>
        )
    }

}