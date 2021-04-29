import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import { Button } from '..';

export default class FooterButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title, onPress, addservice, onPressAddService, onPressAddNewService, loading, disabled } = this.props;
        return (
            <View style={styles.footerStyle}>
                {this.props.customer ?
                    <View style={styles.lineStyle}>
                        <Text style={styles.textStyle}>Customer Name: {this.props.customer}</Text>
                    </View>
                    :
                    null
                }
                <View style={styles.gapHeight}></View>
                {
                    addservice ?
                        <>
                            <View style={[styles.buttonContainer, { flexDirection: "row", justifyContent: 'space-between' }]}>
                                <View style={{ flex: 0.45 }}>
                                    <Button title="Add Service  " onPress={onPressAddNewService} />
                                </View>
                                <View style={{ flex: 0.45 }}>
                                    <Button title="New Service  " onPress={onPressAddService} />
                                </View>
                            </View>

                            <View style={styles.gapHeight1}></View>
                        </>
                        :
                        <View style={styles.buttonContainer}>

                            <Button disabled={disabled} loading={loading} title={title} onPress={onPress} />
                        </View>
                }
            </View>
        )
    }
}