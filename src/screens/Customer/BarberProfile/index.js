import React, { Component } from 'react';
import { View, Text, ScrollView, Alert, Linking } from 'react-native';
import styles from './style';
import { Avatar } from 'react-native-elements';
import { Button, ExpandView } from '../../../components';

export default class BarberProfile extends Component {
    constructor(props) {
        super(props);
        const { items } = this.props;
        this.state = {
            portfolio: items.portfolio,
            certifcations: items.certifcations,
            services: items.services,
            workingDays: items.workingDays,
            resume: items.resume,
            rating: items.rating
        }
    }


    downloadPDF = () => {
        Linking.openURL(this.state.resume);
    }

    render() {
        const { items, bookNow } = this.props;
        const { portfolio, certifcations, services, workingDays, rating } = this.state;
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
                            <Button title='Book Now' onPress={bookNow} />
                        </View>
                    </View>
                    <ExpandView
                        portfolio={portfolio}
                        certification={certifcations}
                        service={services}
                        workingDay={workingDays}
                        onDownload={this.downloadPDF}
                        rating={rating} />
                </ScrollView>
            </View>
        );
    }
}