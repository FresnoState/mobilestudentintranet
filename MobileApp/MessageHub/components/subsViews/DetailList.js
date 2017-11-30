import React, { Component } from 'react';
import {
    Text,
    View,
    ListView
} from 'react-native';
import DetailItem from './Detail_Item';

export default class DetailList extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <ListView
                    key={this.props.mode}
                    dataSource={this.props.subjectDS}
                    renderRow={(rowData)=>(<DetailItem subjectData={rowData}/>)}
                />
            </View>
        )
    }
}