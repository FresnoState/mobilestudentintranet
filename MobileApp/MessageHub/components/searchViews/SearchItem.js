import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions
} from 'react-native';
import {Icon} from 'native-base';
const { width, height } = Dimensions.get('window');

export default class SearchItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{padding: 10, paddingLeft: 20, paddingRight: 20, flexDirection: 'row', borderTopWidth: 0.5, borderColor: '#8b8b90'}}>
                <Text style={[styles.itemText, {paddingLeft: 10}]}>{this.props.term}</Text>
            </View>
        );
    }
}