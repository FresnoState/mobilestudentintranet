import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    FlatList
} from 'react-native';
import {Button, Icon} from 'native-base';
import moment from 'moment';
import subscription from '../../modules/subscription';
import AreaPanel from './AreaPanel';
const { width, height } = Dimensions.get('window');

export default class SubscriptionView extends Component {
    static navigationOptions = {
        tabBarIcon: <Icon name='ios-checkmark' />
    };

    constructor(props){
        super(props);
        this.state = {
            index: 0,
            data: []
        };
        this.channels = [{"name": "Channel", "areas": [{name: 'area'}]}]; //placeholder until data loads
        this.currScreen = null;
    }

    _initChannels() {
        subscription.get_iCube((icube)=>{
            for(var i=0; i<icube.length; ++i){
                this.channels[i] = {id: icube[i]._id, name: icube[i].name, areas: icube[i].areas};
            }
            this.setState({data: this.channels[0].areas});
        });
    }

    componentDidMount() {
        this._initChannels();
    }

    updateData(){
        this.setState({data: this.channels[this.state.index].areas});
    }

    goLeft(){
        if(this.state.index !== 0) {
            this.setState((prevState)=>{prevState.index--}, this.updateData);
        }
        else {
            this.setState({index: this.channels.length-1}, this.updateData);
        }
    }

    goRight() {
        if(this.state.index !== this.channels.length-1){
            this.setState((prevState)=>{prevState.index++}, this.updateData);
        }
        else {
            this.setState({index: 0}, this.updateData);
        }
    }

    render() {
        var extraPadding = width >=600 ? {paddingLeft: 20, paddingRight: 20} : null;
        return (
            <View style={[styles.noncentered_container, extraPadding]}>
                <View style={{marginTop: 30, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.subHeaderText}>{moment().format("dddd, MMMM D, YYYY")}</Text>
                    <Text style={[styles.headerText, {textAlign: 'center'}]}>
                        Subscriptions
                    </Text>
                    <View style={{backgroundColor: '#efeff3', borderBottomWidth: 2, borderColor: '#e4e4e8', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', width: width, marginTop: 10, marginBottom: 5, padding: 5}}>
                        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.goLeft()}>
                            <Icon style={StyleSheet.flatten(styles.arrowText2)} name='ios-arrow-back'/>
                        </TouchableOpacity>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={[styles.subHeaderText2, {textAlign: 'center'}]}>
                                {this.channels[this.state.index].name.toUpperCase()}
                            </Text>
                        </View>
                        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.goRight()}>
                            <Icon style={StyleSheet.flatten(styles.arrowText2)} name='ios-arrow-forward'/>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    data={this.state.data}
                    renderItem={({item})=>(<AreaPanel area={item}/>)}
                />
            </View>
        );
    }
}
