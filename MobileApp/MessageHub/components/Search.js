import React, { Component } from 'react';
import {
    Text,
    Dimensions,
    View,
    ScrollView
} from 'react-native';
import {Icon, Input} from 'native-base';
import SearchPanel from './searchViews/SearchPanel';
import SearchItem from './searchViews/SearchItem';
const { width, height } = Dimensions.get('window');

export default class Search extends Component {
    static navigationOptions = {
        tabBarIcon: <Icon name='ios-search'/>
    };

    constructor(props){
        super(props);
        this.state = {
            query: '',
            typing: false
        };
    }

    render() {
        var textboxStyle = this.state.typing /*|| this.state.query !== ''*/ ? {borderWidth: 0.5} : {backgroundColor: '#eaebed', padding: 10.5};
        return (
            <View style={[styles.noncentered_container, {padding: 15, paddingTop: 5}]}>
                <View style={{marginTop: 30, marginBottom: 15}}>
                    <Text style={[styles.itemText, {alignSelf: 'flex-end', color: '#0076FF'}]}>Edit</Text>
                    <Text style={styles.headerText}>Search Messages</Text>
                </View>
                <View style={[{flexDirection: 'row', alignItems: 'center', borderRadius: 10, padding: 10, marginBottom: 10}, textboxStyle]}>
                    <Icon name="ios-search" style={{fontSize: 18, marginRight: 3, color: '#575757'}} />
                    <Input
                        style={{height: undefined}}
                        placeholder='Search'
                        onChangeText={(text)=>this.setState({query: text.trim()})}
                        onFocus={()=>this.setState({typing: true})}
                        onEndEditing={()=>this.setState({typing: false})}
                    />
                </View>
                <ScrollView>
                    {this.state.query === '' ?
                        (
                            <View>
                                <View style={{marginBottom: 10}}>
                                    <SearchPanel header={'Recent searches'}>
                                        <SearchItem term={'Search 3'}/>
                                        <SearchItem term={'Search 2'}/>
                                        <SearchItem term={'Search 1'}/>
                                    </SearchPanel>
                                </View>
                                <View>
                                    <SearchPanel header={'Trending'}>
                                        <SearchItem term={'Deadline'}/>
                                        <SearchItem term={'Jobs'}/>
                                        <SearchItem term={'Financial aid'}/>
                                    </SearchPanel>
                                </View>
                            </View>
                        ) :
                        (
                            <View>
                                <SearchPanel header={'Results'}>
                                    <SearchItem term={'First result'}/>
                                    <SearchItem term={'Second result'}/>
                                    <SearchItem term={'Third result'}/>
                                </SearchPanel>
                            </View>
                        )
                    }
                </ScrollView>
            </View>
        )
    }

}