import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import styles from "./style";
import { Button } from '../../../components';


export default class PhoneVerfied extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        const { onComplete } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.imageStyle} source={require('../../../assets/images/mobile.png')} resizeMode="contain" />
                </View>
                <View style={styles.phoneTextContainer}>
                    <Text style={styles.phoneTextStyle}>Your phone is <Text style={styles.verifiedTextStyle}>Verified!</Text></Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textStyle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button title='Complete Your Profile' onPress={onComplete} />
                </View>
            </View>
        )
    }
}