import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Animated
} from 'react-native';
import SubjectRow from './SubjectRow';
import subscription from '../../modules/subscription';
import fcm from "../../modules/fcm";

export default class AreaPanel extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            expanded: false,
            animation: new Animated.Value(),
            lastUpdated: new Date()
        };
    }

    componentWillReceiveProps(){
        fcm.getSubscribed((subscribed)=>{
            subscription.mergeSubData(this.props.area.subjects, subscribed, (subjects)=>{
                this.setState({expanded: false, data: subjects});
            })
        });
    }

    updateSub(index, subscribed){
        var subjects = this.state.data;
        subjects[index].subscribed = subscribed;
        this.setState({data: subjects, lastUpdated: new Date()});
    }

    toggle(){
        let initialValue = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({expanded : !this.state.expanded});

        this.state.animation.setValue(initialValue);
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();
    }

    _setMaxHeight(event){
        this.setState({maxHeight : event.nativeEvent.layout.height});
    }

    _setMinHeight(event){
        this.setState({minHeight : event.nativeEvent.layout.height});
    }

    render(){
        return (
            <Animated.View
                style={{height: this.state.animation, overflow: 'hidden'}}>
                <TouchableOpacity
                    onPress={this.toggle.bind(this)}
                    style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, padding: 10, paddingTop: 15, paddingBottom: 15}}
                    onLayout={this._setMinHeight.bind(this)}
                >
                    <Text style={styles.itemText}>{this.props.area.name}</Text>
                    <Text style={styles.countText}>{this.props.area.subjects.length}</Text>
                </TouchableOpacity>
                {
                    this.state.expanded ?
                        <View onlayout={this._setMaxHeight.bind(this)}>
                            <FlatList
                                data={this.state.data}
                                extraData={this.state.lastUpdated}
                                renderItem={({item, index})=>(<SubjectRow subject={item} index={index} updateSub={this.updateSub.bind(this)}/>)}
                            />
                        </View>
                        :
                        null
                }
            </Animated.View>
        );
    }
}
