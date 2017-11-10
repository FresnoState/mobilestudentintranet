import React, { Component } from 'react';
import {
    Text,
    View,
    ListView,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import MessageCard from './messageCard/MessageCard';
const { width, height } = Dimensions.get('window');

export default class MessageQueue extends Component {
    constructor(props){
        super(props);
        this.state = {
            expanded: false,
            mode: 'overview',
            isSwiping: false
        }
    }

    componentDidMount(){
        //workaround for iOS loading issue
        setTimeout(()=> {
            this.listView.scrollTo({x: 0,  y: 50, animated: false});
            this.listView.scrollTo({x: 0,  y: 0, animated: false});
        }, 100)
    }

    renderRow(rowData, sectionID, rowID){
        return (
            <MessageCard
                expanded={this.state.expanded}
                mode={this.state.mode}
                messageData={rowData}
                rowID={rowID}
                removeMessage={this.props.removeMessage.bind(this)}
                swipeStart={this.swipeStart.bind(this)}
                swipeRelease={this.swipeRelease.bind(this)}
            />
        )
    }

    swipeStart(){
        this.setState({isSwiping: true});
    }

    swipeRelease(){
        this.setState({isSwiping: false});
    }

    render() {
        var segmentWidth = width >= 600 ? width*0.7 : undefined;
        return (
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', margin: 10, width: segmentWidth}}>
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
                    scrollEnabled={!this.state.isSwiping}
                    dataSource={this.props.messageDS}
                    renderRow={this.renderRow.bind(this)}
                    onChangeVisibleRows={this.props.onVisibleRowChange}
                />
            </View>
        );
    }
}
