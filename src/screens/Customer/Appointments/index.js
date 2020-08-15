import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from './style';
import { Avatar } from "react-native-elements";
import { Button } from "../../../components";
import StarRating from 'react-native-star-rating';
import THEME from '../../../assets/styles/theme.style';

export default class Appointments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            barberList: [
                {
                    name: 'Alexender',
                    age: '23/7/1995',
                    resume: 'https://s3-us-west-2.amazonaws.com/anxietybreakthrough/Stress+and+Anxiety+journal.pdf',
                    charges: '$80',
                    estTime: '00:45',
                    tagLine: 'In the pursuit of manliness',
                    photo: 'https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png',

                },
                {
                    name: 'Alexender',
                    age: '23/7/1995',
                    tagLine: 'In the pursuit of manliness',
                    resume: 'https://s3-us-west-2.amazonaws.com/anxietybreakthrough/Stress+and+Anxiety+journal.pdf',
                    charges: '$80',
                    estTime: '00:45',
                    photo: 'https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png',

                },
                {
                    name: 'Alexender',
                    age: '23/7/1995',
                    tagLine: 'In the pursuit of manliness',
                    resume: 'https://s3-us-west-2.amazonaws.com/anxietybreakthrough/Stress+and+Anxiety+journal.pdf',
                    charges: '$80',
                    estTime: '00:45',
                    photo: 'https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png',

                },
                {
                    name: 'Alexender',
                    age: '23/7/1995',
                    tagLine: 'In the pursuit of manliness',
                    resume: 'https://s3-us-west-2.amazonaws.com/anxietybreakthrough/Stress+and+Anxiety+journal.pdf',
                    charges: '$80',
                    estTime: '00:45',
                    photo: 'https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png',

                },
                {
                    name: 'Alexender',
                    age: '23/7/1995',
                    tagLine: 'In the pursuit of manliness',
                    resume: 'https://s3-us-west-2.amazonaws.com/anxietybreakthrough/Stress+and+Anxiety+journal.pdf',
                    photo: 'https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png',
                    charges: '$80',
                    estTime: '00:45',

                }
            ]
        }
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorHeightStyle}></View>
        )
    }



    _renderItems = (item) => {
        const { onView } = this.props;
        var arr = item.age.split("/");
        const birthDate = new Date(arr[2], arr[1], arr[0]);
        const difference = Date.now() - birthDate.getTime();
        const age = new Date(difference);
        const totalAge = Math.abs(new Date().getFullYear() - age.getUTCFullYear());

        return (
            <>
                <View style={styles.listItemContainer}>
                    <View style={styles.cardStyle} >
                        <View style={styles.avatarContainer}>
                            <Avatar source={{ uri: item.photo }} size={100} />
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTextStyle} >{item.name}</Text>
                            <Text style={styles.dateTextStyle} >Age: {totalAge}</Text>
                            <Text style={styles.dateTextStyle} >Rating: 4.5 / 5</Text>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title='View' onPress={onView()} />
                    </View>
                </View>
            </>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.barberList}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={this._renderSeparator}
                    renderItem={({ item }) => this._renderItems(item)}
                    keyExtractor={item => item} />

            </View>
        );
    }
}
