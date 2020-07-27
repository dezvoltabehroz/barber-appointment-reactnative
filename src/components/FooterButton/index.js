import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import { Button } from '..';

export default class FooterButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title, onPress } = this.props;
        return (
            <View style={styles.footerStyle}>
                <View style={styles.lineStyle}></View>
                <View style={styles.gapHeight}></View>
                <View style={styles.buttonContainer}>
                    <Button title={title} onPress={onPress} />
                </View>
            </View>
        )
    }
}