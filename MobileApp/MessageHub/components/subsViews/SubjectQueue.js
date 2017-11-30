import React, { Component } from 'react';
import {
    View,
    ListView,
    Text,
    TouchableOpacity
} from 'react-native';
import OverviewList from './OverviewList';
import DetailList from './DetailList';

export default class SubjectQueue extends Component {

    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            mode: 'overview',
            dataSource: ds.cloneWithRows(this.props.navigation.state.params.subjects)
        }
    }

    render() {
        let SubjectView = this.state.mode === 'overview' ? <OverviewList mode={this.state.mode} subjectDS={this.state.dataSource}/> : <DetailList mode={this.state.mode} subjectDS={this.state.dataSource}/>;
        return (
            <View style={styles.noncentered_container}>
                <View style={{alignItems: 'center', margin: 10}}>
                    <Text style={[styles.headerText, {textAlign: 'center'}]}>{this.props.navigation.state.params.area}: Subjects</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center', margin: 10}}>
                    <View style={[styles.leftSegmentTab, {backgroundColor: this.state.mode === 'detailed' ? '#FFFFFF' : '#0076FF'}]}>
                        <TouchableOpacity onPress={()=>this.setState({mode: 'overview'})}>
                            <Text style={[styles.segmentText, {color: this.state.mode === 'detailed' ? '#0076FF' : '#FFFFFF'}]}>List View</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.rightSegmentTab, {backgroundColor: this.state.mode === 'detailed' ? '#0076FF' : '#FFFFFF'}]}>
                        <TouchableOpacity onPress={()=>this.setState({mode: 'detailed'})}>
                            <Text style={[styles.segmentText, {color: this.state.mode === 'detailed' ? '#FFFFFF' : '#0076FF'}]}>Detail View</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {SubjectView}
            </View>
        );
    }
}