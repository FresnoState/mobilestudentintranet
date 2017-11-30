import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import subscription from '../../modules/subscription';

export default class SubRow extends Component {
    constructor(props) {
        super(props);
    }

    goToSubjectList() {
        subscription.getSubscribed((subscribed)=>{
            subscription.mergeSubData(this.props.subjects, subscribed, (subjects)=>{
                this.props.navigation.navigate('SubjectView', {area: this.props.area, subjects: subjects})
            })
        });
    }

    render() {
        return (
          <View style={{padding: 10, backgroundColor: '#dbdbdb', margin: 1}}>
              <TouchableOpacity
                  onPress={() => this.goToSubjectList()}>
                  <Text style={styles.defaultText}>{this.props.area}</Text>
              </TouchableOpacity>
          </View>
        );
    }
}