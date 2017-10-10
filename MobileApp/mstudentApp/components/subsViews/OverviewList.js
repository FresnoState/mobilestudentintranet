import React, { Component } from 'react';
import {
    Text,
    View,
    ListView
} from 'react-native';
import OverviewItem from './OverviewItem';

export default class OverviewList extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <ListView
                    dataSource={this.props.subjectDS}
                    renderRow={(rowData)=>(<OverviewItem subjectData={rowData}/>)}
                />
            </View>
        )
    }
}