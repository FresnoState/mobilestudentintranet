import React, { Component } from 'react';
import {NativeModules, AsyncStorage} from 'react-native';
import {StackNavigator} from 'react-navigation';
import styles from './styles';
import TabNav from './TabNav';

import init from './modules/init';
import listener from './modules/listener';
import message from './modules/message';
import subscriptions from './modules/subscription';

listener();

const AppNavigator = StackNavigator(
    {
        'AppTabs': {
            screen: TabNav
        }
    },
    {
        initialRouteName: 'AppTabs'
    }
);

export default class App extends Component {
    constructor(){
        super();
        message.clearOldMessages();
    }

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
