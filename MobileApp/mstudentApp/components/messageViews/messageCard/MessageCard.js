import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    Alert
} from 'react-native';
import {Card} from 'native-base';
import MessageHeader from './MessageHeader';
import OverviewContent from './OverviewContent';
import DetailContent from './DetailContent';
import subscription from '../../../modules/subscription';
const { width, height } = Dimensions.get('window');

import Swipeable from 'react-native-swipeable';

export default class MessageCard extends Component {
    constructor(props){
        super(props);
        var swipeable = null;
        this.state = {
            expanded: this.props.expanded,
            subInfo: {
                channel: 'Channel',
                area: 'Area',
                subject: 'Subject',
                subscribed: false
            }
        }
    }

    componentDidMount(){
        subscription.getSubscriptionInfo(this.props.messageData.topic_key, (subInfo)=>{
            this.setState({subInfo: subInfo});
        });
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.messageData.msi_key !== this.props.messageData.msi_key){
            subscription.getSubscriptionInfo(nextProps.messageData.topic_key, (subInfo)=>{
                this.setState({subInfo: subInfo});
            });
        }
    }

    toggleItem(){
        this.setState((prevState)=>{return {expanded: !prevState.expanded}});
    }

    confirmDelete(){
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this message?',
            [
                {text: 'Yes', onPress: () => this.props.removeMessage(this.props.messageData.msi_key, this.props.rowID)},
                {text: 'No', onPress: ()=> this.swipeable.recenter()}
            ]
        );

    }

    render(){
        var MessageContent = this.state.expanded ? <DetailContent toggleItem={this.toggleItem.bind(this)} subInfo={this.state.subInfo} {...this.props} /> : <OverviewContent toggleItem={this.toggleItem.bind(this)} {...this.props} />;
        var cardWidth = width >= 600 ? width*0.85 : undefined;
        var swipeDist = width >= 600 ? 250 : 125;
        var rightButtons = [
            (<View></View>)
        ];
        return(
            <Swipeable
                onRef={ref => this.swipeable = ref}
                rightButtons={rightButtons}
                rightActionActivationDistance={swipeDist}
                onSwipeStart={this.props.swipeStart}
                onSwipeRelease={this.props.swipeRelease}
                onRightActionComplete={this.confirmDelete.bind(this)}
            >
            <View style={{flex: 1, alignSelf: cardWidth ? 'center' : 'stretch'}}>
                <Card style={{margin: 8, padding: 10, borderRadius: 8, width: cardWidth}}>
                    <MessageHeader subInfo={this.state.subInfo} {...this.props}/>
                    {MessageContent}
                </Card>
            </View>
            </Swipeable>
        )
    }
}