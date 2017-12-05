import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Animated
} from 'react-native';
import {Icon} from 'native-base';

export default class SearchPanel extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            expanded: true,
            animation: new Animated.Value(),
            lastUpdated: new Date()
        };
    }

    toggle(){
        let initialValue = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({expanded: !this.state.expanded});

        this.state.animation.setValue(initialValue);
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();
    }

    _setMaxHeight(event){
        this.setState({maxHeight: event.nativeEvent.layout.height});
    }

    _setMinHeight(event){
        this.setState({minHeight: event.nativeEvent.layout.height});
    }

    render(){
        var iconName = this.state.expanded ? 'ios-arrow-up' : 'ios-arrow-down';
        return (
            <Animated.View
                style={{height: this.state.animation, overflow: 'hidden'}}>
                <View
                    style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, paddingBottom: 10}}
                    onLayout={this._setMinHeight.bind(this)}
                >
                    <Text style={styles.subHeaderText3}>{this.props.header}</Text>
                    <TouchableOpacity onPress={this.toggle.bind(this)}>
                        <Icon name={iconName} style={{fontSize: 20, color: '#8b8b90'}} />
                    </TouchableOpacity>
                </View>
                {
                    this.state.expanded ?
                        <View onlayout={this._setMaxHeight.bind(this)}>
                            {this.props.children}
                        </View>
                        :
                        null
                }
            </Animated.View>
        );
    }
}
