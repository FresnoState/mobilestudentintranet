import React, { Component } from 'react';
import {TabNavigator, TabBarBottom} from 'react-navigation';
import Home from './components/Home.js';
import SubsNav from './components/subsViews/SubsNav';
import ChannelView from './components/ChannelView';
import Search from './components/Search';
import SettingsNav from './components/settingsViews/SettingsNav';

const AppTabsNavigator = TabNavigator(
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

export default class TabNav extends Component {
    static navigationOptions = {
        header: null
    };

    state = {prevScreen: null, currentScreen: null};

    _onNavigationStateChange(prevState, newState, action) {
        console.debug('onNavigationStateChange action.routeName=', action.routeName)
        this.setState({currentScreen: action.routeName})
    }


    constructor(props){
        super(props);
    }

    render() {
        return (
            <AppTabsNavigator
                onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                screenProps={
                    /*this.props.screenProps*/
                    {currentScreen: this.state.currentScreen}
                }
            />
        );
    }
}