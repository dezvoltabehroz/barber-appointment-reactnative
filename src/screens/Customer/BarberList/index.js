import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from './style';
import { Avatar } from "react-native-elements";
import Button from "../../../components/Button";
export default class BarberList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            barberList: [
                {
                    name: 'Alexender',
                    age: '23/7/1995',
                    resume: '',
                    charges: '$80',
                    estTime: '00:45',
                    tagLine: 'In the pursuit of manliness',
                    photo: 'https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png',
                    portfolio: [
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                    ],
                    certifcations: [
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                    ],
                    services: [
                        {
                            serviceName: '',
                            serviceCost: '',
                            serviceEstTime: ''
                        }
                    ],
                    workingDays: [
                        {
                            day: 'Monday'
                        },
                        {
                            day: 'Thursday'
                        },
                        {
                            day: 'Saturday'
                        },

                    ]
                },
                {
                    name: 'Alexender',
                    age: '23/7/1995',
                    tagLine: 'In the pursuit of manliness',
                    resume: '',
                    charges: '$80',
                    estTime: '00:45',
                    photo: 'https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png',
                    portfolio: [
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                    ],
                    certifcations: [
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                    ],
                    services: [
                        {
                            serviceName: '',
                            serviceCost: '',
                            serviceEstTime: ''
                        }
                    ],
                    workingDays: [
                        {
                            day: 'Monday'
                        },
                        {
                            day: 'Thursday'
                        },
                        {
                            day: 'Saturday'
                        },

                    ]
                },
                {
                    name: 'Alexender',
                    age: '23/7/1995',
                    tagLine: 'In the pursuit of manliness',
                    resume: '',
                    charges: '$80',
                    estTime: '00:45',
                    photo: 'https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png',
                    portfolio: [
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                    ],
                    certifcations: [
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                    ],
                    services: [
                        {
                            serviceName: '',
                            serviceCost: '',
                            serviceEstTime: ''
                        }
                    ],
                    workingDays: [
                        {
                            day: 'Monday'
                        },
                        {
                            day: 'Thursday'
                        },
                        {
                            day: 'Saturday'
                        },

                    ]
                },
                {
                    name: 'Alexender',
                    age: '23/7/1995',
                    tagLine: 'In the pursuit of manliness',
                    resume: '',
                    charges: '$80',
                    estTime: '00:45',
                    photo: 'https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png',
                    portfolio: [
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                    ],
                    certifcations: [
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                    ],
                    services: [
                        {
                            serviceName: '',
                            serviceCost: '',
                            serviceEstTime: ''
                        }
                    ],
                    workingDays: [
                        {
                            day: 'Monday'
                        },
                        {
                            day: 'Thursday'
                        },
                        {
                            day: 'Saturday'
                        },

                    ]
                },
                {
                    name: 'Alexender',
                    age: '23/7/1995',
                    tagLine: 'In the pursuit of manliness',
                    resume: '',
                    photo: 'https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png',
                    charges: '$80',
                    estTime: '00:45',
                    portfolio: [
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                    ],
                    certifcations: [
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                        {
                            images: ''
                        },
                    ],
                    services: [
                        {
                            serviceName: '',
                            serviceCost: '',
                            serviceEstTime: ''
                        }
                    ],
                    workingDays: [
                        {
                            day: 'Monday'
                        },
                        {
                            day: 'Tuesday'
                        },
                        {
                            day: 'Thursday'
                        },
                        {
                            day: 'Friday'
                        },
                    ]
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
        const { onPress } = this.props;

        const calculateAge = (dob1) => {

            var today = new Date();
            var birthDate = new Date(dob1);
            console.log(birthDate);
            var age_now = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age_now--;
            }
            console.log(age_now);
            return age_now;
        }
        return (
            <>
                <TouchableOpacity onPress={() => onPress(item)} style={styles.listItemContainer}>
                    <View style={styles.cardStyle} >
                        <View style={styles.avatarContainer}>
                            <Avatar source={{ uri: item.photo }} size={70} />
                            <View style={{ paddingVertical: '5%' }} >
                                <TouchableOpacity style={styles.buttonStyle}>
                                    <Text style={{ marginHorizontal: '10%', color: '#fff', fontFamily: 'Poppins-Medium' }}>
                                        Book Now
                                </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTextStyle} >{item.name}</Text>
                            <Text style={styles.dateTextStyle} >Age: {item.age}</Text>
                            {/* <Text style={styles.dateTextStyle} >Age: {calculateAge(item.age)}</Text> */}
                            <Text style={styles.dateTextStyle} >Est.Time: {item.estTime}</Text>
                            <Text style={styles.dateTextStyle} >Charges: {item.charges}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <Text style={styles.dateTextStyle} >Working Days: </Text>
                                </View>
                                {
                                    item.workingDays.map(({ day, index }) => {
                                        return (
                                            <View key={index} style={styles.daysContainer}>
                                                <Text style={styles.textStyle}>{day[0]}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>

                        </View>
                    </View>
                </TouchableOpacity>
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
