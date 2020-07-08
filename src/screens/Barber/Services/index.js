import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Button } from '../../../components';
import styles from './style';
import THEME from '../../../assets/styles/theme.style';


export default class Services extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }




    render() {
        const { onNext } = this.props;

        return (
            <>
                <View style={styles.container}>
                    <View style={styles.upperContainer}>

                    </View>
                    <View style={styles.footerContainer}>
                        <View style={styles.lineStyle}></View>
                        <View style={styles.gapHeight}></View>
                        <View style={styles.buttonContainer}>
                            <Button title='Next' onPress={onNext} />
                        </View>
                    </View>
                </View>

            </>
        );
    }
}