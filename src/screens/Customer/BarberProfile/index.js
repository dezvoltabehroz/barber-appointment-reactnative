import React, { Component } from 'react';
import { View, Text, ScrollView, Image, LayoutAnimation, UIManager, TouchableOpacity } from 'react-native';
import styles from './style';
import { Avatar } from 'react-native-elements';
import { Button, ExpandView } from '../../../components';

export default class BarberProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }
    
    render() {
        const { items } = this.props;
        var arr = items.age.split("/");
        const birthDate = new Date(arr[2], arr[1], arr[0]);
        const difference = Date.now() - birthDate.getTime();
        const age = new Date(difference);
        const totalAge = Math.abs(new Date().getFullYear() - age.getUTCFullYear());
        return (
            <View style={styles.container}>
                <ScrollView >
                    <View style={styles.barberProfileContainer}>
                        <View style={styles.cardStyle} >
                            <View style={styles.avatarContainer}>
                                <Avatar source={{ uri: items.photo }} size={80} />
                            </View>
                            <View style={styles.nameContainer}>
                                <Text style={styles.nameTextStyle} >{items.name}</Text>
                                <Text style={styles.dateTextStyle} >Age: {totalAge}</Text>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title='Book Now' />
                        </View>
                    </View>
                    <View>
                        <ExpandView portfolio={(items.portfolio)} certification={(items.certifcations)} />
                    </View>
                </ScrollView>
            </View>
        );
    }
}