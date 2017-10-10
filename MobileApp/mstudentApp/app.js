import React, { Component } from 'react';
import {NativeModules, AsyncStorage} from 'react-native';
import {TabNavigator, TabBarBottom} from 'react-navigation';
import styles from './styles.js';
import Home from './components/Home.js';
import SubsNav from './components/subsViews/SubsNav';
import ChannelView from './components/ChannelView';
import Search from './components/Search';
import SettingsNav from './components/settingsViews/SettingsNav';

import init from './modules/init';
import listener from './modules/listener';


console.disableYellowBox = true;
NativeModules.ExceptionsManager = null;

const AppNavigator = TabNavigator(
    {
        'Home': {
            screen: Home
        },
        'Channel News' : {
            screen: ChannelView
        },
        'Subscriptions' : {
            screen: SubsNav
        },
        'Search' : {
            screen: Search
        },
        'Settings' : {
            screen: SettingsNav
        }
    },
    {
        tabBarComponent: ({...props }) => (
            <TabBarBottom
                {...props}
            />
        ),
        tabBarPosition: 'bottom',
        animationEnabled: true,
    }
);

export default class mstudentApp extends Component {
    componentDidMount(){
        AsyncStorage.getItem('initialized', (err, result) => {
            if(!result){
                init(); //set up permissions and subs if first time app is run
            }
        });
    }

    render() {
        return (
            <AppNavigator />
        );
    }
}
