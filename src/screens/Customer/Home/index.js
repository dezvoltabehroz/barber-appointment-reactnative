import React, { Component } from 'react';
import { View, Text, FlatList, ImageBackground, TouchableOpacity, Alert } from "react-native";
import styles from './style';
import { Button, Icon } from '../../../components'
import { connect } from 'react-redux'
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            servicelist: [
                {
                    name: 'Appointment',
                    imageUrl: 'https://images.unsplash.com/photo-1580561650691-6562b4787600?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
                },
                {
                    name: 'About Us',
                    imageUrl: 'https://images.unsplash.com/photo-1580561650691-6562b4787600?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
                },
                {
                    name: 'Contact Us',
                    imageUrl: 'https://images.unsplash.com/photo-1580561650691-6562b4787600?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
                },
            ],
            ourAppointment: [
                {
                    appointmentName: 'Salon',
                    image_url: require('../../../assets/images/Salon-Category.png'),
                    subCategory: [
                        {
                            subCategoryName: 'Style',
                            image: require('../../../assets/images/Salon-Style.png'),
                            services: [
                                {
                                    serviceName: 'Haircut & Styling',
                                    serviceImage: 'https://vanity-atelier.co.uk/wp-content/uploads/2018/06/salon9.jpg',
                                    serviceDescription: 'All haircuts include eyebrows, nose, and ears groomed.'
                                },
                                {
                                    serviceName: 'Short/long Dry Cut',
                                    serviceImage: 'https://media1.popsugar-assets.com/files/thumbor/8FQjnhO5KDETJlIw-9YrAxbFORg/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2013/11/25/741/n/1922153/f86754a8a6f036d0_headband-braid-2/i/Starting-section-hair-from-behind-one-ear-separate.jpg',
                                    serviceDescription: 'Any type of haircut + beard + eyebrows and nose and ears Groomed.'
                                },
                                {
                                    serviceName: 'Single Process',
                                    serviceImage: 'https://i1.wp.com/atelieremmanuel.com/wp-content/gallery/special-events/Atelier-Emmanuel-Rene-Furterer-Guest-Artist-Davide-Torchio-43.jpg?ssl=1',
                                    serviceDescription: 'All haircuts include eyebrows, nose, and ears groomed.'
                                },
                                {
                                    serviceName: 'Styling Only',
                                    serviceImage: 'https://media1.popsugar-assets.com/files/thumbor/8FQjnhO5KDETJlIw-9YrAxbFORg/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2013/11/25/741/n/1922153/f86754a8a6f036d0_headband-braid-2/i/Starting-section-hair-from-behind-one-ear-separate.jpg',
                                    serviceDescription: 'Any type of haircut + beard + eyebrows and nose and ears Groomed.'
                                },
                                {
                                    serviceName: 'Short/long Cut & Style',
                                    serviceImage: 'https://static-bebeautiful-in.unileverservices.com/quick-easy-hairstyles_Mobilehome.jpg',
                                    serviceDescription: 'All haircuts include eyebrows, nose, and ears groomed.'
                                },
                                {
                                    serviceName: 'Style & Curl',
                                    serviceImage: 'https://vanity-atelier.co.uk/wp-content/uploads/2018/06/salon9.jpg',
                                    serviceDescription: 'Any type of haircut + beard + eyebrows and nose and ears Groomed.'
                                },
                                {
                                    serviceName: 'Updo',
                                    serviceImage: 'http://www.beautytipshub.com/wp-content/uploads/2019/09/maxresdefault-3.jpg',
                                    serviceDescription: 'All haircuts include eyebrows, nose, and ears groomed.'
                                },
                                {
                                    serviceName: 'Blowout',
                                    serviceImage: 'https://vanity-atelier.co.uk/wp-content/uploads/2018/06/salon9.jpg',
                                    serviceDescription: 'Any type of haircut + beard + eyebrows and nose and ears Groomed.'
                                },
                                // {
                                //     serviceName: 'Men`s Style Cut',
                                //     serviceImage: 'https://vanity-atelier.co.uk/wp-content/uploads/2018/06/salon9.jpg',
                                //     serviceDescription: 'All haircuts include eyebrows, nose, and ears groomed.'
                                // },
                                // {
                                //     serviceName: 'Extensions',
                                //     serviceImage: 'https://vanity-atelier.co.uk/wp-content/uploads/2018/06/salon9.jpg',
                                //     serviceDescription: 'All haircuts include eyebrows, nose, and ears groomed.'
                                // },
                                // {
                                //     serviceName: 'Kids(0 to 12)',
                                //     serviceImage: 'https://vanity-atelier.co.uk/wp-content/uploads/2018/06/salon9.jpg',
                                //     serviceDescription: 'All haircuts include eyebrows, nose, and ears groomed.'
                                // },
                                // {
                                //     serviceName: 'Teens(12 to 17)',
                                //     serviceImage: 'https://vanity-atelier.co.uk/wp-content/uploads/2018/06/salon9.jpg',
                                //     serviceDescription: 'All haircuts include eyebrows, nose, and ears groomed.'
                                // },
                                // {
                                //     serviceName: 'Cut & Curl',
                                //     serviceImage: 'https://vanity-atelier.co.uk/wp-content/uploads/2018/06/salon9.jpg',
                                //     serviceDescription: 'All haircuts include eyebrows, nose, and ears groomed.'
                                // },
                                // {
                                //     serviceName: 'Press & Curl',
                                //     serviceImage: 'https://vanity-atelier.co.uk/wp-content/uploads/2018/06/salon9.jpg',
                                //     serviceDescription: 'All haircuts include eyebrows, nose, and ears groomed.'
                                // },
                            ]
                        },
                        {
                            subCategoryName: 'Color',
                            image: require('../../../assets/images/Salon-Color.png'),
                            services: [
                                {
                                    serviceName: 'Highlights',
                                },
                                {
                                    serviceName: 'Balayage',
                                },
                                {
                                    serviceName: 'Corrective Color',
                                },
                                {
                                    serviceName: 'Single Process',
                                },
                                {
                                    serviceName: 'Lift & Tone',
                                },
                                {
                                    serviceName: 'Face Frame & Lightening',
                                },
                                {
                                    serviceName: 'Touch Up',
                                },
                                {
                                    serviceName: 'Blowout',
                                },
                            ]
                        },
                        {
                            subCategoryName: 'Treatment',
                            image: require('../../../assets/images/Salon-Treatment.png'),
                            services: [
                                {
                                    serviceName: 'Glaze',
                                },
                                {
                                    serviceName: 'Keratin Smooting',
                                },
                                {
                                    serviceName: 'Keratin Express',
                                },
                                {
                                    serviceName: 'Treatment',
                                },
                                {
                                    serviceName: 'Carmelux',
                                },
                                {
                                    serviceName: 'Hot Oil Treatment',
                                },
                            ]
                        },
                    ]
                },
                {
                    appointmentName: 'Barber',
                    image_url: require('../../../assets/images/Barber-Category.png'),
                    subCategory: [
                        {
                            subCategoryName: 'Hair',
                            image: require('../../../assets/images/Barber-Cut.png'),
                            services: [
                                {
                                    serviceName: 'Hair Cut',
                                },
                                {
                                    serviceName: 'Buzz Cut',
                                },
                                {
                                    serviceName: 'Shape Up',
                                },
                                {
                                    serviceName: 'Custom Design',
                                },
                                {
                                    serviceName: 'Men`s Haircut w/ Bread',
                                },
                                {
                                    serviceName: 'Haircut w/ Color',
                                },
                                {
                                    serviceName: 'Color',
                                },
                            ]
                        },
                        {
                            subCategoryName: 'Bread & Mustache',
                            image: require('../../../assets/images/Nails-Hands.png'),
                            services: [
                                {
                                    serviceName: 'Full Service Bread & Mustache Trim',
                                },
                                {
                                    serviceName: 'Bread & Mustache Trim',
                                }
                            ]
                        },
                        {
                            subCategoryName: 'Shave',
                            image: require('../../../assets/images/Barber-Shave.png'),
                            services: [
                                {
                                    serviceName: 'Executive Shave',
                                },
                                {
                                    serviceName: 'Straight Razor Shave',
                                },
                                {
                                    serviceName: 'Regular Shave',
                                },
                                {
                                    serviceName: 'Head Shave',
                                },
                            ]
                        },
                    ]
                },
                {
                    appointmentName: 'Hair Braiding',
                    image_url: require('../../../assets/images/Braiding-Category.png'),
                    subCategory: [
                        {
                            subCategoryName: 'Braiding',
                            image: require('../../../assets/images/HairBraiding-Braiding.png'),
                            services: [
                                {
                                    serviceName: 'Hair Braiding',
                                },
                                {
                                    serviceName: 'Children`s Braiding',
                                },
                                {
                                    serviceName: 'Cornrows',
                                },
                                {
                                    serviceName: 'Children`s Cornrows',
                                },
                                {
                                    serviceName: 'Twists',
                                },
                                {
                                    serviceName: 'Men`s Cornrows',
                                },
                                {
                                    serviceName: 'Dreadlocks',
                                },
                                {
                                    serviceName: 'Men`s Individual Braids',
                                },
                            ]
                        },
                        {
                            subCategoryName: 'Extensions',
                            image: require('../../../assets/images/HairBraiding-Extensions.png'),
                            services: [
                                {
                                    serviceName: 'Kinky Twists',
                                },
                                {
                                    serviceName: 'Micro Braids',
                                },
                                {
                                    serviceName: 'Havana Twists',
                                },
                                {
                                    serviceName: 'Marley Twists',
                                },
                                {
                                    serviceName: 'Individual Braids',
                                },
                                {
                                    serviceName: 'Box Braids',
                                },
                            ]
                        },
                    ]
                },
                {
                    appointmentName: 'Nails',
                    image_url: require('../../../assets/images/Nails-Category.png'),
                    subCategory: [
                        {
                            subCategoryName: 'Hands',
                            image: require('../../../assets/images/Nails-Hands.png'),
                            services: [
                                {
                                    serviceName: 'Spa Manicure',
                                },
                                {
                                    serviceName: 'Classic Manicure',
                                },
                                {
                                    serviceName: 'Express Manicure',
                                },
                                {
                                    serviceName: 'Shellac Manicure',
                                },
                            ]
                        },
                        {
                            subCategoryName: 'Feet',
                            image: require('../../../assets/images/Nails-Feet.png'),
                            services: [
                                {
                                    serviceName: 'Spa Pedicure',
                                },
                                {
                                    serviceName: 'Classic Pedicure',
                                },
                                {
                                    serviceName: 'Express Pedicure',
                                },
                                {
                                    serviceName: 'Shellac Pedicure',
                                },
                            ]
                        },
                    ]
                },
                {
                    appointmentName: 'Make Up',
                    image_url: require('../../../assets/images/makeup.png'),
                    subCategory: [
                        {
                            subCategoryName: 'Hands',
                            image: require('../../../assets/images/makeup.png')
                        },
                        {
                            subCategoryName: 'Feet',
                            image: require('../../../assets/images/Nails-Hands.png')
                        },
                    ]
                },
                {
                    appointmentName: 'Bridal',
                    image_url: require('../../../assets/images/Bridal.png'),
                    subCategory: [
                        {
                            subCategoryName: 'Hands',
                            image: require('../../../assets/images/Nails-Hands.png')

                        },
                        {
                            subCategoryName: 'Feet',
                            image: require('../../../assets/images/Nails-Hands.png')
                        },
                    ]
                },
                {
                    appointmentName: 'Hair Removal',
                    image_url: require('../../../assets/images/hair-removal.png'),
                    subCategory: [
                        {
                            subCategoryName: 'Hands',
                            image: require('../../../assets/images/Nails-Hands.png')
                        },
                        {
                            subCategoryName: 'Feet',
                            image: require('../../../assets/images/Nails-Hands.png')
                        },
                    ]
                },
            ]

        }
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorHeightStyle}></View>
        )
    }

    _renderItems = (item) => {
        const { onAboutUs, onContactUs, onAppointments } = this.props;
        return (
            <>
                <TouchableOpacity
                    onPress={() => { (item.name == "About Us") ? onAboutUs() : item.name == "Contact Us" ? onContactUs() : onAppointments() }} style={styles.upperListItemContainer}>
                    <ImageBackground source={{ uri: `${item.imageUrl}` }}
                        style={styles.upperListImageStyle} imageStyle={{ borderRadius: 10 }}>
                        <View style={styles.upperListTitleContainer}>
                            <Text style={styles.upperListTitleStyle} >{item.name}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </>
        )
    }

    _renderAppointmentItems = (item) => {
        const { onItemPress } = this.props;
        return (
            <>
                <TouchableOpacity onPress={() => onItemPress(item.appointmentName, item.subCategory)} style={styles.lowerListItemContainer}>
                    <ImageBackground source={item.image_url}
                        style={styles.lowerListImageStyle} imageStyle={{ borderRadius: 10 }}>
                        <View style={styles.lowerListTitleContainer}>
                            <Text style={styles.lowerListTitleStyle} >{item.appointmentName}</Text>
                            <View style={styles.line}></View>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </>
        )
    }




    render() {
        let { onExit } = this.props
        let { isUserLogedIn } = this.props.user;
        const { ourAppointment, servicelist } = this.state
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.appNameTextStyle} >Fleek</Text>
                        {
                            isUserLogedIn ?
                                <TouchableOpacity style={styles.exitContainer} onPress={onExit}>
                                    <Icon.Feather name="log-out" color="#fff" size={25} />
                                </TouchableOpacity>
                                :
                                null
                        }
                    </View>
                    <View style={styles.upperListContainer}>
                        <FlatList
                            data={servicelist}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => this._renderItems(item)}
                            keyExtractor={item => item} />
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.appointmentTextStyle}>Make an Appointment</Text>
                    </View>
                    <View style={styles.lowerListContainer}>
                        <FlatList
                            data={ourAppointment}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={this._renderSeparator}
                            renderItem={({ item }) => this._renderAppointmentItems(item)}
                            keyExtractor={item => item} />
                    </View>
                </View>
            </>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};
export default connect(mapStateToProps)(Home);