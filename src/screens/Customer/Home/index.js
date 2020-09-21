import React, { Component } from 'react';
import { View, ActivityIndicator, Text, FlatList, LayoutAnimation, RefreshControl, UIManager, ImageBackground, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import styles from './style';
import { Button, Icon } from '../../../components'
import { connect } from 'react-redux'
import themeStyle from '../../../assets/styles/theme.style';
import { bindActionCreators } from "redux";
import { authActions } from '../../../redux/actions/auth';
import { userAddressActions } from '../../../redux/actions/addresses';
const screenHeight = Dimensions.get('window').height;
class Home extends Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            loading: false,
            expandAddresses: false,
            servicelist: [
                {
                    name: 'Appointment',
                    imageUrl: 'https://images.unsplash.com/photo-1580561650691-6562b4787600?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
                },
                {
                    name: 'My Addresses',
                    imageUrl: 'https://images.unsplash.com/photo-1580561650691-6562b4787600?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
                },
                {
                    name: 'Payment Method',
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
                    image_url: require('../../../assets/images/Salon-Category.jpg'),
                    subCategory: [
                        {
                            subCategoryName: 'Style',
                            image: require('../../../assets/images/Salon-Style.jpg'),
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
                            image: require('../../../assets/images/Salon-Color.jpg'),
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
                            image: require('../../../assets/images/Salon-Treatment.jpg'),
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
                    image_url: require('../../../assets/images/Barber-Category.jpg'),
                    subCategory: [
                        {
                            subCategoryName: 'Hair',
                            image: require('../../../assets/images/Barber-Cut.jpg'),
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
                            image: require('../../../assets/images/Nails-Hands.jpg'),
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
                            image: require('../../../assets/images/Barber-Shave.jpg'),
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
                            image: require('../../../assets/images/HairBraiding-Braiding.jpg'),
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
                            image: require('../../../assets/images/HairBraiding-Extensions.jpg'),
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
                    image_url: require('../../../assets/images/Nails-Category.jpg'),
                    subCategory: [
                        {
                            subCategoryName: 'Hands',
                            image: require('../../../assets/images/Nails-Hands.jpg'),
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
                            image: require('../../../assets/images/Nails-Feet.jpg'),
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
                    image_url: require('../../../assets/images/makeup.jpg'),
                    subCategory: [
                        {
                            subCategoryName: 'Hands',
                            image: require('../../../assets/images/makeup.jpg')
                        },
                        {
                            subCategoryName: 'Feet',
                            image: require('../../../assets/images/Nails-Hands.jpg')
                        },
                    ]
                },
                {
                    appointmentName: 'Bridal',
                    image_url: require('../../../assets/images/Bridal.jpg'),
                    subCategory: [
                        {
                            subCategoryName: 'Hands',
                            image: require('../../../assets/images/Nails-Hands.jpg')

                        },
                        {
                            subCategoryName: 'Feet',
                            image: require('../../../assets/images/Nails-Hands.jpg')
                        },
                    ]
                },
                {
                    appointmentName: 'Hair Removal',
                    image_url: require('../../../assets/images/hair-removal.jpg'),
                    subCategory: [
                        {
                            subCategoryName: 'Hands',
                            image: require('../../../assets/images/Nails-Hands.jpg')
                        },
                        {
                            subCategoryName: 'Feet',
                            image: require('../../../assets/images/Nails-Hands.jpg')
                        },
                    ]
                },
            ],
            addresses: [],
            address: ''

        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }


    componentDidMount = () => {
        // const { user, userAddresses } = this.props;
        // this.setState({ loading: true });
        // this.props.userAddressActions.allAddresses(user.userData);
        // if (userAddresses.addresses != undefined && userAddresses.addresses != null) {
        //     this.setState({ loading: false });
        // }
        // userAddresses.addresses.forEach(element => {
        //     if (element.is_selected == '1') {
        //         setTimeout(() => {
        //             this.setState({ address: element.address })
        //         }, 5000);
        //     }
        // })
    }

    handleAddress = () => {
        const { userAddresses } = this.props;
        let data;
        userAddresses.addresses.forEach(element => {
            if (element.is_selected == '1') {
                data = element.address
            }
        })
        return data;
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorHeightStyle}></View>
        )
    }

    _renderItems = (item) => {
        const { onAboutUs, onContactUs, onAppointments, myAddresses } = this.props;
        return (
            <>
                <TouchableOpacity
                    onPress={() => { (item.name == "About Us") ? onAboutUs() : item.name == "Contact Us" ? onContactUs() : item.name == "My Addresses" ? myAddresses() : onAppointments() }} style={styles.upperListItemContainer}>
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

    handleAddressPress = (item) => {
        const { user } = this.props;
        item = { ...item, token: user.userData.token };
        this.props.userAddressActions.defaultAddress(item, this.props.navigate);
        this.props.userAddressActions.allAddresses(user.userData);
        this.setState({ expandAddresses: !this.state.expandAddresses })
    }

    changeAddressLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expandAddresses: !this.state.expandAddresses })
    }

    render() {
        let { onExit, searchBarber } = this.props
        let { isUserLogedIn } = this.props.user;
        const { ourAppointment, servicelist, loading } = this.state;
        const { user, userAddresses } = this.props;
        return (
            <>
                <View style={styles.container}>
                    <ScrollView refreshControl={
                        <RefreshControl
                            refreshing={this.props.loading}
                            onRefresh={async () => await this.props.userAddressActions.allAddresses(user.userData)}
                            tintColor={themeStyle.COLOR_WHITE}
                            colors={[themeStyle.PRIMARY_COLOR]}
                        />
                    }>
                        <View style={styles.nameContainer}>
                            <Text style={styles.appNameTextStyle}>Fleek</Text>
                            {
                                isUserLogedIn ?
                                    <>
                                        <TouchableOpacity style={styles.headingContainer}
                                            onPress={this.changeAddressLayout} >
                                            {
                                                this.handleAddress() != undefined ?
                                                    <Text style={[styles.upperListTitleStyle, { fontSize: 12, textAlign: 'center' }]}>{this.handleAddress()}</Text>
                                                    :
                                                    <ActivityIndicator size={20} color={themeStyle.COLOR_WHITE} />
                                            }

                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.exitContainer} onPress={onExit}>
                                            <View style={{ paddingRight: '5%' }}>
                                                <Icon.Feather name="log-out" color="#fff" size={25} />
                                            </View>
                                        </TouchableOpacity>
                                    </> :
                                    null
                            }
                        </View>
                        <View style={{ marginTop: 0 }}>
                            {
                                this.state.expandAddresses ?
                                    <>
                                        <View style={{ height: this.state.expandAddresses ? null : 0, marginTop: "5%" }}>
                                            {
                                                userAddresses.addresses != undefined ?
                                                    userAddresses.addresses.map((item, index) => {
                                                        return (
                                                            <View style={styles.addressesContainer}>
                                                                <TouchableOpacity onPress={() => this.handleAddressPress(item)} style={{ flexDirection: 'row' }}>
                                                                    <View style={{ justifyContent: 'center' }}>
                                                                        <Icon.MaterialCommunityIcons name={item.is_selected == '1' ? 'radiobox-marked' : 'radiobox-blank'} size={themeStyle.ICON_SIZE} color={themeStyle.PRIMARY_COLOR} />
                                                                    </View>
                                                                    <View style={{ marginLeft: '5%' }}>
                                                                        <Text style={[styles.upperListTitleStyle]}> {item.label_as} </Text>
                                                                        <Text style={[styles.upperListTitleStyle, { fontSize: 12, }]}> {item.address} </Text>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            </View>
                                                        )
                                                    })
                                                    :
                                                    <ActivityIndicator size={40} color={themeStyle.COLOR_WHITE} />
                                            }
                                        </View>
                                        <TouchableOpacity onPress={() => this.props.addNewAddress()} style={styles.addNewAddressContainer}>
                                            <View style={{ justifyContent: 'center' }}>
                                                <Icon.AntDesign name='plus' size={themeStyle.ICON_SIZE} color={themeStyle.PRIMARY_COLOR} />
                                            </View>
                                            <View style={{ marginLeft: '5%', justifyContent: 'center' }}>
                                                <Text style={[styles.upperListTitleStyle, { fontSize: 12, }]}> Add new Address </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </> : null
                            }
                        </View>

                        <View style={[styles.upperListContainer]}>
                            <FlatList
                                data={servicelist}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) => this._renderItems(item)}
                                keyExtractor={item => item} />
                        </View>
                        <View style={[styles.nameContainer, { alignItems: 'center' }]}>
                            <Text style={styles.appointmentTextStyle}>Make an Appointment</Text>
                            <TouchableOpacity style={[styles.searchBarberContainer,]} onPress={searchBarber}>
                                <Text style={styles.appointmentTextStyle}>Search Barber </Text>
                                <Icon.Feather name="search" color="#fff" size={15} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.lowerListContainer}>
                            <FlatList
                                data={ourAppointment}
                                showsVerticalScrollIndicator={false}
                                ItemSeparatorComponent={this._renderSeparator}
                                renderItem={({ item }) => this._renderAppointmentItems(item)}
                                keyExtractor={item => item} />
                        </View>
                    </ScrollView>
                </View>
            </>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {},
        userAddresses: state.userAddresses || {}
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        userAddressActions: bindActionCreators(userAddressActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);