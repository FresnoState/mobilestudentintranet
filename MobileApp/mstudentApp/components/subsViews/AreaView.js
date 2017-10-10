import React, { Component } from 'react';
import {
    View,
    ListView,
    TouchableOpacity,
    Text
} from 'react-native';
import SubRow from './SubRow';

export default class AreaView extends Component {
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.props.navigation.state.params.areas)
        }
    }

    render() {
        return (
            <View style={styles.noncentered_container}>
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.headerText}>{this.props.navigation.state.params.channel}: Areas</Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData)=>(<SubRow area={rowData.name} subjects={rowData.subjects} {...this.props}/>)}
                />
            </View>
        )
    }
}