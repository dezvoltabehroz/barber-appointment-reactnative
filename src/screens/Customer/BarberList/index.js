import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from './style';
import { Avatar } from "react-native-elements";
export default class BarberList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            barberList: [
                {
                    name: 'Alexender',
                    age: '23/7/1995',
                    resume: '',
                    tagLine:'In the pursuit of manliness',
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
                            day: '',
                            startTime: '',
                            EndTime: ''
                        }
                    ]
                },
                {
                    name: 'Alexender',
                    age: '23/7/1995',
                    tagLine:'In the pursuit of manliness',
                    resume: '',
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
                            day: '',
                            startTime: '',
                            EndTime: ''
                        }
                    ]
                },
                {
                    name: 'Alexender',
                    age: '23/7/1995',
                    tagLine:'In the pursuit of manliness',
                    resume: '',
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
                            day: '',
                            startTime: '',
                            EndTime: ''
                        }
                    ]
                },
                {
                    name: 'Alexender',
                    age: '23/7/1995',
                    tagLine:'In the pursuit of manliness',
                    resume: '',
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
                            day: '',
                            startTime: '',
                            EndTime: ''
                        }
                    ]
                },
                {
                    name: 'Alexender',
                    age: '23/7/1995',
                    tagLine:'In the pursuit of manliness',
                    resume: '',
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
                            day: '',
                            startTime: '',
                            EndTime: ''
                        }
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
        const { onBarberPress } = this.props;
        return (
            <>
                <TouchableOpacity onPress={onBarberPress} style={styles.lowerListItemContainer}>
                    <View style={styles.cardStyle} >
                        <View style={styles.avatarContainer}>
                            <Avatar source={{ uri: item.photo }} size={70} />

                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTextStyle} >{item.name}</Text>
                            <Text style={styles.dateTextStyle} >{item.tagLine}</Text>
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
