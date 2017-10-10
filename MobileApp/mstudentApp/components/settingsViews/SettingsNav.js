import React, { Component } from 'react';
import {Icon} from 'native-base';
import {StackNavigator} from 'react-navigation';
import SettingsMenu from './SettingsMenu';
import MySubscriptions from './MySubscriptions';

const SettingsNavigator = StackNavigator(
    {
        'SettingsMenu': {
            screen: SettingsMenu
        },
        'MySubscriptions': {
            screen: MySubscriptions
        }
    },
    {
        initialRouteName: 'SettingsMenu'
    }
);

export default class SettingsNav extends Component {
    static navigationOptions = {
        tabBarLabel: 'Settings',
        tabBarIcon: <Icon name='ios-settings'/>
    };

    render() {
        return (
            <SettingsNavigator />
        );
    }
}