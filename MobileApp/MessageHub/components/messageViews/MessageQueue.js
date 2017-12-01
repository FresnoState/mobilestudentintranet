import React, { Component } from 'react';
import {
    Text,
    View,
    FlatList,
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

    _keyExtractor = (item, index) => item.msi_key;

    renderItem({item, index}){
        return (
            <MessageCard
                index={index}
                expanded={this.state.expanded}
                mode={this.state.mode}
                messageData={item}
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

    viewChange = ({viewableItems, changed}) => {
        this.props.onVisibleItemChange(viewableItems, changed);
    };

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
                <View style={{paddingLeft: 7, paddingRight: 7}}>
                    <FlatList
                        style={{marginBottom: 50}}
                        key={this.state.mode}
                        keyExtractor={this._keyExtractor}
                        scrollEnabled={!this.state.isSwiping}
                        data={this.props.messageData}
                        extraData={this.props.lastUpdated}
                        renderItem={this.renderItem.bind(this)}
                        onViewableItemsChanged={this.viewChange}
                    />
                </View>
            </View>
        );
    }
}
