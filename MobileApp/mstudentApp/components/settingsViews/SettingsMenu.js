import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import styles from "../../styles";

export default class SettingsMenu extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);
    }

    render() {
        return (
           <View style={styles.noncentered_container}>
               <View style={{alignItems: 'center', margin: 10, marginTop: 30}}>
                   <Text style={styles.headerText}>Settings</Text>
               </View>
               <TouchableOpacity style={{borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#c2c4c6', padding: 10, margin: 10}} onPress={()=>{this.props.navigation.navigate('MySubscriptions')}}>
                   <Text style={styles.defaultText}>My Subscriptions</Text>
               </TouchableOpacity>
               <View style={{margin: 10, padding: 10}}>
                   <Text style={styles.defaultText}>
                       2017, Fresno State Innovate ©
                   </Text>
               </View>
           </View>
        )
    }

}