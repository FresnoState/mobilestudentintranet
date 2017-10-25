import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    PixelRatio
} from 'react-native';
const { width, height } = Dimensions.get('window');
const ratio = PixelRatio.get();

function scale(size){
    if(width > 800) {
        return size * 2;
    }
    else if(width > 600) {
        return size * 1.5;
    }
    else {
        return size;
    }
}

const font_size = {
    "regular": scale(16),
    "large": scale(24)
};

export default styles = StyleSheet.create({
    centered_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingTop: 20
    },
    noncentered_container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        padding: 5
    },
    messageContainer: {
        margin: 8,
        padding: 10,
        borderRadius: 8
    },
    /*headerText: {
        fontSize: font_size.large,
        margin: 10,
        alignItems: 'center'
    },
    titleText: {
        fontSize: font_size.regular,
        fontWeight: 'bold',
        padding: 5
    },*/
    defaultText: {
        fontSize: font_size.regular,
        padding: scale(5)
    },
    subHeaderText: {
        fontSize: 13,
        //fontFamily: 'San Francisco',
        fontWeight: '500',
        color: '#8A8A8F'

    },
    headerText: {
        fontSize: 34,
        //fontFamily: 'San Francisco',
        fontWeight: 'bold',
        color: '#000000'
    },
    infoText1: {
        fontSize: 13,
        //fontFamily: 'San Francisco',
        color: '#8A8A8F'
    },
    infoText2: {
        fontSize: 15,
        //fontFamily: 'San Francisco',
        color: '#8A8A8F'
    },
    titleText: {
        fontSize: 15,
        //fontFamily: 'San Francisco',
        fontWeight: '600',
        color: '#000000'
    },
    alertText: {
        fontSize: 15,
        //fontFamily: 'San Francisco',
        fontWeight: '600',
        color: '#DB0000' //for alert titles
    },
    messageText: {
        fontSize: 15,
        //fontFamily: 'San Francisco',
        color: '#000000'
    },
    pressableText: {
        fontSize: 15,
        //fontFamily: 'San Francisco',
        color: '#0076FF'
    },
    button: {
        padding: scale(5),
    },
    leftSegmentTab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 0,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#0076FF',
        backgroundColor: '#0076FF',
        padding: 10
    },
    rightSegmentTab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 5,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#0076FF',
        backgroundColor: '#FFFFFF',
        padding: 10
    },
    segmentText: {
        fontSize: 13
    }
});