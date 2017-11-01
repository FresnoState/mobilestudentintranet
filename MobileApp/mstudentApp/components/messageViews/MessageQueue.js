import React, { Component } from 'react';
import {
    Text,
    View,
    ListView,
    TouchableOpacity
} from 'react-native';
import MessageCard from './messageCard/MessageCard';

export default class MessageQueue extends Component {
    constructor(props){
        super(props);
        this.state = {
            expanded: false,
            mode: 'overview'
        }
    }

    componentDidMount(){
        //workaround for iOS loading issue
        setTimeout(()=> {
            this.listView.scrollTo({x: 0,  y: 50, animated: false});
            this.listView.scrollTo({x: 0,  y: 0, animated: false});
        }, 100)

    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row', justifyContent: 'center', margin: 10}}>
                    <View style={[styles.leftSegmentTab, {backgroundColor: this.state.expanded ? '#FFFFFF' : '#0076FF'}]}>
                        <TouchableOpacity onPress={()=>this.setState({expanded: false, mode: 'overview'})}>
                            <Text style={[styles.segmentText, {color: this.state.expanded ? '#0076FF' : '#FFFFFF'}]}>List View</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.rightSegmentTab, {backgroundColor: this.state.expanded ? '#0076FF' : '#FFFFFF'}]}>
                        <TouchableOpacity onPress={()=>this.setState({expanded: true, mode: 'detailed'})}>
                            <Text style={[styles.segmentText, {color: this.state.expanded ? '#FFFFFF' : '#0076FF'}]}>Detail View</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ListView
                    ref={(view) => this.listView = view}
                    key={this.state.mode}
                    dataSource={this.props.messageDS}
                    renderRow={(rowData, sectionID, rowID)=>(<MessageCard expanded={this.state.expanded} mode={this.state.mode} messageData={rowData} rowID={rowID} removeMessage={this.props.removeMessage.bind(this)}/>)}
                    onChangeVisibleRows={this.props.onVisibleRowChange}
                />
            </View>
        );
    }
}
