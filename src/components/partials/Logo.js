import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {getStyleFromProps} from '../../utils';

const { width, height } = Dimensions.get('window')

export default class Logo extends Component {
    render() {
        const style = [
            logoStyle.imageContainer,
            getStyleFromProps(['marginTop'], this.props)
        ]
        return <View style={style}>
            <Image source={require('../../img/Que5_logo.png')} style={logoStyle.image} />
        </View>
    }
}

Logo.propTypes = {
    marginTop: PropTypes.number
}

const logoStyle = StyleSheet.create({
    imageContainer: {
        alignItems: 'center',
    },
    image:{
        width: (width/2)*1.5,
        height: (height/3),
        resizeMode: 'contain'
    }
})

