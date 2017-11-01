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

    componentDidMount(){
        //workaround for iOS loading issue
        setTimeout(()=> {
            this.listView.scrollTo({x: 0,  y: 50, animated: false});
            this.listView.scrollTo({x: 0,  y: 0, animated: false});
        }, 100)

    }

    render(){
        return(
            <View style={{flex: 1}}>
                <ListView
                    ref={(view) => this.listView = view}
                    key={this.props.mode}
                    dataSource={this.props.subjectDS}
                    renderRow={(rowData)=>(<OverviewItem subjectData={rowData}/>)}
                />
            </View>
        )
    }
}