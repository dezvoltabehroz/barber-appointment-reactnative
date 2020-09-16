import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import { Button } from '..';

export default class FooterButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title, onPress, addservice, onPressAddService,loading } = this.props;
        return (
            <View style={addservice ? styles.footerConatinerStyle : styles.footerStyle}>
                {
                    addservice ?
                        <>
                            <View style={styles.buttonContainer}>
                                <Button title="Add Service" onPress={onPressAddService} />
                            </View>
                            <View style={styles.gapHeight1}></View>
                        </>
                        :
                        null
                }
                <View style={styles.lineStyle}></View>
                <View style={styles.gapHeight}></View>
                <View style={styles.buttonContainer}>
                    <Button loading={loading} title={title} onPress={onPress} />
                </View>
            </View>
        )
    }
}