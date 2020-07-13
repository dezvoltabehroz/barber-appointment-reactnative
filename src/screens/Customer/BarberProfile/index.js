import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import { Avatar } from 'react-native-elements';
import { Button } from '../../../components'

export default class BarberProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const { items } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.barberProfileContainer}>
                    <View style={styles.cardStyle} >
                        <View style={styles.avatarContainer}>
                            <Avatar source={{ uri: items.photo }} size={80} />
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTextStyle} >{items.name}</Text>
                            <Text style={styles.dateTextStyle} >Birthday: {items.age}</Text>
                            <Text style={styles.dateTextStyle} >{items.tagLine}</Text>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title='Book Now' />
                    </View>
                </View>

            </View>
        );
    }
}