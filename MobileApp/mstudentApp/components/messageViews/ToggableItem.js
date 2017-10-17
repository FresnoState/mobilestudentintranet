import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import {Card} from 'native-base';
import DetailItem from './Detail_Item';
import OverviewItem from './OverviewItem';
import Footer from './Footer';

export default class ToggableItem extends Component {
    constructor(props){
        super(props);
        this.state = {toggled: false}
    }

    toggleItem(){
        this.setState((prevState)=>{return {toggled: !prevState.toggled}});
    }

    render(){
        var item = this.state.toggled ? (
                <DetailItem {...this.props}/>
            )
            : (
                <OverviewItem {...this.props}/>
            );
        return(
            <View>
                <Card style={{margin: 10, padding: 10}}>
                    <TouchableOpacity style={{margin: 5, alignItems: 'flex-end'}} onPress={this.toggleItem.bind(this)}>
                        <Text style={styles.defaultText}>
                            {!this.state.toggled ? "More" : "Less"}
                        </Text>
                    </TouchableOpacity>
                    {item}
                    <Footer {...this.props}/>
                </Card>
            </View>
        )
    }
}