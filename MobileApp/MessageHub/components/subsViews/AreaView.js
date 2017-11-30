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

    componentDidMount(){
        //workaround for iOS loading issue
        setTimeout(()=> {
            this.listView.scrollTo({x: 0,  y: 50, animated: false});
            this.listView.scrollTo({x: 0,  y: 0, animated: false});
        }, 100)

    }

    render() {
        return (
            <View style={styles.noncentered_container}>
                <View style={{alignItems: 'center', margin: 10}}>
                    <Text style={[styles.headerText, {textAlign: 'center'}]}>{this.props.navigation.state.params.channel}: Areas</Text>
                </View>
                <ListView
                    ref={(view) => this.listView = view}
                    style={{margin: 10}}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData)=>(<SubRow area={rowData.name} subjects={rowData.subjects} {...this.props}/>)}
                />
            </View>
        )
    }
}