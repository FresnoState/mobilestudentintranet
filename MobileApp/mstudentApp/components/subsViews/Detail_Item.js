import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import SubjectSwitch from "./SubjectSwitch";

export default class DetailItem extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={{margin: 10, padding: 10, flexDirection: 'row'}}>
                <SubjectSwitch subject={this.props.subjectData}/>
                <View>
                    <Text style={styles.titleText}>{this.props.subjectData.name}</Text>
                    <Text style={styles.defaultText}>{this.props.subjectData.desc}</Text>
                </View>
            </View>
        );
    }
}