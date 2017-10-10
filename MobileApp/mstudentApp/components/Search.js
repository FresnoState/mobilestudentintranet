import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';
import {Icon} from 'native-base';

export default class Search extends Component {
    static navigationOptions = {
        tabBarLabel: 'Search',
        tabBarIcon: <Icon name='ios-search'/>
    };

    render() {
        return (
            <Text>Search</Text>
        )
    }

}