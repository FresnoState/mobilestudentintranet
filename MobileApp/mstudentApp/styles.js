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
        padding: 10
    },
    headerText: {
        fontSize: font_size.large,
        margin: 10,
        alignItems: 'center'
    },
    titleText: {
        fontSize: font_size.regular,
        fontWeight: 'bold',
        padding: 5
    },
    defaultText: {
        fontSize: font_size.regular,
        padding: scale(5)
    },
    button: {
        padding: scale(5),
    },
});