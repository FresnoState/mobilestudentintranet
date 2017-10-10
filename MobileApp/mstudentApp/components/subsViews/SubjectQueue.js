import React, { Component } from 'react';
import {
    View,
    ListView,
    Text,
    StyleSheet
} from 'react-native';
import {Button} from 'native-base';
import OverviewList from './OverviewList';
import DetailList from './DetailList';
//import SubjectRow from './SubjectRow';

export default class SubjectQueue extends Component {

    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            mode: 'Overview',
            dataSource: ds.cloneWithRows(this.props.navigation.state.params.subjects)
        }
    }

    render() {
        let SubjectView = this.state.mode === 'Overview' ? <OverviewList subjectDS={this.state.dataSource}/> : <DetailList subjectDS={this.state.dataSource}/>;
        return (
            <View style={styles.noncentered_container}>
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.headerText}>{this.props.navigation.state.params.area}: Subjects</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', margin: 10}}>
                    <Button style={StyleSheet.flatten(styles.button)} info onPress={()=>this.setState({mode: 'Overview'})}><Text style={styles.defaultText}>Overview</Text></Button>
                    <Button style={StyleSheet.flatten(styles.button)} info onPress={()=>this.setState({mode: 'Detail'})}><Text style={styles.defaultText}>Detailed</Text></Button>
                </View>
                {/*<ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData)=>(<SubjectRow subject={rowData}/>)}
                />*/}
                {SubjectView}
            </View>
        );
    }
}