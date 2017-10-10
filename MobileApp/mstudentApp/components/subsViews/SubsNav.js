import React, { Component } from 'react';
import {Icon} from 'native-base';
import {StackNavigator} from 'react-navigation';
import SubsView from './SubsView';
import AreaView from './AreaView';
import SubjectView from "./SubjectQueue";

const SubNavigator = StackNavigator(
    {
        'SubsView': {
            screen: SubsView
        },
        'AreaView': {
            screen: AreaView
        },
        'SubjectView': {
            screen: SubjectView
        }
    },
    {
        initialRouteName: 'SubsView'
    }
);

export default class SubsNav extends Component {
    static navigationOptions = {
        tabBarLabel: 'Subscriptions',
        tabBarIcon: <Icon name='ios-checkbox'/>
    };

    render() {
        return (
            <SubNavigator />
        );
    }
}