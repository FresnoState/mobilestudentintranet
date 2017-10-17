import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';
import {Card} from 'native-base';
import DetailItem from './Detail_Item';
import Footer from './Footer';

export default class ContainerItem extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <Card style={{margin: 10, padding: 10}}>
                    <DetailItem {...this.props}/>
                    <Footer {...this.props}/>
                </Card>
            </View>

        )
    }
}