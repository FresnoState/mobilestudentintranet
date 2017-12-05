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
    noncentered_container: {
        backgroundColor: '#FFF',
        flex: 1,
        padding: 5
    },
    messageContainer: {
        margin: 8,
        padding: 10,
        borderRadius: 8
    },
    defaultText: {
        //fontSize: font_size.regular,
        fontSize: 16
        //padding: scale(5)
    },
    subHeaderText: {
        fontSize: 13,
        fontWeight: '500',
        color: '#8A8A8F'
    },
    subHeaderText2: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6D6D72'
    },
    subHeaderText3: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000000'
    },
    headerText: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#000000'
    },
    arrowText: {
        fontSize: 44,
        fontWeight: '900',
        color: '#000000'
    },
    arrowText2: {
        fontSize: 34,
        fontWeight: '900',
        color: '#0076FF'
    },
    infoText1: {
        fontSize: width >= 600 ? 14 : 13,
        color: '#8A8A8F'
    },
    infoText2: {
        fontSize: 15,
        color: '#8A8A8F'
    },
    titleText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000000'
    },
    alertText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#DB0000' //for alert titles
    },
    messageText: {
        fontSize: 15,
        color: '#000000'
    },
    itemText: { //subscription items, search box test, search items
        fontSize: 17,
        color: '#000000'
    },
    countText: {
        fontSize: 15,
        color: '#6D6D72'
    },
    requiredText: {
        fontSize: 11,
        color: '#6D6D72'
    },
    pressableText: {
        fontSize: 15,
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
        borderRightWidth: 0,
        borderColor: '#0076FF',
        backgroundColor: '#0076FF',
        padding: 5
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
        borderLeftWidth: 0,
        borderColor: '#0076FF',
        backgroundColor: '#FFFFFF',
        padding: 5
    },
    segmentText: {
        fontSize: 13
    }
});