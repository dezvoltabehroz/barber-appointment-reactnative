import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, FlatList, } from 'react-native';
import { FooterButton, Icon } from '../../../components';
import styles from './style';
import BarberTopNavigationRoutes from '../../../navigation/BarberTopTabNavigator';

export default class Resume extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (

            <View style={styles.container}>
                <BarberTopNavigationRoutes />
            </View>

        );
    }
}