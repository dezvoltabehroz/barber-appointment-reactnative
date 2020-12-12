import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, FlatList, } from 'react-native';
import { FooterButton, Icon } from '../../../components';
import styles from './style';
import BarberManageScheduleRoutes from '../../../navigation/BarberManageScheduleRoutes';

export default class ManageSchedule extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (

            <View style={styles.container}>
                <BarberManageScheduleRoutes />
            </View>

        );
    }
}