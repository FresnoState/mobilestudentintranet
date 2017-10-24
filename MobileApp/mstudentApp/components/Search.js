import React, { Component } from 'react';
import {
    Text,
    TextInput,
    Dimensions,
    View,
    ListView
} from 'react-native';
import {Icon} from 'native-base';
import escapeStringRegexp from 'escape-string-regexp'; //for preventing a red screen error from special characters
import SubItem from './subsViews/OverviewItem';
import MessageCard from './messageViews/messageCard/MessageCard';
import message from '../modules/message';
import subscription from '../modules/subscription';
const { width, height } = Dimensions.get('window');

export default class Search extends Component {
    static navigationOptions = {
        tabBarLabel: 'Search',
        tabBarIcon: <Icon name='ios-search'/>
    };

    constructor(props){
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });
        this.state = {
            query: '',
            dataSource: ds.cloneWithRowsAndSections({
               Subjects: [],
               Messages: []
            })
        };
        this.messages = [];
        this.subjects = [];
        this.currScreen = null;
    }

    componentDidMount(){
        //requery whenever a new search is done???
        message.getMessages((messages)=>{this.messages = messages;});
        subscription.get_iCube((icube)=>{
            var subjects = [];
            icube.forEach(function(channel){
                channel.areas.forEach(function(area){
                    subjects = subjects.concat(area.subjects);
                });
            });
            this.subjects = subjects;
        });
    }

    componentDidUpdate(){
        if(this.currScreen !== this.props.screenProps.currentScreen && this.props.screenProps.currentScreen === "Search"){
            message.getMessages((messages)=>{this.messages = messages;});
        }
        this.currScreen = this.props.screenProps.currentScreen;
    }

    filterMessages(){
        if(this.state.query === '')
            return [];

        var regex = new RegExp(escapeStringRegexp(this.state.query), 'i');
        return this.messages.filter((message)=>{
            return message.title.search(regex) >= 0 || message.desc.search(regex) >= 0 || message.message.search(regex) >= 0;
        });
    }

    filterSubjects(){
        if(this.state.query === '')
            return [];

        var regex = new RegExp(escapeStringRegexp(this.state.query), 'i');
        return this.subjects.filter((subject)=>{
            return subject.name.search(regex) >= 0 || subject.desc.search(regex) >= 0;
        });
    }

    getSearchResults(){
        var results = {
            Subjects: this.filterSubjects(),
            Messages: this.filterMessages()
        };
        this.setState({dataSource: this.state.dataSource.cloneWithRowsAndSections(results)});
    }

    renderRow(rowData, sectionID, rowID){
        if(sectionID === "Subjects"){
            return <SubItem subjectData={rowData}/>;
        }
        else if(sectionID === "Messages"){
            return <MessageCard expanded={false} messageData={rowData} rowID={rowID} removeMessage={this.removeMessage.bind(this)}/>;
        }
        else{
            return null;
        }
    }

    renderSectionHeader(sectionData, sectionID){
        return (
            <View style={{borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#c2c4c6', padding: 10, margin: 10}} onPress={()=>{this.props.navigation.navigate('MySubscriptions')}}>
                <Text style={styles.defaultText}>{sectionID}</Text>
            </View>
        );
    }

    removeMessage(msi_key, rowID){
        message.removeMessage(msi_key);
        var data = this.state.dataSource._dataBlob;
        var messages = data.Messages.slice();
        delete messages[rowID];
        data.Messages = messages;
        this.setState({dataSource: this.state.dataSource.cloneWithRowsAndSections(data)});
    }

    render() {
        return (
            <View style={styles.noncentered_container}>
                <View style={{marginTop: 10, alignItems: 'center'}}>
                    <Text style={styles.headerText}>Search</Text>
                </View>
                <TextInput
                    style={[styles.defaultText, {margin: 10, borderWidth: 1, borderColor: '#c2c4c6', height: height*0.07}]}
                    onChangeText={(text)=>this.setState({query: text.trim()}, this.getSearchResults)}
                    /*onEndEditing={()=>console.log('end')}//use later on for efficiency? */
                    placeholder={"Search here..."}
                />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    renderSectionHeader={this.renderSectionHeader.bind(this)}
                />
            </View>
        )
    }

}