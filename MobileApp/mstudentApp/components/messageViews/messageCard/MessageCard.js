import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';
import {Card} from 'native-base';
import MessageHeader from './MessageHeader';
import OverviewContent from './OverviewContent';
import DetailContent from './DetailContent';
import subscription from '../../../modules/subscription';

export default class MessageCard extends Component {
    constructor(props){
        super(props);
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
        this.setState({expanded: nextProps.expanded});
        subscription.getSubscriptionInfo(nextProps.messageData.topic_key, (subInfo)=>{
            this.setState({subInfo: subInfo});
        });
    }

    toggleItem(){
        this.setState((prevState)=>{return {expanded: !prevState.expanded}});
    }

    render(){
        var MessageContent = this.state.expanded ? <DetailContent toggleItem={this.toggleItem.bind(this)} subInfo={this.state.subInfo} {...this.props} /> : <OverviewContent toggleItem={this.toggleItem.bind(this)} {...this.props} />;
        return(
            <View>
                <Card style={{margin: 8, padding: 10, borderRadius: 8}}>
                    <MessageHeader subInfo={this.state.subInfo} {...this.props}/>
                    {MessageContent}
                </Card>
            </View>
        )
    }
}