import React, { Component } from 'react';
import {NativeModules, AsyncStorage} from 'react-native';
import {StackNavigator} from 'react-navigation';
import styles from './styles';
import TabNav from './TabNav';

import init from './modules/init';
import listener from './modules/listener';
import message from './modules/message';
import subscriptions from './modules/subscription';

//console.disableYellowBox = true;
//NativeModules.ExceptionsManager = null;


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

export default class mstudentApp extends Component {
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
        //const stateClone = Object.assign({}, this.state);
        // <AppNavigator screenProps={stateClone} />
        return (
            <AppNavigator />
        );
    }
}
