import React, { Component } from 'react';
import {TabNavigator, TabBarBottom} from 'react-navigation';
import Home from './components/Home.js';
import SubscriptionView from './components/subscriptionViews/SubscriptionView';
import ChannelView from './components/ChannelView';
import Search from './components/Search';
import SettingsNav from './components/settingsViews/SettingsNav';

const AppTabsNavigator = TabNavigator(
    {
        'Today': {
            screen: Home
        },
        'Channel' : {
            screen: ChannelView
        },
        'Subscriptions' : {
            screen: SubscriptionView
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
        swipeEnabled: false
    }
);

export default class TabNav extends Component {
    static navigationOptions = {
        header: null
    };

    state = {prevScreen: null, currentScreen: null};

    //keep track of the current screen upon navigation changes
    _onNavigationStateChange(prevState, newState, action) {
        this.setState({currentScreen: action.routeName})
    }


    constructor(props){
        super(props);
    }

    //renders the tab navigator with the current screen passed as a prop
    render() {
        return (
            <AppTabsNavigator
                onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                screenProps={
                    {currentScreen: this.state.currentScreen}
                }
            />
        );
    }
}