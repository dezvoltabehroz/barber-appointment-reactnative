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
                    resume: 'https://s3-us-west-2.amazonaws.com/anxietybreakthrough/Stress+and+Anxiety+journal.pdf',
                    charges: '$80',
                    estTime: '00:45',
                    tagLine: 'In the pursuit of manliness',
                    photo: 'https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png',
                    portfolio: [
                        {
                            image_url: 'https://lh3.googleusercontent.com/-2wgQRhgOjtY/W1nPuug4iCI/AAAAAAAAbms/hZpxv8laryAVIpuKSriv0o8orNh7PZESACHMYCw/s0/30.jpg'
                        },
                        {
                            image_url: 'https://www.vippng.com/png/detail/49-493960_fade-cut-male-hair-cutting-style.png'
                        },
                        {
                            image_url: 'https://www.pngitem.com/pimgs/m/218-2181295_paradise-grooming-for-men-hair-styles-cortes-de.png'
                        },
                        {
                            image_url: 'https://content3.jdmagicbox.com/comp/goa/x7/0832px832.x832.181210164520.c7x7/catalogue/max-hair-cutting-salon-zuarinagar-goa-salons-s4tj5qnjqs.jpg'
                        },

                    ],
                    certifcations: [
                        {
                            image_url: 'https://www.diplomasandmore.com/images/Bar1.jpg'
                        },
                        {
                            image_url: 'https://americanbarber.org/AIPB/wp-content/uploads/2019/12/aba-award-template-barber-apprentice.jpg'
                        },
                        {
                            image_url: 'https://image.slidesharecdn.com/268e137c-9c59-482c-9e5e-962a4ae9f040-161006162544/95/barber-gmd-staff-course-certificate-1-638.jpg?cb=1475771188'
                        }
                    ],
                    services: [
                        {
                            serviceName: 'Hair Styling',
                            serviceCost: '$100',
                            serviceEstTime: '01:00'
                        },
                        {
                            serviceName: 'Hair Color',
                            serviceCost: '$50',
                            serviceEstTime: '00:45'
                        },
                        {
                            serviceName: 'Shave',
                            serviceCost: '$50',
                            serviceEstTime: '00:30'
                        },
                        {
                            serviceName: 'Blow Out',
                            serviceCost: '$50',
                            serviceEstTime: '00:20'
                        }
                    ],
                    workingDays: [
                        {
                            day: 'Monday',
                            startTime:'08:00 AM',
                            endTime:'03:00 PM'
                        },
                        {
                            day: 'Thursday',
                            startTime:'10:00 AM',
                            endTime:'05:00 PM'
                        },
                        {
                            day: 'Saturday',
                            startTime:'11:00 AM',
                            endTime:'09:00 PM'
                        },

                    ]
                },
                {
                    name: 'Alexender',
                    age: '23/7/1995',
                    tagLine: 'In the pursuit of manliness',
                    resume: 'https://s3-us-west-2.amazonaws.com/anxietybreakthrough/Stress+and+Anxiety+journal.pdf',
                    charges: '$80',
                    estTime: '00:45',
                    photo: 'https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png',
                    portfolio: [
                        {
                            image_url: 'https://lh3.googleusercontent.com/-2wgQRhgOjtY/W1nPuug4iCI/AAAAAAAAbms/hZpxv8laryAVIpuKSriv0o8orNh7PZESACHMYCw/s0/30.jpg'
                        },
                        {
                            image_url: 'https://www.vippng.com/png/detail/49-493960_fade-cut-male-hair-cutting-style.png'
                        },
                        {
                            image_url: 'https://www.pngitem.com/pimgs/m/218-2181295_paradise-grooming-for-men-hair-styles-cortes-de.png'
                        },
                        {
                            image_url: 'https://content3.jdmagicbox.com/comp/goa/x7/0832px832.x832.181210164520.c7x7/catalogue/max-hair-cutting-salon-zuarinagar-goa-salons-s4tj5qnjqs.jpg'
                        },

                    ],
                    certifcations: [
                        {
                            image_url: 'https://www.diplomasandmore.com/images/Bar1.jpg'
                        },
                        {
                            image_url: 'https://americanbarber.org/AIPB/wp-content/uploads/2019/12/aba-award-template-barber-apprentice.jpg'
                        },
                        {
                            image_url: 'https://image.slidesharecdn.com/268e137c-9c59-482c-9e5e-962a4ae9f040-161006162544/95/barber-gmd-staff-course-certificate-1-638.jpg?cb=1475771188'
                        }
                    ],
                    workingDays: [
                        {
                            day: 'Monday',
                            startTime:'08:00 AM',
                            endTime:'03:00 PM'
                        },
                        {
                            day: 'Thursday',
                            startTime:'10:00 AM',
                            endTime:'05:00 PM'
                        },
                        {
                            day: 'Saturday',
                            startTime:'11:00 AM',
                            endTime:'09:00 PM'
                        },

                    ],
                    services: [
                        {
                            serviceName: 'Hair Styling',
                            serviceCost: '$100',
                            serviceEstTime: '01:00'
                        },
                        {
                            serviceName: 'Hair Color',
                            serviceCost: '$50',
                            serviceEstTime: '00:45'
                        },
                        {
                            serviceName: 'Shave',
                            serviceCost: '$50',
                            serviceEstTime: '00:30'
                        },
                        {
                            serviceName: 'Blow Out',
                            serviceCost: '$50',
                            serviceEstTime: '00:20'
                        }
                    ],
                },
                {
                    name: 'Alexender',
                    age: '23/7/1995',
                    tagLine: 'In the pursuit of manliness',
                    resume: 'https://s3-us-west-2.amazonaws.com/anxietybreakthrough/Stress+and+Anxiety+journal.pdf',
                    charges: '$80',
                    estTime: '00:45',
                    photo: 'https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png',
                    portfolio: [
                        {
                            image_url: 'https://lh3.googleusercontent.com/-2wgQRhgOjtY/W1nPuug4iCI/AAAAAAAAbms/hZpxv8laryAVIpuKSriv0o8orNh7PZESACHMYCw/s0/30.jpg'
                        },
                        {
                            image_url: 'https://www.vippng.com/png/detail/49-493960_fade-cut-male-hair-cutting-style.png'
                        },
                        {
                            image_url: 'https://www.pngitem.com/pimgs/m/218-2181295_paradise-grooming-for-men-hair-styles-cortes-de.png'
                        },
                        {
                            image_url: 'https://content3.jdmagicbox.com/comp/goa/x7/0832px832.x832.181210164520.c7x7/catalogue/max-hair-cutting-salon-zuarinagar-goa-salons-s4tj5qnjqs.jpg'
                        },

                    ],
                    certifcations: [
                        {
                            image_url: 'https://www.diplomasandmore.com/images/Bar1.jpg'
                        },
                        {
                            image_url: 'https://americanbarber.org/AIPB/wp-content/uploads/2019/12/aba-award-template-barber-apprentice.jpg'
                        },
                        {
                            image_url: 'https://image.slidesharecdn.com/268e137c-9c59-482c-9e5e-962a4ae9f040-161006162544/95/barber-gmd-staff-course-certificate-1-638.jpg?cb=1475771188'
                        }
                    ],
                    services: [
                        {
                            serviceName: 'Hair Styling',
                            serviceCost: '$100',
                            serviceEstTime: '01:00'
                        },
                        {
                            serviceName: 'Hair Color',
                            serviceCost: '$50',
                            serviceEstTime: '00:45'
                        },
                        {
                            serviceName: 'Shave',
                            serviceCost: '$50',
                            serviceEstTime: '00:30'
                        },
                        {
                            serviceName: 'Blow Out',
                            serviceCost: '$50',
                            serviceEstTime: '00:20'
                        }
                    ],
                    workingDays: [
                        {
                            day: 'Monday',
                            startTime:'08:00 AM',
                            endTime:'03:00 PM'
                        },
                        {
                            day: 'Thursday',
                            startTime:'10:00 AM',
                            endTime:'05:00 PM'
                        },
                        {
                            day: 'Saturday',
                            startTime:'11:00 AM',
                            endTime:'09:00 PM'
                        },

                    ]
                },
                {
                    name: 'Alexender',
                    age: '23/7/1995',
                    tagLine: 'In the pursuit of manliness',
                    resume: 'https://s3-us-west-2.amazonaws.com/anxietybreakthrough/Stress+and+Anxiety+journal.pdf',
                    charges: '$80',
                    estTime: '00:45',
                    photo: 'https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png',
                    portfolio: [
                        {
                            image_url: 'https://lh3.googleusercontent.com/-2wgQRhgOjtY/W1nPuug4iCI/AAAAAAAAbms/hZpxv8laryAVIpuKSriv0o8orNh7PZESACHMYCw/s0/30.jpg'
                        },
                        {
                            image_url: 'https://www.vippng.com/png/detail/49-493960_fade-cut-male-hair-cutting-style.png'
                        },
                        {
                            image_url: 'https://www.pngitem.com/pimgs/m/218-2181295_paradise-grooming-for-men-hair-styles-cortes-de.png'
                        },
                        {
                            image_url: 'https://content3.jdmagicbox.com/comp/goa/x7/0832px832.x832.181210164520.c7x7/catalogue/max-hair-cutting-salon-zuarinagar-goa-salons-s4tj5qnjqs.jpg'
                        },

                    ],
                    certifcations: [
                        {
                            image_url: 'https://www.diplomasandmore.com/images/Bar1.jpg'
                        },
                        {
                            image_url: 'https://americanbarber.org/AIPB/wp-content/uploads/2019/12/aba-award-template-barber-apprentice.jpg'
                        },
                        {
                            image_url: 'https://image.slidesharecdn.com/268e137c-9c59-482c-9e5e-962a4ae9f040-161006162544/95/barber-gmd-staff-course-certificate-1-638.jpg?cb=1475771188'
                        }
                    ],
                    services: [
                        {
                            serviceName: 'Hair Styling',
                            serviceCost: '$100',
                            serviceEstTime: '01:00'
                        },
                        {
                            serviceName: 'Hair Color',
                            serviceCost: '$50',
                            serviceEstTime: '00:45'
                        },
                        {
                            serviceName: 'Shave',
                            serviceCost: '$50',
                            serviceEstTime: '00:30'
                        },
                        {
                            serviceName: 'Blow Out',
                            serviceCost: '$50',
                            serviceEstTime: '00:20'
                        }
                    ],
                    workingDays: [
                        {
                            day: 'Monday',
                            startTime:'08:00 AM',
                            endTime:'03:00 PM'
                        },
                        {
                            day: 'Thursday',
                            startTime:'10:00 AM',
                            endTime:'05:00 PM'
                        },
                        {
                            day: 'Saturday',
                            startTime:'11:00 AM',
                            endTime:'09:00 PM'
                        },

                    ]
                },
                {
                    name: 'Alexender',
                    age: '23/7/1995',
                    tagLine: 'In the pursuit of manliness',
                    resume: 'https://s3-us-west-2.amazonaws.com/anxietybreakthrough/Stress+and+Anxiety+journal.pdf',
                    photo: 'https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png',
                    charges: '$80',
                    estTime: '00:45',
                    portfolio: [
                        {
                            image_url: 'https://lh3.googleusercontent.com/-2wgQRhgOjtY/W1nPuug4iCI/AAAAAAAAbms/hZpxv8laryAVIpuKSriv0o8orNh7PZESACHMYCw/s0/30.jpg'
                        },
                        {
                            image_url: 'https://www.vippng.com/png/detail/49-493960_fade-cut-male-hair-cutting-style.png'
                        },
                        {
                            image_url: 'https://www.pngitem.com/pimgs/m/218-2181295_paradise-grooming-for-men-hair-styles-cortes-de.png'
                        },
                        {
                            image_url: 'https://content3.jdmagicbox.com/comp/goa/x7/0832px832.x832.181210164520.c7x7/catalogue/max-hair-cutting-salon-zuarinagar-goa-salons-s4tj5qnjqs.jpg'
                        },

                    ],
                    certifcations: [
                        {
                            image_url: 'https://www.diplomasandmore.com/images/Bar1.jpg'
                        },
                        {
                            image_url: 'https://americanbarber.org/AIPB/wp-content/uploads/2019/12/aba-award-template-barber-apprentice.jpg'
                        },
                        {
                            image_url: 'https://image.slidesharecdn.com/268e137c-9c59-482c-9e5e-962a4ae9f040-161006162544/95/barber-gmd-staff-course-certificate-1-638.jpg?cb=1475771188'
                        }
                    ],
                    services: [
                        {
                            serviceName: 'Hair Styling',
                            serviceCost: '$100',
                            serviceEstTime: '01:00'
                        },
                        {
                            serviceName: 'Hair Color',
                            serviceCost: '$50',
                            serviceEstTime: '00:45'
                        },
                        {
                            serviceName: 'Shave',
                            serviceCost: '$50',
                            serviceEstTime: '00:30'
                        },
                        {
                            serviceName: 'Blow Out',
                            serviceCost: '$50',
                            serviceEstTime: '00:20'
                        }
                    ],
                    workingDays: [
                        {
                            day: 'Monday',
                            startTime:'08:00 AM',
                            endTime:'03:00 PM'
                        },
                        {
                            day: 'Thursday',
                            startTime:'10:00 AM',
                            endTime:'05:00 PM'
                        },
                        {
                            day: 'Saturday',
                            startTime:'11:00 AM',
                            endTime:'09:00 PM'
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
        const { onPress, bookNow } = this.props;
        var arr = item.age.split("/");
        const birthDate = new Date(arr[2], arr[1], arr[0]);
        const difference = Date.now() - birthDate.getTime();
        const age = new Date(difference);
        const totalAge = Math.abs(new Date().getFullYear() - age.getUTCFullYear());

        return (
            <>
                <TouchableOpacity onPress={() => onPress(item)} style={styles.listItemContainer}>
                    <View style={styles.cardStyle} >
                        <View style={styles.avatarContainer}>
                            <Avatar source={{ uri: item.photo }} size={70} />
                            <View style={{ paddingVertical: '5%' }} >
                                <TouchableOpacity onPress={bookNow} style={styles.buttonStyle}>
                                    <Text style={{ marginHorizontal: '10%', color: '#fff', fontFamily: 'Poppins-Medium' }}>
                                        Book Now
                                </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTextStyle} >{item.name}</Text>
                            <Text style={styles.dateTextStyle} >Age: {totalAge}</Text>
                            <Text style={styles.dateTextStyle} >Est.Time: {item.estTime}</Text>
                            <Text style={styles.dateTextStyle} >Charges: {item.charges}</Text>
                            <View style={styles.daycontainer}>
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
