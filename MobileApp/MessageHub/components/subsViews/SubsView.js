import React, { Component } from 'react';
import {
    View,
    ListView,
    TouchableOpacity,
    Text
} from 'react-native';
import subscription from '../../modules/subscription';
import {Icon} from 'native-base';
import SubRow from './SubRow';

export default class Subscriptions extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });
        this.state = {dataSource: ds.cloneWithRowsAndSections({})}
    }

    componentDidMount(){
        subscription.get_iCube((icube)=>{
            this.setState({dataSource: this.state.dataSource.cloneWithRowsAndSections(this.convertCubeToMap(icube))});
        });
    }

    convertCubeToMap(icube){
        var icubeMap = {};
        icube.forEach(function(channelItem){
            if(!icubeMap[channelItem.name]){
                icubeMap[channelItem.name] = [];
            }
            channelItem.areas.forEach(function(areaItem){
                icubeMap[channelItem.name].push(areaItem);
            });
        });
        return icubeMap;
    }

    render() {
        return (
            <View style={styles.noncentered_container}>
                <View style={{marginTop: 30, alignItems: 'center', margin: 10}}>
                    <Text style={styles.headerText}>Subscriptions</Text>
                    <Icon name={'md-checkbox'}/>
                    <Icon style={{color: '#aeb2ac'}} name={'md-checkbox'}/>
                    <Icon name={'md-square-outline'}/>
                </View>
                <ListView
                    style={{margin: 10}}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData)=>(<SubRow area={rowData.name} subjects={rowData.subjects} {...this.props}/>)}
                    renderSectionHeader={(sectionData, sectionID)=>{
                        return(
                            <TouchableOpacity
                                onPress={()=>{
                                    this.props.navigation.navigate('AreaView', {channel: sectionID, areas: sectionData})
                                }}
                                style={{padding: 10, backgroundColor: '#4393ef', margin: 1}}
                            >
                                <Text style={[styles.defaultText, {color: 'white'}]}>{sectionID}</Text>
                            </TouchableOpacity>
                        )}}
                />
            </View>
        );
    }
}